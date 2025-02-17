"use client"

import { motion } from "framer-motion"
import { Shield, FileText, Users, Globe, Scale, AlertTriangle, CheckCircle2, ExternalLink, Download, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const sections = [
    {
        title: "Business Integrity",
        icon: Shield,
        color: "text-teal-600",
        content: [
            "Maintain highest standards of professional and personal conduct",
            "Zero tolerance for bribery, corruption, or fraudulent practices",
            "Strict adherence to international trade laws and regulations",
            "Protection of company and stakeholder confidential information"
        ]
    },
    {
        title: "Fair Trading",
        icon: Scale,
        color: "text-orange-500",
        content: [
            "Commitment to fair competition and anti-trust compliance",
            "Transparent and ethical pricing practices",
            "Accurate and honest market communications",
            "Prevention of insider trading and market manipulation"
        ]
    },
    {
        title: "Stakeholder Relations",
        icon: Users,
        color: "text-blue-500",
        content: [
            "Respectful and professional treatment of all stakeholders",
            "Clear and transparent communication channels",
            "Protection of stakeholder interests and rights",
            "Regular engagement with community and industry partners"
        ]
    },
    {
        title: "Global Compliance",
        icon: Globe,
        color: "text-emerald-500",
        content: [
            "Compliance with international energy trading regulations",
            "Adherence to sanctions and trade restrictions",
            "Environmental responsibility and sustainability",
            "Cross-border transaction transparency"
        ]
    }
]

const reportingSteps = [
    {
        title: "Identify",
        description: "Recognize potential violations or concerns regarding our code of conduct"
    },
    {
        title: "Document",
        description: "Gather relevant information and documentation about the situation"
    },
    {
        title: "Report",
        description: "Submit concerns through appropriate channels: direct supervisor, compliance hotline, or ethics committee"
    },
    {
        title: "Follow Up",
        description: "Maintain communication and cooperate with any investigations while maintaining confidentiality"
    }
]

// Add detailed compliance sections
const complianceDetails = [
    {
        title: "Trade Compliance",
        details: [
            "Strict adherence to international trade sanctions and embargoes",
            "Regular trade compliance training for all trading personnel",
            "Comprehensive documentation of all trading activities",
            "Due diligence on all trading partners and counterparties"
        ]
    },
    {
        title: "Financial Controls",
        details: [
            "Regular internal audits and compliance reviews",
            "Strict anti-money laundering (AML) procedures",
            "Accurate and transparent financial reporting",
            "Robust risk management protocols"
        ]
    },
    {
        title: "Data Protection",
        details: [
            "Compliance with GDPR and international data protection regulations",
            "Secure handling of sensitive business information",
            "Regular cybersecurity assessments and updates",
            "Data retention and disposal policies"
        ]
    }
]

export default function CodeOfConductPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-teal-900 to-teal-800 py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.2),transparent_70%)]" />
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-block mb-6">
                            <FileText className="h-16 w-16 text-orange-400" />
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-6">Code of Conduct</h1>
                        <p className="text-xl text-teal-50 leading-relaxed">
                            Our commitment to ethical business practices and professional integrity in the global energy sector
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <p className="text-xl text-teal-700 leading-relaxed">
                        At Zinerva, we believe that success in the energy sector must be built on a foundation
                        of unwavering ethical principles. Our Code of Conduct represents our commitment to
                        operating with integrity, transparency, and responsibility in every aspect of our business.
                    </p>
                </motion.div>

                {/* Core Principles */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <Card className="h-full bg-white/90 backdrop-blur-sm border-2 border-teal-100 
                hover:border-orange-200 shadow-lg transition-all duration-300 group">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className={`p-3 rounded-lg bg-gradient-to-br from-white to-gray-50 
                      shadow-md ${section.color}`}>
                                            <section.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-teal-900">{section.title}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {section.content.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + (0.1 * i) }}
                                                className="flex items-start gap-3"
                                            >
                                                <CheckCircle2 className="h-5 w-5 text-teal-500 mt-1 shrink-0" />
                                                <span className="text-teal-700">{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Reporting Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-teal-50 
            rounded-2xl p-8 border-2 border-orange-100 mb-20"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-teal-900 mb-4">Reporting Violations</h2>
                        <p className="text-teal-700">
                            We encourage all stakeholders to report any concerns or violations of our Code of Conduct
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reportingSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="text-center"
                            >
                                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center 
                  mx-auto mb-4 shadow-md text-orange-500 font-bold">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-semibold text-teal-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-teal-600">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Enhanced Compliance Details Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <h2 className="text-3xl font-bold text-teal-900 text-center mb-12">Detailed Compliance Framework</h2>

                    <div className="space-y-8">
                        {complianceDetails.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 
                  rounded-xl p-6 shadow-lg hover:border-orange-200 transition-all duration-300"
                            >
                                <h3 className="text-xl font-bold text-teal-900 mb-4">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.details.map((detail, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <ArrowRight className="h-5 w-5 text-orange-500 mt-1 shrink-0" />
                                            <span className="text-teal-700">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Download Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-gradient-to-br from-teal-50 to-orange-50 
            rounded-2xl p-8 border-2 border-teal-100 mb-20"
                >
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-teal-900 mb-4">Download Full Documentation</h2>
                        <p className="text-teal-700 mb-8">
                            Access our complete Code of Conduct and compliance documentation
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => window.open('/docs/code-of-conduct.pdf', '_blank')}
                                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full 
                  shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                <span>Code of Conduct (PDF)</span>
                            </Button>
                            <Button
                                onClick={() => window.open('/docs/compliance-guidelines.pdf', '_blank')}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full 
                  shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                <span>Compliance Guidelines (PDF)</span>
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Information - Updated without phone number */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <h2 className="text-2xl font-bold text-teal-900 mb-6">Ethics & Compliance Contact</h2>
                    <Button
                        onClick={() => window.location.href = 'mailto:ethics@zinerva.com'}
                        className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 
              text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                        <span className="text-lg">Contact Ethics Committee</span>
                        <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="mt-6 text-teal-600">
                        All inquiries are treated with strict confidentiality
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

