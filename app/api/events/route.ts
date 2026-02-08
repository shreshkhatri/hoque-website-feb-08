import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch events sorted by date in descending order with country information
    const { data, error } = await supabase
      .from('events')
      .select(
        `
        id,
        title,
        description,
        date,
        time,
        location,
        country_id,
        event_type,
        image_url,
        capacity,
        registered_count,
        status,
        countries(id, name)
      `
      )
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching events:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform the data to include country_name
    const transformedData = data.map((event: any) => ({
      ...event,
      country_name: event.countries?.name || 'Unknown',
      countries: undefined,
    }))

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
