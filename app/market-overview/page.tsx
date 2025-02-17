"use client"

import { motion, useScroll, useTransform, animate } from "framer-motion"
import { useState, useEffect, useId, useRef, useMemo } from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, BarChart, Bar, LineChart, Line, ComposedChart, Scatter, Cell, ReferenceDot
} from 'recharts'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity, Droplet, Flame, Factory, Leaf,
  ArrowUpRight, ArrowDownRight, Clock,
  Newspaper, TrendingUp, TrendingDown, Globe,
  BarChart2, Zap, AlertCircle,
  LineChart as LineChartIcon, BarChart2 as ChartBar, GitGraph, Minimize2, Maximize2,
  Calendar, Download, Share2, RefreshCw,
  ZoomIn, ZoomOut, ChevronLeft, ChevronRight,
  Calendar as CalendarIcon, ArrowLeft, ArrowRight,
  ChevronUp, ChevronDown, Filter,
  FileText, Briefcase, Scale, Lightbulb,
  Info, AlertTriangle, BarChart3, PieChart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { AnimatePresence } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

interface Headline {
  id: number
  title: string
  source: string
  time: string
  category: string
  impact: 'high' | 'medium' | 'low'
  summary: string
}

const latestHeadlines: Headline[] = [
  {
    id: 1,
    title: "Global Energy Markets Show Strong Recovery in Q1",
    source: "Energy Weekly",
    time: "1 hour ago",
    category: "market-analysis",
    impact: "high",
    summary: "Markets demonstrate resilience with a 15% increase in trading volume..."
  },
  {
    id: 2,
    title: "Renewable Energy Investment Hits New Record of $500B",
    source: "Green Energy Report",
    time: "2 hours ago",
    category: "investment",
    impact: "high",
    summary: "Global investments in renewable energy reached unprecedented levels..."
  },
  {
    id: 3,
    title: "Natural Gas Prices Stabilize After Recent Volatility",
    source: "Commodity Insights",
    time: "3 hours ago",
    category: "market-analysis",
    impact: "medium",
    summary: "Natural gas markets show signs of stabilization following..."
  },
  {
    id: 4,
    title: "New Energy Policy Framework Announced for 2024",
    source: "Policy Watch",
    time: "4 hours ago",
    category: "regulation",
    impact: "high",
    summary: "Regulatory bodies introduce comprehensive framework..."
  },
  {
    id: 5,
    title: "Breakthrough in Energy Storage Technology",
    source: "Tech Review",
    time: "5 hours ago",
    category: "innovation",
    impact: "medium",
    summary: "Scientists develop new energy storage solution..."
  },
  {
    id: 6,
    title: "Major Merger in Renewable Energy Sector",
    source: "Industry News",
    time: "6 hours ago",
    category: "investment",
    impact: "high",
    summary: "Leading renewable energy companies announce strategic merger..."
  }
]

