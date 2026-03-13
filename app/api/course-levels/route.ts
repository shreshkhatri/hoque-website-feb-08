import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all course levels (public, for dropdowns)
export async function GET() {
  try {
    const { data: levels, error: levelsError } = await supabase
      .from('course_levels')
      .select(`
        id,
        name,
        category_id,
        display_order,
        badge_color,
        category:level_categories(id, name, badge_color)
      `)
      .order('display_order', { ascending: true })

    if (levelsError) throw levelsError

    const { data: categories, error: catError } = await supabase
      .from('level_categories')
      .select('id, name, display_order, badge_color')
      .order('display_order', { ascending: true })

    if (catError) throw catError

    return NextResponse.json({ levels, categories })
  } catch (error) {
    console.error('Error fetching course levels:', error)
    return NextResponse.json({ error: 'Failed to fetch course levels' }, { status: 500 })
  }
}
