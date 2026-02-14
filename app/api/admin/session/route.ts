import { NextResponse } from 'next/server'
import { verifyToken, extractBearerToken } from '@/lib/admin-auth'

export async function GET(request: Request) {
  const token = extractBearerToken(request)

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const session = await verifyToken(token)

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, admin: session })
}