const LiveTimeDisplay = () => {
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

const productCategories = [
  {
    id: "crude-oil",
    name: "Crude Oil",
    icon: Droplet,
    metrics: {
      price: "$78.35",
      change: "+2.5%",
      volume: "1.2M",
      trend: "Bullish"
    }
  },
  {
    id: "natural-gas",
    name: "Natural Gas",
    icon: Flame,
    metrics: {
      price: "$3.42",
      change: "-1.2%",
      volume: "850K",
      trend: "Bearish"
    }
  },
  {
    id: "renewable",
    name: "Renewable",
    icon: Leaf,
    metrics: {
      price: "$62.18",
      change: "+4.2%",
      volume: "2.1M",
      trend: "Bullish"
    }
  },
  {
    id: "industrial",
    name: "Industrial",
    icon: Factory,
    metrics: {
      price: "$45.90",
      change: "+1.8%",
      volume: "950K",
      trend: "Neutral"
    }
  }
]

const headlineCategories = [
  { id: 'all', label: 'All', icon: Globe },
  { id: 'market-analysis', label: 'Market Analysis', icon: TrendingUp },
  { id: 'investment', label: 'Investment', icon: Briefcase },
  { id: 'regulation', label: 'Regulation', icon: Scale },
  { id: 'innovation', label: 'Innovation', icon: Lightbulb }
]

const marketAlerts = [
  {
    id: 1,
    type: 'warning',
    message: 'High volatility expected in Natural Gas markets',
    time: '2m ago'
  },
  {
    id: 2,
    type: 'success',
    message: 'Renewable Energy sector showing strong momentum',
    time: '5m ago'
  },
  {
    id: 3,
    type: 'info',
    message: 'Major policy announcement expected today',
    time: '10m ago'
  }
]

const marketStats = [
  {
    id: 1,
    title: 'Trading Volume',
    value: '2.4M',
    subtext: 'Daily Average',
    icon: BarChart2,
    trend: 'up',
    change: '+12%'
  },
  {
    id: 2,
    title: 'Market Cap',
    value: '$1.2T',
    subtext: 'Total Value',
    icon: Globe,
    trend: 'up',
    change: '+2.8%'
  },
  {
    id: 3,
    title: 'Top Gainer',
    value: 'Renewable',
    subtext: '+4.2% Today',
    icon: TrendingUp,
    trend: 'up',
    change: '+4.2%'
  },
  {
    id: 4,
    title: 'Top Decliner',
    value: 'Natural Gas',
    subtext: '-1.2% Today',
    icon: TrendingDown,
    trend: 'down',
    change: '-1.2%'
  }
]

const ChartTypes = {
  AREA: 'area',
  LINE: 'line',
  BAR: 'bar',
  COMPOSED: 'composed'
} as const

type ChartType = typeof ChartTypes[keyof typeof ChartTypes]

const chartTypeIcons = [
  { type: ChartTypes.AREA, icon: TrendingUp, label: 'Area' },
  { type: ChartTypes.LINE, icon: GitGraph, label: 'Line' },
  { type: ChartTypes.BAR, icon: BarChart2, label: 'Bar' },
  { type: ChartTypes.COMPOSED, icon: Activity, label: 'Composed' }
]

// Type for chart color schemes
type CategoryId = 'crude-oil' | 'natural-gas' | 'renewable' | 'industrial'

const chartColorSchemes: Record<CategoryId, {
  primary: string
  secondary: string
  gradient: string[]
  accent: string
}> = {
  'crude-oil': {
    primary: '#0d9488',
    secondary: '#14b8a6',
    gradient: ['rgba(13, 148, 136, 0.2)', 'rgba(13, 148, 136, 0.05)'],
    accent: '#0f766e'
  },
  'natural-gas': {
    primary: '#2563eb',
    secondary: '#3b82f6',
    gradient: ['rgba(37, 99, 235, 0.2)', 'rgba(37, 99, 235, 0.05)'],
    accent: '#1d4ed8'
  },
  'renewable': {
    primary: '#16a34a',
    secondary: '#22c55e',
    gradient: ['rgba(22, 163, 74, 0.2)', 'rgba(22, 163, 74, 0.05)'],
    accent: '#15803d'
  },
  'industrial': {
    primary: '#9333ea',
    secondary: '#a855f7',
    gradient: ['rgba(147, 51, 234, 0.2)', 'rgba(147, 51, 234, 0.05)'],
    accent: '#7e22ce'
  }
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.[0]) return null

  const data = payload[0].payload
  return (
    <div className="chart-tooltip">
      <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">Price</span>
          <span className="font-medium text-teal-700">
            ${data.value.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">Volume</span>
          <span className="font-medium text-teal-700">
            {(data.volume / 1000).toFixed(1)}K
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">Change</span>
          <span className={`font-medium ${data.change >= 0
            ? 'text-emerald-600'
            : 'text-red-600'
            }`}>
            {data.change >= 0 ? '+' : ''}
            {data.change.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}

// Type definitions
type ChartTimeRange = '1D' | '1W' | '1M' | '3M' | '1Y'
type AxisInterval = number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd'

interface MarketData {
  name: string
  value: number
  volume: number
  change: number
  volatility: number
  trend: number
  ma5?: number
  ma20?: number
}

interface MarketParams {
  baseValue: number
  volatility: number
  trendBias: number
  seasonality: number
  volumeBase: number
  volumeVariance: number
}

const MARKET_PARAMETERS: Record<CategoryId, MarketParams> = {
  'crude-oil': {
    baseValue: 75,
    volatility: 0.15,
    trendBias: 0.2,
    seasonality: 0.1,
    volumeBase: 1000000,
    volumeVariance: 500000
  },
  'natural-gas': {
    baseValue: 3.2,
    volatility: 0.25,
    trendBias: 0.15,
    seasonality: 0.3,
    volumeBase: 800000,
    volumeVariance: 400000
  },
  'renewable': {
    baseValue: 62,
    volatility: 0.1,
    trendBias: 0.3,
    seasonality: 0.05,
    volumeBase: 1200000,
    volumeVariance: 600000
  },
  'industrial': {
    baseValue: 45,
    volatility: 0.2,
    trendBias: 0.25,
    seasonality: 0.15,
    volumeBase: 900000,
    volumeVariance: 450000
  }
}

const calculateMovingAverage = (data: MarketData[], period: number): number[] => {
  return data.map((_, index) => {
    const start = Math.max(0, index - period + 1)
    const values = data.slice(start, index + 1).map(d => d.value)
    return values.reduce((sum, val) => sum + val, 0) / values.length
  })
}

const generateChartData = (category: CategoryId, timeRange: TimeRange): MarketData[] => {
  const data: MarketData[] = []
  const now = new Date()
  const params = MARKET_PARAMETERS[category]

  if (!params) {
    throw new Error(`Invalid category: ${category}`)
  }

  const timeConfig = {
    '1D': { points: 24, interval: 60 * 60 * 1000, volatilityMult: 1 },
    '1W': { points: 7 * 8, interval: 3 * 60 * 60 * 1000, volatilityMult: 1.2 },
    '1M': { points: 30, interval: 24 * 60 * 60 * 1000, volatilityMult: 1.5 },
    '3M': { points: 90, interval: 24 * 60 * 60 * 1000, volatilityMult: 1.8 },
    '1Y': { points: 52, interval: 7 * 24 * 60 * 60 * 1000, volatilityMult: 2 }
  }[timeRange]

  if (!timeConfig) {
    throw new Error(`Invalid time range: ${timeRange}`)
  }

  const { points, interval, volatilityMult } = timeConfig
  const startTime = now.getTime() - (points * interval)
  let lastValue = params.baseValue
  let trend = 0

  for (let i = 0; i <= points; i++) {
    // Calculate market components
    const time = new Date(startTime + (i * interval))
    const progress = i / points

    // Long-term trend
    trend += (Math.random() - 0.5) * params.trendBias
    trend = Math.max(Math.min(trend, 0.1), -0.1)

    // Seasonality component
    const seasonality = Math.sin(progress * Math.PI * 2) * params.seasonality

    // Market noise
    const noise = (Math.random() - 0.5) * params.volatility * volatilityMult

    // Combine components
    const totalChange = (trend + seasonality + noise) * lastValue
    lastValue = Math.max(lastValue + totalChange, 0)

    // Volume calculation with intraday pattern
    const timeOfDay = time.getHours() / 24
    const volumePattern = 1 + Math.sin(timeOfDay * Math.PI) * 0.5
    const volume = Math.floor(
      params.volumeBase * volumePattern +
      Math.random() * params.volumeVariance
    )

    // Volatility calculation
    const volatility = Math.abs(totalChange / lastValue)

    data.push({
      name: time.toISOString(),
      value: Number(lastValue.toFixed(2)),
      volume,
      change: Number(totalChange.toFixed(2)),
      volatility: Number(volatility.toFixed(4)),
      trend: Number(trend.toFixed(4))
    })
  }

  // Calculate moving averages
  const ma5 = calculateMovingAverage(data, 5)
  const ma20 = calculateMovingAverage(data, 20)

  return data.map((point, i) => ({
    ...point,
    ma5: Number(ma5[i].toFixed(2)),
    ma20: Number(ma20[i].toFixed(2))
  }))
}

// Type-safe event handlers for Radix UI components
const handleCategoryChange = (value: string, setter: (value: CategoryId) => void) => {
  if (isValidCategory(value)) {
    setter(value)
  }
}

const handleTimeRangeChange = (value: string, setter: (value: TimeRange) => void) => {
  if (isValidTimeRange(value)) {
    setter(value)
  }
}

// Type guards
const isValidCategory = (value: string): value is CategoryId => {
  return Object.keys(MARKET_PARAMETERS).includes(value)
}

const isValidTimeRange = (value: string): value is TimeRange => {
  return ['1D', '1W', '1M', '3M', '1Y'].includes(value)
}

// Add back the formatXAxis function
const formatXAxisTime = (tickItem: string, timeRange: TimeRange) => {
  const date = new Date(tickItem)

  switch (timeRange) {
    case '1D':
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true
      })

    case '1W':
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: 'numeric'
      })

    case '1M':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })

    case '3M':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })

    case '1Y':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit'
      })

    default:
      return tickItem
  }
}

