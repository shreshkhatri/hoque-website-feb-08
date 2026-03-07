import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const displayAtHomepage = searchParams.get('display_at_homepage')
  const sortBy = searchParams.get('sort_by') || 'display_order'
  const sortOrder = searchParams.get('sort_order') || 'asc'
  const offset = (page - 1) * limit

  let query = supabase
    .from('student_testimonials')
    .select('*', { count: 'exact' })

  if (search) {
    query = query.or(`name.ilike.%${search}%,university.ilike.%${search}%,country.ilike.%${search}%`)
  }
  
  if (displayAtHomepage === 'true') {
    query = query.eq('display_at_homepage', true)
  } else if (displayAtHomepage === 'false') {
    query = query.eq('display_at_homepage', false)
  }

  const ascending = sortOrder === 'asc'
  query = query.order(sortBy, { ascending })

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
      university,
      program,
      photo_url,
      university_logo_url,
      rating,
      review,
      display_at_homepage,
      display_order,
      is_active,
    } = body

    if (!name || !country || !university || !program || !review) {
      return NextResponse.json({ error: 'Name, country, university, program, and review are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('student_testimonials')
      .insert({
        name,
        country,
        university,
        program,
        photo_url: photo_url || null,
        university_logo_url: university_logo_url || null,
        rating: rating || 5,
        review,
        display_at_homepage: display_at_homepage !== undefined ? display_at_homepage : false,
        display_order: display_order || 0,
        is_active: is_active !== undefined ? is_active : true,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
