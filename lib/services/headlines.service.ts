import axios from 'axios'

export interface Headline {
    id: string
    title: string
    summary: string
    url: string
    source: string
    time: string
    category: string
    impact: 'high' | 'medium'
}

interface AlphaVantageNewsResponse {
    feed?: Array<{
        title: string
        url: string
        time_published: string
        source: string
        summary: string
        banner_image?: string
        source_domain: string
        topics: Array<{
            topic: string
            relevance_score: string
        }>
        overall_sentiment_score: number
        overall_sentiment_label: string
    }>
    Note?: string  // Alpha Vantage API limit message
    Information?: string  // Alpha Vantage API information message
}

export class HeadlinesService {
    private static instance: HeadlinesService | null = null
    private apiKey: string
    private baseUrl: string

    private constructor() {
        if (typeof window === 'undefined') {
            throw new Error('HeadlinesService can only be instantiated on the client side')
        }
        this.apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || ''
        this.baseUrl = 'https://www.alphavantage.co/query'
    }

    public static getInstance(): HeadlinesService {
        if (!HeadlinesService.instance) {
            HeadlinesService.instance = new HeadlinesService()
        }
        return HeadlinesService.instance
    }

    private mapCategory(topics: Array<{ topic: string; relevance_score: string }>): string {
        // Log the incoming topics for debugging
        console.log('Mapping topics:', topics)

        const categoryMap: Record<string, string> = {
            // Market Analysis
            'energy': 'market-analysis',
            'oil': 'market-analysis',
            'gas': 'market-analysis',
            'economy': 'market-analysis',
            'commodities': 'market-analysis',
            'market': 'market-analysis',
            'prices': 'market-analysis',
            'trading': 'market-analysis',

            // Investment
            'business': 'investment',
            'finance': 'investment',
            'investment': 'investment',
            'stocks': 'investment',
            'funds': 'investment',
            'portfolio': 'investment',
            'financial': 'investment',
            'earnings': 'investment',

            // Regulation
            'climate': 'regulation',
            'politics': 'regulation',
            'policy': 'regulation',
            'government': 'regulation',
            'law': 'regulation',
            'compliance': 'regulation',
            'standards': 'regulation',
            'environmental': 'regulation',
            'regulation': 'regulation',

            // Innovation
            'technology': 'innovation',
            'renewable': 'innovation',
            'clean energy': 'innovation',
            'solar': 'innovation',
            'wind': 'innovation',
            'electric': 'innovation',
            'battery': 'innovation',
            'research': 'innovation',
            'development': 'innovation',
            'innovation': 'innovation'
        }

        // Sort topics by relevance score and check them in order
        const sortedTopics = [...topics].sort((a, b) =>
            parseFloat(b.relevance_score) - parseFloat(a.relevance_score)
        )

        for (const topicObj of sortedTopics) {
            const topicLower = topicObj.topic.toLowerCase()
            console.log('Checking topic:', topicLower)

            // First try exact match
            if (categoryMap[topicLower]) {
                console.log('Found exact match:', categoryMap[topicLower])
                return categoryMap[topicLower]
            }

            // Then try partial match
            for (const [keyword, category] of Object.entries(categoryMap)) {
                if (topicLower.includes(keyword)) {
                    console.log('Found partial match:', category, 'for topic:', topicLower)
                    return category
                }
            }
        }

        console.log('No category match found, defaulting to market-analysis')
        return 'market-analysis'
    }

    private determineImpact(sentimentScore: number): 'high' | 'medium' {
        return Math.abs(sentimentScore) > 0.5 ? 'high' : 'medium'
    }

