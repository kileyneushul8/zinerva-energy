import React, { useState, useEffect } from 'react'
import { Activity } from 'lucide-react'

export function LiveTimeDisplay() {
    const [time, setTime] = useState(() =>
        new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    )

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center gap-2 text-sm text-teal-600">
            <Activity className="w-4 h-4" />
            <span>Last updated: {time}</span>
        </div>
    )
} 