const ChartContainer = ({ data, chartType, category, timeRange }: {
  data: any[]
  chartType: ChartType
  category: CategoryId
  timeRange: TimeRange
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const formatYAxis = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toFixed(1)
  }

  const getAxisInterval = (timeRange: TimeRange): AxisInterval => {
    switch (timeRange) {
      case '1D':
        return 3
      case '1W':
        return 'preserveStartEnd'
      case '1M':
        return 'preserveStartEnd'
      case '3M':
        return 'preserveStartEnd'
      case '1Y':
        return 'preserveStartEnd'
      default:
        return 'preserveStartEnd'
    }
  }

  const commonXAxisProps = {
    dataKey: "name",
    axisLine: { stroke: '#94a3b8', strokeWidth: 1 },
    tickLine: false,
    tick: {
      fill: '#115e59',
      fontSize: 12,
      fontWeight: 500
    },
    dy: 10,
    interval: getAxisInterval(timeRange),
    tickFormatter: (value: string) => formatXAxisTime(value, timeRange),
    minTickGap: 30,
    padding: { left: 10, right: 10 }
  }

  const commonYAxisProps = {
    axisLine: { stroke: '#94a3b8', strokeWidth: 1 },
    tickLine: false,
    tick: {
      fill: '#115e59',
      fontSize: 12,
      fontWeight: 500
    },
    dx: -10,
    width: 60,
    tickFormatter: formatYAxis,
    domain: ['auto', 'auto'] as ['auto', 'auto'],
    padding: { top: 10, bottom: 10 },
    ticks: [0, 25, 50, 75, 100], // Custom tick values
    allowDecimals: false
  }

  // For volume axis in composed chart
  const volumeYAxisProps = {
    ...commonYAxisProps,
    yAxisId: "volume",
    orientation: "right" as const,
    tickFormatter: (value: number) => `${(value / 1000000).toFixed(1)}M`,
    domain: [0, 'auto'] as [number, 'auto']
  }

  const commonProps = {
    data,
    margin: { top: 20, right: 30, bottom: 30, left: 30 }
  }

  const handleMouseMove = (e: any) => {
    if (e.activeTooltipIndex !== undefined) {
      setActiveIndex(e.activeTooltipIndex)
    }
  }

  const handleMouseLeave = () => {
    setActiveIndex(null)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const renderChart = () => {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <p>No data available</p>
        </div>
      )
    }

    switch (chartType) {
      case ChartTypes.AREA:
        return (
          <AreaChart {...commonProps}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(13 148 136)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(13 148 136)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.4} />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0d9488"
              strokeWidth={2}
              fill="url(#colorValue)"
            />
          </AreaChart>
        )

      case ChartTypes.LINE:
        return (
          <LineChart {...commonProps}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.4} />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0d9488"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        )

      case ChartTypes.BAR:
        return (
          <BarChart {...commonProps}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.4} />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill="#0d9488"
              opacity={0.8}
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.change >= 0 ? '#0d9488' : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        )

      case ChartTypes.COMPOSED:
        return (
          <ComposedChart {...commonProps}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(13 148 136)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(13 148 136)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.4} />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            <YAxis {...volumeYAxisProps} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#0d9488', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              fill="url(#colorValue)"
              stroke="#0d9488"
              fillOpacity={0.3}
            />
            <Bar
              dataKey="volume"
              yAxisId="volume"
              fill="#0d9488"
              opacity={0.2}
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.change >= 0 ? '#0d9488' : '#ef4444'}
                  opacity={0.2}
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0d9488"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#0d9488",
                stroke: "#fff",
                strokeWidth: 2
              }}
            />
          </ComposedChart>
        )

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p>Select a chart type</p>
          </div>
        )
    }
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}

