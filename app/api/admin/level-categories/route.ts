import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET all level categories
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('level_categories')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching level categories:', error)
    return NextResponse.json({ error: 'Failed to fetch level categories' }, { status: 500 })
  }
}

// POST create new level category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, display_order, badge_color, description } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('level_categories')
      .insert({
        name,
        display_order: display_order || 0,
        badge_color: badge_color || 'badge-slate',
        description: description || null,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A category with this name already exists' }, { status: 400 })
      }
      throw error
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating level category:', error)
    return NextResponse.json({ error: 'Failed to create level category' }, { status: 500 })
  }
}
