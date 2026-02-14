import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'hoque-admin-secret-key-change-in-production-2026'
)

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

export function extractBearerToken(request: Request): string | null {
  const authHeader = request.headers.get('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  return null
}
