import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

// Helper function to convert country name to slug
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
    console.log('[v0] Starting landmark upload with Vercel Blob...')
    const formData = await request.formData()
    const file = formData.get('file') as File
    const countryName = formData.get('countryName') as string

    console.log('[v0] Upload request:', { fileName: file?.name, countryName, fileType: file?.type })

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!countryName) {
      return NextResponse.json({ error: 'Country name is required' }, { status: 400 })
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    console.log('[v0] File validation passed, preparing for Blob upload...')
    
    // Generate filename based on country name
    const slug = nameToSlug(countryName)
    const extension = file.type === 'image/jpeg' || file.type === 'image/jpg' ? 'jpg' : file.type.split('/')[1]
    const filename = `landmarks/${slug}-landmark.${extension}`

    console.log('[v0] Generated filename:', filename)

    // Upload to Vercel Blob
    console.log('[v0] Uploading to Vercel Blob...')
    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
    })

    console.log('[v0] File uploaded successfully to Blob:', blob.url)

    return NextResponse.json({
      success: true,
      filename: blob.filename,
      url: blob.url,
      pathname: blob.pathname,
    })
  } catch (error: any) {
    console.error('[v0] Error uploading landmark image:', error)
    console.error('[v0] Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })
    return NextResponse.json(
      { error: `Failed to upload image: ${error.message}` },
      { status: 500 }
    )
  }
}
