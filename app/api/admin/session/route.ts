import { NextResponse } from 'next/server'
import { getSessionFromCookies } from '@/lib/admin-auth'

export async function GET() {
  const session = await getSessionFromCookies()

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, admin: session })
}
