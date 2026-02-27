import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const SELECT_WITH_COUNTRY = `
  id, name, slug, funding_body, funding_amount, program_level,
  eligibility_type, eligibility_details, description, full_description,
  how_to_apply, application_period, official_url, is_active, created_at,
  country_id,
  countries!fk_scholarships_country ( id, name )
`

function flattenCountry(s: Record<string, unknown>) {
  return {
    ...s,
    country: (s.countries as { id: number; name: string } | null)?.name ?? '',
  }
}

export async function GET(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const countryId = searchParams.get('country_id')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  let query = supabase
    .from('scholarships')
    .select(SELECT_WITH_COUNTRY, { count: 'exact' })

  if (search) {
    // Search by name, funding_body; country name needs a separate approach
    query = query.or(`name.ilike.%${search}%,funding_body.ilike.%${search}%`)
  }
  if (countryId) {
    query = query.eq('country_id', parseInt(countryId))
  }

  query = query.order('created_at', { ascending: false })

  const { data, count, error } = await query.range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const flat = (data || []).map(flattenCountry)
  return NextResponse.json({ data: flat, total: count || 0, page, limit })
}

export async function POST(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const {
      name,
      country_id,
      funding_body,
      funding_amount,
      program_level,
      eligibility_type,
      eligibility_details,
      description,
      full_description,
      how_to_apply,
      application_period,
      official_url,
      is_active,
    } = body

    if (!name || !country_id) {
      return NextResponse.json({ error: 'Name and country are required' }, { status: 400 })
    }

    const slug = generateSlug(name)

    const { data, error } = await supabase
      .from('scholarships')
      .insert({
        name,
        slug,
        country_id: Number(country_id),
        funding_body: funding_body || null,
        funding_amount: funding_amount || null,
        program_level: program_level || null,
        eligibility_type: eligibility_type || 'International',
        eligibility_details: eligibility_details || null,
        description: description || null,
        full_description: full_description || null,
        how_to_apply: how_to_apply || null,
        application_period: application_period || null,
        official_url: official_url || null,
        is_active: is_active !== undefined ? is_active : true,
      })
      .select(SELECT_WITH_COUNTRY)
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data: flattenCountry(data as Record<string, unknown>) })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { id, country, ...updates } = body // strip old text country if accidentally sent

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    // Ensure country_id is a number
    if (updates.country_id) {
      updates.country_id = Number(updates.country_id)
    }

    // Regenerate slug if name changed
    if (updates.name) {
      updates.slug = generateSlug(updates.name)
    }

    updates.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('scholarships')
      .update(updates)
      .eq('id', id)
      .select(SELECT_WITH_COUNTRY)
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data: flattenCountry(data as Record<string, unknown>) })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('scholarships')
    .delete()
    .eq('id', parseInt(id))

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
