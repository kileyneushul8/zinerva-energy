import axios from 'axios'
import { EventEmitter } from 'events'

interface MarketDataConfig {
  apiKey: string
  baseUrl: string
  bloombergId: string
  bloombergSecret: string
}

export class MarketDataService {
  private config: MarketDataConfig
  private authToken: string | null = null
  private eventEmitter: EventEmitter

  constructor(config: MarketDataConfig) {
    this.config = config
    this.eventEmitter = new EventEmitter()
  }

  private async authenticate() {
    try {
      const response = await axios.post(
        'https://api.bloomberg.com/auth/oauth2/token',
        {
          grant_type: 'client_credentials',
          client_id: this.config.bloombergId,
          client_secret: this.config.bloombergSecret,
        }
      )
      this.authToken = response.data.access_token
    } catch (error) {
      console.error('Bloomberg authentication failed:', error)
      throw error
    }
  }

  async getCommodityPrices() {
    if (!this.authToken) await this.authenticate()

    try {
      // Bloomberg API endpoints for commodity data
      const crude = await axios.get(
        'https://api.bloomberg.com/eap/catalogs/bbg/datasets/DOESCRUD/data',
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
          params: {
            interval: '1d',
            limit: 2,
          },
        }
      )

      const gas = await axios.get(
        'https://api.bloomberg.com/eap/catalogs/bbg/datasets/DOENGASD/data',
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
          params: {
            interval: '1d',
            limit: 2,
          },
        }
      )

      const power = await axios.get(
        'https://api.bloomberg.com/eap/catalogs/bbg/datasets/DOEPOWER/data',
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
          params: {
            interval: '1d',
            limit: 2,
          },
        }
      )

      return {
        crudeOil: this.formatBloombergData(crude.data),
        naturalGas: this.formatBloombergData(gas.data),
        electricity: this.formatBloombergData(power.data)
      }
    } catch (error) {
      console.error('Error fetching Bloomberg market data:', error)
      return null
    }
  }

  private formatBloombergData(data: any) {
    const latest = data.data[0]
    const previous = data.data[1]
    return {
      price: latest.price,
      change: ((latest.price - previous.price) / previous.price * 100).toFixed(2)
    }
  }

  private async connectWebSocket() {
    if (!this.authToken) await this.authenticate()

    // Create WebSocket with auth token in URL
    const ws = new WebSocket(
      `wss://api.bloomberg.com/eap/stream?access_token=${this.authToken}`
    )

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.eventEmitter.emit('data', data)
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      this.eventEmitter.emit('error', error)
    }

    return ws
  }

  subscribeToStream() {
    return this.eventEmitter
  }

  private formatStreamData(data: any) {
    return {
      timestamp: new Date().toISOString(),
      commodities: {
        crudeOil: {
          price: data.DOESCRUD.price,
          change: data.DOESCRUD.change
        },
        naturalGas: {
          price: data.DOENGASD.price,
          change: data.DOENGASD.change
        },
        electricity: {
          price: data.DOEPOWER.price,
          change: data.DOEPOWER.change
        }
      },
      trends: this.analyzeTrends(data)
    }
  }

  private analyzeTrends(data: any) {
    // Analyze Bloomberg data to determine market trends
    return [
      {
        name: "Supply Chain Impact",
        trend: data.DOESCRUD.trend,
        impact: this.calculateImpact(data.DOESCRUD.volatility)
      },
      {
        name: "Market Volatility",
        trend: this.calculateVolatilityTrend(data),
        impact: "Medium"
      },
      {
        name: "Global Demand",
        trend: this.analyzeDemandTrend(data),
        impact: "High"
      }
    ]
  }

  private calculateImpact(volatility: number) {
    if (volatility > 0.5) return "High"
    if (volatility > 0.2) return "Medium"
    return "Low"
  }

  private calculateVolatilityTrend(data: any) {
    const volatility = (data.DOESCRUD.volatility + data.DOENGASD.volatility) / 2
    if (volatility > 0.4) return "Increasing"
    if (volatility < 0.2) return "Decreasing"
    return "Stable"
  }

  private analyzeDemandTrend(data: any) {
    const demand = data.DOESCRUD.volume + data.DOENGASD.volume
    if (demand > data.previous_demand * 1.1) return "Increasing"
    if (demand < data.previous_demand * 0.9) return "Decreasing"
    return "Stable"
  }
} 