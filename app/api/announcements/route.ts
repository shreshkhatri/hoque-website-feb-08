import { NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const universityId = searchParams.get('university_id')
  const announcementType = searchParams.get('announcement_type')
  const limit = parseInt(searchParams.get('limit') || '20')
  const showBannerOnly = searchParams.get('banner_only') === 'true'

  let query = supabase
    .from('announcements')
    .select('*, universities(name, slug), courses(name, slug), countries(name)')
    .eq('is_active', true)

  // Only show announcements that haven't expired or have no expiry date
  const now = new Date().toISOString()
  query = query.or(`expires_at.is.null,expires_at.gt.${now}`)

  if (universityId) {
    query = query.eq('university_id', parseInt(universityId))
  }
  if (announcementType) {
    query = query.eq('announcement_type', announcementType)
  }
  if (showBannerOnly) {
    query = query.eq('show_as_banner', true)
  }

  query = query.order('published_at', { ascending: false }).limit(limit)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data: data || [] })
}
