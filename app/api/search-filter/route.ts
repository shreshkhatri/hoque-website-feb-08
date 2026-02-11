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
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'university' // destination, university, course, event
    const limit = 5

    if (query.length < 1) {
      return NextResponse.json({
        results: [],
        type: type,
      })
    }

    let results = []

    if (type === 'destination') {
      // Search for countries
      const { data, error } = await supabase
        .from('countries')
        .select('id, name')
        .ilike('name', `%${query}%`)
        .limit(limit)

      if (error) throw error
      results = data?.map((c) => ({
        id: c.id,
        name: c.name,
        type: 'destination',
      })) || []
    } else if (type === 'university') {
      // Search for universities
      const { data, error } = await supabase
        .from('universities')
        .select('id, name, countries(id, name)')
        .ilike('name', `%${query}%`)
        .not('name', 'in', `(${EXCLUDED_UNIVERSITIES.map((u) => `"${u}"`).join(',')})`)
        .limit(limit)

      if (error) throw error
      results = data?.map((u: any) => ({
        id: u.id,
        name: u.name,
        country: u.countries?.name,
        type: 'university',
      })) || []
    } else if (type === 'courses') {
      // First, get excluded university IDs
      const { data: excludedUnis } = await supabase
        .from('universities')
        .select('id')
        .in('name', EXCLUDED_UNIVERSITIES)

      const excludedUniIds = excludedUnis?.map((u) => u.id) || []

      // Search for courses
      const { data, error } = await supabase
        .from('courses')
        .select(
          'id, name, code, universities(id, name, countries(id, name))',
        )
        .ilike('name', `%${query}%`)
        .not('university_id', 'in', `(${excludedUniIds.join(',')})`)
        .limit(limit)

      if (error) throw error
      results = data?.map((c: any) => ({
        id: c.id,
        name: c.name,
        code: c.code,
        university: c.universities?.name,
        country: c.universities?.countries?.name,
        type: 'course',
      })) || []
    } else if (type === 'intake') {
      // First, get excluded university IDs
      const { data: excludedUnis } = await supabase
        .from('universities')
        .select('id')
        .in('name', EXCLUDED_UNIVERSITIES)

      const excludedUniIds = excludedUnis?.map((u) => u.id) || []

      // Search for courses by intake month
      const { data: intakeData, error: intakeError } = await supabase
        .from('course_intake_months')
        .select('course_id, month')
        .ilike('month', `%${query}%`)
        .limit(50)

      if (intakeError) throw intakeError

      if (intakeData && intakeData.length > 0) {
        const courseIds = [...new Set(intakeData.map((r: any) => r.course_id))]
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('id, name, code, universities(id, name, countries(id, name))')
          .in('id', courseIds)
          .not('university_id', 'in', `(${excludedUniIds.join(',')})`)
          .limit(limit)

        if (coursesError) throw coursesError

        results = coursesData?.map((c: any) => {
          const intakeMonths = intakeData
            .filter((r: any) => r.course_id === c.id)
            .map((r: any) => r.month)
          return {
            id: c.id,
            name: `${c.name} (${intakeMonths.join(', ')})`,
            code: c.code,
            university: c.universities?.name,
            country: c.universities?.countries?.name,
            type: 'intake',
          }
        }) || []
      }
    }

    return NextResponse.json({
      results: results,
      type: type,
    })
  } catch (error) {
    console.error('Search filter error:', error)
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 },
    )
  }
}
