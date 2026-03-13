import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET single level category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin
      .from('level_categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching level category:', error)
    return NextResponse.json({ error: 'Failed to fetch level category' }, { status: 500 })
  }
}

// PUT update level category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, display_order, badge_color, description } = body

    const { data, error } = await supabaseAdmin
      .from('level_categories')
      .update({
        name,
        display_order,
        badge_color,
        description,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A category with this name already exists' }, { status: 400 })
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating level category:', error)
    return NextResponse.json({ error: 'Failed to update level category' }, { status: 500 })
  }
}

// DELETE level category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Check if any course_levels reference this category
    const { data: levels } = await supabaseAdmin
      .from('course_levels')
      .select('id')
      .eq('category_id', id)
      .limit(1)

    if (levels && levels.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category that has course levels assigned to it' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('level_categories')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting level category:', error)
    return NextResponse.json({ error: 'Failed to delete level category' }, { status: 500 })
  }
}
