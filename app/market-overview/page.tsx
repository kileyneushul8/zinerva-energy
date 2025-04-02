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
  Newspaper as NewsIcon, Sun, Wind, Atom, DollarSign
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
import { LucideIcon } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import {
  MarketData,
  MarketCategoryId,
  ChartType,
  TimeRange,
  CustomTooltipProps,
  MarketParams,
  MarketColors
} from '@/types/market'
import { HeadlinesService, Headline } from '@/lib/services/headlines.service'
import Link from 'next/link'
import { HeadlinesSection } from '@/components/headlines-section'

// News categories
type NewsCategoryId = 'regulatory' | 'market-insights' | 'investment' | 'innovation'

const headlineCategories = [
  { id: 'regulatory' as NewsCategoryId, label: 'Regulatory', icon: Scale },
  { id: 'market-insights' as NewsCategoryId, label: 'Market Insights', icon: TrendingUp },
  { id: 'investment' as NewsCategoryId, label: 'Investment', icon: Briefcase },
  { id: 'innovation' as NewsCategoryId, label: 'Innovation', icon: Lightbulb }
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

// Type definitions
type AxisInterval = number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd'

// Define local types
type LocalCategoryId = MarketCategoryId | NewsCategoryId | 'all'

interface ExtendedMarketData extends MarketData {
  volatility: number
  trend: TrendDirection
  ma5?: number
  ma20?: number
}

const calculateMovingAverage = (data: ExtendedMarketData[], period: number): number[] => {
  return data.map((_, index) => {
    const start = Math.max(0, index - period + 1)
    const values = data.slice(start, index + 1).map(d => d.value)
    return values.reduce((sum, val) => sum + val, 0) / values.length
  })
}

const generateChartData = (category: MarketCategoryId, timeRange: TimeRange): ExtendedMarketData[] => {
  const data: ExtendedMarketData[] = []
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

    // Update trend value based on total change
    const trendDirection = getTrendDirection(totalChange)

    data.push({
      name: time.toISOString(),
      value: Number(lastValue.toFixed(2)),
      volume,
      change: Number(totalChange.toFixed(2)),
      trend: trendDirection,
      volatility: Number(volatility.toFixed(4))
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

// Type guards
const isValidCategory = (value: string): value is MarketCategoryId => {
  return Object.keys(marketParams).includes(value)
}

const isValidTimeRange = (value: string): value is TimeRange => {
  return ['1D', '1W', '1M', '3M', '6M', '1Y'].includes(value)
}

const isValidChartType = (value: string): value is ChartType => {
  return ['line', 'bar', 'area', 'composed'].includes(value)
}

// Update the InteractiveChart component props
interface InteractiveChartProps {
  data: ExtendedMarketData[]
  type: ChartType
  category: MarketCategoryId
  timeRange: TimeRange
  isPaused: boolean
  onPauseToggle: () => void
}

// Update the type definitions
type CategoryId = MarketCategoryId | NewsCategoryId | 'all'

interface ProductTypeFilterProps {
  activeCategory: LocalCategoryId
  onCategoryChange: (category: LocalCategoryId) => void
  showAllCategories?: boolean
}

const ProductTypeFilter = ({ activeCategory, onCategoryChange, showAllCategories = true }: ProductTypeFilterProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
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
      </motion.div>
      {productCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            variant={!showAllCategories && activeCategory === category.id ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex items-center gap-2 whitespace-nowrap",
              !showAllCategories && activeCategory === category.id && "bg-teal-600 hover:bg-teal-700"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </Button>
        </motion.div>
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

interface ChartContainerProps {
  data: ExtendedMarketData[]
  chartType: ChartType
  category: MarketCategoryId
  timeRange: TimeRange
  showVolume: boolean
  showMA: boolean
}

const ChartContainer = ({
  data,
  chartType,
  category,
  timeRange,
  showVolume,
  showMA
}: ChartContainerProps) => {
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

  const getAxisInterval = (timeRange: TimeRange): number | 'preserveStartEnd' => {
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
    const colors = categoryColors[category]

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
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.05} />
              </linearGradient>
              {showMA && (
                <>
                  <linearGradient id="colorMA5" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.accent} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={colors.accent} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMA20" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={colors.secondary} stopOpacity={0} />
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
              stroke={colors.primary}
              strokeWidth={2}
              fill="url(#colorValue)"
            />
            {showMA && (
              <>
                <Area
                  type="monotone"
                  dataKey="ma5"
                  stroke={colors.accent}
                  strokeWidth={1}
                  fill="url(#colorMA5)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="ma20"
                  stroke={colors.secondary}
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
              stroke={colors.primary}
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
            <Bar dataKey="value" fill={colors.primary} />
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
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.4} />
            <XAxis {...commonXAxisProps} />
            <YAxis {...commonYAxisProps} />
            <YAxis {...volumeYAxisProps} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: colors.primary, strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              fill="url(#colorValue)"
              stroke={colors.primary}
              fillOpacity={0.3}
            />
            <Bar
              dataKey="volume"
              yAxisId="volume"
              fill={colors.primary}
              opacity={0.2}
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.change >= 0 ? colors.primary : '#ef4444'}
                  opacity={0.2}
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="value"
              stroke={colors.primary}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: colors.primary,
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

// Simplified time range options
const timeRangeOptions = [
  { value: '1D', label: '1 Day' },
  { value: '1W', label: '1 Week' },
  { value: '1M', label: '1 Month' },
  { value: '3M', label: '3 Months' },
  { value: '6M', label: '6 Months' },
  { value: '1Y', label: '1 Year' }
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
  onDateSelect,
  selectedCategory
}: {
  timeRange: string
  setTimeRange: (range: string) => void
  onDateSelect: (date: Date) => void
  selectedCategory: MarketCategoryId
}) => {
  const [date, setDate] = useState<Date>(new Date())
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
                  whileHover={{ backgroundColor: categoryColors[selectedCategory].primary }}
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
  data?: ExtendedMarketData[]
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
  data?: ExtendedMarketData
  error?: string
}

interface CacheEntry {
  data: ExtendedMarketData[]
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

  set(category: CategoryId, timeRange: TimeRange, data: ExtendedMarketData[]): void {
    const key = this.getCacheKey(category, timeRange)
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      category,
      timeRange
    })
  }

  get(category: CategoryId, timeRange: TimeRange): ExtendedMarketData[] | null {
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

// WebSocket interfaces
interface WebSocketProvider {
  subscribe(callback: (data: ExtendedMarketData) => void): () => void
  disconnect(): void
}

// Update the trend type and conversion
type TrendDirection = 'up' | 'down' | 'stable'

const getTrendDirection = (value: number): TrendDirection => {
  if (value > 0) return 'up'
  if (value < 0) return 'down'
  return 'stable'
}

// Update the MarketDataWebSocket class
class MarketDataWebSocket implements WebSocketProvider {
  private intervalId: NodeJS.Timeout | null = null
  private callbacks: Set<(data: ExtendedMarketData) => void> = new Set()

  constructor(private category: MarketCategoryId) {
    this.startMockUpdates()
  }

  private startMockUpdates() {
    this.intervalId = setInterval(() => {
      const mockData: ExtendedMarketData = {
        name: new Date().toISOString(),
        value: Math.random() * 100,
        volume: Math.floor(Math.random() * 1000000),
        change: (Math.random() - 0.5) * 2,
        volatility: Math.random() * 0.5,
        trend: getTrendDirection(Math.random() - 0.5)
      }
      this.callbacks.forEach(callback => callback(mockData))
    }, 5000)
  }

  subscribe(callback: (data: ExtendedMarketData) => void) {
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

// Update the filterHeadlinesByCategory function
const filterHeadlinesByCategory = (headlines: Headline[], category: LocalCategoryId): Headline[] => {
  if (category === 'all') {
    return headlines
  }

  // Check if it's a news category
  const newsCategories: NewsCategoryId[] = ['regulatory', 'market-insights', 'investment', 'innovation']
  if (newsCategories.includes(category as NewsCategoryId)) {
    return headlines.filter(headline => headline.category === category)
  }

  // If it's a market category, return all headlines
  return headlines
}

// Market data service
class MarketDataService {
  private ws: WebSocketProvider

  constructor(category: MarketCategoryId) {
    this.ws = new MarketDataWebSocket(category)
  }

  subscribe(callback: (data: ExtendedMarketData) => void) {
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
  category: MarketCategoryId,
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
const validateMarketData = (data: ExtendedMarketData[]): boolean => {
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
const getMarketStats = (selectedCategory: MarketCategoryId, productCategories: ProductCategory[]): MarketStat[] => {
  const selectedProduct = productCategories.find(p => p.id === selectedCategory)
  if (!selectedProduct) return []

  const change = parseFloat(selectedProduct.metrics.change)
  const trend: 'up' | 'down' | 'stable' = change > 0 ? 'up' : change < 0 ? 'down' : 'stable'

  return [
    {
      id: 'price',
      title: 'Current Price',
      value: selectedProduct.metrics.price,
      change: selectedProduct.metrics.change,
      trend,
      icon: DollarSign,
      subtext: 'Last updated'
    },
    {
      id: 'volume',
      title: '24h Volume',
      value: selectedProduct.metrics.volume,
      change: '+12.5%',
      trend: 'up',
      icon: Activity,
      subtext: 'Trading volume'
    },
    {
      id: 'trend',
      title: 'Market Trend',
      value: trend === 'up' ? 'Bullish' : trend === 'down' ? 'Bearish' : 'Neutral',
      change: selectedProduct.metrics.change,
      trend,
      icon: trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Activity,
      subtext: 'Based on 24h data'
    }
  ]
}

interface ProductCategory {
  id: CategoryId
  name: string
  icon: LucideIcon
  metrics: {
    price: string
    change: string
    volume: string
  }
}

const productCategories: ProductCategory[] = [
  {
    id: 'crude-oil',
    name: 'Crude Oil',
    icon: Droplet,
    metrics: {
      price: '$75.23',
      change: '+2.45%',
      volume: '1.2M'
    }
  },
  {
    id: 'natural-gas',
    name: 'Natural Gas',
    icon: Zap,
    metrics: {
      price: '$3.45',
      change: '-1.23%',
      volume: '850K'
    }
  },
  {
    id: 'renewables',
    name: 'Renewable',
    icon: Wind,
    metrics: {
      price: '$45.67',
      change: '+3.21%',
      volume: '950K'
    }
  },
  {
    id: 'industrial',
    name: 'Industrial',
    icon: Atom,
    metrics: {
      price: '$89.12',
      change: '+1.89%',
      volume: '1.1M'
    }
  }
]

interface MarketStat {
  id: string
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  icon: LucideIcon
  subtext: string
}

// Update the category colors
const categoryColors: Record<MarketCategoryId, MarketColors> = {
  'crude-oil': {
    primary: '#0d9488',
    secondary: '#14b8a6',
    gradient: ['#0d9488', '#14b8a6'],
    accent: '#2dd4bf'
  },
  'natural-gas': {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    gradient: ['#3b82f6', '#60a5fa'],
    accent: '#93c5fd'
  },
  'renewables': {
    primary: '#10b981',
    secondary: '#34d399',
    gradient: ['#10b981', '#34d399'],
    accent: '#6ee7b7'
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
  },
  'industrial': {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    gradient: ['#8b5cf6', '#a78bfa'],
    accent: '#c4b5fd'
  }
}

// Update market parameters
const marketParams: Record<MarketCategoryId, MarketParams> = {
  'crude-oil': {
    baseValue: 75,
    volatility: 2.5,
    trend: 0.8,
    seasonality: 1.2,
    volumeBase: 1000000,
    volumeVariance: 200000
  },
  'natural-gas': {
    baseValue: 3.5,
    volatility: 0.025,
    trend: -0.0005,
    seasonality: 0.3,
    volumeBase: 800000,
    volumeVariance: 400000
  },
  'renewables': {
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
  },
  'industrial': {
    baseValue: 100,
    volatility: 0.01,
    trend: 0.001,
    seasonality: 0.05,
    volumeBase: 1000000,
    volumeVariance: 500000
  }
}

// Update category labels
const categoryLabels: Record<MarketCategoryId, string> = {
  'crude-oil': 'Crude Oil',
  'natural-gas': 'Natural Gas',
  'renewables': 'Renewable Energy',
  'nuclear': 'Nuclear Power',
  'coal': 'Coal',
  'solar': 'Solar Energy',
  'wind': 'Wind Power',
  'hydrogen': 'Hydrogen',
  'industrial': 'Industrial'
}

const formatValue = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

const formatVolume = (volume: number) => {
  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(1)}M`
  }
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}K`
  }
  return volume.toString()
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length && label) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-teal-100">
        <p className="text-sm text-teal-600 mb-1">{new Date(label).toLocaleString()}</p>
        <p className="text-sm font-medium text-teal-900">
          Price: {formatValue(payload[0].value)}
        </p>
        <p className="text-sm text-teal-600">
          Volume: {formatVolume(payload[0].payload.volume || 0)}
        </p>
        <p className="text-sm text-teal-600">
          Change: {payload[0].payload.change.toFixed(2)}%
        </p>
      </div>
    )
  }
  return null
}

export default function MarketOverviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategoryId>('crude-oil')
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<NewsCategoryId>('regulatory')
  const [timeRange, setTimeRange] = useState<TimeRange>('1D')
  const [chartType, setChartType] = useState<ChartType>('line')
  const [showAllCategories, setShowAllCategories] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNews, setIsLoadingNews] = useState(false)
  const [headlines, setHeadlines] = useState<Headline[]>([])
  const [marketData, setMarketData] = useState<ExtendedMarketData[]>([])
  const [marketDataCache] = useState(() => new MarketDataCache())
  const [marketDataService] = useState(() => new MarketDataService(selectedCategory))
  const [headlinesService] = useState(() => HeadlinesService.getInstance())

  // Move handleTimeRangeChange inside the component
  const handleTimeRangeChange = useCallback((value: string) => {
    if (isValidTimeRange(value)) {
      setTimeRange(value as TimeRange)
    }
  }, [])

  // Function to fetch market data
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetchMarketData(selectedCategory, timeRange, marketDataCache)
      if (response.success && response.data) {
        setMarketData(response.data)
      }
    } catch (error) {
      console.error('Error fetching market data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [selectedCategory, timeRange, marketDataCache])

  // Initialize market data service for real-time updates
  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    if (!isLoading) {
      unsubscribe = marketDataService.subscribe((newData) => {
        setMarketData(currentData => {
          const updatedData = [...currentData]
          if (updatedData.length > 100) {
            updatedData.shift() // Remove oldest data point
          }
          updatedData.push(newData)
          return updatedData
        })
      })
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
      marketDataService.disconnect()
    }
  }, [selectedCategory, isLoading])

  // Fetch initial data
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Fetch headlines
  const fetchHeadlines = useCallback(async () => {
    setIsLoadingNews(true)
    try {
      const fetchedHeadlines = await headlinesService.getHeadlines()
      const filteredHeadlines = filterHeadlinesByCategory(fetchedHeadlines, selectedNewsCategory)
      setHeadlines(filteredHeadlines)
    } catch (error) {
      console.error('Error fetching headlines:', error)
      setHeadlines([])
    } finally {
      setIsLoadingNews(false)
    }
  }, [selectedNewsCategory])

  // Fetch headlines when category changes
  useEffect(() => {
    fetchHeadlines()
  }, [fetchHeadlines])

  // Handle category change
  const handleCategoryChange = (category: LocalCategoryId) => {
    // Check if it's a news category
    const newsCategories: NewsCategoryId[] = ['regulatory', 'market-insights', 'investment', 'innovation']
    if (newsCategories.includes(category as NewsCategoryId)) {
      setSelectedNewsCategory(category as NewsCategoryId)
    } else if (category === 'all') {
      // Handle 'all' category
      setShowAllCategories(true)
    } else {
      // It's a market category
      setSelectedCategory(category as MarketCategoryId)
      setShowAllCategories(false)
    }

    fetchData()
  }

  // Update the sorting to use time instead of date
  const sortedHeadlines = [...headlines].sort((a, b) => {
    // Convert time strings to comparable values (assuming format like '2h ago', '1d ago')
    const getTimeValue = (time: string) => {
      const value = parseInt(time)
      const unit = time.includes('h') ? 1 : 24 // Convert to hours
      return value * unit
    }

    return getTimeValue(a.time) - getTimeValue(b.time)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner/Hero Section */}
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
                  Real-time Market Data
                </span>
              </motion.div>
              <h1 className="text-5xl font-bold text-white leading-tight">
                Global Energy{" "}
                <span className="text-orange-400 relative">
                  Market Overview
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h1>
              <p className="text-xl text-teal-50 leading-relaxed max-w-2xl">
                Track real-time energy market trends, analyze performance metrics, and make informed decisions with our comprehensive market overview dashboard.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Market Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {getMarketStats(selectedCategory, productCategories).map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-50 rounded-lg">
                    <stat.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-sm font-medium text-teal-900">{stat.title}</h3>
                </div>
                <Badge
                  variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-teal-900 mb-1">{stat.value}</div>
              <div className="text-sm text-teal-500">{stat.subtext}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-teal-900">
                    {categoryLabels[selectedCategory]} Market Overview
                  </h2>
                  <p className="text-sm text-teal-500 mt-1">
                    Real-time market data and analysis
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ToggleGroup
                    type="single"
                    value={chartType}
                    onValueChange={(value) => value && setChartType(value as ChartType)}
                    className="bg-teal-50 p-1 rounded-lg"
                  >
                    {chartTypeIcons.map(({ type, icon: Icon, label }) => (
                      <ToggleGroupItem
                        key={type}
                        value={type}
                        className="data-[state=on]:bg-white data-[state=on]:text-teal-600"
                      >
                        <Icon className="w-4 h-4" />
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {productCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "flex items-center gap-2 whitespace-nowrap",
                        selectedCategory === category.id && "bg-teal-600 hover:bg-teal-700"
                      )}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      <category.icon className="w-4 h-4" />
                      {category.name}
                    </Button>
                  ))}
                </div>

                {/* Simplified Time Range Selector */}
                <div className="flex items-center gap-4">
                  <Select
                    value={timeRange}
                    onValueChange={handleTimeRangeChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeRangeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchData}
                    className="text-teal-600"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                {/* Chart */}
                {isLoading ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
                  </div>
                ) : (
                  <InteractiveChart
                    data={marketData}
                    type={chartType}
                    category={selectedCategory}
                    timeRange={timeRange}
                    isPaused={isLoading}
                    onPauseToggle={() => setIsLoading(!isLoading)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* News Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-teal-900">Market News</h2>
                  <p className="text-sm text-teal-500 mt-1">
                    Latest updates and analysis
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-teal-600"
                  onClick={fetchHeadlines}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* News Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4">
                {headlineCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedNewsCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "flex items-center gap-2 whitespace-nowrap",
                      selectedNewsCategory === category.id && "bg-teal-600 hover:bg-teal-700"
                    )}
                    onClick={() => {
                      setSelectedNewsCategory(category.id)
                      // Fetch headlines immediately when category changes
                      fetchHeadlines()
                    }}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.label}
                  </Button>
                ))}
              </div>

              {/* Headlines List */}
              <div className="space-y-4">
                {isLoadingNews ? (
                  // Loading skeletons - reduced to 3
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="flex items-start gap-3 animate-pulse">
                      <div className="w-10 h-10 bg-teal-100 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-teal-100 rounded w-3/4" />
                        <div className="h-3 bg-teal-50 rounded w-1/2" />
                      </div>
                    </div>
                  ))
                ) : sortedHeadlines.length > 0 ? (
                  // Show headlines for the selected category
                  sortedHeadlines.map((headline) => (
                    <Link
                      key={headline.id}
                      href={`/headlines/${headline.id}`}
                      className="block"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
                      >
                        <div className="p-2 rounded-full bg-white">
                          {headlineCategories.find(cat => cat.id === headline.category)?.icon && (
                            <div className="w-4 h-4 text-teal-600">
                              {React.createElement(
                                headlineCategories.find(cat => cat.id === headline.category)?.icon || NewsIcon
                              )}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-teal-900 font-medium">{headline.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-teal-500">
                              {headline.time}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {headlineCategories.find(cat => cat.id === headline.category)?.label}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8 text-teal-500">
                    No headlines available for {headlineCategories.find(cat => cat.id === selectedNewsCategory)?.label}
                  </div>
                )}
              </div>

              {/* View All Link */}
              <div className="mt-6">
                <Link href="/market-overview/headlines" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full text-teal-600"
                  >
                    View All Headlines
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Replace the existing headlines section with the new component */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Latest News</h2>
          <HeadlinesSection />
        </section>
      </main>
    </div>
  )
}

