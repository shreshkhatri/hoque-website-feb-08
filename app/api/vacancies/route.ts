import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const country = searchParams.get('country')
    const department = searchParams.get('department')
    const jobType = searchParams.get('job_type')

    let query = supabase
      .from('vacancies')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('application_deadline', { ascending: true })

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,department.ilike.%${search}%,location_city.ilike.%${search}%,description.ilike.%${search}%`
      )
    }

    if (country) {
      query = query.eq('location_country', country)
    }

    if (department) {
      query = query.eq('department', department)
    }

    if (jobType) {
      query = query.eq('job_type', jobType)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching vacancies:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data || [], count: count || 0 }, { status: 200 })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
