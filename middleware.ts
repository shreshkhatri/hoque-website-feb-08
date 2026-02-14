import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log('[v0] Middleware hit:', pathname)
  console.log('[v0] All cookies:', request.cookies.getAll().map(c => c.name))

  // Protect admin dashboard routes (not the login page itself)
  if (
    pathname.startsWith('/admin/dashboard') ||
    pathname.startsWith('/admin/universities') ||
    pathname.startsWith('/admin/courses') ||
    pathname.startsWith('/admin/messages') ||
    pathname.startsWith('/admin/applications')
  ) {
    const token = request.cookies.get('admin_session')?.value
    console.log('[v0] Token found:', !!token, 'length:', token?.length)

    if (!token) {
      console.log('[v0] No token, redirecting to /admin')
      const loginUrl = new URL('/admin', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
