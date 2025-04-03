import { DetailedMarketData } from "@/lib/market-data"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowUpIcon as ArrowUp, ArrowDownIcon as ArrowDown } from "@heroicons/react/20/solid"
import { cn } from "@/lib/utils"

interface MarketDataDisplayProps {
    data: DetailedMarketData[]
    onItemClick?: (item: DetailedMarketData) => void
}

export function MarketDataDisplay({ data, onItemClick }: MarketDataDisplayProps) {
    return (
        <div className="space-y-3">
            {data.map((item, index) => (
                <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onItemClick?.(item)}
                    className={cn(
                        "bg-white rounded-lg shadow-sm p-4 cursor-pointer",
                        "hover:shadow-md transition-shadow duration-200",
                        "border border-transparent hover:border-teal-100"
                    )}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-teal-900">{item.name}</h3>
                        <Badge
                            variant={item.trend === 'up' ? 'default' : 'destructive'}
                            className="text-xs"
                        >
                            {item.change > 0 ? '+' : ''}{item.change}%
                        </Badge>
                    </div>
                    <div className="flex items-end gap-2">
                        <div className="text-xl font-bold text-teal-900">
                            ${item.value.toFixed(2)}
                        </div>
                        <div className="flex items-center text-xs">
                            {item.trend === 'up' ? (
                                <ArrowUp className="w-3 h-3 text-emerald-500" />
                            ) : (
                                <ArrowDown className="w-3 h-3 text-red-500" />
                            )}
                            <span className={item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}>
                                Vol: {item.volume.toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-teal-600">
                        Volatility: {(item.volatility * 100).toFixed(1)}%
                    </div>
                </motion.div>
            ))}
        </div>
    )
} 