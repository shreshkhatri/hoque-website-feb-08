import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const session = await verifySession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')?.trim()

  if (!code) return NextResponse.json({ available: true })

  const { data } = await supabase
    .from('courses')
    .select('id')
    .eq('code', code)
    .limit(1)

  return NextResponse.json({ available: !data || data.length === 0 })
}
