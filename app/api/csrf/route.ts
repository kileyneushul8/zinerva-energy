import { NextResponse } from 'next/server'
import { generateCsrfToken, getCsrfTokenFromCookies } from '@/lib/csrf'

const CSRF_TOKEN_COOKIE = 'csrf-token'

export async function GET(request: Request) {
  try {
    // Check if token already exists in cookies
    const cookieHeader = request.headers.get('cookie')
    const existingToken = getCsrfTokenFromCookies(cookieHeader)
    
    if (existingToken) {
      return NextResponse.json({ token: existingToken })
    }

    // Generate new token
    const token = generateCsrfToken()
    
    // Set token in cookie
    const response = NextResponse.json({ token })
    response.cookies.set(CSRF_TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    console.error('Error generating CSRF token:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}

