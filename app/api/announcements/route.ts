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

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Filter out expired announcements in JS to avoid Supabase .or() syntax issues
  const now = new Date()
  const filtered = (data || []).filter((a: { expires_at: string | null }) => {
    if (!a.expires_at) return true
    return new Date(a.expires_at) > now
  })

  return NextResponse.json({ data: filtered })
}
