import axios from 'axios'

export interface Headline {
    id: string
    title: string
    category: 'regulation' | 'market' | 'investment' | 'innovation' | 'crude-oil' | 'natural-gas' | 'renewables'
    time: string
    summary: string
    source: string
    url: string
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
    private sampleHeadlines: Headline[] = [
        {
            id: '1',
            title: 'EU Announces New Carbon Trading Framework',
            category: 'regulation',
            time: '2 hours ago',
            summary: '',
            source: '',
            url: '',
            impact: 'medium'
        },
        {
            id: '2',
            title: 'Global Oil Demand Expected to Peak by 2030',
            category: 'market',
            time: '3 hours ago',
            summary: '',
            source: '',
            url: '',
            impact: 'medium'
        },
        {
            id: '3',
            title: '$2B Investment in Renewable Energy Projects',
            category: 'investment',
            time: '4 hours ago',
            summary: '',
            source: '',
            url: '',
            impact: 'high'
        },
        {
            id: '4',
            title: 'Breakthrough in Solar Panel Efficiency',
            category: 'innovation',
            time: '5 hours ago',
            summary: '',
            source: '',
            url: '',
            impact: 'high'
        },
        {
            id: '5',
            title: 'Natural Gas Prices Surge on Supply Concerns',
            category: 'market',
            time: '6 hours ago',
            summary: '',
            source: '',
            url: '',
            impact: 'medium'
        },
        {
            id: '6',
            title: 'New Regulations for Energy Storage Systems',
            category: 'regulation',
            time: '7 hours ago',
            summary: '',
            source: '',
            url: '',
            impact: 'high'
        },
        {
            id: '7',
            title: 'Green Hydrogen Projects Attract Major Funding',
            category: 'investment',
            time: '8 hours ago',
            summary: '',
            source: '',
            url: '',
            impact: 'high'
        },
        {
            id: '8',
            title: 'AI-Powered Grid Management System Launched',
            category: 'innovation',
            time: '9 hours ago',
            summary: '',
            source: '',
            url: '',
            impact: 'high'
        }
    ]

    constructor() {
        if (typeof window === 'undefined') {
            throw new Error('HeadlinesService must be instantiated on the client side')
        }
    }

    public static getInstance(): HeadlinesService {
        if (!HeadlinesService.instance) {
            HeadlinesService.instance = new HeadlinesService()
        }
        return HeadlinesService.instance
    }

    async getHeadlines(): Promise<Headline[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this.sampleHeadlines
    }

    async getHeadlinesByCategory(category: string): Promise<Headline[]> {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this.sampleHeadlines.filter(headline => headline.category === category)
    }
} 