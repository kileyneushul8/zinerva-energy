import { useState, useEffect } from 'react'
import { generateDetailedChartData } from '@/lib/market-data'
import { connectSocket, disconnectSocket } from '@/lib/socket'
import type { DetailedMarketData, CategoryId, TimeRange } from '@/lib/market-data'

export const useMarketData = (category: CategoryId = 'crude-oil', timeRange: TimeRange = '1D') => {
  const [data, setData] = useState<DetailedMarketData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const marketData = await generateDetailedChartData(category, timeRange)
        setData(marketData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch market data'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [category, timeRange])

  useEffect(() => {
    const socket = connectSocket()

    const handleMarketUpdate = (update: DetailedMarketData) => {
      setData(prevData => {
        const newData = [...prevData]
        newData.push(update)
        return newData.slice(-100) // Keep last 100 data points
      })
    }

    socket.on('market_update', handleMarketUpdate)

    return () => {
      socket.off('market_update', handleMarketUpdate)
      disconnectSocket(socket)
    }
  }, [])

  return { data, isLoading, error }
} 