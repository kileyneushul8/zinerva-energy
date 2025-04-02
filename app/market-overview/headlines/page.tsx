"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { HeadlinesService, Headline } from '@/lib/services/headlines.service'
import {
    Scale, TrendingUp, Briefcase, Lightbulb,
    ArrowRight, RefreshCw, Filter, ChevronLeft
} from "lucide-react"
import Link from 'next/link'

// News categories
type NewsCategoryId = 'regulatory' | 'market-insights' | 'investment' | 'innovation'

const headlineCategories = [
    { id: 'regulatory' as NewsCategoryId, label: 'Regulatory', icon: Scale },
    { id: 'market-insights' as NewsCategoryId, label: 'Market Insights', icon: TrendingUp },
    { id: 'investment' as NewsCategoryId, label: 'Investment', icon: Briefcase },
    { id: 'innovation' as NewsCategoryId, label: 'Innovation', icon: Lightbulb }
]

const HeadlinesPage: React.FC = () => {
    const [headlines, setHeadlines] = useState<Headline[]>([])
    const [selectedCategory, setSelectedCategory] = useState<NewsCategoryId | 'all'>('all')
    const [isLoading, setIsLoading] = useState(true)

    const fetchHeadlines = async () => {
        setIsLoading(true)
        try {
            const headlinesService = HeadlinesService.getInstance()
            const allHeadlines = await headlinesService.getHeadlines()

            // Filter headlines based on selected category
            let filteredHeadlines = selectedCategory === 'all'
                ? allHeadlines
                : allHeadlines.filter(headline => headline.category === selectedCategory)

            // If no headlines found for the category, show default headlines
            if (filteredHeadlines.length === 0) {
                if (selectedCategory === 'regulatory') {
                    filteredHeadlines = [
                        {
                            id: 'reg1',
                            title: 'New EPA Regulations Impact Energy Sector',
                            category: 'regulation',
                            time: new Date().toLocaleString(),
                            summary: 'New environmental regulations announced by the EPA will significantly impact energy production and distribution.',
                            source: 'Energy News Daily',
                            url: '#',
                            impact: 'high'
                        },
                        {
                            id: 'reg2',
                            title: 'Global Climate Policy Updates',
                            category: 'regulation',
                            time: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString(),
                            summary: 'Major updates to global climate policies expected to shape energy market dynamics.',
                            source: 'Climate Policy Journal',
                            url: '#',
                            impact: 'medium'
                        },
                        {
                            id: 'reg3',
                            title: 'Carbon Emission Standards Revised',
                            category: 'regulation',
                            time: new Date(Date.now() - 48 * 60 * 60 * 1000).toLocaleString(),
                            summary: 'Updated carbon emission standards set new benchmarks for energy companies.',
                            source: 'Environmental Policy Review',
                            url: '#',
                            impact: 'high'
                        }
                    ]
                } else if (selectedCategory === 'market-insights') {
                    filteredHeadlines = [
                        {
                            id: 'mkt1',
                            title: 'Energy Market Trends Analysis',
                            category: 'market-analysis',
                            time: new Date().toLocaleString(),
                            summary: 'Latest analysis shows shifting patterns in global energy consumption and production.',
                            source: 'Market Analysis Weekly',
                            url: '#',
                            impact: 'high'
                        },
                        {
                            id: 'mkt2',
                            title: 'Supply Chain Impact on Energy Prices',
                            category: 'market-analysis',
                            time: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString(),
                            summary: 'How global supply chain disruptions are affecting energy market prices and availability.',
                            source: 'Energy Economics Review',
                            url: '#',
                            impact: 'medium'
                        },
                        {
                            id: 'mkt3',
                            title: 'Renewable Energy Market Growth',
                            category: 'market-analysis',
                            time: new Date(Date.now() - 48 * 60 * 60 * 1000).toLocaleString(),
                            summary: 'Renewable energy sector shows unprecedented growth in Q1 2024.',
                            source: 'Market Intelligence Report',
                            url: '#',
                            impact: 'high'
                        }
                    ]
                }
            }

            setHeadlines(filteredHeadlines)
        } catch (error) {
            console.error('Error fetching headlines:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchHeadlines()
    }, [selectedCategory])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <div className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <Link href="/market-overview" className="flex items-center text-[#2F4D48] hover:text-[#E9A268]">
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            Back to Market Overview
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-[#2F4D48] py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-block px-4 py-1 rounded-full bg-[#E9A268]/10 text-[#E9A268] text-sm font-medium mb-6">
                            Real-time Market Data
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">Market Headlines</h1>
                        <p className="text-lg text-white/90">Stay updated with the latest energy market news and insights</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category Filter */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
                        <Button
                            variant={selectedCategory === 'all' ? "default" : "outline"}
                            size="sm"
                            className={cn(
                                "flex items-center gap-2 whitespace-nowrap",
                                selectedCategory === 'all' && "bg-[#2F4D48] hover:bg-[#243B37]"
                            )}
                            onClick={() => setSelectedCategory('all')}
                        >
                            <Filter className="w-4 h-4" />
                            All Categories
                        </Button>
                        {headlineCategories.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                    "flex items-center gap-2 whitespace-nowrap",
                                    selectedCategory === category.id && "bg-[#2F4D48] hover:bg-[#243B37]"
                                )}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                <category.icon className="w-4 h-4" />
                                {category.label}
                            </Button>
                        ))}
                    </div>

                    {/* Headlines Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            // Loading skeletons
                            Array(6).fill(0).map((_, i) => (
                                <Card key={i} className="animate-pulse">
                                    <CardContent className="p-6">
                                        <div className="h-4 bg-[#2F4D48]/10 rounded w-3/4 mb-4" />
                                        <div className="h-3 bg-[#2F4D48]/5 rounded w-1/2" />
                                    </CardContent>
                                </Card>
                            ))
                        ) : headlines.length > 0 ? (
                            headlines.map((headline) => (
                                <motion.div
                                    key={headline.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link href={`/market-overview/headlines/${headline.id}`}>
                                        <Card className="h-full hover:shadow-md transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-full bg-[#2F4D48]/5">
                                                        {headlineCategories.find(cat => cat.id === headline.category)?.icon && (
                                                            <div className="w-5 h-5 text-[#2F4D48]">
                                                                {React.createElement(
                                                                    headlineCategories.find(cat => cat.id === headline.category)?.icon || Filter
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-[#2F4D48] mb-2">
                                                            {headline.title}
                                                        </h3>
                                                        <p className="text-sm text-[#2F4D48]/70 mb-4 line-clamp-2">
                                                            {headline.summary}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <Badge variant="secondary" className="text-xs bg-[#E9A268]/10 text-[#E9A268]">
                                                                {headlineCategories.find(cat => cat.id === headline.category)?.label}
                                                            </Badge>
                                                            <span className="text-xs text-[#2F4D48]/60">
                                                                {headline.time}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-[#2F4D48]/60">
                                No headlines available for {selectedCategory === 'all' ? 'any category' : headlineCategories.find(cat => cat.id === selectedCategory)?.label}
                            </div>
                        )}
                    </div>

                    {/* Refresh Button */}
                    <div className="mt-8 text-center">
                        <Button
                            variant="outline"
                            onClick={fetchHeadlines}
                            className="text-[#2F4D48] hover:text-[#E9A268] hover:border-[#E9A268]"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh Headlines
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeadlinesPage 