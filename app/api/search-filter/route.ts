import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// Hardcoded events data
const HARDCODED_EVENTS = [
  { id: 1, name: 'Universities Application Week', location: 'Kochi, India', country: 'India' },
  { id: 2, name: 'IELTS/PTE Preparation Workshop', location: 'Kochi, India', country: 'India' },
  { id: 3, name: 'Universities Application Week', location: 'Dhaka, Bangladesh', country: 'Bangladesh' },
  { id: 4, name: 'Universities Application Week', location: 'Islamabad, Pakistan', country: 'Pakistan' },
  { id: 5, name: 'Universities Application Week', location: 'Kathmandu, Nepal', country: 'Nepal' },
  { id: 6, name: 'Universities Application Week', location: 'Colombo, Sri Lanka', country: 'Sri Lanka' },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'university' // destination, university, course, event
    const limit = 5

    if (query.length < 1) {
      return NextResponse.json({
        results: [],
        type: type,
      })
    }

    let results = []

    if (type === 'destination') {
      // Search for countries
      const { data, error } = await supabase
        .from('countries')
        .select('id, name')
        .ilike('name', `%${query}%`)
        .limit(limit)

      if (error) throw error
      results = data?.map((c) => ({
        id: c.id,
        name: c.name,
        type: 'destination',
      })) || []
    } else if (type === 'university') {
      // Search for universities
      const { data, error } = await supabase
        .from('universities')
        .select('id, name, countries(id, name)')
        .ilike('name', `%${query}%`)
        .limit(limit)

      if (error) throw error
      results = data?.map((u: any) => ({
        id: u.id,
        name: u.name,
        country: u.countries?.name,
        type: 'university',
      })) || []
    } else if (type === 'courses') {
      // Search for courses
      const { data, error } = await supabase
        .from('courses')
        .select(
          'id, name, code, universities(id, name, countries(id, name))',
        )
        .ilike('name', `%${query}%`)
        .limit(limit)

      if (error) throw error
      results = data?.map((c: any) => ({
        id: c.id,
        name: c.name,
        code: c.code,
        university: c.universities?.name,
        country: c.universities?.countries?.name,
        type: 'course',
      })) || []
    } else if (type === 'event') {
      // Search for events using hardcoded data
      const lowerQuery = query.toLowerCase()
      results = HARDCODED_EVENTS.filter(
        (e) =>
          e.name.toLowerCase().includes(lowerQuery) ||
          e.location.toLowerCase().includes(lowerQuery) ||
          e.country.toLowerCase().includes(lowerQuery)
      ).slice(0, limit).map((e) => ({
        id: e.id,
        name: e.name,
        location: e.location,
        country: e.country,
        type: 'event',
      }))
    }

    return NextResponse.json({
      results: results,
      type: type,
    })
  } catch (error) {
    console.error('Search filter error:', error)
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 },
    )
  }
}
