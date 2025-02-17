import { MarketData } from '@/types/market'

// Helper functions
const calculateStandardDeviation = (values: number[]): number => {
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const squareDiffs = values.map(value => Math.pow(value - mean, 2))
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length
  return Math.sqrt(avgSquareDiff)
}

const calculateEMA = (data: number[], period: number): number[] => {
  const k = 2 / (period + 1)
  const emaData: number[] = []
  let ema = data[0]
  
  data.forEach((price) => {
    ema = price * k + ema * (1 - k)
    emaData.push(ema)
  })
  return emaData
}

export const generateDetailedChartData = (): MarketData[] => {
  const data: MarketData[] = []
  const now = new Date()
  const baseOil = 75
  let oilTrend = 0
  let momentum = 0
  let volatility = 15

  // Price movement factors
  const marketSentiment = Math.random() > 0.5 ? 1 : -1
  const trendStrength = 0.3 + Math.random() * 0.4
  const volatilityFactor = 0.8 + Math.random() * 0.4

  // Technical indicator arrays
  const prices: number[] = []
  const volumes: number[] = []
  const highs: number[] = []
  const lows: number[] = []

  for (let i = 60; i >= 0; i--) {
    // Price movement simulation
    const newsImpact = Math.random() > 0.95 ? (Math.random() - 0.5) * 2 : 0
    const trendImpact = marketSentiment * trendStrength * (1 - i/60)
    const randomWalk = (Math.random() - 0.5) * volatility * volatilityFactor
    
    momentum = momentum * 0.95 + (randomWalk + trendImpact + newsImpact) * 0.05
    oilTrend += momentum
    
    // Calculate OHLC
    const open = baseOil + oilTrend
    const high = open + Math.abs(momentum) * (1 + Math.random())
    const low = open - Math.abs(momentum) * (1 + Math.random())
    const close = open + momentum + (Math.random() - 0.5) * volatility * 0.5

    // Update arrays
    prices.push(close)
    highs.push(high)
    lows.push(low)
    
    // Volume simulation
    const volume = 1000 + Math.abs(momentum) * 200 * (1 + Math.random())
    volumes.push(volume)

    // Calculate indicators
    const ema8 = calculateEMA(prices, 8)
    const ema21 = calculateEMA(prices, 21)
    const sma20 = prices.slice(-20).reduce((a, b) => a + b, 0) / 20
    
    // Calculate Bollinger Bands
    const stdDev = calculateStandardDeviation(prices.slice(-20))
    const bollingerUpper = sma20 + (stdDev * 2)
    const bollingerLower = sma20 - (stdDev * 2)

    const date = new Date(now)
    date.setMinutes(now.getMinutes() - i)
    
    data.push({
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      crude: close,
      crudeOHLC: { open, high, low, close },
      volume,
      volatility: Math.abs(momentum) * 100,
      momentum,
      ema8: ema8[ema8.length - 1],
      ema21: ema21[ema21.length - 1],
      stochK: null,
      ichimoku: null,
      rsi: 50 + momentum * 20,
      macd: 0,
      signal: 0,
      volumeMA: 0,
      sma20,
      bollingerUpper,
      bollingerLower,
      trendStrength: Math.abs(momentum) * 100,
      marketCondition: momentum > 0 ? 'bullish' : 'bearish',
      volatilityRegime: volatility > 20 ? 'high' : 'normal',
      signals: []
    })
  }

  return data
} 