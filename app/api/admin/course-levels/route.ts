import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET all course levels with their categories
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('course_levels')
      .select(`
        *,
        category:level_categories(id, name, badge_color)
      `)
      .order('display_order', { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching course levels:', error)
    return NextResponse.json({ error: 'Failed to fetch course levels' }, { status: 500 })
  }
}

// POST create new course level
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category_id, display_order, badge_color, description } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('course_levels')
      .insert({
        name,
        category_id: category_id || null,
        display_order: display_order || 0,
        badge_color: badge_color || 'badge-slate',
        description: description || null,
      })
      .select(`
        *,
        category:level_categories(id, name, badge_color)
      `)
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A course level with this name already exists' }, { status: 400 })
      }
      throw error
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating course level:', error)
    return NextResponse.json({ error: 'Failed to create course level' }, { status: 500 })
  }
}
