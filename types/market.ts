export type CategoryId = 'crude-oil' | 'natural-gas' | 'renewables' | 'nuclear' | 'coal' | 'solar' | 'wind' | 'hydrogen' | 'industrial'

export type MarketCategoryId = CategoryId

export type ChartType = 'line' | 'area' | 'bar' | 'composed'

export type TimeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y'

export interface MarketData {
  name: string
  value: number
  volume: number
  change: number
  trend: 'up' | 'down' | 'stable'
}

export interface MarketDataResponse {
  data: MarketData[]
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

export interface ExtendedMarketData extends MarketData {
  volatility: number
  trendValue: number
  ma5?: number
  ma20?: number
}

export interface MarketParams {
  baseValue: number
  volatility: number
  trend: number
  seasonality: number
  volumeBase: number
  volumeVariance: number
}

export interface MarketColors {
  primary: string
  secondary: string
  gradient: string[]
  accent: string
} 