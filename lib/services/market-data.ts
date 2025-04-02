import axios from 'axios'
import { EventEmitter } from 'events'
import { CategoryId } from '@/types/market'
import { WebSocketProvider } from '../providers/web-socket'
import { MockWebSocket } from '../providers/mock-web-socket'
import { DetailedMarketData } from '@/lib/market-data'

interface MarketDataConfig {
  useMock: boolean
  apiKey?: string
}

interface MarketDataResponse {
  data: DetailedMarketData[]
  error?: string
}

export class MarketDataService {
  private config: MarketDataConfig
  private eventEmitter: EventEmitter
  private static instance: MarketDataService | null = null
  private cache: Map<CategoryId, DetailedMarketData[]>
  private ws: WebSocketProvider
  private updateInterval: NodeJS.Timeout | null = null
  private lastApiCall: number = 0
  private readonly API_CALL_INTERVAL = 12 * 1000 // 12 seconds between API calls (Alpha Vantage free tier limit: 5 calls per minute)
  private connectionStatus: 'connected' | 'disconnected' | 'error' = 'disconnected'
  private reconnectAttempts: number = 0
  private readonly MAX_RECONNECT_ATTEMPTS = 5
  private readonly RECONNECT_INTERVAL = 5000 // 5 seconds

  private constructor(config: MarketDataConfig) {
    this.config = config
    this.eventEmitter = new EventEmitter()
    this.cache = new Map()
    this.ws = new MockWebSocket('mock-category')
    this.setupConnectionMonitoring()
  }

  private setupConnectionMonitoring() {
    // Monitor connection status
    setInterval(() => {
      if (this.connectionStatus === 'disconnected' && this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
        this.reconnectAttempts++
        if (process.env.NODE_ENV === 'production') {
          console.warn(`WebSocket disconnected. Attempting to reconnect (${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})`)
        }
        this.ws = new MockWebSocket('mock-category')
        this.connectionStatus = 'connected'
      } else if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
        if (process.env.NODE_ENV === 'production') {
          console.error('Max reconnection attempts reached. Please check the connection.')
        }
        this.connectionStatus = 'error'
      }
    }, this.RECONNECT_INTERVAL)
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

  private async waitForRateLimit(): Promise<void> {
    const now = Date.now()
    const timeSinceLastCall = now - this.lastApiCall
    if (timeSinceLastCall < this.API_CALL_INTERVAL) {
      await new Promise(resolve => setTimeout(resolve, this.API_CALL_INTERVAL - timeSinceLastCall))
    }
    this.lastApiCall = Date.now()
  }

  async getMarketData(category: CategoryId): Promise<MarketDataResponse> {
    try {
      // Check cache first
      const cachedData = this.cache.get(category)
      if (cachedData) {
        return { data: cachedData }
      }

      // Check for API key in production
      if (!this.config.useMock && !this.config.apiKey) {
        throw new Error('Alpha Vantage API key is required in production')
      }

      // Wait for rate limit
      await this.waitForRateLimit()

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

      if (response.data['Note']) {
        console.warn('Alpha Vantage API rate limit warning:', response.data['Note'])
      }

      const timeSeries = response.data['Time Series (5min)']
      const marketData: DetailedMarketData[] = Object.entries(timeSeries)
        .slice(0, 12) // Last hour of data
        .map(([timestamp, values]: [string, any]) => ({
          name: new Date(timestamp).toISOString(),
          value: parseFloat(values['4. close']),
          volume: parseFloat(values['5. volume']),
          change: this.calculateChange(
            parseFloat(values['4. close']),
            parseFloat(values['1. open'])
          ),
          volatility: this.calculateVolatility(values),
          trend: this.determineTrend(
            parseFloat(values['4. close']),
            parseFloat(values['1. open'])
          )
        }))

      // Update cache
      this.cache.set(category, marketData)

      return { data: marketData }
    } catch (error) {
      console.error('Error fetching market data:', error)
      return {
        data: [],
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
      case 'renewables':
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
      default:
        throw new Error(`Invalid category: ${category}`)
    }
  }

  private calculateChange(current: number, previous: number): number {
    return Number(((current - previous) / previous * 100).toFixed(2))
  }

  private calculateVolatility(values: any): number {
    const high = parseFloat(values['2. high'])
    const low = parseFloat(values['3. low'])
    return Number(((high - low) / low * 100).toFixed(2))
  }

  private determineTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
    const change = this.calculateChange(current, previous)
    if (change > 0.1) return 'up'
    if (change < -0.1) return 'down'
    return 'stable'
  }

  subscribe(callback: (data: DetailedMarketData) => void) {
    // Update data every 5 minutes for testing
    this.updateInterval = setInterval(() => {
      const now = new Date()
      const mockData: DetailedMarketData = {
        name: now.toISOString(),
        value: Math.random() * 100,
        volume: Math.floor(Math.random() * 1000000),
        change: (Math.random() - 0.5) * 2,
        volatility: Math.random() * 0.5,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      }
      callback(mockData)
      this.connectionStatus = 'connected'
      this.reconnectAttempts = 0
    }, process.env.NODE_ENV === 'production' ? 5 * 60 * 1000 : 1 * 60 * 1000) // 5 minutes in production, 1 minute in development

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
    this.connectionStatus = 'disconnected'
  }

  subscribeToUpdates(callback: (data: DetailedMarketData[]) => void) {
    this.eventEmitter.on('data', callback)
    return () => this.eventEmitter.off('data', callback)
  }

  clearCache() {
    this.cache.clear()
  }
} 