const InteractiveChart = ({ type, data, category, timeRange }: {
  type: ChartType
  data: any[]
  category: CategoryId
  timeRange: TimeRange
}) => {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="relative" style={{ height: isZoomed ? 600 : 400 }}>
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsZoomed(!isZoomed)}
          className="bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </div>
      <div className="w-full h-full">
        <ChartContainer
          data={data}
          chartType={type}
          category={category}
          timeRange={timeRange}
        />
      </div>
    </div>
  )
}

const ChartTypeMenu = ({ chartType, setChartType }: {
  chartType: ChartType,
  setChartType: (type: ChartType) => void
}) => {
  return (
    <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm p-1 rounded-lg border border-teal-100">
      {chartTypeIcons.map(({ type, icon: Icon, label }) => (
        <motion.button
          key={type}
          onClick={() => setChartType(type)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
            "hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500/20",
            chartType === type ? "bg-teal-600 text-white shadow-md" : "text-teal-700"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </motion.button>
      ))}
    </div>
  )
}
// TimeRange type
export type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y'

// TimeRangeOption interface 
export interface TimeRangeOption {
  value: TimeRange
  label: string
}

// Update timeRanges to be an array of TimeRangeOption
const timeRanges: TimeRangeOption[] = [
  { value: '1D', label: '1D' },
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '1Y', label: '1Y' }
]

const generateTimeLabels = (range: string) => {
  const now = new Date()
  const labels = []
  let interval: number
  let steps: number

  switch (range) {
    case '1D':
      interval = 60 // 1 hour
      steps = 24
      break
    case '1W':
      interval = 24 * 60 // 1 day
      steps = 7
      break
    case '1M':
      interval = 24 * 60 * 2 // 2 days
      steps = 15
      break
    case '3M':
      interval = 24 * 60 * 7 // 1 week
      steps = 12
      break
    default: // 1Y
      interval = 24 * 60 * 30 // 1 month
      steps = 12
  }

  for (let i = steps; i >= 0; i--) {
    const date = new Date(now.getTime() - (interval * i * 60 * 1000))
    labels.push({
      time: date,
      label: range === '1D'
        ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    })
  }
  return labels
}

