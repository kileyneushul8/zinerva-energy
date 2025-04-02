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
                headline.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                headline.summary.toLowerCase().includes(searchQuery.toLowerCase())
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredHeadlines.map((headline, index) => (
                            <motion.div
                                key={headline.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className={`group p-4 rounded-lg border border-teal-50 hover:border-teal-100 
                  bg-white/50 hover:bg-white transition-all duration-200 cursor-pointer
                  ${expandedHeadline === index ? 'md:col-span-2' : ''}`}
                                onClick={() => setExpandedHeadline(expandedHeadline === index ? null : index)}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge
                                                variant="secondary"
                                                className={`
                          ${headline.impact === 'high'
                                                        ? 'bg-amber-50 text-amber-700'
                                                        : 'bg-teal-50 text-teal-700'}
                          text-base
                        `}
                                            >
                                                {headline.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                                            </Badge>
                                            <Badge variant="outline" className="bg-white/50 text-base">
                                                {headlineCategories.find(c => c.id === headline.category)?.label}
                                            </Badge>
                                        </div>
                                        <h3 className="text-xl text-teal-900 font-medium group-hover:text-teal-700 
                      transition-colors duration-200 leading-snug"
                                        >
                                            {headline.title}
                                        </h3>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: expandedHeadline === index ? 'auto' : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-teal-600 mt-2 mb-4 text-lg">{headline.summary}</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-base"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            window.open(headline.url, '_blank')
                                        }}
                                    >
                                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </motion.div>
                                <div className="flex items-center gap-2 text-base text-teal-600 mt-4">
                                    <span className="font-medium">{headline.source}</span>
                                    <span>•</span>
                                    <span>{headline.time}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
} 