import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function GET(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const country = searchParams.get('country')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  let query = supabase
    .from('scholarships')
    .select('*', { count: 'exact' })

  if (search) {
    query = query.or(`name.ilike.%${search}%,funding_body.ilike.%${search}%,country.ilike.%${search}%`)
  }
  if (country) {
    query = query.eq('country', country)
  }

  query = query.order('created_at', { ascending: false })

  const { data, count, error } = await query.range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data, total: count || 0, page, limit })
}

export async function POST(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const {
      name,
      country,
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

    if (!name || !country) {
      return NextResponse.json({ error: 'Name and country are required' }, { status: 400 })
    }

    const slug = generateSlug(name)

    const { data, error } = await supabase
      .from('scholarships')
      .insert({
        name,
        slug,
        country,
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
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
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
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data })
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
