import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

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
    console.log('[v0] Starting landmark upload...')
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

    console.log('[v0] File validation passed, converting to buffer...')
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log('[v0] Buffer created, size:', buffer.length)

    // Generate filename based on country name
    const slug = nameToSlug(countryName)
    const extension = file.name.split('.').pop() || 'jpg'
    const filename = `${slug}-landmark.${extension}`

    console.log('[v0] Generated filename:', filename)

    // Ensure the landmarks directory exists
    const landmarksDir = join(process.cwd(), 'public', 'landmarks')
    console.log('[v0] Landmarks directory path:', landmarksDir)
    
    if (!existsSync(landmarksDir)) {
      console.log('[v0] Directory does not exist, creating...')
      await mkdir(landmarksDir, { recursive: true })
    }

    // Write file
    const filepath = join(landmarksDir, filename)
    console.log('[v0] Writing file to:', filepath)
    await writeFile(filepath, buffer)
    console.log('[v0] File written successfully')

    return NextResponse.json({
      success: true,
      filename,
      path: `/landmarks/${filename}`,
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
