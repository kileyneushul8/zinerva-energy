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
    ArrowRight, RefreshCw, Filter, ChevronLeft, FileText, DollarSign, Droplet, Flame, Sun
} from "lucide-react"
import Link from 'next/link'

// News categories
type NewsCategoryId = 'regulation' | 'market' | 'investment' | 'innovation' | 'crude-oil' | 'natural-gas' | 'renewables'

const headlineCategories = [
    { id: 'regulation' as NewsCategoryId, label: 'Regulatory', icon: FileText },
    { id: 'market' as NewsCategoryId, label: 'Market Insights', icon: TrendingUp },
    { id: 'investment' as NewsCategoryId, label: 'Investment', icon: DollarSign },
    { id: 'innovation' as NewsCategoryId, label: 'Innovation', icon: Lightbulb },
    { id: 'crude-oil' as NewsCategoryId, label: 'Crude Oil', icon: Droplet },
    { id: 'natural-gas' as NewsCategoryId, label: 'Natural Gas', icon: Flame },
    { id: 'renewables' as NewsCategoryId, label: 'Renewables', icon: Sun }
]

const sampleHeadlines: Headline[] = [
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
        title: 'Global Carbon Trading Framework Update',
        category: 'regulation',
        time: new Date().toLocaleString(),
        summary: 'International carbon trading framework receives major updates to streamline cross-border emissions trading.',
        source: 'Climate Policy Journal',
        url: '#',
        impact: 'medium'
    },
    {
        id: 'reg3',
        title: 'Renewable Energy Tax Credit Extension',
        category: 'regulation',
        time: new Date().toLocaleString(),
        summary: 'Congress extends renewable energy tax credits for another five years, providing stability for clean energy investments.',
        source: 'Energy Policy Review',
        url: '#',
        impact: 'high'
    },
    {
        id: 'market1',
        title: 'Crude Oil Prices Reach 3-Month High',
        category: 'market',
        time: new Date().toLocaleString(),
        summary: 'Crude oil prices surge to highest levels in three months amid supply concerns and increased demand.',
        source: 'Energy Markets Today',
        url: '#',
        impact: 'high'
    },
    {
        id: 'market2',
        title: 'Natural Gas Storage Levels Below Average',
        category: 'natural-gas',
        time: new Date().toLocaleString(),
        summary: 'Natural gas storage levels fall below seasonal averages, signaling potential price volatility ahead.',
        source: 'Gas Market Monitor',
        url: '#',
        impact: 'medium'
    },
    {
        id: 'market3',
        title: 'Renewable Energy Capacity Growth Accelerates',
        category: 'renewables',
        time: new Date().toLocaleString(),
        summary: 'Global renewable energy capacity growth exceeds expectations, driven by falling costs and policy support.',
        source: 'Renewable Energy World',
        url: '#',
        impact: 'high'
    },
    {
        id: 'inv1',
        title: 'Major Investment in Hydrogen Infrastructure',
        category: 'investment',
        time: new Date().toLocaleString(),
        summary: 'Consortium announces $2 billion investment in hydrogen production and distribution infrastructure.',
        source: 'Energy Investment News',
        url: '#',
        impact: 'high'
    },
    {
        id: 'inv2',
        title: 'New Energy Storage Fund Launches',
        category: 'investment',
        time: new Date().toLocaleString(),
        summary: 'Investment firm launches $500 million fund focused on energy storage technologies and grid-scale solutions.',
        source: 'Investment Weekly',
        url: '#',
        impact: 'medium'
    },
    {
        id: 'inv3',
        title: 'Clean Energy Startups Raise Record Funding',
        category: 'investment',
        time: new Date().toLocaleString(),
        summary: 'Clean energy startups secure record $1.2 billion in venture capital funding in Q2 2024.',
        source: 'TechCrunch Energy',
        url: '#',
        impact: 'high'
    },
    {
        id: 'inn1',
        title: 'Breakthrough in Solar Cell Efficiency',
        category: 'innovation',
        time: new Date().toLocaleString(),
        summary: 'Researchers achieve 30% efficiency in perovskite solar cells, marking significant progress in renewable energy technology.',
        source: 'Science Daily',
        url: '#',
        impact: 'high'
    },
    {
        id: 'inn2',
        title: 'New Battery Technology Promises Faster Charging',
        category: 'innovation',
        time: new Date().toLocaleString(),
        summary: 'Innovative battery design enables 5-minute charging for electric vehicles, potentially revolutionizing the industry.',
        source: 'Tech Innovation Review',
        url: '#',
        impact: 'high'
    },
    {
        id: 'inn3',
        title: 'AI-Powered Grid Management System Launched',
        category: 'innovation',
        time: new Date().toLocaleString(),
        summary: 'New AI system improves grid efficiency by 15% through real-time demand prediction and optimization.',
        source: 'Smart Grid Today',
        url: '#',
        impact: 'high'
    }
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
                if (selectedCategory === 'regulation') {
                    filteredHeadlines = sampleHeadlines.filter(headline => headline.category === 'regulation')
                } else if (selectedCategory === 'market') {
                    filteredHeadlines = sampleHeadlines.filter(headline => headline.category === 'market')
                } else if (selectedCategory === 'investment') {
                    filteredHeadlines = sampleHeadlines.filter(headline => headline.category === 'investment')
                } else if (selectedCategory === 'innovation') {
                    filteredHeadlines = sampleHeadlines.filter(headline => headline.category === 'innovation')
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
                    <div className="space-y-4">
                        {isLoading ? (
                            // Loading skeletons
                            Array(6).fill(0).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-lg shadow-sm p-4 animate-pulse"
                                >
                                    <div className="h-4 bg-[#2F4D48]/10 rounded w-3/4 mb-4" />
                                    <div className="h-3 bg-[#2F4D48]/5 rounded w-1/2" />
                                </motion.div>
                            ))
                        ) : headlines.length > 0 ? (
                            headlines.map((headline) => (
                                <motion.div
                                    key={headline.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-teal-50 rounded-lg">
                                            {headlineCategories.find(cat => cat.id === headline.category)?.icon && (
                                                <div className="w-5 h-5 text-teal-600">
                                                    {React.createElement(
                                                        headlineCategories.find(cat => cat.id === headline.category)?.icon || Filter
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-medium text-teal-900">{headline.title}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {headlineCategories.find(cat => cat.id === headline.category)?.label}
                                                </Badge>
                                                <span className="text-xs text-teal-500">{headline.time}</span>
                                            </div>
                                        </div>
                                    </div>
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