"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Globe, ArrowRight, Award, Target } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LeadershipPage() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 200], [1, 0])
    const [activeTab, setActiveTab] = useState('vision')

    const visionPoints = [
        {
            title: "Market Leadership",
            description: "Driving innovation in global energy trading",
            icon: Target
        },
        {
            title: "Sustainable Future",
            description: "Promoting renewable energy solutions",
            icon: Globe
        },
        {
            title: "Excellence",
            description: "Setting industry standards in trading practices",
            icon: Award
        }
    ]

    const contactEmail = "account.management@zinervacompany.com"

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
            {/* Header Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 to-teal-900/80 z-10" />
                    <Image
                        src="/gabriel-hernandez.jpg"
                        alt="Zinerva Leadership"
                        fill
                        className="object-cover object-top"
                        priority
                        quality={100}
                    />
                </div>
                <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 max-w-3xl"
                    >
                        <h1 className="text-6xl font-bold text-white leading-tight">
                            Leadership Team
                        </h1>
                        <div className="w-20 h-1 bg-orange-500 rounded-full" />
                        <p className="text-xl text-teal-50/90 leading-relaxed">
                            Driving innovation and excellence in global energy trading
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Executive Profile */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl 
            transition-all duration-500">
                        <div className="md:flex">
                            {/* Image Column */}
                            <div className="md:w-1/3 relative">
                                <div className="h-full relative">
                                    <Image
                                        src="/gabriel-hernandez.jpg" // Add executive's image
                                        alt="Gabriel Hernandez"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className="md:w-2/3 p-8 md:p-12">
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold text-teal-900 mb-2">
                                        Gabriel Hernandez
                                    </h2>
                                    <p className="text-xl text-orange-500 font-medium mb-4">
                                        Chief Executive Officer
                                    </p>
                                    <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full mb-6" />

                                    <div className="prose prose-lg text-teal-700 mb-8">
                                        <p className="mb-4">
                                            Gabriel Hernandez brings over two decades of experience in global energy trading
                                            and strategic leadership to Zinerva Energy. His vision for sustainable and
                                            innovative energy solutions has been instrumental in positioning the company
                                            as a leader in the international energy market.
                                        </p>
                                        <p>
                                            Under his leadership, Zinerva has expanded its global presence while maintaining
                                            an unwavering commitment to ethical business practices and environmental
                                            responsibility. Gabriel's expertise in market dynamics and strategic planning
                                            continues to drive the company's growth and success.
                                        </p>
                                    </div>

                                    {/* Enhanced Interactive Tabs Section */}
                                    <div className="border-t border-teal-100 mt-8 pt-8">
                                        <div className="flex space-x-4 mb-6">
                                            {['vision', 'achievements', 'contact'].map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setActiveTab(tab)}
                                                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === tab
                                                        ? 'bg-teal-600 text-white shadow-lg'
                                                        : 'text-teal-600 hover:bg-teal-50'
                                                        }`}
                                                >
                                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="min-h-[200px] p-4">
                                            {activeTab === 'vision' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="grid md:grid-cols-3 gap-6"
                                                >
                                                    {visionPoints.map((point, index) => (
                                                        <motion.div
                                                            key={point.title}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="p-4 rounded-xl bg-teal-50 hover:bg-teal-100 
                                transition-all duration-300 group"
                                                        >
                                                            <point.icon className="h-8 w-8 text-teal-600 mb-3 
                                group-hover:scale-110 transition-transform duration-300" />
                                                            <h4 className="text-lg font-semibold text-teal-900 mb-2">
                                                                {point.title}
                                                            </h4>
                                                            <p className="text-teal-600">{point.description}</p>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            )}

                                            {activeTab === 'achievements' && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="space-y-4"
                                                >
                                                    <motion.div className="space-y-4">
                                                        <motion.div
                                                            whileHover={{ x: 10 }}
                                                            className="p-4 rounded-lg bg-orange-50 hover:bg-orange-100 
                                transition-all duration-300"
                                                        >
                                                            <h4 className="text-lg font-semibold text-teal-900 mb-2">
                                                                Global Recognition
                                                            </h4>
                                                            <p className="text-teal-700">
                                                                Featured in leading industry publications for innovative
                                                                trading strategies and market insights.
                                                            </p>
                                                        </motion.div>
                                                    </motion.div>
                                                </motion.div>
                                            )}

                                            {activeTab === 'contact' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="space-y-6 text-center"
                                                >
                                                    <div className="flex justify-center">
                                                        <Button
                                                            className="bg-teal-600 hover:bg-teal-700 text-white"
                                                            onClick={() => window.location.href = 'mailto:account.management@zinervacompany.com'}
                                                        >
                                                            <Mail className="mr-2 h-5 w-5" />
                                                            Email
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Future Team Section Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-20"
                >
                    <p className="text-teal-600 text-lg">
                        Our team is growing. Check back soon for more executive team members.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

