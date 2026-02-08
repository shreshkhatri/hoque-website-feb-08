import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all'

    if (!query || query.length < 2) {
      return NextResponse.json({
        universities: [],
        courses: [],
      })
    }

    const searchTerm = `%${query}%`

    let universities = []
    let courses = []

    // Search universities
    if (type === 'all' || type === 'university') {
      const { data: uniData, error: uniError } = await supabase
        .from('universities')
        .select('*, countries!inner(id, name)')
        .or(
          `name.ilike.${searchTerm},city.ilike.${searchTerm},country.ilike.${searchTerm},description.ilike.${searchTerm}`,
        )
        .limit(10)

      if (uniError) throw uniError
      universities = uniData || []
    }

    // Search courses
    if (type === 'all' || type === 'course') {
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(
          `
          id,
          name,
          code,
          level,
          description,
          university_id,
          universities!inner(id, name, city)
        `,
        )
        .or(
          `name.ilike.${searchTerm},code.ilike.${searchTerm},description.ilike.${searchTerm},level.ilike.${searchTerm}`,
        )
        .limit(20)

      if (courseError) throw courseError
      courses = courseData || []
    }

    return NextResponse.json({
      universities,
      courses,
      query,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 },
    )
  }
}
