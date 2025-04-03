"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
    title: string
    description: string
    tradingVolume: string
    sustainability: {
        carbonFootprint: string
        renewableContent?: string
        environmentalCertifications: string[]
    }
    marketInsights: {
        priceHistory: string
        demandTrend: string
        seasonalFactors: string[]
    }
    logistics: {
        storageRequirements: string
        transportationModes: string[]
        handlingPrecautions: string[]
    }
    onClose: () => void
}

export function ProductCard({
    title,
    description,
    tradingVolume,
    sustainability,
    marketInsights,
    logistics,
    onClose
}: ProductCardProps) {
    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl font-bold text-teal-900">{title}</DialogTitle>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                    <p className="text-gray-600">{description}</p>
                    <Badge variant="secondary" className="w-fit">
                        {tradingVolume} Annual Trading Volume
                    </Badge>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {/* Sustainability Section */}
                    <div className="bg-green-50 rounded-lg p-4 space-y-3">
                        <h3 className="font-semibold text-green-800 flex items-center gap-2">
                            Sustainability
                        </h3>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm text-green-700">Carbon Footprint</span>
                                <p className="font-medium text-green-900">{sustainability.carbonFootprint}</p>
                            </div>
                            {sustainability.renewableContent && (
                                <div>
                                    <span className="text-sm text-green-700">Renewable Content</span>
                                    <p className="font-medium text-green-900">{sustainability.renewableContent}</p>
                                </div>
                            )}
                            <div>
                                <span className="text-sm text-green-700">Certifications</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {sustainability.environmentalCertifications.map((cert) => (
                                        <Badge key={cert} variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                            {cert}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Market Insights Section */}
                    <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                        <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                            Market Insights
                        </h3>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm text-blue-700">Price Trend</span>
                                <p className="font-medium text-blue-900">{marketInsights.priceHistory}</p>
                            </div>
                            <div>
                                <span className="text-sm text-blue-700">Demand Outlook</span>
                                <p className="font-medium text-blue-900">{marketInsights.demandTrend}</p>
                            </div>
                            <div>
                                <span className="text-sm text-blue-700">Seasonal Factors</span>
                                <ul className="mt-1 space-y-1">
                                    {marketInsights.seasonalFactors.map((factor) => (
                                        <li key={factor} className="text-sm text-blue-800">
                                            • {factor}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Logistics Section */}
                    <div className="bg-purple-50 rounded-lg p-4 space-y-3">
                        <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                            Logistics
                        </h3>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm text-purple-700">Storage</span>
                                <p className="font-medium text-purple-900">{logistics.storageRequirements}</p>
                            </div>
                            <div>
                                <span className="text-sm text-purple-700">Transportation</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {logistics.transportationModes.map((mode) => (
                                        <Badge key={mode} variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                                            {mode}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-sm text-purple-700">Safety Precautions</span>
                                <ul className="mt-1 space-y-1">
                                    {logistics.handlingPrecautions.map((precaution) => (
                                        <li key={precaution} className="text-sm text-purple-800">
                                            • {precaution}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 