import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: idStr } = await params
  const id = parseInt(idStr)
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const { data, error } = await supabase
    .from('announcements')
    .select('*, universities(id, name), courses(id, name), countries(id, name)')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ data })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: idStr2 } = await params
  const id = parseInt(idStr2)
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  try {
    const body = await request.json()
    const updates: Record<string, any> = {}

    const allowedFields = [
      'title',
      'description',
      'announcement_type',
      'priority',
      'university_id',
      'course_id',
      'country_id',
      'scholarship_amount',
      'scholarship_type',
      'eligibility_criteria',
      'application_link',
      'start_date',
      'end_date',
      'published_at',
      'expires_at',
      'is_active',
      'show_as_banner',
      'external_link',
      'cover_image_url',
    ]

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        updates[field] = body[field]
      }
    })

    if (body.title) {
      updates.slug = generateSlug(body.title)
    }

    updates.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('announcements')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: idStr3 } = await params
  const id = parseInt(idStr3)
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

  const { error } = await supabase.from('announcements').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
