import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const limit = parseInt(searchParams.get('limit') || '20')
  const page = parseInt(searchParams.get('page') || '1')
  const offset = (page - 1) * limit

  let query = supabase
    .from('countries')
    .select('id, name, code, flag_emoji, currency', { count: 'exact' })

  if (search) {
    query = query.or(`name.ilike.%${search}%,code.ilike.%${search}%`)
  }

  const { data, count, error } = await query
    .order('name', { ascending: true })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data, total: count || 0, page, limit })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name) {
      return NextResponse.json({ error: 'Country name is required' }, { status: 400 })
    }

    const insertData: Record<string, any> = {
      name: body.name,
      code: body.code || body.name.substring(0, 2).toUpperCase(),
      flag_emoji: body.flag_emoji || null,
      description: body.description || null,
      about: body.about || null,
      study_life: body.study_life || null,
      opportunities: body.opportunities || null,
      cover_image_url: body.cover_image_url || null,
      student_permit_requirements: body.student_permit_requirements || null,
      visa_processing_time: body.visa_processing_time || null,
      student_visa_eligibility: body.student_visa_eligibility || null,
      student_visa_validity: body.student_visa_validity || null,
      post_study_work_visa: body.post_study_work_visa || null,
      post_study_visa_eligibility: body.post_study_visa_eligibility || null,
      post_study_visa_validity: body.post_study_visa_validity || null,
      work_study_hours: body.work_study_hours || null,
      max_work_hours: body.max_work_hours ?? 20,
      min_wage: body.min_wage || null,
      currency: body.currency || 'USD',
      cost_of_living_monthly: body.cost_of_living_monthly || null,
      international_students_count: body.international_students_count || null,
      happiness_ranking: body.happiness_ranking ?? null,
      employment_rate: body.employment_rate ?? null,
      cost_accommodation_min: body.cost_accommodation_min ?? null,
      cost_accommodation_max: body.cost_accommodation_max ?? null,
      cost_food_min: body.cost_food_min ?? null,
      cost_food_max: body.cost_food_max ?? null,
      cost_transport_min: body.cost_transport_min ?? null,
      cost_transport_max: body.cost_transport_max ?? null,
      cost_utilities_min: body.cost_utilities_min ?? null,
      cost_utilities_max: body.cost_utilities_max ?? null,
      cost_health_insurance_min: body.cost_health_insurance_min ?? null,
      cost_health_insurance_max: body.cost_health_insurance_max ?? null,
      faqs: body.faqs ?? [],
    }

    const { data, error } = await supabase
      .from('countries')
      .insert(insertData)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ country: data })
  } catch (error) {
    console.error('Error creating country:', error)
    return NextResponse.json({ error: 'Failed to create country' }, { status: 500 })
  }
}
