import { jwtVerify } from "jose"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Paths that require authentication
  const protectedPaths = ["/portal/admin", "/portal/distributor", "/portal/consumer"]

  const path = request.nextUrl.pathname

  // Check if the path requires authentication
  if (protectedPaths.some((prefix) => path.startsWith(prefix))) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/portal/:path*"],
}

