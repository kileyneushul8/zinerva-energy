"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from 'next-themes'

interface MarketData {
  timestamp: string
  price: number
  volume: number
  change: number
}

export function MarketInsights() {
  const { theme } = useTheme()
  const [data, setData] = useState<MarketData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const gridColor = theme === 'dark' ? '#333' : '#eee'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/market-data')
        if (!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()
        setData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <div>Loading market data...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-6">
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={data}
                className="bg-card"
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={gridColor}
                  opacity={0.5}
                />
                <XAxis 
                  dataKey="timestamp" 
                  stroke={theme === 'dark' ? '#888' : '#666'}
                />
                <YAxis
                  stroke={theme === 'dark' ? '#888' : '#666'}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#333' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

