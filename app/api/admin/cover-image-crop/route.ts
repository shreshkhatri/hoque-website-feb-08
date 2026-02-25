import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getTokenFromRequest, verifyToken } from '@/lib/admin-auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const allowedTables = ['countries', 'universities', 'university_campuses', 'announcements']

// Public GET -- fetches live crop data (bypasses static page cache)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const entityType = searchParams.get('entityType')
  const entityId = searchParams.get('entityId')

  if (!entityType || !entityId || !allowedTables.includes(entityType)) {
    return NextResponse.json({ crop: null })
  }

  try {
    const { data, error } = await supabase
      .from(entityType)
      .select('cover_image_crop')
      .eq('id', parseInt(entityId))
      .single()

    if (error || !data) {
      return NextResponse.json({ crop: null })
    }

    return NextResponse.json({ crop: data.cover_image_crop })
  } catch {
    return NextResponse.json({ crop: null })
  }
}

export async function PUT(request: NextRequest) {
  const token = getTokenFromRequest(request)
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const session = await verifyToken(token)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { entityType, entityId, crop } = await request.json()

    if (!allowedTables.includes(entityType)) {
      return NextResponse.json({ error: 'Invalid entity type' }, { status: 400 })
    }

    if (!entityId || typeof crop?.x !== 'number' || typeof crop?.y !== 'number') {
      return NextResponse.json({ error: 'Invalid crop data' }, { status: 400 })
    }

    const { error } = await supabase
      .from(entityType)
      .update({ cover_image_crop: { x: crop.x, y: crop.y, zoom: crop.zoom || 1 } })
      .eq('id', entityId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save crop' }, { status: 500 })
  }
}
