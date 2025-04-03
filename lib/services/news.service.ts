import { Headline } from './headlines.service'

interface AlphaVantageNewsResponse {
    items: {
        title: string
        category: Headline['category']
        time_published: string
        summary: string
        source: string
        url: string
        sentiment_score: number
    }[]
}

export class NewsService {
    private static instance: NewsService
    private apiKey: string

    private constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || ''
    }

    public static getInstance(): NewsService {
        if (!NewsService.instance) {
            NewsService.instance = new NewsService()
        }
        return NewsService.instance
    }

    private mapImpact(sentimentScore: number): Headline['impact'] {
        if (sentimentScore >= 0.6) return 'high'
        if (sentimentScore >= 0.3) return 'medium'
        return 'low'
    }

    public async getNews(): Promise<Headline[]> {
        try {
            const response = await fetch(
                `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=energy&apikey=${this.apiKey}`
            )
            const data: AlphaVantageNewsResponse = await response.json()

            return data.items.map(item => ({
                id: Math.random().toString(36).substr(2, 9),
                title: item.title,
                category: item.category,
                time: new Date(item.time_published).toLocaleString(),
                summary: item.summary,
                source: item.source,
                url: item.url,
                impact: this.mapImpact(item.sentiment_score)
            }))
        } catch (error) {
            console.error('Error fetching news:', error)
            return []
        }
    }
} 