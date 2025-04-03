"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { HeadlinesService, Headline } from '@/lib/services/headlines.service'
import {
    Globe, TrendingUp, Briefcase, Scale, Lightbulb,
    Search, Filter, ArrowRight
} from "lucide-react"
import React from "react"

const headlineCategories = [
    { id: 'all', label: 'All', icon: Globe },
    { id: 'market-analysis', label: 'Market Analysis', icon: TrendingUp },
    { id: 'investment', label: 'Investment', icon: Briefcase },
    { id: 'regulation', label: 'Regulation', icon: Scale },
    { id: 'innovation', label: 'Innovation', icon: Lightbulb }
]

export default function NewsPage() {
    const [headlines, setHeadlines] = useState<Headline[]>([])
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedHeadline, setExpandedHeadline] = useState<number | null>(null)
    const headlinesService = useRef<HeadlinesService | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            headlinesService.current = HeadlinesService.getInstance()
            fetchHeadlines()
        }
    }, [])

    const fetchHeadlines = async () => {
        if (headlinesService.current) {
            const latestHeadlines = await headlinesService.current.getHeadlines()
            setHeadlines(latestHeadlines)
        }
    }

    const filteredHeadlines = useMemo(() => {
        return headlines.filter(headline => {
            const matchesCategory = activeCategory === 'all' || headline.category === activeCategory
            const matchesSearch = searchQuery === '' ||
                headline.title.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
    }, [headlines, activeCategory, searchQuery])

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-teal-900">Energy News</h1>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-base"
                        onClick={() => window.history.back()}
                    >
                        Back to Dashboard
                    </Button>
                </div>

                {/* Search and Filter */}
                <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400" />
                                    <Input
                                        placeholder="Search headlines..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 text-base"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="text-teal-400" />
                                <div className="flex items-center gap-1">
                                    {headlineCategories.map((category) => (
                                        <Button
                                            key={category.id}
                                            variant={activeCategory === category.id ? "secondary" : "ghost"}
                                            size="sm"
                                            onClick={() => setActiveCategory(category.id)}
                                            className="flex items-center gap-1 transition-all duration-200 text-base px-3 py-1"
                                        >
                                            <category.icon className="w-5 h-5" />
                                            <span>{category.label}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Headlines Grid */}
                <div className="space-y-4">
                    {filteredHeadlines.map((headline) => (
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
                    ))}
                </div>
            </div>
        </div>
    )
} 