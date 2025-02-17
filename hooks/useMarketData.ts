import { useState, useEffect } from 'react'
import { connectSocket, disconnectSocket } from '@/lib/socket'
import { generateDetailedChartData } from '@/lib/market-data'

export const useMarketData = () => {
  const [data, setData] = useState(generateDetailedChartData())
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [socketStatus, setSocketStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected')
  const [retryCount, setRetryCount] = useState(0)
  const MAX_RETRIES = 3

  useEffect(() => {
    let mounted = true
    let reconnectTimer: NodeJS.Timeout

    const initializeSocket = () => {
      if (retryCount >= MAX_RETRIES) {
        console.log('Max retries reached, using generated data')
        setSocketStatus('error')
        setError(new Error('Unable to connect to market data stream'))
        setData(generateDetailedChartData())
        setIsLoading(false)
        return
      }

      try {
        const socket = connectSocket()

        socket.on('connect', () => {
          if (mounted) {
            console.log('Socket connected successfully')
            setSocketStatus('connected')
            setError(null)
            setIsLoading(false)
            setRetryCount(0) // Reset retry count on successful connection
          }
        })

        socket.on('disconnect', () => {
          if (mounted) {
            console.log('Socket disconnected')
            setSocketStatus('disconnected')
            // Use latest generated data on disconnect
            setData(generateDetailedChartData())
          }
        })

        socket.on('market-data', (newData: any) => {
          if (mounted) {
            setData(newData)
            setIsLoading(false)
          }
        })

        socket.on('connect_error', (err: Error) => {
          console.error('Socket connection error:', err)
          if (mounted) {
            setSocketStatus('error')
            setError(err)
            setIsLoading(false)
            setData(generateDetailedChartData())
            setRetryCount(prev => prev + 1)

            // Try to reconnect after a delay
            reconnectTimer = setTimeout(() => {
              if (mounted && retryCount < MAX_RETRIES) {
                console.log(`Retrying connection (${retryCount + 1}/${MAX_RETRIES})`)
                socket.connect()
              }
            }, 5000) // Wait 5 seconds before retrying
          }
        })

        return () => {
          mounted = false
          clearTimeout(reconnectTimer)
          disconnectSocket()
        }
      } catch (err) {
        console.error('Error initializing socket:', err)
        if (mounted) {
          setSocketStatus('error')
          setError(err as Error)
          setIsLoading(false)
          setData(generateDetailedChartData())
        }
      }
    }

    initializeSocket()

    return () => {
      mounted = false
      clearTimeout(reconnectTimer)
    }
  }, [retryCount])

  // Update data periodically even when using generated data
  useEffect(() => {
    if (socketStatus !== 'connected') {
      const interval = setInterval(() => {
        setData(generateDetailedChartData())
      }, 5000) // Update every 5 seconds

      return () => clearInterval(interval)
    }
  }, [socketStatus])

  return { 
    data, 
    error, 
    isLoading, 
    socketStatus,
    isLive: socketStatus === 'connected'
  }
} 