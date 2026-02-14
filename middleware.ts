import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/admin-auth'

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/admin/dashboard',
  '/admin/universities',
  '/admin/courses',
  '/admin/messages',
  '/admin/applications',
]

// Admin API routes that require authentication (exclude login/setup/logout)
const PROTECTED_API_ROUTES = [
  '/api/admin/dashboard',
  '/api/admin/universities',
  '/api/admin/courses',
  '/api/admin/messages',
  '/api/admin/job-applications',
  '/api/admin/session',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if route needs protection
  const isProtectedPage = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  const isProtectedApi = PROTECTED_API_ROUTES.some((route) => pathname.startsWith(route))

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next()
  }

  // Verify the session cookie
  const token = getTokenFromRequest(request)
  const session = token ? await verifyToken(token) : null

  // If not authenticated
  if (!session) {
    // API routes return 401
    if (isProtectedApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // Page routes redirect to login
    const loginUrl = new URL('/admin', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path+', '/api/admin/:path+'],
}
