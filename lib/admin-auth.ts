import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'hoque-admin-secret-key-change-in-production-2026'
)

const COOKIE_NAME = 'admin_session'

export interface AdminSession {
  id: number
  email: string
  name: string
}

export async function createSession(admin: AdminSession): Promise<string> {
  const token = await new SignJWT({
    id: admin.id,
    email: admin.email,
    name: admin.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(JWT_SECRET)

  return token
}

export async function verifySession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value

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

export function getSessionCookieName(): string {
  return COOKIE_NAME
}
