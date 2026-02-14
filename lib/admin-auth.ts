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

/** Cookie config for production: httpOnly, secure, SameSite=Lax */
export function getSessionCookieConfig() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const,
    maxAge: MAX_AGE,
    path: '/',
  }
}

export function getSessionCookieName() {
  return COOKIE_NAME
}

/** Extract token from cookie in server components / route handlers */
export async function getSessionFromCookies(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

/** Verify admin session from cookies - used by API route handlers for double-layer auth */
export async function verifySession(): Promise<AdminSession | null> {
  return getSessionFromCookies()
}

/** Extract token from middleware request (no async cookies) */
export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(COOKIE_NAME)?.value || null
}
