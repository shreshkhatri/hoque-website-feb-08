import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function GET(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const universityId = searchParams.get('university_id')
  const announcementType = searchParams.get('announcement_type')
  const sortBy = searchParams.get('sort_by') || 'published_at'
  const sortOrder = searchParams.get('sort_order') || 'desc'
  const offset = (page - 1) * limit

  let query = supabase
    .from('announcements')
    .select('*, universities(name), courses(name), countries(name)', { count: 'exact' })

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }
  if (universityId) {
    query = query.eq('university_id', parseInt(universityId))
  }
  if (announcementType) {
    query = query.eq('announcement_type', announcementType)
  }

  const ascending = sortOrder === 'asc'
  if (sortBy === 'published_at' || sortBy === 'end_date' || sortBy === 'title') {
    query = query.order(sortBy, { ascending })
  } else {
    query = query.order('published_at', { ascending: false })
  }

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
      title,
      description,
      announcement_type,
      priority,
      university_id,
      course_id,
      country_id,
      scholarship_amount,
      scholarship_type,
      eligibility_criteria,
      application_link,
      start_date,
      end_date,
      published_at,
      expires_at,
      is_active,
      show_as_banner,
      external_link,
    } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const slug = generateSlug(title)

    const { data, error } = await supabase
      .from('announcements')
      .insert({
        title,
        description,
        announcement_type: announcement_type || 'general',
        priority: priority || 'medium',
        university_id: university_id || null,
        course_id: course_id || null,
        country_id: country_id || null,
        scholarship_amount: scholarship_amount || null,
        scholarship_type: scholarship_type || null,
        eligibility_criteria: eligibility_criteria || null,
        application_link: application_link || null,
        start_date: start_date || null,
        end_date: end_date || null,
        published_at: published_at || new Date().toISOString(),
        expires_at: expires_at || null,
        is_active: is_active !== undefined ? is_active : true,
        show_as_banner: show_as_banner || false,
        external_link: external_link || null,
        slug,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
