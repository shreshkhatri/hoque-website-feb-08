import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

// PUT update a specific country requirement
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; requirementId: string }> }
) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { requirementId } = await params

  try {
    const body = await request.json()
    const { academic_requirements, english_language_requirements, other_requirements, document_requirements, additional_notes, is_active } = body

    const { data, error } = await supabase
      .from('course_country_requirements')
      .update({
        academic_requirements: academic_requirements ?? null,
        english_language_requirements: english_language_requirements ?? null,
        other_requirements: other_requirements ?? null,
        document_requirements: document_requirements ?? null,
        additional_notes: additional_notes ?? null,
        is_active: is_active ?? true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', requirementId)
      .select('*, countries(id, name, flag_emoji)')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

// DELETE remove a country requirement
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; requirementId: string }> }
) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { requirementId } = await params

  const { error } = await supabase
    .from('course_country_requirements')
    .delete()
    .eq('id', requirementId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
