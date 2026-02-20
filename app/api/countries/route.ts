import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const full = searchParams.get('full') === 'true'

    const { data, error } = await supabase
      .from('countries')
      .select(full ? '*' : 'id, name, code, flag_emoji, flag_image_url')
      .order('name', { ascending: true })

    if (error) throw error

    return NextResponse.json({ countries: data })
  } catch (error) {
    console.error('Error fetching countries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch countries' },
      { status: 500 }
    )
  }
}
