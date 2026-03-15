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
    const { country_name, country_code, country_flag, academic_requirements, english_language_requirements, other_requirements, document_requirements, additional_notes } = body

    if (!country_name) return NextResponse.json({ error: 'country_name is required' }, { status: 400 })

    // Find or create the country in the countries table
    let countryId: number

    // First try to find existing country by name (case-insensitive)
    const { data: existingCountry } = await supabase
      .from('countries')
      .select('id')
      .ilike('name', country_name)
      .single()

    if (existingCountry) {
      countryId = existingCountry.id
    } else {
      // Create new country entry
      const { data: newCountry, error: createError } = await supabase
        .from('countries')
        .insert({
          name: country_name,
          code: country_code || country_name.slice(0, 2).toUpperCase(),
          flag_emoji: country_flag || null,
        })
        .select('id')
        .single()

      if (createError) return NextResponse.json({ error: `Failed to create country: ${createError.message}` }, { status: 500 })
      countryId = newCountry.id
    }

    // Block duplicate: check if this course already has a requirement for this country
    const { data: duplicate } = await supabase
      .from('course_country_requirements')
      .select('id')
      .eq('course_id', parseInt(id))
      .eq('country_id', countryId)
      .single()

    if (duplicate) {
      return NextResponse.json(
        { error: `A requirement for ${country_name} already exists for this course.` },
        { status: 409 }
      )
    }

    const { data, error } = await supabase
      .from('course_country_requirements')
      .insert({
        course_id: parseInt(id),
        country_id: countryId,
        academic_requirements: academic_requirements || null,
        english_language_requirements: english_language_requirements || null,
        other_requirements: other_requirements || null,
        document_requirements: document_requirements || null,
        additional_notes: additional_notes || null,
      })
      .select('*, countries(id, name, flag_emoji)')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
