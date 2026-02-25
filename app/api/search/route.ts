import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// List of universities to exclude
const EXCLUDED_UNIVERSITIES = [
  'Universities Ulster',
  'Southampton Solent University',
  'Oxford Book University',
  'Swansea University',
]

/**
 * Splits a search query into meaningful tokens.
 * Filters out very short words (1 char) but keeps 2+ char tokens.
 * E.g. "MSc computer science london south bank" -> ["msc", "computer", "science", "london", "south", "bank"]
 */
function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2)
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all'

    if (!query || query.length < 2) {
      return NextResponse.json({
        universities: [],
        courses: [],
      })
    }

    const tokens = tokenize(query)
    if (tokens.length === 0) {
      return NextResponse.json({ universities: [], courses: [] })
    }

    // Also keep the full query for fallback exact-phrase matching
    const fullSearchTerm = `%${query}%`

    let universities: any[] = []
    let courses: any[] = []

    // Get excluded university IDs
    const { data: excludedUnis } = await supabase
      .from('universities')
      .select('id')
      .in('name', EXCLUDED_UNIVERSITIES)
    const excludedUniIds = excludedUnis?.map((u) => u.id) || []
    const excludeFilter = excludedUniIds.length > 0
      ? `(${excludedUniIds.join(',')})`
      : '(0)'

    // Search universities
    if (type === 'all' || type === 'university') {
      // Token-based: every token must match at least one of name/city/country/description
      // Build OR conditions per token, then intersect with AND by filtering client-side
      // Supabase doesn't support AND of OR groups natively, so we fetch a broader set then filter
      const tokenFilters = tokens.map((t) => `name.ilike.%${t}%,city.ilike.%${t}%,country.ilike.%${t}%,description.ilike.%${t}%`)

      // Use the first token to get a broad set
      const { data: uniData, error: uniError } = await supabase
        .from('universities')
        .select('*, countries!inner(id, name)')
        .or(tokenFilters[0])
        .not('name', 'in', excludeFilter)
        .limit(50)

      if (uniError) throw uniError

      // Now filter client-side: every token must match at least one field
      universities = (uniData || []).filter((uni) => {
        const searchable = `${uni.name || ''} ${uni.city || ''} ${uni.country || ''} ${uni.description || ''}`.toLowerCase()
        return tokens.every((t) => searchable.includes(t))
      }).slice(0, 10)
    }

    // Search courses
    if (type === 'all' || type === 'course') {
      // Step 1: Find universities whose name matches ANY token
      const uniOrConditions = tokens.map((t) => `name.ilike.%${t}%`).join(',')
      const { data: matchedUnis } = await supabase
        .from('universities')
        .select('id, name')
        .or(uniOrConditions)
        .not('id', 'in', excludeFilter)

      const matchedUniMap = new Map<number, string>()
      for (const u of matchedUnis || []) {
        matchedUniMap.set(u.id, u.name.toLowerCase())
      }
      const matchedUniIds = Array.from(matchedUniMap.keys())

      // Step 2: Fetch courses matching any token in course fields OR belonging to matched universities
      // Build a broad OR filter using all tokens across course fields
      const courseOrParts: string[] = []
      for (const t of tokens) {
        courseOrParts.push(`name.ilike.%${t}%`)
        courseOrParts.push(`code.ilike.%${t}%`)
        courseOrParts.push(`level.ilike.%${t}%`)
      }
      // Also include courses that belong to matched universities
      if (matchedUniIds.length > 0) {
        courseOrParts.push(`university_id.in.(${matchedUniIds.join(',')})`)
      }

      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select(`
          id,
          name,
          code,
          level,
          description,
          university_id,
          campus_id,
          universities!inner(id, name, city),
          university_campuses(id, name, location)
        `)
        .or(courseOrParts.join(','))
        .not('university_id', 'in', excludeFilter)
        .limit(100)

      if (courseError) throw courseError

      // Step 3: Client-side filter -- every token must match at least one of:
      // course name, code, level, description, OR the university name
      courses = (courseData || []).filter((course) => {
        const courseText = `${course.name || ''} ${course.code || ''} ${course.level || ''} ${course.description || ''}`.toLowerCase()
        const uniName = (course.universities as any)?.name?.toLowerCase() || ''
        const combined = `${courseText} ${uniName}`
        return tokens.every((t) => combined.includes(t))
      }).slice(0, 20)
    }

    return NextResponse.json({
      universities,
      courses,
      query,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 },
    )
  }
}
