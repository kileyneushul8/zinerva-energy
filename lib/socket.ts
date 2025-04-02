import { DetailedMarketData } from './market-data'

interface Socket extends EventEmitter {
  connect(): void
  disconnect(): void
  on(event: string, callback: (data: any) => void): this
  off(event: string, callback: (data: any) => void): this
}

class EventEmitter {
  private events: { [key: string]: Function[] } = {}

  on(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
    return this
  }

  off(event: string, callback: Function) {
    if (!this.events[event]) return this
    this.events[event] = this.events[event].filter(cb => cb !== callback)
    return this
  }

  emit(event: string, data: any) {
    if (!this.events[event]) return
    this.events[event].forEach(callback => callback(data))
  }
}

class MockSocket extends EventEmitter implements Socket {
  private intervalId: NodeJS.Timeout | null = null

  connect() {
    // Simulate real-time updates
    this.intervalId = setInterval(() => {
      const mockData: DetailedMarketData = {
        name: new Date().toISOString(),
        value: Math.random() * 100,
        volume: Math.floor(Math.random() * 1000000),
        change: (Math.random() - 0.5) * 2,
        volatility: Math.random() * 0.5,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      }
      this.emit('market_update', mockData)
    }, 5000)
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}

export const connectSocket = (): Socket => {
  const socket = new MockSocket()
  socket.connect()
  return socket
}

export const disconnectSocket = (socket: Socket) => {
  socket.disconnect()
} 