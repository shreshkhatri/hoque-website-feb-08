import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase'
import { getTokenFromRequest, verifyToken } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  const token = getTokenFromRequest(request)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const session = await verifyToken(token)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const countOnly = searchParams.get('countOnly')

    // Count only mode - for sidebar badge
    if (countOnly === 'unviewed') {
      const { count, error } = await supabase
        .from('student_applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'unviewed')

      if (error) {
        console.error('Error counting applications:', error)
        return NextResponse.json({ error: 'Failed to count' }, { status: 500 })
      }
      return NextResponse.json({ count: count || 0 })
    }

    let query = supabase
      .from('student_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(
        `full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,preferred_course_name.ilike.%${search}%,university_name.ilike.%${search}%`
      )
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching applications:', error)
      return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
