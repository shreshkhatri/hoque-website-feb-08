import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '5')
    const offset = parseInt(searchParams.get('offset') || '0')
    const countryId = searchParams.get('countryId')
    const search = searchParams.get('search')

    let query = supabase
      .from('universities')
      .select('*', { count: 'exact' })
      .order('id', { ascending: true })

    // Filter by country if provided
    if (countryId) {
      query = query.eq('country_id', parseInt(countryId))
    }

    // Search by name, city, or description if provided
    if (search) {
      query = query.or(`name.ilike.%${search}%,city.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json(
      {
        data,
        count,
        limit,
        offset,
        hasMore: count ? offset + limit < count : false,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Universities fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 },
    )
  }
}
