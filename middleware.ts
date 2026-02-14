import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin dashboard routes (not the login page itself)
  if (
    pathname.startsWith('/admin/dashboard') ||
    pathname.startsWith('/admin/universities') ||
    pathname.startsWith('/admin/courses') ||
    pathname.startsWith('/admin/messages') ||
    pathname.startsWith('/admin/applications')
  ) {
    const token = request.cookies.get('admin_session')?.value

    if (!token) {
      const loginUrl = new URL('/admin', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
