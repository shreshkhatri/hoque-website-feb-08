import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'
import { createSession, getSessionCookieName } from '@/lib/admin-auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    console.log('[v0] Login attempt:', { email, passwordLength: password?.length })

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, name, password_hash')
      .eq('email', email.toLowerCase().trim())
      .single()

    console.log('[v0] DB query result:', { 
      adminFound: !!admin, 
      error: error?.message,
      hashLength: admin?.password_hash?.length 
    })

    if (error || !admin) {
      console.log('[v0] Admin not found in DB')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    console.log('[v0] Comparing password with bcrypt...')
    const isValidPassword = await bcrypt.compare(password, admin.password_hash)
    console.log('[v0] Password comparison result:', isValidPassword)

    if (!isValidPassword) {
      console.log('[v0] Password does not match')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    console.log('[v0] Login successful for:', admin.email)

    const token = await createSession({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    })

    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    })

    response.cookies.set(getSessionCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
