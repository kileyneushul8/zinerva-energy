import React from 'react'
import { Activity, BarChart2, Download, Globe, Share2 } from 'lucide-react'
import { LineChart as LineChartIcon } from 'lucide-react'
import { Newspaper as NewsIcon } from 'lucide-react'
import { Button } from "./ui/button"
import { LiveTimeDisplay } from './LiveTimeDisplay'

export function PageHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-teal-100 bg-white/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <BarChart2 className="w-6 h-6 text-teal-600" />
                            <h1 className="text-xl font-semibold text-teal-800">Energy Markets</h1>
                        </div>
                        <nav className="hidden md:flex items-center gap-4">
                            <Button variant="ghost" className="text-teal-600">
                                <LineChartIcon className="w-4 h-4 mr-2" />
                                Charts
                            </Button>
                            <Button variant="ghost" className="text-teal-600">
                                <NewsIcon className="w-4 h-4 mr-2" />
                                News
                            </Button>
                            <Button variant="ghost" className="text-teal-600">
                                <Globe className="w-4 h-4 mr-2" />
                                Markets
                            </Button>
                            <Button variant="ghost" className="text-teal-600">
                                <Activity className="w-4 h-4 mr-2" />
                                Analysis
                            </Button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <LiveTimeDisplay />
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
} 