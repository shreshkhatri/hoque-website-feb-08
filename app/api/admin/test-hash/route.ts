import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { password, hash } = await request.json()
    
    console.log('[v0] Testing hash for password:', password)
    console.log('[v0] Hash to test:', hash)
    
    const isValid = await bcrypt.compare(password, hash)
    
    console.log('[v0] Hash comparison result:', isValid)
    
    return NextResponse.json({ 
      isValid,
      password: password,
      hashLength: hash?.length,
      hashFormat: hash?.substring(0, 7)
    })
  } catch (error: any) {
    console.error('[v0] Hash test error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Also test creating a new hash
export async function GET() {
  try {
    const password = 'Admin@1234'
    const newHash = await bcrypt.hash(password, 10)
    
    console.log('[v0] Generated new hash for Admin@1234:', newHash)
    
    const isValid = await bcrypt.compare(password, newHash)
    
    return NextResponse.json({
      password,
      newHash,
      hashLength: newHash.length,
      testResult: isValid
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
