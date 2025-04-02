import { DetailedMarketData } from '@/lib/market-data'
import { WebSocketProvider } from './web-socket'

export class MockWebSocket implements WebSocketProvider {
    private intervalId: NodeJS.Timeout | null = null
    private callbacks: Set<(data: DetailedMarketData) => void> = new Set()

    constructor(private category: string) {
        this.startMockUpdates()
    }

    private startMockUpdates() {
        this.intervalId = setInterval(() => {
            const mockData: DetailedMarketData = {
                name: new Date().toISOString(),
                value: Math.random() * 100,
                volume: Math.floor(Math.random() * 1000000),
                change: (Math.random() - 0.5) * 2,
                volatility: Math.random() * 0.5,
                trend: Math.random() > 0.5 ? 'up' : 'down'
            }
            this.callbacks.forEach(callback => callback(mockData))
        }, 24 * 60 * 60 * 1000) // 24 hours
    }

    subscribe(callback: (data: DetailedMarketData) => void) {
        this.callbacks.add(callback)
        return () => this.callbacks.delete(callback)
    }

    disconnect() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
        this.callbacks.clear()
    }
} 