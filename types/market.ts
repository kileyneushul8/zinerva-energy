export type CategoryId = 'crude-oil' | 'natural-gas' | 'renewable' | 'industrial'

export interface MarketData {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  volume?: number
}

export interface MarketDataResponse {
  success: boolean
  data?: MarketData[]
  error?: string
}

export interface MarketDataCache {
  [key: string]: MarketData[]
}

export interface TradingSignal {
  type: 'buy' | 'sell'
  strength: 'weak' | 'medium' | 'strong'
  indicator: string
  message: string
  confidence: number
  timestamp: string
}

export interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    dataKey?: string
    payload: MarketData
  }>
  label?: string
}

export interface MarketDataPoint {
  time: string
  crude: number
  crudeOHLC: {
    open: number
    high: number
    low: number
    close: number
  }
  volume: number
  volatility: number
  momentum: number
  rsi: number
  macd: number
  signal: number
  bollingerUpper: number
  bollingerLower: number
  ema8: number
  ema21: number
  sma20: number
  stochK: number | null
  ichimoku: {
    tenkanSen: number
    kijunSen: number
  } | null
  volumeMA: number
  marketCondition: 'bullish' | 'bearish'
  trendStrength: number
  volatilityRegime: 'high' | 'normal'
  signals?: TradingSignal[]
} 