"use client"

import { motion } from "framer-motion"
import { Briefcase, Building2, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const positions = [
    {
        title: "Energy Trader",
        department: "Trading",
        location: "London",
        type: "Full-time",
        description: "Experienced trader for global energy markets"
    },
    {
        title: "Risk Analyst",
        department: "Risk Management",
        location: "Singapore",
        type: "Full-time",
        description: "Risk assessment and portfolio management"
    }
]

export default function OpenPositionsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-teal-900 mb-8">Open Positions</h1>

                    <div className="grid gap-6">
                        {positions.map((position, index) => (
                            <motion.div
                                key={position.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border-2 border-teal-100 hover:border-orange-200 transition-colors">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-semibold text-teal-900 mb-2">{position.title}</h3>
                                                <div className="flex gap-4 text-teal-600 mb-4">
                                                    <span className="flex items-center gap-1">
                                                        <Building2 className="h-4 w-4" />
                                                        {position.department}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        {position.location}
                                                    </span>
                                                </div>
                                                <p className="text-teal-700">{position.description}</p>
                                            </div>
                                            <Button className="bg-teal-600 hover:bg-teal-700">
                                                Apply Now
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
} 