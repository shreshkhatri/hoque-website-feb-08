import { NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { vacancy_id, full_name, email, phone, current_location, cover_letter, linkedin_url, how_did_you_hear } = body

    // Validate required fields
    if (!vacancy_id || !full_name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: vacancy_id, full_name, email, and phone are required.' },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 },
      )
    }

    // Check that the vacancy exists and is active
    const { data: vacancy, error: vacancyError } = await supabase
      .from('vacancies')
      .select('id, title, is_active, application_deadline')
      .eq('id', vacancy_id)
      .single()

    if (vacancyError || !vacancy) {
      return NextResponse.json(
        { error: 'Vacancy not found.' },
        { status: 404 },
      )
    }

    if (!vacancy.is_active) {
      return NextResponse.json(
        { error: 'This vacancy is no longer accepting applications.' },
        { status: 400 },
      )
    }

    // Check deadline
    const deadline = new Date(vacancy.application_deadline)
    if (deadline < new Date()) {
      return NextResponse.json(
        { error: 'The application deadline for this position has passed.' },
        { status: 400 },
      )
    }

    // Insert the application
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        vacancy_id,
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        current_location: current_location?.trim() || null,
        cover_letter: cover_letter?.trim() || null,
        linkedin_url: linkedin_url?.trim() || null,
        how_did_you_hear: how_did_you_hear?.trim() || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error inserting application:', error)
      return NextResponse.json(
        { error: 'Failed to submit application. Please try again.' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: 'Application submitted successfully!', data },
      { status: 201 },
    )
  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 },
    )
  }
}
