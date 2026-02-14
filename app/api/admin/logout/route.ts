import { NextResponse } from 'next/server'
import { getSessionCookieName } from '@/lib/admin-auth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(getSessionCookieName(), '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  return response
}
