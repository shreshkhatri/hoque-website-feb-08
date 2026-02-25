import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { full_name, email, phone, country } = body
    if (!full_name || !email || !phone || !country) {
      return NextResponse.json(
        { error: 'Full name, email, phone, and country are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('student_applications')
      .insert({
        full_name: body.full_name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        country: body.country.trim(),
        highest_qualification: body.highest_qualification || null,
        applying_for: body.applying_for || null,
        subject_area: body.subject_area || null,
        preferred_course_name: body.preferred_course_name || null,
        preferred_intake: body.preferred_intake || null,
        university_name: body.university_name || null,
        student_type: body.student_type || null,
        additional_info: body.additional_info || null,
        doc_10th_url: body.doc_10th_url || null,
        doc_12th_url: body.doc_12th_url || null,
        doc_degree_url: body.doc_degree_url || null,
        doc_masters_url: body.doc_masters_url || null,
        doc_transcript_url: body.doc_transcript_url || null,
        doc_marksheet_url: body.doc_marksheet_url || null,
        doc_passport_url: body.doc_passport_url || null,
        doc_cv_url: body.doc_cv_url || null,
        status: 'unviewed',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to submit application.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, application: data }, { status: 201 })
  } catch (error: any) {
    console.error('Error submitting application:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
