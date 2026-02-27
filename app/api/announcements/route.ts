import { NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase'

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function enrichWithUniversitySlug(data: Record<string, unknown>) {
  if (data?.universities && typeof data.universities === 'object') {
    const uni = data.universities as { id: number; name: string }
    return { ...data, universities: { ...uni, slug: nameToSlug(uni.name) } }
  }
  return data
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const universityId = searchParams.get('university_id')
  const announcementType = searchParams.get('announcement_type')
  const slug = searchParams.get('slug')
  const limit = parseInt(searchParams.get('limit') || '20')
  const showBannerOnly = searchParams.get('banner_only') === 'true'

  // If a slug is provided, fetch that single announcement
  if (slug) {
    const { data, error } = await supabase
      .from('announcements')
      .select('*, universities(id, name), courses(id, name), countries(id, name)')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }
    return NextResponse.json({ data: enrichWithUniversitySlug(data as Record<string, unknown>) })
  }

  let query = supabase
    .from('announcements')
    .select('*, universities(id, name), courses(id, name), countries(id, name)')
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

  return NextResponse.json({ data: filtered.map((a: Record<string, unknown>) => enrichWithUniversitySlug(a)) })
}