const TimeNavigation = ({
  timeRange,
  setTimeRange,
  onDateSelect
}: {
  timeRange: string
  setTimeRange: (range: string) => void
  onDateSelect: (date: Date) => void
}) => {
  const [date, setDate] = useState<Date>(new Date())
  const timeRanges = ['1H', '24H', '7D', '30D', 'ALL']
  const labels = generateTimeLabels(timeRange)

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-teal-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm p-1 rounded-lg border border-teal-100">
            {timeRanges.map((range) => (
              <motion.button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                  timeRange === range ? "bg-teal-600 text-white shadow-md" : "text-teal-700"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {range}
              </motion.button>
            ))}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(date) => {
                  setDate(date || new Date())
                  date && onDateSelect(date)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-teal-600 hover:text-teal-700">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-teal-600 hover:text-teal-700">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none z-10" />
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-8 px-8 py-4 min-w-max">
            {labels.map((label, index) => (
              <motion.div
                key={index}
                className="text-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-xs text-teal-600 opacity-60 mb-1">
                  {format(label.time, "MMM d")}
                </div>
                <div className="text-sm font-medium text-teal-800">
                  {label.label}
                </div>
                <motion.div
                  className="h-1 w-full bg-teal-100 mt-2 rounded-full"
                  whileHover={{ backgroundColor: "rgb(13 148 136)" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Create a seeded random function
const seededRandom = (seed: number) => {
  return ((Math.sin(seed++) * 10000) % 1)
}

const getMetricValue = (category: string, baseValue: number, seed: number) => {
  const hourSeed = Math.floor(Date.now() / (60 * 60 * 1000))
  return Number((baseValue + seededRandom(hourSeed + seed) * baseValue * 0.1).toFixed(2))
}

const ProductMetrics = ({ category }: { category: typeof productCategories[0] }) => {
  const hourSeed = Math.floor(Date.now() / (60 * 60 * 1000))

  const metrics = {
    volume: getMetricValue(category.id, 5.6, hourSeed),
    volatility: getMetricValue(category.id, 4.2, hourSeed + 1),
    depth: getMetricValue(category.id, 1.8, hourSeed + 2),
  }

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="metric-card bg-white rounded-xl p-4 border border-teal-50 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-teal-600">24h Volume</span>
          <MetricTooltip content={
            <p>Total trading volume in the last 24 hours</p>
          }>
            <Info className="w-4 h-4 text-teal-400 cursor-help" />
          </MetricTooltip>
        </div>
        <div className="text-2xl font-bold text-teal-900">{metrics.volume}M</div>
        <div className="flex items-center gap-1 text-emerald-600 text-sm mt-1">
          <TrendingUp className="w-4 h-4" />
          <span>+{(seededRandom(hourSeed + 3) * 10).toFixed(1)}%</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="metric-card bg-white rounded-xl p-4 border border-teal-50 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-teal-600">Volatility</span>
          <MetricTooltip content={
            <p>Price volatility over the last 24 hours</p>
          }>
            <Info className="w-4 h-4 text-teal-400 cursor-help" />
          </MetricTooltip>
        </div>
        <div className="text-2xl font-bold text-teal-900">
          {metrics.volatility.toFixed(1)}%
        </div>
        <div className="flex items-center gap-1 text-amber-600 text-sm mt-1">
          <AlertTriangle className="w-4 h-4" />
          <span>Medium</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="metric-card bg-white rounded-xl p-4 border border-teal-50 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-teal-600">Market Depth</span>
          <MetricTooltip content={
            <div className="space-y-2">
              <p className="font-medium">Market Depth</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Buy Orders: {(Math.random() * 1000 + 500).toFixed(0)}K</div>
                <div>Sell Orders: {(Math.random() * 1000 + 500).toFixed(0)}K</div>
              </div>
            </div>
          }>
            <Info className="w-4 h-4 text-teal-400 cursor-help" />
          </MetricTooltip>
        </div>
        <div className="text-2xl font-bold text-teal-900">
          {metrics.depth.toFixed(2)}M
        </div>
        <div className="flex items-center gap-1 text-emerald-600 text-sm mt-1">
          <TrendingUp className="w-4 h-4" />
          <span>High Liquidity</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="metric-card bg-white rounded-xl p-4 border border-teal-50 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-teal-600">Market Sentiment</span>
          <MetricTooltip content={
            <div className="space-y-2">
              <p className="font-medium">Market Sentiment</p>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: '70%' }}
                />
              </div>
              <div className="text-xs">70% Bullish</div>
            </div>
          }>
            <Info className="w-4 h-4 text-teal-400 cursor-help" />
          </MetricTooltip>
        </div>
        <div className="text-2xl font-bold text-teal-900">Bullish</div>
        <div className="flex items-center gap-1 text-emerald-600 text-sm mt-1">
          <TrendingUp className="w-4 h-4" />
          <span>Strong Buy</span>
        </div>
      </motion.div>
    </div>
  )
}

const MetricTooltip = ({ children, content }: { children: React.ReactNode, content: React.ReactNode }) => {
  const id = useId()
  return (
    <TooltipProvider>
      <UITooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="right" align="center" id={id}>
          {content}
        </TooltipContent>
      </UITooltip>
    </TooltipProvider>
  )
}

const AnimatedValue = ({ value, prefix = '', suffix = '' }: {
  value: number
  prefix?: string
  suffix?: string
}) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (node) {
      const controls = animate(0, value, {
        duration: 1,
        onUpdate: (latest: number) => {
          node.textContent = `${prefix}${latest.toFixed(2)}${suffix}`
        },
      })
      return () => controls.stop()
    }
  }, [value, prefix, suffix])

  return <motion.span ref={ref} />
}

// Data fetching types and interfaces
interface MarketDataResponse {
  success: boolean
  data?: MarketData[]
  error?: string
}

// Error handling utility
class MarketDataError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message)
    this.name = 'MarketDataError'
  }
}

// WebSocket and Cache types
interface WebSocketMessage {
  type: 'market_update' | 'error' | 'heartbeat'
  category: CategoryId
  data?: MarketData
  error?: string
}

interface CacheEntry {
  data: MarketData[]
  timestamp: number
  category: CategoryId
  timeRange: TimeRange
}

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const MAX_RETRY_ATTEMPTS = 3
const RETRY_DELAY = 1000 // 1 second

// Cache utility
class MarketDataCache {
  private cache: Map<string, CacheEntry> = new Map()

  private getCacheKey(category: CategoryId, timeRange: TimeRange): string {
    return `${category}-${timeRange}`
  }

  set(category: CategoryId, timeRange: TimeRange, data: MarketData[]): void {
    const key = this.getCacheKey(category, timeRange)
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      category,
      timeRange
    })
  }

  get(category: CategoryId, timeRange: TimeRange): MarketData[] | null {
    const key = this.getCacheKey(category, timeRange)
    const entry = this.cache.get(key)

    if (!entry) return null

    const isExpired = Date.now() - entry.timestamp > CACHE_DURATION
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  clear(): void {
    this.cache.clear()
  }
}

