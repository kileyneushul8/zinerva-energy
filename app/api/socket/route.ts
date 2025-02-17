import { NextResponse } from 'next/server'
import { io } from '@/lib/socket-server'

// Set up connection handler if not already set
if (!io.hasListeners('connection')) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)
    socket.emit('status', { connected: true })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Socket server is running',
    port: process.env.SOCKET_PORT
  })
}

export const dynamic = 'force-dynamic' 