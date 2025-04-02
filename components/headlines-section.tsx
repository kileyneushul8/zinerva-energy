"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { HeadlinesService } from '@/lib/services/headlines.service'
import { Headline } from '@/lib/services/headlines.service'

export function HeadlinesSection() {
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
                setHeadlines(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch headlines')
            } finally {
                setIsLoading(false)
            }
        }

        fetchHeadlines()
    }, [service])

    if (isLoading) {
        return <div>Loading headlines...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {headlines.map((headline) => (
                <Card key={headline.id} className="overflow-hidden">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">{headline.source}</span>
                            <span className="text-sm text-muted-foreground">{headline.time}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{headline.title}</h3>
                        <p className="text-sm text-muted-foreground">{headline.summary}</p>
                        <a
                            href={headline.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline mt-2 inline-block"
                        >
                            Read more
                        </a>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
} 