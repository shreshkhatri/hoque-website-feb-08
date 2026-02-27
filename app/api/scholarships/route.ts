import { NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase'

// Join query: scholarships with countries
const SELECT_WITH_COUNTRY = `
  id, name, slug, funding_body, funding_amount, program_level,
  eligibility_type, eligibility_details, description, full_description,
  how_to_apply, application_period, official_url, is_active, created_at,
  country_id,
  countries!fk_scholarships_country ( id, name )
`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const countryName = searchParams.get('country')
  const slug = searchParams.get('slug')
  const search = searchParams.get('search') || ''
  const programLevel = searchParams.get('program_level')
  const eligibilityType = searchParams.get('eligibility_type')
  const limit = parseInt(searchParams.get('limit') || '50')

  // Single scholarship by slug
  if (slug) {
    const { data, error } = await supabase
      .from('scholarships')
      .select(SELECT_WITH_COUNTRY)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })
    }
    // Flatten country name onto the object
    const flat = { ...data, country: (data.countries as { name: string } | null)?.name ?? '' }
    return NextResponse.json({ data: flat })
  }

  // If filtering by country name, resolve it to an ID first
  let countryId: number | null = null
  if (countryName) {
    const { data: cData } = await supabase
      .from('countries')
      .select('id')
      .ilike('name', countryName)
      .single()
    countryId = cData?.id ?? null
  }

  let query = supabase
    .from('scholarships')
    .select(SELECT_WITH_COUNTRY, { count: 'exact' })
    .eq('is_active', true)

  if (countryId !== null) {
    query = query.eq('country_id', countryId)
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

  // Flatten country name and collect distinct country names for filters
  const flat = (data || []).map((s: Record<string, unknown>) => ({
    ...s,
    country: (s.countries as { name: string } | null)?.name ?? '',
  }))

  const countries = [...new Set(flat.map((s) => s.country).filter(Boolean))].sort()

  return NextResponse.json({ data: flat, total: count || 0, countries })
}
