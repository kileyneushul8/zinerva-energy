import axios from 'axios'
import { EventEmitter } from 'events'
import { CategoryId, MarketData, MarketDataResponse } from '@/types/market'
import { WebSocketProvider } from '../providers/web-socket'
import { BloombergWebSocket } from '../providers/bloomberg-web-socket'
import { MockWebSocket } from '../providers/mock-web-socket'

interface MarketDataConfig {
  apiKey: string
  baseUrl?: string
}

export class MarketDataService {
  private config: MarketDataConfig
  private eventEmitter: EventEmitter
  private static instance: MarketDataService | null = null
  private cache: Map<CategoryId, MarketData[]>
  private ws: WebSocketProvider
  private updateInterval: NodeJS.Timeout | null = null

  private constructor(config: MarketDataConfig) {
    this.config = config
    this.eventEmitter = new EventEmitter()
    this.cache = new Map()
    this.ws = process.env.NODE_ENV === 'production'
      ? new BloombergWebSocket(config.apiKey)
      : new MockWebSocket(config.apiKey)
  }

  static getInstance(config?: MarketDataConfig): MarketDataService {
    if (!MarketDataService.instance && config) {
      MarketDataService.instance = new MarketDataService(config)
    }
    if (!MarketDataService.instance) {
      throw new Error('MarketDataService not initialized')
    }
    return MarketDataService.instance
  }

  async getMarketData(category: CategoryId): Promise<MarketDataResponse> {
    try {
      // Check cache first
      const cachedData = this.cache.get(category)
      if (cachedData) {
        return { success: true, data: cachedData }
      }

      const symbol = this.getCategorySymbol(category)
      const response = await axios.get(
        `https://www.alphavantage.co/query`,
        {
          params: {
            function: 'TIME_SERIES_INTRADAY',
            symbol,
            interval: '5min',
            apikey: this.config.apiKey
          }
        }
      )

      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message'])
      }

      const timeSeries = response.data['Time Series (5min)']
      const marketData: MarketData[] = Object.entries(timeSeries)
        .slice(0, 12) // Last hour of data
        .map(([timestamp, values]: [string, any]) => ({
          name: new Date(timestamp).toISOString(),
          value: parseFloat(values['4. close']),
          volume: parseFloat(values['5. volume']),
          change: this.calculateChange(
            parseFloat(values['4. close']),
            parseFloat(values['1. open'])
          ),
          trend: this.determineTrend(
            parseFloat(values['4. close']),
            parseFloat(values['1. open'])
          )
        }))

      // Update cache
      this.cache.set(category, marketData)

      return { success: true, data: marketData }
    } catch (error) {
      console.error('Error fetching market data:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  private getCategorySymbol(category: CategoryId): string {
    switch (category) {
      case 'crude-oil':
        return 'USO' // United States Oil Fund
      case 'natural-gas':
        return 'UNG' // United States Natural Gas Fund
      case 'renewable':
        return 'TAN' // Invesco Solar ETF
      case 'nuclear':
        return 'NLR' // VanEck Uranium+Nuclear Energy ETF
      case 'coal':
        return 'KOL' // VanEck Coal ETF
      case 'solar':
        return 'TAN' // Invesco Solar ETF
      case 'wind':
        return 'FAN' // First Trust Global Wind Energy ETF
      case 'hydrogen':
        return 'HDRO' // Defiance Next Gen H2 ETF
      case 'industrial':
        return 'XLI' // Industrial Select Sector SPDR Fund
      default:
        throw new Error(`Invalid category: ${category}`)
    }
  }

  private calculateChange(current: number, previous: number): number {
    return Number(((current - previous) / previous * 100).toFixed(2))
  }

  private determineTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
    const change = this.calculateChange(current, previous)
    if (change > 0.1) return 'up'
    if (change < -0.1) return 'down'
    return 'stable'
  }

  subscribe(callback: (data: MarketData) => void) {
    // Update data every 24 hours instead of every 5 minutes
    this.updateInterval = setInterval(() => {
      const now = new Date()
      const mockData: MarketData = {
        name: now.toISOString(),
        value: Math.random() * 100,
        volume: Math.floor(Math.random() * 1000000),
        change: (Math.random() - 0.5) * 2,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      }
      callback(mockData)
    }, 24 * 60 * 60 * 1000) // 24 hours

    return () => {
      if (this.updateInterval) {
        clearInterval(this.updateInterval)
        this.updateInterval = null
      }
    }
  }

  disconnect() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
    this.ws.disconnect()
  }

  subscribeToUpdates(callback: (data: MarketData[]) => void) {
    this.eventEmitter.on('data', callback)
    return () => this.eventEmitter.off('data', callback)
  }

  clearCache() {
    this.cache.clear()
  }
} 