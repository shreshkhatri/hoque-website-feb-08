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
    const countryName = formData.get('countryName') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!countryName) {
      return NextResponse.json({ error: 'Country name is required' }, { status: 400 })
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed.' },
        { status: 400 }
      )
    }

    const slug = nameToSlug(countryName)
    const extension = file.type === 'image/svg+xml' ? 'svg' : file.type === 'image/jpeg' || file.type === 'image/jpg' ? 'jpg' : file.type.split('/')[1]
    const filename = `flags/${slug}-flag.${extension}`

    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: false,
    })

    return NextResponse.json({
      success: true,
      filename: blob.filename,
      url: blob.url,
      pathname: blob.pathname,
    })
  } catch (error: any) {
    console.error('Error uploading flag image:', error)
    return NextResponse.json(
      { error: `Failed to upload flag image: ${error.message}` },
      { status: 500 }
    )
  }
}
