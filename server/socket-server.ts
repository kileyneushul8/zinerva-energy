import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}))

const PORT = 3006
const httpServer = createServer(app)

// Add basic route handler
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Socket.IO server is running',
    timestamp: new Date().toISOString()
  })
})

// Add health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 20000,
  pingInterval: 10000,
  connectTimeout: 20000,
  allowEIO3: true
})

io.on('connection', (socket) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Client connected:', socket.id)
  }
  
  socket.emit('status', { connected: true })
  
  // Handle heartbeat
  socket.on('ping', () => {
    socket.emit('pong')
  })
  
  socket.on('disconnect', (reason) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Client disconnected:', socket.id, reason)
    }
  })

  socket.on('error', (error) => {
    // Keep error logging for production
    console.error('Socket error:', error)
  })

  // Send some test data periodically
  const interval = setInterval(() => {
    socket.emit('marketData', {
      timestamp: new Date().toISOString(),
      value: Math.random() * 100
    })
  }, 5000)

  socket.on('disconnect', () => {
    clearInterval(interval)
  })
})

httpServer.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Socket.IO server running on port ${PORT}`)
  }
})

export default io 