"use client"

import React from 'react'
import { motion, useScroll, useTransform, animate } from "framer-motion"
import { useState, useEffect, useId, useRef, useMemo, useCallback } from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, BarChart, Bar, LineChart, Line, ComposedChart, Scatter, Cell, ReferenceDot
} from 'recharts'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity, Droplet, Flame, Factory, Leaf,
  ArrowUpRight, ArrowDownRight, Clock,
  TrendingUp, TrendingDown, Globe,
  BarChart2, Zap, AlertCircle,
  LineChart as LineChartIcon, BarChart2 as ChartBar, GitGraph, Minimize2, Maximize2,
  Calendar, Download, Share2, RefreshCw,
  ZoomIn, ZoomOut, ChevronLeft, ChevronRight,
  Calendar as CalendarIcon, ArrowLeft, ArrowRight,
  ChevronUp, ChevronDown, Filter,
  FileText, Briefcase, Scale, Lightbulb,
  Info, AlertTriangle, BarChart3, PieChart, Settings,
  Newspaper as NewsIcon, Sun, Wind
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

// Add import for HeadlinesService
import { HeadlinesService, Headline } from '@/lib/services/headlines.service'

// Add these type definitions at the top of the file after imports
type TimeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y'
type ChartType = 'line' | 'bar' | 'area' | 'composed'

