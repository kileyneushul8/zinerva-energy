import { MarketData } from '@/types/market'

export interface WebSocketProvider {
    subscribe(callback: (data: MarketData) => void): () => void
    disconnect(): void
} 