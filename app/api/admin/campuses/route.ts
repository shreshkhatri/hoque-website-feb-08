import { NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { university_id, name, location, description, is_main_campus } = body

    if (!university_id || !name) {
      return NextResponse.json(
        { error: 'University ID and campus name are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('university_campuses')
      .insert({
        university_id,
        name,
        location: location || null,
        description: description || null,
        is_main_campus: is_main_campus || false,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ campus: data })
  } catch (error) {
    console.error('Error creating campus:', error)
    return NextResponse.json({ error: 'Failed to create campus' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Campus ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('university_campuses')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting campus:', error)
    return NextResponse.json({ error: 'Failed to delete campus' }, { status: 500 })
  }
}
