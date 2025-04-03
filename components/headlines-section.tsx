"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { HeadlinesService, Headline } from '@/lib/services/headlines.service'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { FileText, TrendingUp, DollarSign, Lightbulb, Droplet, Flame, Sun } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface HeadlinesSectionProps {
    limit?: number
}

type CategoryIconMap = {
    'regulation': LucideIcon
    'market': LucideIcon
    'investment': LucideIcon
    'innovation': LucideIcon
    'crude-oil': LucideIcon
    'natural-gas': LucideIcon
    'renewables': LucideIcon
}

const categoryIcons: CategoryIconMap = {
    'regulation': FileText,
    'market': TrendingUp,
    'investment': DollarSign,
    'innovation': Lightbulb,
    'crude-oil': Droplet,
    'natural-gas': Flame,
    'renewables': Sun
}

export function HeadlinesSection({ limit }: HeadlinesSectionProps) {
    const [headlines, setHeadlines] = useState<Headline[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [service, setService] = useState<HeadlinesService | null>(null)

    useEffect(() => {
        try {
            const headlinesService = HeadlinesService.getInstance()
            setService(headlinesService)
        } catch (err) {
            setError('Failed to initialize headlines service')
            setLoading(false)
        }
    }, [])

    const fetchHeadlines = React.useCallback(async () => {
        setLoading(true)
        try {
            const data = await service?.getHeadlines()
            if (data) {
                setHeadlines(limit ? data.slice(0, limit) : data)
            } else {
                setHeadlines([])
            }
        } catch (error) {
            console.error('Error fetching headlines:', error)
            setHeadlines([])
        } finally {
            setLoading(false)
        }
    }, [service, limit])

    useEffect(() => {
        fetchHeadlines()
    }, [fetchHeadlines])

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(limit || 5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="space-y-4">
            {headlines.map((headline, index) => {
                const Icon = categoryIcons[headline.category as keyof CategoryIconMap]
                return (
                    <motion.div
                        key={headline.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer"
                    >
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-shrink-0">
                                <Icon className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {headline.title}
                                </p>
                                <div className="mt-1 flex items-center space-x-2">
                                    <Badge variant="outline" className="text-xs">
                                        {headline.category}
                                    </Badge>
                                    <span className="text-xs text-gray-500">{headline.time}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
} 