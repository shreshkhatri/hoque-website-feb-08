import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

const ALLOWED_FIELDS = [
  'name', 'code', 'university_id', 'level', 'duration_years',
  'description', 'tuition_fees_international', 'intake_months', 'entry_requirements',
  'country_id', 'course_overview', 'academic_requirements', 'english_language_requirements',
  'other_requirements', 'document_requirements', 'scholarships', 'key_features',
  'field_of_study', 'campus_id',
]

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
      .from('courses')
      .select('*, universities(id, name), countries(id, name)')
      .eq('id', id)
      .single()

    if (error) throw error

    return NextResponse.json({ course: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 })
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

    const sanitizedBody: Record<string, any> = {}
    for (const key of ALLOWED_FIELDS) {
      if (key in body) {
        sanitizedBody[key] = body[key]
      }
    }

    // Check course code uniqueness if code changed
    if (sanitizedBody.code && sanitizedBody.code.trim()) {
      const { data: existing } = await supabase
        .from('courses')
        .select('id')
        .eq('code', sanitizedBody.code.trim())
        .neq('id', parseInt(id))
        .limit(1)

      if (existing && existing.length > 0) {
        return NextResponse.json({ error: `A course with code "${sanitizedBody.code.trim()}" already exists. Please use a unique course code.` }, { status: 409 })
      }
    }

    const { data, error } = await supabase
      .from('courses')
      .update(sanitizedBody)
      .eq('id', parseInt(id))
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ course: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to update course' }, { status: 500 })
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
      .from('courses')
      .delete()
      .eq('id', parseInt(id))

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
