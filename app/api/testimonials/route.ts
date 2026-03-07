import { NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const homepageOnly = searchParams.get('homepage') === 'true'
  const limit = parseInt(searchParams.get('limit') || '20')

  let query = supabase
    .from('student_testimonials')
    .select(
      `*,
      universities:university_id(id, name, logo_url),
      countries:country_id(id, name)`
    )
    .eq('is_active', true)

  if (homepageOnly) {
    query = query.eq('display_at_homepage', true)
  }

  query = query.order('display_order', { ascending: true }).limit(limit)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data })
}
