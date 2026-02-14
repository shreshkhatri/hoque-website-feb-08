import { NextResponse } from 'next/server'

export async function POST() {
  // Token-based auth: client just removes the token from localStorage
  // No server-side cleanup needed
  return NextResponse.json({ success: true })
}
