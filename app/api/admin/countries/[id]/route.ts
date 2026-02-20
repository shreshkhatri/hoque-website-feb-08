import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return NextResponse.json({ country: data })
  } catch (error) {
    console.error('Error fetching country:', error)
    return NextResponse.json({ error: 'Failed to fetch country' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    if (!body.name) {
      return NextResponse.json({ error: 'Country name is required' }, { status: 400 })
    }

    // Build update data only from fields present in the request body
    const updateData: Record<string, any> = { name: body.name }

    // Only set fields that were explicitly included in the request
    const fieldMap: Record<string, (val: any) => any> = {
      code: (v) => v || body.name.substring(0, 2).toUpperCase(),
      flag_emoji: (v) => v || null,
      flag_image_url: (v) => v || null,
      description: (v) => v || null,
      about: (v) => v || null,
      study_life: (v) => v || null,
      opportunities: (v) => v || null,
      cover_image_url: (v) => v || null,
      landmark_image_url: (v) => v || null,
      student_permit_requirements: (v) => v || null,
      visa_processing_time: (v) => v || null,
      student_visa_eligibility: (v) => v || null,
      student_visa_validity: (v) => v || null,
      post_study_work_visa: (v) => v || null,
      post_study_visa_eligibility: (v) => v || null,
      post_study_visa_validity: (v) => v || null,
      work_study_hours: (v) => v || null,
      max_work_hours: (v) => v ?? 20,
      min_wage: (v) => v || null,
      currency: (v) => v || 'USD',
      cost_of_living_monthly: (v) => v || null,
      international_students_count: (v) => v || null,
      happiness_ranking: (v) => v ?? null,
      employment_rate: (v) => v ?? null,
      cost_accommodation_min: (v) => v ?? null,
      cost_accommodation_max: (v) => v ?? null,
      cost_food_min: (v) => v ?? null,
      cost_food_max: (v) => v ?? null,
      cost_transport_min: (v) => v ?? null,
      cost_transport_max: (v) => v ?? null,
      cost_utilities_min: (v) => v ?? null,
      cost_utilities_max: (v) => v ?? null,
      cost_health_insurance_min: (v) => v ?? null,
      cost_health_insurance_max: (v) => v ?? null,
      faqs: (v) => v ?? [],
    }

    for (const [key, transform] of Object.entries(fieldMap)) {
      if (key in body) {
        updateData[key] = transform(body[key])
      }
    }

    const { data, error } = await supabase
      .from('countries')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ country: data })
  } catch (error) {
    console.error('Error updating country:', error)
    return NextResponse.json({ error: 'Failed to update country' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabase
      .from('countries')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting country:', error)
    return NextResponse.json({ error: 'Failed to delete country' }, { status: 500 })
  }
}
