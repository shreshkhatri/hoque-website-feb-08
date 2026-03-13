import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET single course level
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin
      .from('course_levels')
      .select(`
        *,
        category:level_categories(id, name, badge_color)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) {
      return NextResponse.json({ error: 'Course level not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching course level:', error)
    return NextResponse.json({ error: 'Failed to fetch course level' }, { status: 500 })
  }
}

// PUT update course level
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, category_id, display_order, badge_color, description } = body

    const { data, error } = await supabaseAdmin
      .from('course_levels')
      .update({
        name,
        category_id,
        display_order,
        badge_color,
        description,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
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

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating course level:', error)
    return NextResponse.json({ error: 'Failed to update course level' }, { status: 500 })
  }
}

// DELETE course level
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if any courses use this level
    const { data: courses } = await supabaseAdmin
      .from('courses')
      .select('id')
      .eq('level', (await supabaseAdmin.from('course_levels').select('name').eq('id', id).single()).data?.name)
      .limit(1)

    if (courses && courses.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete level that is in use by courses' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('course_levels')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting course level:', error)
    return NextResponse.json({ error: 'Failed to delete course level' }, { status: 500 })
  }
}
