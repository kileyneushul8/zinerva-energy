import { Headline } from './headlines.service'

interface AlphaVantageNewsResponse {
    items: Array<{
        title: string
        summary: string
        url: string
        time_published: string
        source_domain: string
        category: Headline['category']
        sentiment_score: string
        ticker_sentiment: Array<{
            ticker: string
            sentiment_score: string
        }>
    }>
}

export class NewsService {
    private static instance: NewsService
    private apiKey: string
    private baseUrl: string

    private constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || ''
        this.baseUrl = 'https://www.alphavantage.co/query'
    }

    public static getInstance(): NewsService {
        if (!NewsService.instance) {
            NewsService.instance = new NewsService()
        }
        return NewsService.instance
    }

    public async getNews(): Promise<Headline[]> {
        try {
            const response = await fetch(
                `${this.baseUrl}?function=NEWS_SENTIMENT&topics=energy&apikey=${this.apiKey}`
            )

            if (!response.ok) {
                throw new Error('Failed to fetch news')
            }

            const data: AlphaVantageNewsResponse = await response.json()

            return data.items.map((item, index) => ({
                id: (index + 1).toString(),
                title: item.title,
                source: item.source_domain,
                time: new Date(item.time_published).toLocaleString(),
                category: item.category,
                impact: Math.random() > 0.5 ? 'high' : 'medium',
                summary: item.summary,
                url: item.url
            }))
        } catch (error) {
            console.error('Error fetching news:', error)
            return []
        }
    }
} 