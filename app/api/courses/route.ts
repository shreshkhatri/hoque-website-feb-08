import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// List of universities to exclude
const EXCLUDED_UNIVERSITIES = [
  'Universities Ulster',
  'Southampton Solent University',
  'Oxford Book University',
  'Swansea University',
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '5')
    const offset = parseInt(searchParams.get('offset') || '0')
    const countryId = searchParams.get('country_id')
    const universityId = searchParams.get('university_id')
    const level = searchParams.get('level')
    const searchQuery = searchParams.get('search')
    const intakeMonth = searchParams.get('intake_month')
    const intakeMonths = searchParams.get('intake_months') // comma-separated
    const campusId = searchParams.get('campus_id')

    // Get excluded university IDs
    const { data: excludedUnis } = await supabase
      .from('universities')
      .select('id')
      .in('name', EXCLUDED_UNIVERSITIES)

    const excludedUniIds = excludedUnis?.map((u) => u.id) || []

    // If country filter is provided, first get university IDs for that country
    let universityIds: number[] = []
    if (countryId) {
      const { data: universities } = await supabase
        .from('universities')
        .select('id')
        .eq('country_id', parseInt(countryId))
        .not('id', 'in', `(${excludedUniIds.join(',')})`)

      universityIds = universities?.map((u) => u.id) || []

      // If no universities found for this country, return empty result
      if (universityIds.length === 0) {
        return NextResponse.json(
          {
            data: [],
            count: 0,
            limit,
            offset,
            hasMore: false,
          },
          { status: 200 },
        )
      }
    }

    let query = supabase
      .from('courses')
      .select(
        `
        *,
        universities(id, name, city, country_id, countries(id, name, currency)),
        university_campuses(id, name, location, is_main_campus)
      `,
        { count: 'exact' },
      )
      .order('name', { ascending: true })
      .not('university_id', 'in', `(${excludedUniIds.join(',')})`)

    // Filter by university IDs (which belong to the selected country)
    if (countryId && universityIds.length > 0) {
      query = query.in('university_id', universityIds)
    }

    // Filter by specific university if provided
    if (universityId) {
      query = query.eq('university_id', parseInt(universityId))
    }

    // Filter by specific campus if provided
    if (campusId) {
      query = query.eq('campus_id', parseInt(campusId))
    }

    if (level) {
      query = query.eq('level', level)
    }

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
    }

    // Filter by intake months using the courses.intake_months varchar column
    // The column stores comma-separated month names like "September,January,May"
    const monthsToFilter = intakeMonths
      ? intakeMonths.split(',').map((m) => m.trim()).filter(Boolean)
      : intakeMonth
        ? [intakeMonth]
        : []

    if (monthsToFilter.length > 0) {
      // Build an OR filter to match any of the selected months using ilike
      const orConditions = monthsToFilter.map((m) => `intake_months.ilike.%${m}%`).join(',')
      query = query.or(orConditions)
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json(
      {
        data,
        count,
        limit,
        offset,
        hasMore: count ? offset + limit < count : false,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Courses fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 },
    )
  }
}