// Update CategoryId type to include all categories
type CategoryId = 'crude-oil' | 'natural-gas' | 'renewable' | 'nuclear' | 'coal' | 'solar' | 'wind' | 'hydrogen' | 'all'

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
      trend: "Bullish",
      depth: 2.4
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
      trend: "Bearish",
      depth: 1.8
    }
  },
  {
    id: "renewable",
    name: "Renewable Energy",
    icon: Leaf,
    metrics: {
      price: "$62.18",
      change: "+4.2%",
      volume: "2.1M",
      trend: "Bullish",
      depth: 3.2
    }
  },
  {
    id: "nuclear",
    name: "Nuclear Power",
    icon: Zap,
    metrics: {
      price: "$45.90",
      change: "+1.8%",
      volume: "950K",
      trend: "Neutral",
      depth: 1.5
    }
  },
  {
    id: "coal",
    name: "Coal",
    icon: Factory,
    metrics: {
      price: "$120.50",
      change: "-0.8%",
      volume: "750K",
      trend: "Bearish",
      depth: 1.2
    }
  },
  {
    id: "solar",
    name: "Solar Energy",
    icon: Sun,
    metrics: {
      price: "$35.75",
      change: "+3.1%",
      volume: "1.5M",
      trend: "Bullish",
      depth: 2.8
    }
  },
  {
    id: "wind",
    name: "Wind Power",
    icon: Wind,
    metrics: {
      price: "$42.30",
      change: "+2.8%",
      volume: "1.3M",
      trend: "Bullish",
      depth: 2.1
    }
  },
  {
    id: "hydrogen",
    name: "Hydrogen",
    icon: Droplet,
    metrics: {
      price: "$15.20",
      change: "+5.4%",
      volume: "450K",
      trend: "Bullish",
      depth: 1.6
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

const chartTypeIcons = [
  { type: 'area' as ChartType, icon: TrendingUp, label: 'Area' },
  { type: 'line' as ChartType, icon: GitGraph, label: 'Line' },
  { type: 'bar' as ChartType, icon: BarChart2, label: 'Bar' },
  { type: 'composed' as ChartType, icon: Activity, label: 'Composed' }
]

// Update the category colors
const categoryColors: Record<CategoryId, { primary: string; secondary: string; gradient: string[]; accent: string }> = {
  'crude-oil': {
    primary: '#2563eb',
    secondary: '#60a5fa',
    gradient: ['#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa'],
    accent: '#1d4ed8'
  },
  'natural-gas': {
    primary: '#16a34a',
    secondary: '#4ade80',
    gradient: ['#dcfce7', '#bbf7d0', '#86efac', '#4ade80'],
    accent: '#15803d'
  },
  'renewable': {
    primary: '#ca8a04',
    secondary: '#facc15',
    gradient: ['#fef9c3', '#fef08a', '#fde047', '#facc15'],
    accent: '#a16207'
  },
  'nuclear': {
    primary: '#9333ea',
    secondary: '#c084fc',
    gradient: ['#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc'],
    accent: '#7e22ce'
  },
  'coal': {
    primary: '#dc2626',
    secondary: '#f87171',
    gradient: ['#fee2e2', '#fecaca', '#fca5a5', '#f87171'],
    accent: '#b91c1c'
  },
  'solar': {
    primary: '#ea580c',
    secondary: '#fb923c',
    gradient: ['#fff7ed', '#ffedd5', '#fed7aa', '#fb923c'],
    accent: '#c2410c'
  },
  'wind': {
    primary: '#0891b2',
    secondary: '#22d3ee',
    gradient: ['#ecfeff', '#cffafe', '#a5f3fc', '#22d3ee'],
    accent: '#0e7490'
  },
  'hydrogen': {
    primary: '#7c3aed',
    secondary: '#a78bfa',
    gradient: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#a78bfa'],
    accent: '#6d28d9'
  }
}

// Update MarketParams interface
interface MarketParams {
  baseValue: number
  volatility: number
  trend: number
  seasonality: number
  volumeBase: number
  volumeVariance: number
}

// Update market parameters
const marketParams: Record<CategoryId, MarketParams> = {
  'crude-oil': {
    baseValue: 75,
    volatility: 0.02,
    trend: 0.001,
    seasonality: 0.1,
    volumeBase: 1000000,
    volumeVariance: 500000
  },
  'natural-gas': {
    baseValue: 3.5,
    volatility: 0.025,
    trend: -0.0005,
    seasonality: 0.3,
    volumeBase: 800000,
    volumeVariance: 400000
  },
  'renewable': {
    baseValue: 100,
    volatility: 0.015,
    trend: 0.002,
    seasonality: 0.05,
    volumeBase: 1200000,
    volumeVariance: 600000
  },
  'nuclear': {
    baseValue: 60,
    volatility: 0.01,
    trend: 0.0008,
    seasonality: 0.15,
    volumeBase: 900000,
    volumeVariance: 450000
  },
  'coal': {
    baseValue: 150,
    volatility: 0.018,
    trend: -0.001,
    seasonality: 0.2,
    volumeBase: 700000,
    volumeVariance: 350000
  },
  'solar': {
    baseValue: 30,
    volatility: 0.01,
    trend: 0.0005,
    seasonality: 0.05,
    volumeBase: 1500000,
    volumeVariance: 750000
  },
  'wind': {
    baseValue: 40,
    volatility: 0.01,
    trend: 0.0005,
    seasonality: 0.05,
    volumeBase: 1300000,
    volumeVariance: 650000
  },
  'hydrogen': {
    baseValue: 10,
    volatility: 0.005,
    trend: 0.0002,
    seasonality: 0.02,
    volumeBase: 500000,
    volumeVariance: 250000
  }
}

// Update category labels
const categoryLabels: Record<CategoryId, string> = {
  'crude-oil': 'Crude Oil',
  'natural-gas': 'Natural Gas',
  'renewable': 'Renewable Energy',
  'nuclear': 'Nuclear Power',
  'coal': 'Coal',
  'solar': 'Solar Energy',
  'wind': 'Wind Power',
  'hydrogen': 'Hydrogen'
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
  const params = marketParams[category]

  if (!params) {
    throw new Error(`Invalid category: ${category}`)
  }

  const timeConfig = {
    '1D': { points: 24, interval: 60 * 60 * 1000, volatilityMult: 1 },
    '1W': { points: 7 * 8, interval: 3 * 60 * 60 * 1000, volatilityMult: 1.2 },
    '1M': { points: 30, interval: 24 * 60 * 60 * 1000, volatilityMult: 1.5 },
    '3M': { points: 90, interval: 24 * 60 * 60 * 1000, volatilityMult: 1.8 },
    '6M': { points: 26, interval: 24 * 60 * 60 * 1000, volatilityMult: 2 },
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
    trend += (Math.random() - 0.5) * params.trend
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

// Update the time range and chart type handlers
const handleTimeRangeChange = useCallback((value: string) => {
  if (timeRangeOptions.map(t => t.value).includes(value as TimeRange)) {
    setTimeRange(value as TimeRange)
  }
}, [])

const handleChartTypeChange = useCallback((value: string) => {
  if (['line', 'bar', 'area', 'composed'].includes(value)) {
    setChartType(value as ChartType)
  }
}, [])

// Type guards
const isValidCategory = (value: string): value is CategoryId => {
  return Object.keys(marketParams).includes(value)
}

const isValidTimeRange = (value: string): value is TimeRange => {
  return timeRangeOptions.map(t => t.value).includes(value as TimeRange)
}

const isValidChartType = (value: string): value is ChartType => {
  return ['line', 'bar', 'area', 'composed'].includes(value)
}

// Update the InteractiveChart component props
interface InteractiveChartProps {
  data: MarketData[]
  type: ChartType
  category: CategoryId
  timeRange: TimeRange
  isPaused: boolean
  onPauseToggle: () => void
}

interface ProductTypeFilterProps {
  activeCategory: CategoryId
  onCategoryChange: (category: CategoryId | 'all') => void
  showAllCategories: boolean
}

const ProductTypeFilter = ({ activeCategory, onCategoryChange, showAllCategories }: ProductTypeFilterProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <Button
        variant={showAllCategories ? "default" : "outline"}
        size="sm"
        className={cn(
          "flex items-center gap-2 whitespace-nowrap",
          showAllCategories && "bg-teal-600 hover:bg-teal-700"
        )}
        onClick={() => onCategoryChange('all')}
      >
        <Globe className="w-4 h-4" />
        All Categories
      </Button>
      {productCategories.map((category) => (
        <Button
          key={category.id}
          variant={!showAllCategories && activeCategory === category.id ? "default" : "outline"}
          size="sm"
          className={cn(
            "flex items-center gap-2 whitespace-nowrap",
            !showAllCategories && activeCategory === category.id && "bg-teal-600 hover:bg-teal-700"
          )}
          onClick={() => onCategoryChange(category.id as CategoryId)}
        >
          <category.icon className="w-4 h-4" />
          {category.name}
        </Button>
      ))}
    </div>
  )
}

const InteractiveChart = ({ type, data, category, timeRange, isPaused, onPauseToggle }: InteractiveChartProps) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [showVolume, setShowVolume] = useState(true)
  const [showMA, setShowMA] = useState(true)

  return (
    <div className="relative" style={{ height: isZoomed ? 600 : 400 }}>
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowVolume(!showVolume)}
          className="bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          {showVolume ? <BarChart2 className="w-4 h-4" /> : <BarChart2 className="w-4 h-4 opacity-50" />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMA(!showMA)}
          className="bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          {showMA ? <LineChartIcon className="w-4 h-4" /> : <LineChartIcon className="w-4 h-4 opacity-50" />}
        </Button>
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
          showVolume={showVolume}
          showMA={showMA}
        />
      </div>
    </div>
  )
}

const ChartContainer = ({
  data,
  chartType,
  category,
  timeRange,
  showVolume,
  showMA
}: {
  data: MarketData[]
  chartType: ChartType
  category: CategoryId
  timeRange: TimeRange
  showVolume: boolean
  showMA: boolean
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
      case '3M':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })
      case '6M':
      case '1Y':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          year: '2-digit'
        })
      default:
        return tickItem
    }
  }

  const getAxisInterval = (timeRange: TimeRange): AxisInterval => {
    switch (timeRange) {
      case '1D':
        return 3
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
    padding: { top: 10, bottom: 10 }
  }

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

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No data available</p>
      </div>
    )
  }

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={categoryColors[category].primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={categoryColors[category].secondary} stopOpacity={0.05} />
              </linearGradient>
              {showMA && (
                <>
                  <linearGradient id="colorMA5" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={categoryColors[category].accent} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={categoryColors[category].accent} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMA20" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={categoryColors[category].secondary} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={categoryColors[category].secondary} stopOpacity={0} />
                  </linearGradient>
                </>
              )}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.4} />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={categoryColors[category].primary}
              strokeWidth={2}
              fill="url(#colorValue)"
            />
            {showMA && (
              <>
                <Area
                  type="monotone"
                  dataKey="ma5"
                  stroke={categoryColors[category].accent}
                  strokeWidth={1}
                  fill="url(#colorMA5)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="ma20"
                  stroke={categoryColors[category].secondary}
                  strokeWidth={1}
                  fill="url(#colorMA20)"
                  dot={false}
                />
              </>
            )}
          </AreaChart>
        )

      case 'line':
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
              stroke={categoryColors[category].primary}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        )

      case 'bar':
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
              fill={categoryColors[category].primary}
              opacity={0.8}
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.change >= 0 ? categoryColors[category].primary : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        )

      case 'composed':
        return (
          <ComposedChart {...commonProps}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={categoryColors[category].primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={categoryColors[category].secondary} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.4} />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            <YAxis {...volumeYAxisProps} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: categoryColors[category].primary, strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              fill="url(#colorValue)"
              stroke={categoryColors[category].primary}
              fillOpacity={0.3}
            />
            <Bar
              dataKey="volume"
              yAxisId="volume"
              fill={categoryColors[category].primary}
              opacity={0.2}
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.change >= 0 ? categoryColors[category].primary : '#ef4444'}
                  opacity={0.2}
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="value"
              stroke={categoryColors[category].primary}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: categoryColors[category].primary,
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

