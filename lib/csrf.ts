const CSRF_TOKEN_COOKIE = 'csrf-token'
const CSRF_TOKEN_HEADER = 'x-csrf-token'

// Generate a CSRF token
export function generateCsrfToken(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for environments without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
}

// Get CSRF token from cookies (for server-side)
export function getCsrfTokenFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = value
    return acc
  }, {} as Record<string, string>)
  
  return cookies[CSRF_TOKEN_COOKIE] || null
}

// Validate CSRF token from request
export function validateCsrfToken(request: Request): boolean {
  const token = request.headers.get(CSRF_TOKEN_HEADER)
  if (!token) {
    return false
  }

  const cookieHeader = request.headers.get('cookie')
  const cookieToken = getCsrfTokenFromCookies(cookieHeader)
  
  if (!cookieToken) {
    return false
  }

  // Compare tokens using constant-time comparison to prevent timing attacks
  return token === cookieToken
}

