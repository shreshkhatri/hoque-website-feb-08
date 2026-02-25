import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getTokenFromRequest, verifyToken } from '@/lib/admin-auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

    const allowedTables = ['countries', 'universities', 'university_campuses', 'announcements']
    if (!allowedTables.includes(entityType)) {
      return NextResponse.json({ error: 'Invalid entity type' }, { status: 400 })
    }

    if (!entityId || typeof crop?.x !== 'number' || typeof crop?.y !== 'number') {
      return NextResponse.json({ error: 'Invalid crop data' }, { status: 400 })
    }

    const { error } = await supabase
      .from(entityType)
      .update({ cover_image_crop: { x: crop.x, y: crop.y } })
      .eq('id', entityId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save crop' }, { status: 500 })
  }
}
