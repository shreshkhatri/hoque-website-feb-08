import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { name, code } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Country name is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('countries')
      .insert({ name, code: code || name.substring(0, 2).toUpperCase() })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ country: data })
  } catch (error) {
    console.error('Error creating country:', error)
    return NextResponse.json({ error: 'Failed to create country' }, { status: 500 })
  }
}
