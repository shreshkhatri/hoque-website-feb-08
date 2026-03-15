import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('universities')
      .select('id, name, logo_url')
      .eq('partnership_status', 'active')
      .eq('country_id', 1) // UK only
      .order('name')

    if (error) throw error

    return NextResponse.json({ universities: data || [] })
  } catch (error: any) {
    console.error('[API] Error fetching partner universities:', error)
    return NextResponse.json({ error: 'Failed to fetch partner universities', universities: [] }, { status: 500 })
  }
}
