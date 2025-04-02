import { connectSocket, disconnectSocket } from './socket'

export type CategoryId = 'crude-oil' | 'natural-gas' | 'coal' | 'renewables' | 'nuclear' | 'solar' | 'wind' | 'hydrogen'
export type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'

export interface BaseMarketData {
  name: string
  value: number
  volume: number
  change: number
}

export interface MarketData extends BaseMarketData {
  volatility: number
}

export interface DetailedMarketData extends MarketData {
  trend: 'up' | 'down' | 'stable'
  ma5?: number
  ma20?: number
}

const categoryNames: Record<CategoryId, string> = {
  'crude-oil': 'Crude Oil',
  'natural-gas': 'Natural Gas',
  'coal': 'Coal',
  'renewables': 'Renewables',
  'nuclear': 'Nuclear',
  'solar': 'Solar',
  'wind': 'Wind',
  'hydrogen': 'Hydrogen'
}

const calculateMovingAverage = (data: DetailedMarketData[], period: number): number[] => {
  const result: number[] = []
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(NaN)
      continue
    }
    const sum = data.slice(i - period + 1, i + 1).reduce((acc, curr) => acc + curr.value, 0)
    result.push(sum / period)
  }
  return result
}

interface TimeConfig {
  points: number
  interval: number
  volatilityMult: number
}

const timeRangeConfig: Record<TimeRange, TimeConfig> = {
  '1D': { points: 24, interval: 60 * 60 * 1000, volatilityMult: 1 },
  '1W': { points: 7, interval: 24 * 60 * 60 * 1000, volatilityMult: 1.2 },
  '1M': { points: 30, interval: 24 * 60 * 60 * 1000, volatilityMult: 1.5 },
  '3M': { points: 90, interval: 24 * 60 * 60 * 1000, volatilityMult: 1.8 },
  '1Y': { points: 52, interval: 7 * 24 * 60 * 60 * 1000, volatilityMult: 2 },
  'ALL': { points: 365, interval: 24 * 60 * 60 * 1000, volatilityMult: 2.5 }
}

const generateHistoricalData = (latestData: DetailedMarketData, timeRange: TimeRange): DetailedMarketData[] => {
  const data: DetailedMarketData[] = []
  const now = new Date()
  const baseValue = latestData.value
  const baseVolume = latestData.volume
  const volatility = latestData.volatility

  const config = timeRangeConfig[timeRange]
  const { points, interval, volatilityMult } = config

  for (let i = 0; i < points; i++) {
    const time = new Date(now.getTime() - (points - i) * interval)
    const random = Math.random()
    const value = baseValue + (random - 0.5) * volatility * volatilityMult
    const volume = baseVolume + (random - 0.5) * baseVolume * 0.5

    data.push({
      name: time.toISOString(),
      value,
      volume,
      change: ((value - baseValue) / baseValue) * 100,
      volatility,
      trend: value > baseValue ? 'up' : 'down'
    })
  }

  const ma5 = calculateMovingAverage(data, 5)
  const ma20 = calculateMovingAverage(data, 20)

  return data.map((point, i) => ({
    ...point,
    ma5: ma5[i],
    ma20: ma20[i]
  }))
}

export class MarketDataService {
  private socket: any
  private subscribers: ((data: DetailedMarketData) => void)[] = []

  constructor() {
    this.socket = connectSocket()
    this.socket.on('market_update', (data: DetailedMarketData) => {
      this.subscribers.forEach(callback => callback(data))
    })
  }

  public subscribe(callback: (data: DetailedMarketData) => void) {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback)
    }
  }

  public async fetchLatestData(category: CategoryId): Promise<DetailedMarketData> {
    const mockData: DetailedMarketData = {
      name: new Date().toISOString(),
      value: Math.random() * 100,
      volume: Math.floor(Math.random() * 1000000),
      change: (Math.random() - 0.5) * 2,
      volatility: Math.random() * 0.5,
      trend: Math.random() > 0.5 ? 'up' : 'down'
    }
    return mockData
  }

  public disconnect() {
    if (this.socket) {
      disconnectSocket(this.socket)
    }
  }
}

export async function generateDetailedChartData(
  category: CategoryId,
  timeRange: TimeRange
): Promise<DetailedMarketData[]> {
  try {
    const service = new MarketDataService()
    const data = await service.fetchLatestData(category)
    return generateHistoricalData(data, timeRange)
  } catch (error) {
    console.error('Error generating chart data:', error)
    return []
  }
}

export function validateMarketData(data: MarketData[]): boolean {
  return data.every(point =>
    typeof point.name === 'string' &&
    typeof point.value === 'number' &&
    typeof point.volume === 'number' &&
    typeof point.change === 'number' &&
    typeof point.volatility === 'number'
  )
}

export function calculateVolatility(data: MarketData[]): number {
  if (data.length < 2) return 0
  const changes = data.slice(1).map((point, i) =>
    Math.abs((point.value - data[i].value) / data[i].value)
  )
  return changes.reduce((sum, change) => sum + change, 0) / changes.length
}

export function calculateTrend(data: MarketData[]): 'up' | 'down' | 'stable' {
  if (data.length < 2) return 'stable'
  const firstValue = data[0].value
  const lastValue = data[data.length - 1].value
  const change = ((lastValue - firstValue) / firstValue) * 100
  if (Math.abs(change) < 0.1) return 'stable'
  return change > 0 ? 'up' : 'down'
}

export class MarketDataError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'MarketDataError'
  }
}

export class MarketDataCache {
  private cache: Map<string, DetailedMarketData[]> = new Map()

  public get(category: CategoryId, timeRange: TimeRange): DetailedMarketData[] | undefined {
    const key = `${category}-${timeRange}`
    return this.cache.get(key)
  }

  public set(category: CategoryId, timeRange: TimeRange, data: DetailedMarketData[]): void {
    const key = `${category}-${timeRange}`
    this.cache.set(key, data)
  }

  public clear(): void {
    this.cache.clear()
  }
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

const getTrendDirection = (value: number): 'up' | 'down' | 'stable' => {
  if (value > 0) return 'up'
  if (value < 0) return 'down'
  return 'stable'
} 