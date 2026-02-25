import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// List of universities to exclude
const EXCLUDED_UNIVERSITIES = [
  'Universities Ulster',
  'Southampton Solent University',
  'Oxford Book University',
  'Swansea University',
]

/**
 * Splits a search query into meaningful tokens (2+ chars each).
 */
function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2)
}

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
    const excludeFilter = excludedUniIds.length > 0
      ? `(${excludedUniIds.join(',')})`
      : '(0)'

    // If country filter is provided, first get university IDs for that country
    let countryUniversityIds: number[] = []
    if (countryId) {
      const { data: universities } = await supabase
        .from('universities')
        .select('id')
        .eq('country_id', parseInt(countryId))
        .not('id', 'in', excludeFilter)

      countryUniversityIds = universities?.map((u) => u.id) || []

      // If no universities found for this country, return empty result
      if (countryUniversityIds.length === 0) {
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

    // Token-based search: find university IDs matching search tokens
    let searchMatchedUniIds: number[] = []
    let tokens: string[] = []
    if (searchQuery && searchQuery.trim().length >= 2) {
      tokens = tokenize(searchQuery)

      if (tokens.length > 0) {
        // Find universities whose name matches any token
        const uniOrConditions = tokens.map((t) => `name.ilike.%${t}%`).join(',')
        const { data: matchedUnis } = await supabase
          .from('universities')
          .select('id, name')
          .or(uniOrConditions)
          .not('id', 'in', excludeFilter)

        searchMatchedUniIds = (matchedUnis || []).map((u) => u.id)
      }
    }

    // Build the main query
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
      .not('university_id', 'in', excludeFilter)

    // Filter by university IDs (which belong to the selected country)
    if (countryId && countryUniversityIds.length > 0) {
      query = query.in('university_id', countryUniversityIds)
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

    // Token-based search across course fields + matched university IDs
    if (tokens.length > 0) {
      const searchOrParts: string[] = []
      for (const t of tokens) {
        searchOrParts.push(`name.ilike.%${t}%`)
        searchOrParts.push(`description.ilike.%${t}%`)
        searchOrParts.push(`code.ilike.%${t}%`)
      }
      // Also include courses that belong to universities matching search tokens
      if (searchMatchedUniIds.length > 0) {
        searchOrParts.push(`university_id.in.(${searchMatchedUniIds.join(',')})`)
      }
      query = query.or(searchOrParts.join(','))
    }

    // Filter by intake months using the courses.intake_months varchar column
    const monthsToFilter = intakeMonths
      ? intakeMonths.split(',').map((m) => m.trim()).filter(Boolean)
      : intakeMonth
        ? [intakeMonth]
        : []

    if (monthsToFilter.length > 0) {
      const orConditions = monthsToFilter.map((m) => `intake_months.ilike.%${m}%`).join(',')
      query = query.or(orConditions)
    }

    // Fetch a larger set if we need to do client-side token intersection
    const fetchLimit = tokens.length > 1 ? Math.max(limit * 10, 200) : limit
    const { data, error, count: rawCount } = await query.range(
      tokens.length > 1 ? 0 : offset,
      tokens.length > 1 ? fetchLimit - 1 : offset + limit - 1,
    )

    if (error) throw error

    let finalData = data || []
    let finalCount = rawCount || 0

    // Client-side: if multi-token, ensure EVERY token matches at least one field
    if (tokens.length > 1 && finalData.length > 0) {
      finalData = finalData.filter((course) => {
        const courseText = `${course.name || ''} ${course.code || ''} ${course.level || ''} ${course.description || ''}`.toLowerCase()
        const uniName = (course.universities as any)?.name?.toLowerCase() || ''
        const combined = `${courseText} ${uniName}`
        return tokens.every((t) => combined.includes(t))
      })
      finalCount = finalData.length
      // Apply pagination on the filtered set
      finalData = finalData.slice(offset, offset + limit)
    }

    return NextResponse.json(
      {
        data: finalData,
        count: finalCount,
        limit,
        offset,
        hasMore: finalCount ? offset + limit < finalCount : false,
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
