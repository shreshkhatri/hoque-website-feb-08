import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

// GET all country requirements for a course
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const { data, error } = await supabase
    .from('course_country_requirements')
    .select('*, countries(id, name, flag_emoji)')
    .eq('course_id', id)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

// POST create a new country requirement override
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  try {
    const body = await request.json()
    const { country_id, academic_requirements, english_language_requirements, other_requirements, document_requirements, additional_notes } = body

    if (!country_id) return NextResponse.json({ error: 'country_id is required' }, { status: 400 })

    const { data, error } = await supabase
      .from('course_country_requirements')
      .upsert({
        course_id: parseInt(id),
        country_id: parseInt(country_id),
        academic_requirements: academic_requirements || null,
        english_language_requirements: english_language_requirements || null,
        other_requirements: other_requirements || null,
        document_requirements: document_requirements || null,
        additional_notes: additional_notes || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'course_id,country_id' })
      .select('*, countries(id, name, flag_emoji)')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
