import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { email, password, name, setupKey } = await request.json()

    // Simple setup key to prevent unauthorized admin creation
    if (setupKey !== 'hoque-setup-2026') {
      return NextResponse.json({ error: 'Invalid setup key' }, { status: 403 })
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const { data, error } = await supabase
      .from('admins')
      .upsert({ email: email.toLowerCase().trim(), password_hash: passwordHash, name }, { onConflict: 'email' })
      .select('id, email, name')
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 })
    }

    return NextResponse.json({ success: true, admin: data })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
