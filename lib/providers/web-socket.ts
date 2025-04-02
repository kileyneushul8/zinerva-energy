import { DetailedMarketData } from '@/lib/market-data'

export interface WebSocketProvider {
    subscribe(callback: (data: DetailedMarketData) => void): () => void
    disconnect(): void
} 