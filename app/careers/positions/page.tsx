"use client"

import { motion } from "framer-motion"
import { Briefcase, Building2, Users, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function OpenPositionsPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-teal-900 mb-8">Open Positions</h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="border-2 border-teal-100 bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-8 text-center">
                                <div className="mb-6 mx-auto w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-teal-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-teal-900 mb-3">
                                    No Current Open Positions
                                </h3>
                                <p className="text-teal-700 mb-6 max-w-lg mx-auto">
                                    While we don't have any open positions at the moment, we're always interested
                                    in connecting with talented individuals who are passionate about energy trading
                                    and sustainability.
                                </p>
                                <Button
                                    onClick={() => router.push('/contact')}
                                    className="bg-gradient-to-r from-teal-600 to-teal-500 
                                        hover:from-teal-500 hover:to-teal-400 text-white px-6 py-3 
                                        rounded-lg shadow-md hover:shadow-lg transition-all duration-300 
                                        group flex items-center gap-2 mx-auto"
                                >
                                    Contact Us
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
} 