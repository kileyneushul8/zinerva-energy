"use client"

import { motion } from "framer-motion"
import { Shield, Scale, FileText, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const sections = [
    {
        title: "1. Service Terms",
        content: [
            "These terms govern your use of Zinerva's energy trading and distribution services.",
            "By accessing our services, you agree to comply with all applicable energy trading regulations.",
            "We reserve the right to modify these terms with appropriate notice to our clients.",
            "Services are provided on an 'as-is' and 'as-available' basis.",
            "Access to services may require registration and account maintenance."
        ]
    },
    {
        title: "2. Trading Conditions",
        content: [
            "All trades must comply with international energy trading regulations and sanctions.",
            "Users must maintain required licenses and permits for energy trading activities.",
            "Zinerva reserves the right to suspend trading activities in case of regulatory concerns.",
            "Trading hours and conditions follow standard market practices.",
            "Price quotes and market data are subject to real-time market conditions.",
            "All transactions must be properly documented and reported as required by law."
        ]
    },
    {
        title: "3. User Obligations",
        content: [
            "Maintain accurate and up-to-date account information",
            "Comply with all applicable laws and regulations",
            "Report any suspicious trading activities or security concerns",
            "Maintain confidentiality of account credentials",
            "Implement appropriate security measures",
            "Provide accurate trading and compliance documentation",
            "Maintain required financial reserves and guarantees"
        ]
    },
    {
        title: "4. Liability",
        content: [
            "Zinerva is not liable for market fluctuations or trading losses",
            "Users are responsible for their trading decisions and compliance",
            "Force majeure conditions may affect service availability",
            "Limited liability for technical issues or service interruptions",
            "No liability for third-party services or information"
        ]
    },
    {
        title: "5. Data and Security",
        content: [
            "User data is handled in accordance with our Privacy Policy",
            "Trading data is stored securely and in compliance with regulations",
            "Access to trading platforms requires multi-factor authentication",
            "Users must report security breaches immediately",
            "Regular security audits and updates are performed"
        ]
    },
    {
        title: "6. Termination",
        content: [
            "Either party may terminate the agreement with proper notice",
            "Immediate termination for regulatory violations",
            "Outstanding obligations survive termination",
            "Data retention requirements continue post-termination",
            "Wind-down procedures must follow regulatory guidelines"
        ]
    },
    {
        title: "7. Dispute Resolution",
        content: [
            "Disputes are resolved through negotiation when possible",
            "Mandatory arbitration for unresolved disputes",
            "Choice of law and jurisdiction specifications",
            "Confidentiality requirements in dispute proceedings",
            "Cost allocation for dispute resolution"
        ]
    }
]

export default function TermsPage() {
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
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-6"
                        >
                            <span className="px-4 py-2 bg-orange-500/20 text-orange-100 rounded-full text-sm font-medium">
                                Legal Framework
                            </span>
                        </motion.div>
                        <h1 className="text-5xl font-bold text-white mb-6">
                            Terms of{" "}
                            <span className="text-orange-400 relative">
                                Service
                                <motion.div
                                    className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                />
                            </span>
                        </h1>
                        <p className="text-xl text-teal-50 leading-relaxed">
                            Our commitment to transparent and compliant energy trading services
                        </p>
                    </motion.div>
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
                                        <Shield className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-teal-900 mb-4">
                                            Last Updated: March 15, 2024
                                        </h2>
                                        <p className="text-teal-600">
                                            These Terms of Service ("Terms") govern your access to and use of Zinerva's
                                            energy trading and distribution services. Please read these terms carefully
                                            before engaging with our services.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Terms Sections */}
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
                                        <h3 className="text-xl font-bold text-teal-900 mb-4">{section.title}</h3>
                                        <ul className="space-y-4">
                                            {section.content.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Scale className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                                                    <span className="text-teal-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Note */}
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
                                <h3 className="text-lg font-semibold text-teal-900 mb-2">Important Notice</h3>
                                <p className="text-teal-600">
                                    These terms are subject to change. We will notify users of any material changes
                                    to these terms. Continued use of our services after such modifications constitutes
                                    acceptance of the updated terms.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

