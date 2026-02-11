import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// Security: Define max length limits for fields
const FIELD_LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 255,
  phone: 20,
  subject: 255,
  message: 5000,
}

// Security: Sanitize string input to prevent XSS attacks
function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  // Trim whitespace
  let sanitized = input.trim()
  
  // Remove potentially dangerous characters and scripts
  sanitized = sanitized
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '') // Remove iframe tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers (onclick, etc)
  
  // Escape HTML special characters to prevent XSS
  const htmlEscapeMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  
  sanitized = sanitized.replace(/[&<>"'\/]/g, (char) => htmlEscapeMap[char] || char)
  
  return sanitized
}

// Security: Validate input format and type
function validateInput(
  value: unknown,
  fieldName: string,
  maxLength: number,
  pattern?: RegExp
): { valid: boolean; error?: string } {
  // Check if value exists
  if (value === null || value === undefined) {
    return { valid: false, error: `${fieldName} is required` }
  }

  // Check if value is a string
  if (typeof value !== 'string') {
    return { valid: false, error: `${fieldName} must be text` }
  }

  // Check length
  if (value.length === 0) {
    return { valid: false, error: `${fieldName} cannot be empty` }
  }

  if (value.length > maxLength) {
    return { valid: false, error: `${fieldName} exceeds maximum length of ${maxLength} characters` }
  }

  // Check against regex pattern if provided
  if (pattern && !pattern.test(value)) {
    return { valid: false, error: `${fieldName} format is invalid` }
  }

  return { valid: true }
}

// Security: Rate limiting check (simple in-memory, production should use Redis)
const requestMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60000 // 1 minute in ms
const RATE_LIMIT_MAX_REQUESTS = 5 // Max 5 requests per minute per IP

function checkRateLimit(ip: string): { allowed: boolean; error?: string } {
  const now = Date.now()
  const record = requestMap.get(ip)

  if (!record) {
    requestMap.set(ip, { count: 1, timestamp: now })
    return { allowed: true }
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    // Window expired, reset
    requestMap.set(ip, { count: 1, timestamp: now })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, error: 'Too many requests. Please try again later.' }
  }

  record.count++
  return { allowed: true }
}

export async function POST(request: NextRequest) {
  try {
    // Security: Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               request.ip || 
               'unknown'

    // Security: Check rate limit
    const rateLimitCheck = checkRateLimit(ip)
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: rateLimitCheck.error },
        { status: 429 }
      )
    }

    // Security: Parse and validate request body
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { firstName, lastName, email, phone, subject, message } = body as Record<string, unknown>

    // Security: Validate all required fields
    const firstNameValidation = validateInput(firstName, 'First name', FIELD_LIMITS.firstName)
    if (!firstNameValidation.valid) {
      return NextResponse.json({ error: firstNameValidation.error }, { status: 400 })
    }

    const lastNameValidation = validateInput(lastName, 'Last name', FIELD_LIMITS.lastName)
    if (!lastNameValidation.valid) {
      return NextResponse.json({ error: lastNameValidation.error }, { status: 400 })
    }

    const emailValidation = validateInput(
      email,
      'Email',
      FIELD_LIMITS.email,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    )
    if (!emailValidation.valid) {
      return NextResponse.json({ error: emailValidation.error }, { status: 400 })
    }

    const subjectValidation = validateInput(subject, 'Subject', FIELD_LIMITS.subject)
    if (!subjectValidation.valid) {
      return NextResponse.json({ error: subjectValidation.error }, { status: 400 })
    }

    const messageValidation = validateInput(message, 'Message', FIELD_LIMITS.message)
    if (!messageValidation.valid) {
      return NextResponse.json({ error: messageValidation.error }, { status: 400 })
    }

    // Security: Validate optional phone field if provided
    if (phone && typeof phone === 'string') {
      const phoneValidation = validateInput(phone, 'Phone', FIELD_LIMITS.phone, /^[0-9+\-\s()]+$/)
      if (!phoneValidation.valid) {
        return NextResponse.json({ error: phoneValidation.error }, { status: 400 })
      }
    }

    // Security: Sanitize all inputs to prevent XSS
    const sanitizedData = {
      first_name: sanitizeInput(firstName as string),
      last_name: sanitizeInput(lastName as string),
      email: sanitizeInput(email as string).toLowerCase(), // Normalize email
      phone: phone ? sanitizeInput(phone as string) : null,
      subject: sanitizeInput(subject as string),
      message: sanitizeInput(message as string),
      status: 'new', // Set by server, cannot be overridden by user
    }

    // Security: Use Supabase parameterized queries (prevents SQL injection)
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([sanitizedData])
      .select()

    if (error) {
      console.error('[v0] Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you soon!',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