// Bloomberg API configuration
const BLOOMBERG_CONFIG = {
  // These should be in environment variables
  API_HOST: process.env.NEXT_PUBLIC_BLOOMBERG_API_HOST,
  API_KEY: process.env.BLOOMBERG_API_KEY,
  API_SECRET: process.env.BLOOMBERG_API_SECRET
}

// Bloomberg WebSocket message types
interface BloombergMessage {
  type: 'MARKET_DATA' | 'HEARTBEAT' | 'ERROR'
  security?: string
  data?: {
    price: number
    volume: number
    timestamp: string
    bid?: number
    ask?: number
    // Add other Bloomberg fields as needed
  }
  error?: string
}

// Mock WebSocket for development
class MockWebSocket {
  private intervalId: NodeJS.Timeout | null = null
  private callbacks: Set<(data: MarketData) => void> = new Set()

  constructor(private category: CategoryId) {
    this.startMockUpdates()
  }

  private startMockUpdates() {
    this.intervalId = setInterval(() => {
      const mockData: MarketData = {
        name: new Date().toISOString(),
        value: Math.random() * 100,
        volume: Math.floor(Math.random() * 1000000),
        change: (Math.random() - 0.5) * 2,
        volatility: Math.random() * 0.5,
        trend: Math.random() - 0.5
      }
      this.callbacks.forEach(callback => callback(mockData))
    }, 5000)
  }

  subscribe(callback: (data: MarketData) => void) {
    this.callbacks.add(callback)
    return () => this.callbacks.delete(callback)
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.callbacks.clear()
  }
}

// WebSocket interface
interface WebSocketProvider {
  subscribe(callback: (data: MarketData) => void): () => void
  disconnect(): void
}

class BloombergWebSocket implements WebSocketProvider {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private subscribers: Set<(data: MarketData) => void> = new Set()
  private heartbeatInterval: NodeJS.Timeout | null = null
  private lastPrice = 0

  constructor(private category: CategoryId) {
    this.initializeConnection()
  }

  private getBloombergSymbol(category: CategoryId): string {
    const symbolMap: Record<CategoryId, string> = {
      'crude-oil': 'CL1 Comdty',
      'natural-gas': 'NG1 Comdty',
      'renewable': 'GRNLEDGW Index',
      'industrial': 'BCOM Index'
    }
    return symbolMap[category]
  }

