// Admin authentication utilities - production-grade JWT + httpOnly cookie auth
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'hoque-admin-secret-key-change-in-production-2026'
)

const COOKIE_NAME = 'admin_session'
const MAX_AGE = 60 * 60 * 24 // 24 hours

export interface AdminSession {
  id: number
  email: string
  name: string
}

export async function createSession(admin: AdminSession): Promise<string> {
  return new SignJWT({
    id: admin.id,
    email: admin.email,
    name: admin.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<AdminSession | null> {
  try {
    if (!token) return null
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return {
      id: payload.id as number,
      email: payload.email as string,
      name: payload.name as string,
    }
  } catch {
    return null
  }
}

export function getSessionCookieConfig() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: MAX_AGE,
    path: '/',
  }
}

export function getSessionCookieName() {
  return COOKIE_NAME
}

export async function getSessionFromCookies(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

export async function verifySession(): Promise<AdminSession | null> {
  return getSessionFromCookies()
}

export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(COOKIE_NAME)?.value || null
}
