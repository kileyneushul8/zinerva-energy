import { NextResponse } from 'next/server'

// This is simulated data - in a real app, this would connect to a real market data API
async function fetchMarketData() {
  return {
    timestamp: new Date().toISOString(),
    commodities: {
      crudeOil: { 
        price: 75.20 + Math.random() * 2, 
        change: (Math.random() * 2 - 1).toFixed(2) 
      },
      naturalGas: { 
        price: 2.80 + Math.random() * 0.2, 
        change: (Math.random() * 0.2 - 0.1).toFixed(2) 
      },
      electricity: { 
        price: 42.50 + Math.random() * 3, 
        change: (Math.random() * 3 - 1.5).toFixed(2) 
      }
    },
    trends: [
      { name: "Supply Chain Optimization", trend: "Increasing", impact: "High" },
      { name: "Renewable Integration", trend: "Stable", impact: "Medium" },
      { name: "Market Volatility", trend: "Decreasing", impact: "Medium" }
    ]
  }
}

export async function GET() {
  try {
    // Generate some mock data for now
    const data = Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      price: 100 + Math.random() * 10,
      volume: Math.floor(1000000 + Math.random() * 500000),
      change: (Math.random() - 0.5) * 2
    }))

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    )
  }
} 