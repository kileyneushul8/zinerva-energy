import axios from 'axios'

export interface Headline {
    id: string
    title: string
    category: 'regulation' | 'market' | 'investment' | 'innovation' | 'crude-oil' | 'natural-gas' | 'renewables'
    time: string
    summary: string
    source: string
    url: string
    impact: 'high' | 'medium' | 'low'
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
            title: 'New Regulatory Framework for Energy Markets',
            category: 'regulation',
            time: '2 hours ago',
            summary: 'Government announces new regulatory framework for energy markets',
            source: 'Energy News',
            url: '#',
            impact: 'high'
        },
        {
            id: '2',
            title: 'Market Analysis: Energy Sector Trends',
            category: 'market',
            time: '4 hours ago',
            summary: 'Latest market analysis shows significant trends in energy sector',
            source: 'Market Watch',
            url: '#',
            impact: 'medium'
        },
        {
            id: '3',
            title: 'Major Investment in Renewable Energy',
            category: 'investment',
            time: '6 hours ago',
            summary: 'Global investment in renewable energy reaches new heights',
            source: 'Financial Times',
            url: '#',
            impact: 'high'
        },
        {
            id: '4',
            title: 'Innovation in Energy Storage Technology',
            category: 'innovation',
            time: '8 hours ago',
            summary: 'Breakthrough in energy storage technology announced',
            source: 'Tech Review',
            url: '#',
            impact: 'high'
        },
        {
            id: '5',
            title: 'Crude Oil Prices Surge',
            category: 'crude-oil',
            time: '10 hours ago',
            summary: 'Crude oil prices surge due to supply concerns',
            source: 'Oil Daily',
            url: '#',
            impact: 'high'
        },
        {
            id: '6',
            title: 'Natural Gas Market Update',
            category: 'natural-gas',
            time: '12 hours ago',
            summary: 'Natural gas market shows strong growth potential',
            source: 'Gas Weekly',
            url: '#',
            impact: 'medium'
        },
        {
            id: '7',
            title: 'Renewable Energy Adoption Accelerates',
            category: 'renewables',
            time: '14 hours ago',
            summary: 'Global adoption of renewable energy accelerates',
            source: 'Green Energy',
            url: '#',
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

    public async getHeadlines(): Promise<Headline[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this.sampleHeadlines
    }

    public async getHeadlinesByCategory(category: Headline['category']): Promise<Headline[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this.sampleHeadlines.filter(headline => headline.category === category)
    }
} 