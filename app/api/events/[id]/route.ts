import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Fetch single event by id
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
        created_at,
        countries(id, name)
      `
      )
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching event:', error)
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Transform the data to include country_name
    const transformedData = {
      ...data,
      country_name: data.countries?.name || 'Unknown',
      countries: undefined,
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
