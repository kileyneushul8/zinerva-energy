import { Server } from 'socket.io'
import { createServer } from 'http'

const httpServer = createServer()

export const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },
  transports: ['polling', 'websocket'] as const,
  path: '/socket.io',
  pingTimeout: 60000,
  pingInterval: 25000,
  connectTimeout: 45000,
  allowEIO3: true
})

// Add connection handler
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  
  socket.emit('status', { connected: true })
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })

  socket.on('error', (error) => {
    console.error('Socket error:', error)
  })
})

const port = parseInt(process.env.SOCKET_PORT || '3001', 10)

httpServer.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`)
})

export default io 