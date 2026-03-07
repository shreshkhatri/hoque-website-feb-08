import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
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
    .select(
      `*,
      universities:university_id(id, name, logo_url),
      countries:country_id(id, name)`,
      { count: 'exact' }
    )

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,universities.name.ilike.%${search}%,countries.name.ilike.%${search}%`
    )
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
      country_id,
      university_id,
      program,
      photo_url,
      rating,
      review,
      display_at_homepage,
      display_order,
      is_active,
    } = body

    if (!name || !country_id || !university_id || !review) {
      return NextResponse.json(
        { error: 'Name, country, university, and review are required' },
        { status: 400 }
      )
    }

    // Get max display_order if not provided
    let finalOrder = display_order || 0
    if (!display_order) {
      const { data: maxOrder } = await supabase
        .from('student_testimonials')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
      finalOrder = ((maxOrder?.[0]?.display_order as number) || 0) + 1
    }

    const { data, error } = await supabase
      .from('student_testimonials')
      .insert({
        name,
        country_id,
        university_id,
        program: program || '',
        photo_url: photo_url || null,
        rating: rating || 5,
        review,
        display_at_homepage: display_at_homepage !== undefined ? display_at_homepage : false,
        display_order: finalOrder,
        is_active: is_active !== undefined ? is_active : true,
      })
      .select(
        `*,
        universities:university_id(id, name, logo_url),
        countries:country_id(id, name)`
      )
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Revalidate homepage to show new testimonials
    revalidatePath('/')

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
