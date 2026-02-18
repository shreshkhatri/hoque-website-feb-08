import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const { data, error } = await supabase
      .from('universities')
      .select('*, countries(name)')
      .eq('id', id)
      .single()

    if (error) throw error

    return NextResponse.json({ university: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch university' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await request.json()
    console.log('[v0] PUT /api/admin/universities/' + id, 'payload keys:', Object.keys(body))

    // Only allow known university table columns
    const allowedFields = [
      'name', 'city', 'country_id', 'campus_type', 'description', 'why_study_here',
      'website_url', 'rank_world', 'founded_year', 'student_population',
      'international_students_percentage', 'acceptance_rate', 'logo_url', 'cover_image_url',
      'highlights', 'required_documents', 'faqs', 'employment_rate', 'nationalities_count',
      'partner_universities_count', 'intakes', 'campus_facilities', 'express_offer_available',
      'slug'
    ]
    
    const sanitizedBody: Record<string, any> = {}
    for (const key of allowedFields) {
      if (key in body) {
        sanitizedBody[key] = body[key]
      }
    }

    console.log('[v0] Sanitized payload keys:', Object.keys(sanitizedBody), 'values:', JSON.stringify(sanitizedBody).slice(0, 500))

    const { data, error } = await supabase
      .from('universities')
      .update(sanitizedBody)
      .eq('id', parseInt(id))
      .select()
      .single()

    if (error) {
      console.error('[v0] Supabase update error:', error.message, error.details, error.hint, error.code)
      return NextResponse.json({ error: error.message || 'Failed to update university' }, { status: 500 })
    }

    console.log('[v0] University updated successfully, id:', data?.id)
    return NextResponse.json({ university: data })
  } catch (error: any) {
    console.error('[v0] PUT catch error:', error?.message || error)
    return NextResponse.json({ error: error?.message || 'Failed to update university' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const { error } = await supabase
      .from('universities')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete university' }, { status: 500 })
  }
}