    private formatTime(timePublished: string): string {
        const date = new Date(timePublished)
        const now = new Date()
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60)
            return `${hours}h ago`
        } else {
            const days = Math.floor(diffInMinutes / 1440)
            return `${days}d ago`
        }
    }

    private getMockHeadlines(): Headline[] {
        // Create a balanced set of headlines for each category
        const headlinesByCategory: Record<string, Headline[]> = {
            'market-analysis': [
                {
                    id: '1',
                    title: 'Global Oil Markets See Unprecedented Volatility',
                    summary: 'Crude oil prices experience significant fluctuations as global demand patterns shift and geopolitical tensions rise.',
                    url: 'https://example.com/oil-markets',
                    source: 'Energy Markets Daily',
                    time: '2h ago',
                    category: 'market-analysis',
                    impact: 'high' as const
                },
                {
                    id: '2',
                    title: 'Natural Gas Prices Rally on Supply Concerns',
                    summary: 'Natural gas futures surge as weather forecasts predict colder temperatures and supply constraints emerge.',
                    url: 'https://example.com/gas-prices',
                    source: 'Commodity Insights',
                    time: '3h ago',
                    category: 'market-analysis',
                    impact: 'medium' as const
                }
            ],
            'investment': [
                {
                    id: '3',
                    title: 'Major Investment Fund Allocates $10B to Renewable Projects',
                    summary: 'Leading investment firm announces significant funding for solar and wind energy developments across multiple continents.',
                    url: 'https://example.com/renewable-investment',
                    source: 'Financial Times',
                    time: '2h ago',
                    category: 'investment',
                    impact: 'high' as const
                },
                {
                    id: '4',
                    title: 'Green Energy Startups Attract Record Venture Capital',
                    summary: 'Clean energy technology companies raise unprecedented funding as investors bet on sustainable solutions.',
                    url: 'https://example.com/green-investment',
                    source: 'Venture Weekly',
                    time: '3h ago',
                    category: 'investment',
                    impact: 'medium' as const
                }
            ],
            'regulation': [
                {
                    id: '5',
                    title: 'New Energy Policy Framework Announced',
                    summary: 'Government unveils comprehensive energy policy reforms aimed at accelerating transition to clean energy sources.',
                    url: 'https://example.com/energy-policy',
                    source: 'Policy Watch',
                    time: '2h ago',
                    category: 'regulation',
                    impact: 'high' as const
                },
                {
                    id: '6',
                    title: 'Carbon Trading Markets Face New Regulations',
                    summary: 'Regulatory bodies introduce stricter oversight measures for carbon credit trading and emissions reporting.',
                    url: 'https://example.com/carbon-trading',
                    source: 'Regulatory Times',
                    time: '3h ago',
                    category: 'regulation',
                    impact: 'medium' as const
                }
            ],
            'innovation': [
                {
                    id: '7',
                    title: 'Breakthrough in Battery Storage Technology',
                    summary: 'Scientists develop new battery technology promising 50% more capacity and faster charging capabilities.',
                    url: 'https://example.com/battery-tech',
                    source: 'Tech Innovation News',
                    time: '2h ago',
                    category: 'innovation',
                    impact: 'high' as const
                },
                {
                    id: '8',
                    title: 'AI-Powered Smart Grid System Launches',
                    summary: 'Revolutionary artificial intelligence system optimizes energy distribution and reduces grid losses significantly.',
                    url: 'https://example.com/smart-grid',
                    source: 'Digital Energy Review',
                    time: '3h ago',
                    category: 'innovation',
                    impact: 'medium' as const
                }
            ]
        }

        // For the "All" category, return a balanced mix of headlines
        return [
            ...headlinesByCategory['market-analysis'],
            ...headlinesByCategory['investment'],
            ...headlinesByCategory['regulation'],
            ...headlinesByCategory['innovation']
        ]
    }

    async getHeadlines(): Promise<Headline[]> {
        try {
            console.log('Fetching headlines...')
            const response = await fetch(
                `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=energy,oil,gas,renewable energy,climate,technology,investment,regulation&apikey=${this.apiKey}`
            )
            const data = await response.json()
            console.log('API Response:', data)

            // Check for API rate limit message
            if (data.Information && data.Information.includes('API rate limit')) {
                console.log('API rate limit reached, using mock data')
                return this.getMockHeadlines()
            }

            if (!data.feed || !Array.isArray(data.feed)) {
                console.log('Invalid API response structure, using mock data')
                return this.getMockHeadlines()
            }

            // Process and categorize headlines
            const headlinesByCategory: Record<string, Headline[]> = {
                'market-analysis': [],
                'investment': [],
                'regulation': [],
                'innovation': []
            }

            // Map and categorize each headline
            data.feed.forEach((item: any) => {
                const headline: Headline = {
                    id: item.id,
                    title: item.title,
                    summary: item.summary,
                    url: item.url,
                    source: item.source,
                    time: new Date(item.time_published).toLocaleString(),
                    category: this.mapCategory(item.topics),
                    impact: this.determineImpact(item.overall_sentiment_score)
                }
                headlinesByCategory[headline.category].push(headline)
            })

            // Ensure balanced distribution for "All" category
            const maxHeadlinesPerCategory = Math.min(
                ...Object.values(headlinesByCategory).map(category => category.length)
            )

            // Take equal number of headlines from each category
            const balancedHeadlines = [
                ...headlinesByCategory['market-analysis'].slice(0, maxHeadlinesPerCategory),
                ...headlinesByCategory['investment'].slice(0, maxHeadlinesPerCategory),
                ...headlinesByCategory['regulation'].slice(0, maxHeadlinesPerCategory),
                ...headlinesByCategory['innovation'].slice(0, maxHeadlinesPerCategory)
            ]

            // Sort by time (newest first)
            balancedHeadlines.sort((a, b) =>
                new Date(b.time).getTime() - new Date(a.time).getTime()
            )

            return balancedHeadlines
        } catch (error) {
            console.error('Error fetching headlines:', error)
            return this.getMockHeadlines()
        }
    }
} 