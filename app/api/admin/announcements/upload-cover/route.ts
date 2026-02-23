import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { verifySession } from '@/lib/admin-auth'

function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    const slug = title ? titleToSlug(title) : `announcement-${Date.now()}`
    const extension = file.type === 'image/jpeg' || file.type === 'image/jpg' ? 'jpg' : file.type.split('/')[1]
    const filename = `announcements/covers/${slug}-cover.${extension}`

    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: false,
    })

    return NextResponse.json({ success: true, url: blob.url })
  } catch (error: any) {
    console.error('Error uploading announcement cover:', error)
    return NextResponse.json(
      { error: `Failed to upload cover image: ${error.message}` },
      { status: 500 }
    )
  }
}