// Define time range options once
const timeRangeOptions = [
  { value: '1D' as TimeRange, label: '1D' },
  { value: '1W' as TimeRange, label: '1W' },
  { value: '1M' as TimeRange, label: '1M' },
  { value: '3M' as TimeRange, label: '3M' },
  { value: '6M' as TimeRange, label: '6M' },
  { value: '1Y' as TimeRange, label: '1Y' }
] as const

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
    case '6M':
      interval = 24 * 60 * 30 // 1 month
      steps = 6
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
            {timeRangeOptions.map((range) => (
              <motion.button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                  timeRange === range.value ? "bg-teal-600 text-white shadow-md" : "text-teal-700"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {range.label}
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
                  whileHover={{ backgroundColor: categoryColors[category].primary }}
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

// Update the marketStats to be a function that returns stats based on the selected category
const getMarketStats = (selectedCategory: CategoryId, productCategories: typeof productCategories) => {
  const selectedProduct = productCategories.find(p => p.id === selectedCategory)
  if (!selectedProduct) return []

  const metrics = selectedProduct.metrics
  const numericVolume = parseFloat(metrics.volume.replace(/[KM]/g, '')) * (metrics.volume.includes('M') ? 1000000 : 1000)

  return [
    {
      id: 1,
      title: 'Trading Volume',
      value: metrics.volume,
      subtext: 'Daily Average',
      icon: BarChart2,
      trend: metrics.trend.toLowerCase(),
      change: metrics.change
    },
    {
      id: 2,
      title: 'Market Cap',
      value: `$${(numericVolume * parseFloat(metrics.price.replace('$', ''))).toLocaleString('en-US', {
        notation: "compact",
        maximumFractionDigits: 1
      })}`,
      subtext: 'Total Value',
      icon: Globe,
      trend: metrics.trend.toLowerCase(),
      change: metrics.change
    },
    {
      id: 3,
      title: 'Current Price',
      value: metrics.price,
      subtext: metrics.trend,
      icon: metrics.trend === 'Bullish' ? TrendingUp : metrics.trend === 'Bearish' ? TrendingDown : Activity,
      trend: metrics.trend.toLowerCase(),
      change: metrics.change
    },
    {
      id: 4,
      title: 'Market Depth',
      value: `${metrics.depth}M`,
      subtext: 'Order Book',
      icon: BarChart3,
      trend: metrics.depth > 2 ? 'up' : 'down',
      change: `${metrics.depth > 2 ? '+' : '-'}${Math.abs(metrics.depth - 2).toFixed(1)}%`
    }
  ]
}

// Add this component near the top, after other component definitions
const PageHeader = () => {
  return (
    <div className="border-b border-teal-100 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-teal-600" />
              <h1 className="text-xl font-semibold text-teal-800">Energy Markets</h1>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                <LineChartIcon className="w-4 h-4 mr-2" />
                Charts
              </Button>
              <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                <NewsIcon className="w-4 h-4 mr-2" />
                News
              </Button>
              <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                <Globe className="w-4 h-4 mr-2" />
                Markets
              </Button>
              <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                <Activity className="w-4 h-4 mr-2" />
                Analysis
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LiveTimeDisplay />
            </div>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            <Button variant="outline" size="sm" className="text-teal-600">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="text-teal-600">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MarketOverviewPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  // State management
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('crude-oil')
  const [timeRange, setTimeRange] = useState<TimeRange>('1D')
  const [chartType, setChartType] = useState<ChartType>('line')
  const [isPaused, setIsPaused] = useState(false)
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [headlines, setHeadlines] = useState<Headline[]>([])
  const [headlinesLoading, setHeadlinesLoading] = useState(true)
  const [headlinesError, setHeadlinesError] = useState<string | null>(null)

  // Services
  const cache = useMemo(() => new MarketDataCache(), [])
  const marketDataServiceRef = useRef<MarketDataService | null>(null)
  const headlinesServiceRef = useRef<HeadlinesService | null>(null)

  // Initialize headlines service
  useEffect(() => {
    const initializeHeadlines = async () => {
      try {
        setHeadlinesLoading(true)
        headlinesServiceRef.current = await HeadlinesService.getInstance()
        const fetchedHeadlines = await headlinesServiceRef.current.getHeadlines()
        setHeadlines(fetchedHeadlines)
      } catch (err) {
        setHeadlinesError(err instanceof Error ? err.message : 'Failed to fetch headlines')
      } finally {
        setHeadlinesLoading(false)
      }
    }
    initializeHeadlines()
  }, [])

  // Filter headlines based on category
  const filteredHeadlines = useMemo(() => {
    return headlines.filter(h => h.category === selectedCategory)
  }, [selectedCategory, headlines])

  // Handle time range and chart type changes
  const handleTimeRangeChange = useCallback((value: string) => {
    if (timeRangeOptions.map(t => t.value).includes(value as TimeRange)) {
      setTimeRange(value as TimeRange)
    }
  }, [])

  const handleChartTypeChange = useCallback((value: string) => {
    if (['line', 'bar', 'area', 'composed'].includes(value)) {
      setChartType(value as ChartType)
    }
  }, [])

  // Type guards
  const isValidCategory = (value: string): value is CategoryId => {
    return Object.keys(marketParams).includes(value)
  }

  const isValidTimeRange = (value: string): value is TimeRange => {
    return timeRangeOptions.map(t => t.value).includes(value as TimeRange)
  }

  const isValidChartType = (value: string): value is ChartType => {
    return ['line', 'bar', 'area', 'composed'].includes(value)
  }

  // Update WebSocket handler
  const handleWebSocketUpdate = (data: MarketData) => {
    if (!isPaused) {
      setMarketData(currentData => {
        const updatedData = [...currentData]
        const lastIndex = updatedData.length - 1
        if (lastIndex >= 0) {
          updatedData[lastIndex] = data
        }
        return updatedData
      })
    }
  }

  useEffect(() => {
    marketDataServiceRef.current = new MarketDataService(selectedCategory)
    const unsubscribe = marketDataServiceRef.current.subscribe(handleWebSocketUpdate)

    return () => {
      unsubscribe()
      marketDataServiceRef.current?.disconnect()
    }
  }, [selectedCategory])

  useEffect(() => {
    const loadMarketData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetchMarketData(
          selectedCategory,
          timeRange,
          cache
        )

        if (!response.success || !response.data) {
          throw new MarketDataError(
            response.error || 'Failed to fetch market data',
            'FETCH_ERROR'
          )
        }

        if (validateMarketData(response.data)) {
          setMarketData(response.data)
        }
      } catch (err) {
        console.error('Error loading market data:', err)
        setError(
          err instanceof MarketDataError
            ? err.message
            : 'An unexpected error occurred'
        )
        setMarketData([])
      } finally {
        setIsLoading(false)
      }
    }

    loadMarketData()
  }, [selectedCategory, timeRange])

  const handlePauseToggle = () => {
    setIsPaused(!isPaused)
  }

  // Get dynamic market stats based on selected category
  const currentMarketStats = useMemo(() =>
    getMarketStats(selectedCategory, productCategories),
    [selectedCategory]
  )

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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
      {/* Main Header */}
      <div className="bg-white border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart2 className="h-8 w-8 text-teal-600" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                    <LineChartIcon className="w-4 h-4 mr-2" />
                    Charts
                  </Button>
                  <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                    <NewsIcon className="w-4 h-4 mr-2" />
                    News
                  </Button>
                  <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                    <Globe className="w-4 h-4 mr-2" />
                    Markets
                  </Button>
                  <Button variant="ghost" className="text-teal-600 hover:text-teal-700">
                    <Activity className="w-4 h-4 mr-2" />
                    Analysis
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <LiveTimeDisplay />
              </div>
              <Separator orientation="vertical" className="h-6 hidden sm:block" />
              <Button variant="outline" size="sm" className="text-teal-600">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="text-teal-600">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Teal Header Section */}
      <div className="relative bg-gradient-to-r from-teal-900 to-teal-800 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.2),transparent_70%)]" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-orange-500/20 text-orange-100 rounded-full text-sm font-medium">
                Real-Time Market Data
              </span>
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Energy Market{" "}
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
            <p className="text-lg text-teal-50/90 leading-relaxed">
              Track real-time energy market trends, prices, and trading volumes across different sectors
            </p>
          </motion.div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Energy Source Title Section */}
          <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm border border-teal-100 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-50 rounded-lg">
                {productCategories.find(p => p.id === selectedCategory)?.icon && (
                  <div className="w-6 h-6 text-teal-600">
                    {React.createElement(productCategories.find(p => p.id === selectedCategory)?.icon as any)}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-teal-900">
                  {productCategories.find(p => p.id === selectedCategory)?.name}
                </h2>
                <p className="text-sm text-teal-600">
                  Real-time market data and analysis
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-900">
                  {productCategories.find(p => p.id === selectedCategory)?.metrics.price}
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  productCategories.find(p => p.id === selectedCategory)?.metrics.change.startsWith('+')
                    ? "text-emerald-600"
                    : "text-red-600"
                )}>
                  {productCategories.find(p => p.id === selectedCategory)?.metrics.change.startsWith('+') ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {productCategories.find(p => p.id === selectedCategory)?.metrics.change}
                </div>
              </div>
              <div className="h-8 w-px bg-teal-100" />
              <div className="text-right">
                <div className="text-sm text-teal-600">24h Volume</div>
                <div className="text-base font-semibold text-teal-900">
                  {productCategories.find(p => p.id === selectedCategory)?.metrics.volume}
                </div>
              </div>
            </div>
          </div>

          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentMarketStats.map((item) => (
              <Card key={item.id} className="bg-white/90 backdrop-blur-sm border-2 border-teal-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <item.icon className={cn(
                        "w-6 h-6",
                        item.trend === 'up' ? "text-emerald-600" :
                          item.trend === 'down' ? "text-red-600" :
                            item.trend === 'neutral' ? "text-blue-600" : "text-teal-600"
                      )} />
                      <h3 className="text-lg font-semibold text-teal-800">{item.title}</h3>
                    </div>
                    <Badge variant="secondary" className={cn(
                      "text-base",
                      item.trend === 'up' ? "bg-emerald-50 text-emerald-700" :
                        item.trend === 'down' ? "bg-red-50 text-red-700" :
                          "bg-blue-50 text-blue-700"
                    )}>
                      {item.change.startsWith('+') ? '↑' : '↓'} {item.change.replace(/[+-]/, '')}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-teal-900">{item.value}</div>
                  <div className="text-base text-teal-600">{item.subtext}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Chart */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LineChartIcon className="w-6 h-6 text-teal-600" />
                    <h2 className="text-xl font-semibold text-teal-800">Market Trends</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                      <SelectTrigger className="w-[120px] text-base">
                        <SelectValue placeholder="Time Range" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeRangeOptions.map((range) => (
                          <SelectItem key={range.value} value={range.value} className="text-base">
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
                      <SelectTrigger className="w-[140px] text-base">
                        <SelectValue placeholder="Chart Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {chartTypeIcons.map((type) => (
                          <SelectItem key={type.type} value={type.type} className="text-base">
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <ProductTypeFilter activeCategory={selectedCategory} onCategoryChange={setSelectedCategory} showAllCategories={true} />
                <div className="h-[400px]">
                  <InteractiveChart
                    data={marketData}
                    type={chartType}
                    category={selectedCategory}
                    timeRange={timeRange}
                    isPaused={isPaused}
                    onPauseToggle={handlePauseToggle}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Latest Headlines */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <NewsIcon className="w-6 h-6 text-teal-600" />
                  <h2 className="text-xl font-semibold text-teal-800">Latest Headlines</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {headlineCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="flex items-center gap-1 transition-all duration-200 text-base px-3 py-1"
                      >
                        <category.icon className="w-5 h-5" />
                        <span>{category.label}</span>
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-base"
                    onClick={() => window.location.href = '/news'}
                  >
                    View All News
                  </Button>
                </div>
              </div>
              <motion.div
                className="grid grid-cols-1 gap-4"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredHeadlines.slice(0, 3).map((headline: Headline) => (
                    <motion.div
                      key={headline.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`group p-4 rounded-lg border border-teal-50 hover:border-teal-100 
                        bg-white/50 hover:bg-white transition-all duration-200 cursor-pointer`}
                      onClick={() => setExpandedHeadline(
                        expandedHeadline === headline.id ? null : headline.id
                      )}
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
                        animate={{ height: expandedHeadline === headline.id ? 'auto' : 0 }}
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
                          Read More
                        </Button>
                      </motion.div>
                      <div className="flex items-center gap-2 text-base text-teal-600">
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

