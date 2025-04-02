import { useState } from 'react'
import { CategoryId } from '@/types/market'
import { DetailedMarketData } from '@/lib/market-data'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
    Bar,
    BarChart,
    ComposedChart
} from 'recharts'
import { Pause, Play } from 'lucide-react'

interface InteractiveChartProps {
    data: DetailedMarketData[]
    type: 'area' | 'line' | 'bar' | 'composed'
    category: CategoryId
    isPaused?: boolean
    onPauseToggle?: () => void
    timeRange: string
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

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-teal-100">
                <p className="text-sm text-teal-600 mb-1">{new Date(label).toLocaleString()}</p>
                <p className="text-sm font-medium text-teal-900">
                    Price: {formatValue(payload[0].value)}
                </p>
                <p className="text-sm text-teal-600">
                    Volume: {formatVolume(payload[0].payload.volume)}
                </p>
                <p className="text-sm text-teal-600">
                    Change: {payload[0].payload.change.toFixed(2)}%
                </p>
            </div>
        )
    }
    return null
}

export function InteractiveChart({
    data,
    type,
    category,
    isPaused = false,
    onPauseToggle,
    timeRange
}: InteractiveChartProps) {
    const [isHovered, setIsHovered] = useState(false)

    const renderChart = () => {
        const commonProps = {
            data: isPaused ? data : data,
            margin: { top: 10, right: 30, left: 0, bottom: 0 }
        }

        const gradientId = `colorGradient-${category}`

        switch (type) {
            case 'area':
                return (
                    <AreaChart {...commonProps}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="name"
                            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                            stroke="#64748b"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickFormatter={(value) => formatValue(value)}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#0d9488"
                            fillOpacity={1}
                            fill={`url(#${gradientId})`}
                        />
                    </AreaChart>
                )

            case 'line':
                return (
                    <LineChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="name"
                            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                            stroke="#64748b"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickFormatter={(value) => formatValue(value)}
                        />
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

            case 'bar':
                return (
                    <BarChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="name"
                            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                            stroke="#64748b"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickFormatter={(value) => formatValue(value)}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" fill="#0d9488" />
                    </BarChart>
                )

            case 'composed':
                return (
                    <ComposedChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="name"
                            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                            stroke="#64748b"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickFormatter={(value) => formatValue(value)}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            fill="#0d9488"
                            stroke="#0d9488"
                            fillOpacity={0.3}
                        />
                        <Bar dataKey="volume" fill="#0d9488" opacity={0.5} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#0f766e"
                            strokeWidth={2}
                            dot={false}
                        />
                    </ComposedChart>
                )

            default:
                return (
                    <LineChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="name"
                            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                            stroke="#64748b"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={12}
                            tickFormatter={(value) => formatValue(value)}
                        />
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
        }
    }

    return (
        <div className="relative w-full h-full">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
                <button
                    onClick={onPauseToggle}
                    className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    title={isPaused ? "Resume updates" : "Pause updates"}
                >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
            </div>
            <div
                className="w-full h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </div>
    )
} 