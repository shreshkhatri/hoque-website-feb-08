import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const { data, error } = await supabase
      .from('university_campuses')
      .select('*')
      .eq('university_id', id)
      .order('is_main_campus', { ascending: false })
      .order('name')

    if (error) throw error

    return NextResponse.json({ campuses: data || [] })
  } catch (error: any) {
    console.error('[v0] Error fetching campuses:', error?.message)
    return NextResponse.json({ campuses: [] })
  }
}
