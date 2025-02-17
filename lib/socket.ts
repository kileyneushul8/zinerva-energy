import { io } from 'socket.io-client'

// Create a singleton socket instance
let socket: any

export const initializeSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: false,
      transports: ['websocket']
    })
  }
  return socket
}

export const connectSocket = () => {
  const socket = initializeSocket()
  
  if (!socket.connected) {
    socket.connect()
  }
  
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
  }
} 