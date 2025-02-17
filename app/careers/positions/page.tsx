"use client"

import { motion } from "framer-motion"
import { Mail, ArrowRight, Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function OpenPositionsPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-teal-900 to-teal-800 py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.2),transparent_70%)]" />
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-5xl font-bold text-white mb-6">
                            Open Positions at{" "}
                            <span className="text-orange-400 relative">
                                Zinerva
                                <motion.div
                                    className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                />
                            </span>
                        </h1>
                        <p className="text-xl text-teal-50 leading-relaxed">
                            Explore opportunities to join our innovative team
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Current Status Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 
              shadow-lg mb-12">
                            <CardContent className="p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 rounded-lg bg-orange-50">
                                        <Building2 className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-teal-900 mb-2">
                                            No Current Openings
                                        </h2>
                                        <p className="text-teal-600">
                                            While we don't have any open positions at the moment, we're always interested
                                            in connecting with talented individuals who are passionate about energy trading
                                            and global markets.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 mb-8">
                                    <div className="p-3 rounded-lg bg-teal-50">
                                        <Users className="w-6 h-6 text-teal-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-teal-900 mb-2">
                                            Future Opportunities
                                        </h3>
                                        <p className="text-teal-600">
                                            As we continue to grow, we'll be looking for professionals in:
                                        </p>
                                        <ul className="mt-4 space-y-2 text-teal-600">
                                            <li>• Energy Trading and Risk Management</li>
                                            <li>• Market Analysis and Research</li>
                                            <li>• Operations and Logistics</li>
                                            <li>• Technology and Digital Innovation</li>
                                            <li>• Business Development</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Contact CTA */}
                                <div className="bg-gradient-to-br from-teal-50 to-orange-50/30 rounded-xl p-6 
                  border border-teal-100">
                                    <h3 className="text-xl font-semibold text-teal-900 mb-4">
                                        Interested in Future Opportunities?
                                    </h3>
                                    <p className="text-teal-600 mb-6">
                                        Send us your resume and let us know what you're interested in. We'll keep
                                        your profile on file for future opportunities.
                                    </p>
                                    <Button
                                        onClick={() => router.push('/contact')}
                                        className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 
                      hover:to-orange-500 text-white px-6 py-4 rounded-full shadow-lg 
                      hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <Mail className="mr-2 h-5 w-5" />
                                        <span>Contact Our Team</span>
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Stay Connected Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center"
                    >
                        <h2 className="text-2xl font-bold text-teal-900 mb-4">Stay Connected</h2>
                        <p className="text-teal-600">
                            Follow us on LinkedIn to stay updated on future opportunities and company news.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
} 