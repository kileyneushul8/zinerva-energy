"use client"

import { motion } from "framer-motion"
import { Cookie, Shield, Settings, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const sections = [
    {
        icon: Cookie,
        title: "Essential Cookies",
        content: [
            "Authentication and security",
            "Session management",
            "User preferences and settings",
            "Load balancing functionality"
        ]
    },
    {
        icon: Settings,
        title: "Functional Cookies",
        content: [
            "Trading platform customization",
            "Language preferences",
            "Market view settings",
            "Dashboard configurations"
        ]
    },
    {
        icon: Shield,
        title: "Analytics Cookies",
        content: [
            "Platform usage statistics",
            "Performance monitoring",
            "User experience optimization",
            "Service improvement metrics"
        ]
    },
    {
        icon: Clock,
        title: "Cookie Management",
        content: [
            "Control via browser settings",
            "Cookie preference center",
            "Third-party cookie controls",
            "Cookie lifetime management"
        ]
    }
]

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
            {/* Header Section */}
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
                                    Website Cookies
                                </span>
                            </motion.div>
                            <h1 className="text-7xl font-bold text-white leading-tight">
                                Cookie{" "}
                                <span className="text-orange-400 relative">
                                    Policy
                                    <motion.div
                                        className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    />
                                </span>
                            </h1>
                            <p className="text-xl text-teal-50 leading-relaxed max-w-2xl">
                                Understanding how we use cookies to enhance your experience
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Introduction Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 shadow-lg">
                            <CardContent className="p-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-orange-50">
                                        <Cookie className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-teal-900 mb-4">
                                            Last Updated: March 15, 2024
                                        </h2>
                                        <p className="text-teal-600">
                                            This Cookie Policy explains how Zinerva Energy uses cookies and similar
                                            technologies to provide, customize, evaluate, improve, and secure our services.
                                            We use cookies to enhance your trading experience while ensuring platform security.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Policy Sections */}
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 
                  hover:border-orange-200 shadow-lg transition-all duration-300">
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="p-3 rounded-lg bg-teal-50">
                                                <section.icon className="w-6 h-6 text-teal-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-teal-900">{section.title}</h3>
                                        </div>
                                        <ul className="space-y-4">
                                            {section.content.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                                                    <span className="text-teal-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Cookie Settings Note */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 p-6 bg-gradient-to-br from-orange-50 to-teal-50 
              rounded-xl border border-teal-100"
                    >
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-teal-900 mb-2">Cookie Preferences</h3>
                                <p className="text-teal-600">
                                    You can manage your cookie preferences through your browser settings. For questions
                                    about our cookie usage, please contact us at{" "}
                                    <a
                                        href="mailto:account.management@zinervacompany.com"
                                        className="text-orange-600 hover:text-orange-700"
                                    >
                                        account.management@zinervacompany.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
} 