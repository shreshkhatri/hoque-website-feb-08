import { NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country')
  const slug = searchParams.get('slug')
  const search = searchParams.get('search') || ''
  const programLevel = searchParams.get('program_level')
  const eligibilityType = searchParams.get('eligibility_type')
  const limit = parseInt(searchParams.get('limit') || '50')

  // Single scholarship by slug
  if (slug) {
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })
    }
    return NextResponse.json({ data })
  }

  // List scholarships
  let query = supabase
    .from('scholarships')
    .select('*', { count: 'exact' })
    .eq('is_active', true)

  if (country) {
    query = query.eq('country', country)
  }
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,funding_body.ilike.%${search}%`)
  }
  if (programLevel) {
    query = query.ilike('program_level', `%${programLevel}%`)
  }
  if (eligibilityType) {
    query = query.ilike('eligibility_type', `%${eligibilityType}%`)
  }

  query = query.order('created_at', { ascending: false }).limit(limit)

  const { data, count, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get distinct countries for filter
  const { data: countriesData } = await supabase
    .from('scholarships')
    .select('country')
    .eq('is_active', true)

  const countries = [...new Set((countriesData || []).map(c => c.country))].sort()

  return NextResponse.json({ data: data || [], total: count || 0, countries })
}
