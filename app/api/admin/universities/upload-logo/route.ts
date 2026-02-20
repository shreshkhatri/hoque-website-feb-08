import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const universityName = formData.get('universityName') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    if (!universityName) {
      return NextResponse.json({ error: 'University name is required' }, { status: 400 })
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed.' },
        { status: 400 }
      )
    }

    const slug = nameToSlug(universityName)
    const extension = file.type === 'image/svg+xml' ? 'svg' : file.type === 'image/jpeg' || file.type === 'image/jpg' ? 'jpg' : file.type.split('/')[1]
    const filename = `universities/logos/${slug}-logo.${extension}`

    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: false,
    })

    return NextResponse.json({ success: true, url: blob.url })
  } catch (error: any) {
    console.error('Error uploading university logo:', error)
    return NextResponse.json(
      { error: `Failed to upload logo: ${error.message}` },
      { status: 500 }
    )
  }
}
