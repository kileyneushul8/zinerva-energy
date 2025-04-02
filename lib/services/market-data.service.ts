export interface MarketData {
    name: string
    value: number
    volume: number
    change: number
    volatility: number
    trend: number
    ma5?: number
    ma20?: number
}

export class MarketDataService {
    private static instance: MarketDataService
    private lastUpdate: Date | null = null
    private updateInterval: number = 5 * 60 * 1000 // 5 minutes in milliseconds

    private constructor() { }

    static getInstance(): MarketDataService {
        if (!MarketDataService.instance) {
            MarketDataService.instance = new MarketDataService()
        }
        return MarketDataService.instance
    }

    async getMarketData(): Promise<MarketData[]> {
        if (this.shouldUpdate()) {
            await this.updateMarketData()
        }
        return this.generateMockData()
    }

    private shouldUpdate(): boolean {
        if (!this.lastUpdate) return true
        const now = new Date()
        return now.getTime() - this.lastUpdate.getTime() >= this.updateInterval
    }

    private async updateMarketData(): Promise<void> {
        try {
            // In a real implementation, this would fetch data from an API
            this.lastUpdate = new Date()
        } catch (error) {
            console.error('Error updating market data:', error)
        }
    }

    private generateMockData(): MarketData[] {
        const data: MarketData[] = []
        const now = new Date()
        const points = 24 // 24 data points for 24 hours

        for (let i = 0; i < points; i++) {
            const time = new Date(now.getTime() - (points - i) * 60 * 60 * 1000)
            const value = 75 + Math.random() * 5 // Base value around 75
            const volume = Math.floor(Math.random() * 1000000) + 500000
            const change = (Math.random() - 0.5) * 2
            const volatility = Math.random() * 0.5
            const trend = Math.random() - 0.5

            data.push({
                name: time.toISOString(),
                value: Number(value.toFixed(2)),
                volume,
                change: Number(change.toFixed(2)),
                volatility: Number(volatility.toFixed(4)),
                trend: Number(trend.toFixed(4))
            })
        }

        return data
    }
} 