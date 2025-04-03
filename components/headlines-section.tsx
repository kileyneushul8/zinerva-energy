"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { HeadlinesService, Headline } from '@/lib/services/headlines.service'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Scale, TrendingUp, Briefcase, Lightbulb, LucideIcon } from 'lucide-react'

interface HeadlinesSectionProps {
    limit?: number
}

type CategoryIconMap = {
    [K in 'regulatory' | 'market-insights' | 'investment' | 'innovation']: LucideIcon
}

const categoryIcons: CategoryIconMap = {
    'regulatory': Scale,
    'market-insights': TrendingUp,
    'investment': Briefcase,
    'innovation': Lightbulb
}

export function HeadlinesSection({ limit }: HeadlinesSectionProps) {
    const [headlines, setHeadlines] = useState<Headline[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [service, setService] = useState<HeadlinesService | null>(null)

    useEffect(() => {
        try {
            const headlinesService = HeadlinesService.getInstance()
            setService(headlinesService)
        } catch (err) {
            setError('Failed to initialize headlines service')
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!service) return

        const fetchHeadlines = async () => {
            try {
                const data = await service.getHeadlines()
                setHeadlines(limit ? data.slice(0, limit) : data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch headlines')
            } finally {
                setIsLoading(false)
            }
        }

        fetchHeadlines()
    }, [service, limit])

    if (isLoading) {
        return <div>Loading headlines...</div>
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
                        className={cn(
                            "flex items-start gap-3 p-3 rounded-lg",
                            "hover:bg-teal-50/50 transition-colors duration-200"
                        )}
                    >
                        <div className="p-2 bg-teal-100/50 rounded-full">
                            <Icon className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-teal-900 leading-snug mb-1">
                                {headline.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-xs">
                                    {headline.category}
                                </Badge>
                                <span className="text-xs text-teal-500">
                                    {headline.time}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
} 