import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Map levels to their inferred category when level_category is null
function inferCategory(level: string): string {
  if (['Bachelor', 'Foundation', 'Diploma', 'HND', 'HNC', 'Certificate'].includes(level)) return 'Undergraduate'
  if (['Master', 'PhD', 'MPHIL', 'MBA', 'PGDIP', 'PGCE'].includes(level)) return 'Postgraduate'
  if (['PhD', 'MPHIL'].includes(level)) return 'Research'
  return 'Other'
}

// GET distinct level categories and their levels from the courses table
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('level, level_category')
      .not('level', 'is', null)

    if (error) throw error

    // Build category -> levels map using actual DB values + inference for nulls
    const categoryMap = new Map<string, Set<string>>()

    for (const row of data || []) {
      const category = row.level_category || inferCategory(row.level)
      if (!categoryMap.has(category)) categoryMap.set(category, new Set())
      categoryMap.get(category)!.add(row.level)
    }

    // Sort categories and build final map
    const sortedCategories = Array.from(categoryMap.keys()).sort()
    const categories = ['All', ...sortedCategories]

    const allLevels = new Set<string>()
    for (const levels of categoryMap.values()) levels.forEach((l) => allLevels.add(l))

    const categoryLevelsMap: Record<string, string[]> = {
      All: ['All', ...Array.from(allLevels).sort()],
    }
    for (const [cat, levels] of categoryMap.entries()) {
      categoryLevelsMap[cat] = ['All', ...Array.from(levels).sort()]
    }

    return NextResponse.json({ categories, categoryLevelsMap })
  } catch (error) {
    console.error('Error fetching course levels:', error)
    return NextResponse.json({ error: 'Failed to fetch course levels' }, { status: 500 })
  }
}
