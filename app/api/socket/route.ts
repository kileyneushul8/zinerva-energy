import { NextResponse } from 'next/server'

// Remove any server initialization from the route handler
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Socket server is running',
    port: process.env.SOCKET_PORT
  })
}

export const dynamic = 'force-dynamic' 