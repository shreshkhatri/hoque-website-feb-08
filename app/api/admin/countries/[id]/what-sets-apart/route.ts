import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('country_what_sets_apart')
      .select('*')
      .eq('country_id', id)
      .order('display_order', { ascending: true })

    if (error) throw error
    return NextResponse.json({ items: data || [] })
  } catch (error) {
    console.error('Error fetching what sets apart:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    if (!body.title || !body.description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('country_what_sets_apart')
      .insert({
        country_id: parseInt(id),
        title: body.title,
        description: body.description,
        icon: body.icon || 'award',
        display_order: body.display_order || 0,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ item: data })
  } catch (error) {
    console.error('Error creating what sets apart:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await params
    const body = await request.json()

    if (!Array.isArray(body.items)) {
      return NextResponse.json({ error: 'Items array is required' }, { status: 400 })
    }

    // Delete existing and re-insert for bulk update
    const countryId = parseInt((await params).id)

    const { error: deleteError } = await supabase
      .from('country_what_sets_apart')
      .delete()
      .eq('country_id', countryId)

    if (deleteError) throw deleteError

    if (body.items.length > 0) {
      const insertData = body.items.map((item: any, index: number) => ({
        country_id: countryId,
        title: item.title,
        description: item.description,
        icon: item.icon || 'award',
        display_order: index + 1,
      }))

      const { error: insertError } = await supabase
        .from('country_what_sets_apart')
        .insert(insertData)

      if (insertError) throw insertError
    }

    const { data } = await supabase
      .from('country_what_sets_apart')
      .select('*')
      .eq('country_id', countryId)
      .order('display_order', { ascending: true })

    return NextResponse.json({ items: data || [] })
  } catch (error) {
    console.error('Error updating what sets apart:', error)
    return NextResponse.json({ error: 'Failed to update items' }, { status: 500 })
  }
}
