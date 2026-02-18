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

    const { data, error } = await supabase
      .from('universities')
      .update(sanitizedBody)
      .eq('id', parseInt(id))
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message || 'Failed to update university' }, { status: 500 })
    }

    return NextResponse.json({ university: data })
  } catch (error: any) {
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
