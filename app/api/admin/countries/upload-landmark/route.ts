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
    const formData = await request.formData()
    const file = formData.get('file') as File
    const countryName = formData.get('countryName') as string

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

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate filename based on country name
    const slug = nameToSlug(countryName)
    const extension = file.name.split('.').pop() || 'jpg'
    const filename = `${slug}-landmark.${extension}`

    // Ensure the landmarks directory exists
    const landmarksDir = join(process.cwd(), 'public', 'landmarks')
    if (!existsSync(landmarksDir)) {
      await mkdir(landmarksDir, { recursive: true })
    }

    // Write file
    const filepath = join(landmarksDir, filename)
    await writeFile(filepath, buffer)

    return NextResponse.json({
      success: true,
      filename,
      path: `/landmarks/${filename}`,
    })
  } catch (error) {
    console.error('Error uploading landmark image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
