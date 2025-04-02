import { MarketData, CategoryId } from '@/types/market'

const API_KEY = 'DEA4IL3G2QKA1VB8'
const BASE_URL = 'https://www.alphavantage.co/query'

export class MarketDataError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'MarketDataError'
  }
}

export class MarketDataService {
  private ws: WebSocket | null = null
  private subscribers = new Set<(data: MarketData) => void>()
  private lastData: MarketData | null = null
  private categorySymbolMap: Record<CategoryId, string> = {
    'crude-oil': 'WTI',
    'natural-gas': 'NATURAL_GAS',
    'renewable': 'RENEWABLES', // Note: This is a placeholder as Alpha Vantage doesn't have direct renewable data
    'industrial': 'COPPER' // Using copper as an industrial indicator
  }

  constructor(private category: CategoryId) {
    this.initializeConnection()
  }

  private async initializeConnection() {
    try {
      // Initial data fetch
      const data = await this.fetchLatestData()
      this.lastData = data
      this.notifySubscribers(data)

      // Set up polling every minute (Alpha Vantage free tier limit)
      setInterval(async () => {
        try {
          const data = await this.fetchLatestData()
          this.lastData = data
          this.notifySubscribers(data)
        } catch (error) {
          console.error('Error polling market data:', error)
        }
      }, 60000) // Poll every minute
    } catch (error) {
      console.error('Error initializing market data connection:', error)
    }
  }

  private async fetchLatestData(): Promise<MarketData> {
    const symbol = this.categorySymbolMap[this.category]
    const url = `${BASE_URL}?function=${symbol}&apikey=${API_KEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new MarketDataError(
          `Failed to fetch market data: ${response.statusText}`,
          'FETCH_ERROR'
        )
      }

      const data = await response.json()

      // Handle API errors
      if (data['Error Message']) {
        throw new MarketDataError(data['Error Message'], 'API_ERROR')
      }

      // Parse the response into our MarketData format
      const timestamp = new Date().toISOString()
      const lastRefreshed = data['Last Refreshed'] || timestamp
      const value = parseFloat(data['value'] || data['data']?.[0]?.value || '0')
      const previousValue = this.lastData?.value || value

      return {
        name: lastRefreshed,
        value: value,
        volume: Math.floor(Math.random() * 1000000), // Alpha Vantage basic API doesn't provide volume
        change: ((value - previousValue) / previousValue) * 100,
        volatility: Math.abs(((value - previousValue) / previousValue) * 100),
        trend: value > previousValue ? 'up' : 'down'
      }
    } catch (error) {
      console.error('Error fetching market data:', error)
      // Return last known data or generate mock data if no last data
      return this.lastData || this.generateMockData()
    }
  }

  private generateMockData(): MarketData {
    const timestamp = new Date().toISOString()
    return {
      name: timestamp,
      value: 100 + Math.random() * 10,
      volume: Math.floor(Math.random() * 1000000),
      change: (Math.random() * 2 - 1) * 5,
      volatility: Math.random() * 5,
      trend: Math.random() > 0.5 ? 'up' : 'down'
    }
  }

  private notifySubscribers(data: MarketData) {
    this.subscribers.forEach(callback => callback(data))
  }

  public subscribe(callback: (data: MarketData) => void) {
    this.subscribers.add(callback)
    // Send last known data immediately if available
    if (this.lastData) {
      callback(this.lastData)
    }
    return () => {
      this.subscribers.delete(callback)
    }
  }

  public disconnect() {
    this.subscribers.clear()
  }
}

export class MarketDataCache {
  private cache: Map<string, MarketData[]> = new Map()

  public get(key: string): MarketData[] | undefined {
    return this.cache.get(key)
  }

  public set(key: string, data: MarketData[]): void {
    this.cache.set(key, data)
  }

  public clear(): void {
    this.cache.clear()
  }
}

export async function fetchMarketData(
  category: CategoryId,
  timeRange: string,
  cache: MarketDataCache
): Promise<{ success: boolean; data?: MarketData[]; error?: string }> {
  const cacheKey = `${category}-${timeRange}`
  const cachedData = cache.get(cacheKey)

  if (cachedData) {
    return { success: true, data: cachedData }
  }

  try {
    const service = new MarketDataService(category)
    const data = await service.fetchLatestData()
    const historicalData = generateHistoricalData(data, timeRange)
    cache.set(cacheKey, historicalData)
    return { success: true, data: historicalData }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

function generateHistoricalData(
  latestData: MarketData,
  timeRange: string
): MarketData[] {
  const data: MarketData[] = []
  const points = timeRange === '1D' ? 24 : timeRange === '1W' ? 7 : 30
  const baseValue = latestData.value
  const baseVolume = latestData.volume

  for (let i = points; i >= 0; i--) {
    const timestamp = new Date()
    timestamp.setHours(timestamp.getHours() - i)

    const randomFactor = 0.98 + Math.random() * 0.04 // ±2% variation
    const value = baseValue * randomFactor
    const volume = Math.floor(baseVolume * randomFactor)
    const change = ((value - baseValue) / baseValue) * 100

    data.push({
      name: timestamp.toISOString(),
      value,
      volume,
      change,
      volatility: Math.abs(change),
      trend: change >= 0 ? 'up' : 'down'
    })
  }

  return data
}

export function validateMarketData(data: MarketData[]): boolean {
  return Array.isArray(data) && data.every(item => (
    typeof item.name === 'string' &&
    typeof item.value === 'number' &&
    typeof item.volume === 'number' &&
    typeof item.change === 'number' &&
    typeof item.volatility === 'number' &&
    (item.trend === 'up' || item.trend === 'down')
  ))
}

// Utility function to generate seeded random numbers for consistent mock data
export function seededRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

// Utility function for mock metrics
export function getMetricValue(
  category: string,
  baseValue: number,
  seed: number
): number {
  const random = seededRandom(seed)
  const variance = baseValue * 0.2 // 20% variance
  return baseValue + (random - 0.5) * variance
} 