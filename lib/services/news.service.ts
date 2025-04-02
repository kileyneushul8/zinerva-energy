import { Headline } from './headlines.service'

interface AlphaVantageNewsResponse {
    items: Array<{
        title: string
        url: string
        time_published: string
        source_domain: string
        summary: string
        topics: Array<{
            topic: string
            relevance_score: string
        }>
        sentiment_score: string
        ticker_sentiment: Array<{
            ticker: string
            relevance_score: string
            ticker_sentiment_score: string
        }>
    }>
}

export class NewsService {
    private static instance: NewsService
    private baseUrl: string
    private apiKey: string

    private constructor() {
        this.baseUrl = process.env.ALPHA_VANTAGE_BASE_URL || 'https://www.alphavantage.co/query'
        this.apiKey = process.env.ALPHA_VANTAGE_API_KEY || ''
    }

    public static getInstance(): NewsService {
        if (!NewsService.instance) {
            NewsService.instance = new NewsService()
        }
        return NewsService.instance
    }

    private mapCategory(topics: Array<{ topic: string, relevance_score: string }>): string {
        // Map topics to our categories based on relevance score
        const topicMap: { [key: string]: string } = {
            'energy': 'market-analysis',
            'oil': 'market-analysis',
            'natural gas': 'market-analysis',
            'renewable': 'innovation',
            'technology': 'innovation',
            'regulation': 'regulation',
            'investment': 'investment'
        }

        // Sort topics by relevance score and find the most relevant matching topic
        const sortedTopics = [...topics].sort((a, b) =>
            parseFloat(b.relevance_score) - parseFloat(a.relevance_score)
        )

        for (const topic of sortedTopics) {
            const lowerTopic = topic.topic.toLowerCase()
            for (const [key, value] of Object.entries(topicMap)) {
                if (lowerTopic.includes(key)) {
                    return value
                }
            }
        }

        return 'market-analysis' // default category
    }

    private mapImpact(sentimentScore: string, tickerSentiments: Array<{ ticker_sentiment_score: string }>): 'high' | 'medium' {
        // Combine overall sentiment with ticker-specific sentiments
        const overallScore = Math.abs(parseFloat(sentimentScore))
        const tickerScores = tickerSentiments.map(t => Math.abs(parseFloat(t.ticker_sentiment_score)))
        const avgTickerScore = tickerScores.length > 0
            ? tickerScores.reduce((a, b) => a + b, 0) / tickerScores.length
            : 0

        // Use the higher of the two scores
        const finalScore = Math.max(overallScore, avgTickerScore)
        return finalScore > 0.3 ? 'high' : 'medium'
    }

    private formatTime(timePublished: string): string {
        const date = new Date(timePublished)
        const now = new Date()
        const diff = now.getTime() - date.getTime()

        // Convert to hours
        const hours = Math.floor(diff / (1000 * 60 * 60))

        if (hours < 24) {
            return `${hours}h ago`
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            })
        }
    }

    public async getLatestNews(): Promise<Headline[]> {
        try {
            // Alpha Vantage's free tier has a rate limit of 5 requests per minute
            const response = await fetch(
                `${this.baseUrl}?function=NEWS_SENTIMENT&apikey=${this.apiKey}&topics=energy,oil,gas,renewable&sort=LATEST&limit=50`
            )

            if (!response.ok) {
                throw new Error('Failed to fetch news')
            }

            const data: AlphaVantageNewsResponse = await response.json()

            return data.items.map((item, index) => ({
                id: index + 1,
                title: item.title,
                source: item.source_domain,
                time: this.formatTime(item.time_published),
                category: this.mapCategory(item.topics),
                impact: this.mapImpact(item.sentiment_score, item.ticker_sentiment),
                summary: item.summary,
                url: item.url
            }))
        } catch (error) {
            console.error('Error fetching news:', error)
            return this.getMockNews()
        }
    }

    private getMockNews(): Headline[] {
        return [
            {
                id: 1,
                title: 'Global Oil Demand Reaches Record High',
                source: 'Reuters',
                time: '2h ago',
                category: 'market-analysis',
                impact: 'high',
                summary: 'Global oil demand has hit a new record as economic growth and industrial activity surge in major economies.',
                url: '#'
            },
            {
                id: 2,
                title: 'Renewable Energy Investment Surges',
                source: 'Energy News',
                time: '4h ago',
                category: 'investment',
                impact: 'high',
                summary: 'Global investment in renewable energy projects reaches unprecedented levels as costs continue to decline.',
                url: '#'
            },
            {
                id: 3,
                title: 'New Energy Storage Technology Breakthrough',
                source: 'Clean Energy Wire',
                time: '6h ago',
                category: 'innovation',
                impact: 'medium',
                summary: 'Scientists announce breakthrough in energy storage technology, promising longer duration and lower costs.',
                url: '#'
            }
        ]
    }

    private getCategoryKeywords(category: CategoryId): string[] {
        const keywords: Record<CategoryId, string[]> = {
            'crude-oil': ['oil', 'crude', 'petroleum'],
            'natural-gas': ['gas', 'natural gas', 'LNG'],
            'renewables': ['renewable', 'renewables', 'clean energy'],
            'nuclear': ['nuclear', 'atomic'],
            'coal': ['coal', 'thermal'],
            'solar': ['solar', 'photovoltaic'],
            'wind': ['wind', 'offshore wind'],
            'hydrogen': ['hydrogen', 'H2'],
            'industrial': ['industrial', 'manufacturing']
        }
        return keywords[category] || []
    }
} 