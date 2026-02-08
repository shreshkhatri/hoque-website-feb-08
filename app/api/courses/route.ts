import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '5')
    const offset = parseInt(searchParams.get('offset') || '0')
    const countryId = searchParams.get('country_id')
    const level = searchParams.get('level')
    const searchQuery = searchParams.get('search')

    // If country filter is provided, first get university IDs for that country
    let universityIds: number[] = []
    if (countryId) {
      const { data: universities } = await supabase
        .from('universities')
        .select('id')
        .eq('country_id', parseInt(countryId))

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
        universities(id, name, city, country_id, countries(id, name))
      `,
        { count: 'exact' },
      )
      .order('name', { ascending: true })

    // Filter by university IDs (which belong to the selected country)
    if (countryId && universityIds.length > 0) {
      query = query.in('university_id', universityIds)
    }

    if (level) {
      query = query.eq('level', level)
    }

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
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