  private async getAuthToken(): Promise<string> {
    try {
      const response = await fetch(`${BLOOMBERG_CONFIG.API_HOST}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: BLOOMBERG_CONFIG.API_KEY,
          secret: BLOOMBERG_CONFIG.API_SECRET
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get Bloomberg auth token')
      }

      const data = await response.json()
      return data.token
    } catch (error) {
      console.error('Bloomberg authentication error:', error)
      throw error
    }
  }

  private async initializeConnection() {
    try {
      const token = await this.getAuthToken()
      const symbol = this.getBloombergSymbol(this.category)

      this.ws = new WebSocket(`${BLOOMBERG_CONFIG.API_HOST}/market-data/stream`)

      // Set headers after connection
      if (this.ws) {
        this.ws.onopen = () => {
          this.ws?.send(JSON.stringify({
            type: 'auth',
            token,
            symbol
          }))
          this.handleOpen()
        }
        this.setupWebSocketHandlers()
      }
    } catch (error) {
      console.error('Bloomberg WebSocket connection error:', error)
      this.handleReconnect()
    }
  }

  private setupWebSocketHandlers() {
    if (!this.ws) return

    this.ws.onmessage = (event: MessageEvent) => this.handleMessage(event)
    this.ws.onclose = () => this.handleClose()
    this.ws.onerror = (event: Event) => this.handleError(event)
  }

  private handleMessage(event: MessageEvent) {
    try {
      const message: BloombergMessage = JSON.parse(event.data)

      if (message.type === 'MARKET_DATA' && message.data) {
        const marketData: MarketData = {
          name: message.data.timestamp,
          value: message.data.price,
          volume: message.data.volume,
          change: this.calculateChange(message.data.price),
          volatility: this.calculateVolatility(message.data.price),
          trend: this.calculateTrend(message.data.price)
        }
        this.subscribers.forEach(callback => callback(marketData))
      }
    } catch (error) {
      console.error('Error parsing Bloomberg message:', error)
    }
  }

  private calculateChange(price: number): number {
    const change = this.lastPrice ? (price - this.lastPrice) / this.lastPrice : 0
    this.lastPrice = price
    return change
  }

  private calculateVolatility(price: number): number {
    return Math.abs(this.calculateChange(price))
  }

  private calculateTrend(price: number): number {
    return this.calculateChange(price) > 0 ? 1 : -1
  }

  subscribe(callback: (data: MarketData) => void): () => void {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  disconnect(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
    }
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.subscribers.clear()
  }

  private handleOpen = () => {
    console.log('Bloomberg WebSocket connected')
    this.reconnectAttempts = 0
    this.startHeartbeat()
  }

  private handleClose = () => {
    console.log('Bloomberg WebSocket disconnected')
    this.handleReconnect()
  }

  private handleError = (error: Event) => {
    console.error('Bloomberg WebSocket error:', error)
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => this.initializeConnection(), this.reconnectDelay * this.reconnectAttempts)
    }
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'HEARTBEAT' }))
      }
    }, 30000)
  }
}

// Market data service
class MarketDataService {
  private ws: WebSocketProvider

  constructor(category: CategoryId) {
    this.ws = process.env.NODE_ENV === 'production'
      ? new BloombergWebSocket(category)
      : new MockWebSocket(category)
  }

  subscribe(callback: (data: MarketData) => void) {
    return this.ws.subscribe(callback)
  }

  disconnect() {
    this.ws.disconnect()
  }
}

// Enhanced fetch with retry logic
const fetchWithRetry = async (
  fn: () => Promise<MarketDataResponse>,
  retryCount = 0
): Promise<MarketDataResponse> => {
  try {
    return await fn()
  } catch (error) {
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)))
      return fetchWithRetry(fn, retryCount + 1)
    }
    throw error
  }
}

// Updated data fetching function
const fetchMarketData = async (
  category: CategoryId,
  timeRange: TimeRange,
  cache: MarketDataCache
): Promise<MarketDataResponse> => {
  // Check cache first
  const cachedData = cache.get(category, timeRange)
  if (cachedData) {
    return { success: true, data: cachedData }
  }

  try {
    const data = await fetchWithRetry(() => {
      // Replace with actual API call in the future
      return Promise.resolve({
        success: true,
        data: generateChartData(category, timeRange)
      })
    })

    if (data.success && data.data) {
      cache.set(category, timeRange, data.data)
    }

    return data
  } catch (error) {
    console.error('Error fetching market data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Data validation function
const validateMarketData = (data: MarketData[]): boolean => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new MarketDataError(
      'Invalid market data format',
      'INVALID_FORMAT',
      { received: typeof data }
    )
  }

  return data.every(item => {
    const timestamp = new Date(item.name).getTime()
    if (isNaN(timestamp)) {
      throw new MarketDataError(
        'Invalid timestamp in market data',
        'INVALID_TIMESTAMP',
        { invalidItem: item }
      )
    }

    if (typeof item.value !== 'number' || isNaN(item.value)) {
      throw new MarketDataError(
        'Invalid value in market data',
        'INVALID_VALUE',
        { invalidItem: item }
      )
    }

    return true
  })
}

export default function MarketOverviewPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const [activeCategory, setActiveCategory] = useState<CategoryId>('crude-oil')
  const [timeRange, setTimeRange] = useState<TimeRange>('1D')
  const [chartData, setChartData] = useState<MarketData[]>([])
  const [chartType, setChartType] = useState<ChartType>(ChartTypes.AREA)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const timeLabels = generateTimeLabels(timeRange)
  const [activeHeadlineCategory, setActiveHeadlineCategory] = useState<string>('all')
  const [expandedHeadline, setExpandedHeadline] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Create refs for persistent instances
  const cacheRef = useRef(new MarketDataCache())
  const wsRef = useRef<MarketDataService | null>(null)

  // Add back the filtered headlines
  const filteredHeadlines = useMemo(() => {
    return activeHeadlineCategory === 'all'
      ? latestHeadlines
      : latestHeadlines.filter(h => h.category === activeHeadlineCategory)
  }, [activeHeadlineCategory, latestHeadlines])

  // Update WebSocket handler
  const handleWebSocketUpdate = (data: MarketData) => {
    setChartData(currentData => {
      const updatedData = [...currentData]
      const lastIndex = updatedData.length - 1
      if (lastIndex >= 0) {
        updatedData[lastIndex] = data
      }
      return updatedData
    })
  }

  useEffect(() => {
    wsRef.current = new MarketDataService(activeCategory)
    const unsubscribe = wsRef.current.subscribe(handleWebSocketUpdate)

    return () => {
      unsubscribe()
      wsRef.current?.disconnect()
    }
  }, [activeCategory])

  useEffect(() => {
    const loadMarketData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetchMarketData(
          activeCategory,
          timeRange,
          cacheRef.current
        )

        if (!response.success || !response.data) {
          throw new MarketDataError(
            response.error || 'Failed to fetch market data',
            'FETCH_ERROR'
          )
        }

        if (validateMarketData(response.data)) {
          setChartData(response.data)
        }
      } catch (err) {
        console.error('Error loading market data:', err)
        setError(
          err instanceof MarketDataError
            ? err.message
            : 'An unexpected error occurred'
        )
        setChartData([])
      } finally {
        setIsLoading(false)
      }
    }

    loadMarketData()
  }, [activeCategory, timeRange])

  if (error) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
        <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Reload Page
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
      {/* Header Section - Left Aligned */}
      <div className="relative bg-gradient-to-r from-teal-900 to-teal-800 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.2),transparent_70%)]" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium">
                  Market Intelligence
                </span>
              </motion.div>
              <h1 className="text-7xl font-bold text-white leading-tight">
                Market{" "}
                <span className="text-orange-400 relative">
                  Overview
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h1>
              <p className="text-xl text-teal-50 leading-relaxed max-w-2xl">
                Stay informed with our comprehensive market analysis and insights
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-12">
        <div className="grid gap-6">
          {/* Market Summary and Alerts Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Market Summary - Updated styling */}
            <Card className="bg-white border-2 border-teal-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-teal-600" />
                  <h2 className="text-lg font-semibold text-teal-800">Market Summary</h2>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-teal-600 text-sm mb-1">Total Market Value</div>
                    <div className="text-3xl font-bold text-teal-900 mb-2">$3.2T</div>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <ArrowUpRight className="w-4 h-4" />
                      <span className="text-sm">+2.8% (24h)</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-teal-600 text-sm mb-1">Global Trading Volume</div>
                    <div className="text-3xl font-bold text-teal-900 mb-2">5.6M</div>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <ArrowUpRight className="w-4 h-4" />
                      <span className="text-sm">+12% (24h)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Alerts */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-teal-600" />
                    <h2 className="text-lg font-semibold text-teal-800">Market Alerts</h2>
                  </div>
                  <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">
                    3 New Alerts
                  </Badge>
                </div>
                <div className="space-y-3">
                  {marketAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${alert.type === 'warning'
                        ? 'bg-amber-50 text-amber-800'
                        : alert.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-blue-50 text-blue-800'
                        }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${alert.type === 'warning'
                        ? 'bg-amber-500'
                        : alert.type === 'success'
                          ? 'bg-emerald-500'
                          : 'bg-blue-500'
                        }`} />
                      <span className="flex-1">{alert.message}</span>
                      <span className="text-xs opacity-60">{alert.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chart */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 shadow-xl">
            <CardContent className="p-6">
              <Tabs defaultValue={activeCategory} onValueChange={(value) => handleCategoryChange(value, setActiveCategory)}>
                {/* Product Categories */}
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="grid grid-cols-4 gap-4 bg-teal-50/50 p-1 rounded-lg">
                    {productCategories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-white 
                          data-[state=active]:text-teal-700 data-[state=active]:shadow-md"
                      >
                        <category.icon className="w-4 h-4" />
                        <span>{category.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* Chart Controls */}
                <div className="flex items-center justify-between mb-6 bg-teal-50/30 p-2 rounded-lg">
                  <div className="flex items-center gap-4">
                    {chartTypeIcons.map(({ type, icon: Icon, label }) => (
                      <Button
                        key={type}
                        variant={chartType === type ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setChartType(type)}
                        className={`flex items-center gap-2 ${chartType === type
                          ? 'bg-white shadow-sm'
                          : 'hover:bg-white/50'
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </Button>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Select value={timeRange} onValueChange={(value) => handleTimeRangeChange(value, setTimeRange)}>
                      <SelectTrigger className="w-[120px] bg-white">
                        <SelectValue placeholder="Select Range" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeRanges.map((range) => (
                          <SelectItem
                            key={range.value}
                            value={range.value}
                            className="cursor-pointer"
                          >
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2 text-sm text-teal-600 bg-white px-3 py-1.5 rounded-md">
                      <Clock className="w-4 h-4" />
                      <span>Live</span>
                    </div>
                  </div>
                </div>

                {productCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <ProductMetrics category={category} />
                    <div className="relative">
                      <motion.div
                        className="h-[400px] w-full mb-6 bg-white/50 rounded-xl border border-teal-50 p-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <h3 className="text-lg font-semibold text-teal-800">
                              {category.name} Price Chart
                            </h3>
                            <Badge
                              variant="secondary"
                              className="bg-teal-50 text-teal-700"
                            >
                              Live
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.5))}
                              className="text-teal-600"
                            >
                              <ZoomOut className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.5))}
                              className="text-teal-600"
                            >
                              <ZoomIn className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <ResponsiveContainer>
                          <InteractiveChart
                            type={chartType}
                            data={chartData}
                            category={category.id as CategoryId}
                            timeRange={timeRange}
                          />
                        </ResponsiveContainer>
                      </motion.div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Enhanced Latest Headlines */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Newspaper className="w-5 h-5 text-teal-600" />
                  <h2 className="text-lg font-semibold text-teal-800">Latest Headlines</h2>
                </div>
                <div className="flex items-center gap-2">
                  {headlineCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeHeadlineCategory === category.id ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setActiveHeadlineCategory(category.id)}
                      className="flex items-center gap-2 transition-all duration-200"
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <motion.div
                className="grid grid-cols-2 gap-6"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredHeadlines.map((headline: Headline) => (
                    <motion.div
                      key={headline.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`group p-4 rounded-lg border border-teal-50 hover:border-teal-100 
                        bg-white/50 hover:bg-white transition-all duration-200 cursor-pointer
                        ${expandedHeadline === headline.id ? 'col-span-2' : ''}`}
                      onClick={() => setExpandedHeadline(
                        expandedHeadline === headline.id ? null : headline.id
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="secondary"
                              className={`
                                ${headline.impact === 'high'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-teal-50 text-teal-700'}
                              `}
                            >
                              {headline.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                            </Badge>
                            <Badge variant="outline" className="bg-white/50">
                              {headlineCategories.find(c => c.id === headline.category)?.label}
                            </Badge>
                          </div>
                          <h3 className="text-teal-900 font-medium group-hover:text-teal-700 
                            transition-colors duration-200"
                          >
                            {headline.title}
                          </h3>
                        </div>
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: expandedHeadline === headline.id ? 'auto' : 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-teal-600 mt-2 mb-4">{headline.summary}</p>
                      </motion.div>
                      <div className="flex items-center gap-2 text-sm text-teal-600">
                        <span className="font-medium">{headline.source}</span>
                        <span>•</span>
                        <span>{headline.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

