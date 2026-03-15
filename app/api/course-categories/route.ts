import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all course categories (public, for filter dropdown)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('course_categories')
      .select('id, name')
      .order('name', { ascending: true })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching course categories:', error)
    return NextResponse.json({ error: 'Failed to fetch course categories' }, { status: 500 })
  }
}
