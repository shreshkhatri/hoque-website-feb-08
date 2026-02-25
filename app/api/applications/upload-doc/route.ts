import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const docType = formData.get('docType') as string
    const applicantEmail = formData.get('applicantEmail') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    if (!docType) {
      return NextResponse.json({ error: 'Document type is required' }, { status: 400 })
    }

    const validTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, JPEG, PNG, WebP, DOC, and DOCX are allowed.' },
        { status: 400 }
      )
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be under 10MB.' }, { status: 400 })
    }

    const timestamp = Date.now()
    const sanitizedEmail = (applicantEmail || 'unknown').replace(/[^a-zA-Z0-9]/g, '_')
    const extension = file.name.split('.').pop() || 'pdf'
    const filename = `applications/${sanitizedEmail}/${docType}-${timestamp}.${extension}`

    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: false,
    })

    return NextResponse.json({ success: true, url: blob.url })
  } catch (error: any) {
    console.error('Error uploading document:', error)
    return NextResponse.json(
      { error: `Failed to upload document: ${error.message}` },
      { status: 500 }
    )
  }
}
