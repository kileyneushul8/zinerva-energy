"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Shield, BarChart, Zap, Globe, AlertTriangle, LineChart } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AnimatedSection } from "@/components/animated-section"
import { PageHeader } from "@/components/page-header"

const riskCategories = [
  {
    title: "Market Risk",
    icon: <BarChart className="h-8 w-8 text-orange-500" />,
    description: "Managing price volatility and market fluctuations",
    details: [
      {
        title: "Price Risk",
        level: 85,
        mitigation: "Advanced hedging strategies and real-time market monitoring",
      },
      {
        title: "Volume Risk",
        level: 70,
        mitigation: "Flexible supply contracts and storage optimization",
      },
      {
        title: "Basis Risk",
        level: 60,
        mitigation: "Geographic diversification and transport optimization",
      },
    ],
  },
  {
    title: "Operational Risk",
    icon: <Zap className="h-8 w-8 text-orange-500" />,
    description: "Ensuring smooth and efficient operations",
    details: [
      {
        title: "Supply Chain",
        level: 75,
        mitigation: "Multiple supplier relationships and robust logistics network",
      },
      {
        title: "Infrastructure",
        level: 65,
        mitigation: "Regular maintenance and backup systems",
      },
      {
        title: "Human Error",
        level: 55,
        mitigation: "Comprehensive training and automated safeguards",
      },
    ],
  },
  {
    title: "Regulatory Risk",
    icon: <Shield className="h-8 w-8 text-orange-500" />,
    description: "Maintaining compliance with global regulations",
    details: [
      {
        title: "Compliance",
        level: 90,
        mitigation: "Proactive regulatory monitoring and strict adherence protocols",
      },
      {
        title: "Policy Changes",
        level: 80,
        mitigation: "Diversified market presence and adaptive strategies",
      },
      {
        title: "Reporting",
        level: 85,
        mitigation: "Advanced compliance management systems",
      },
    ],
  },
  {
    title: "Credit Risk",
    icon: <LineChart className="h-8 w-8 text-orange-500" />,
    description: "Managing counterparty and financial exposure",
    details: [
      {
        title: "Counterparty",
        level: 80,
        mitigation: "Rigorous credit assessment and collateral management",
      },
      {
        title: "Settlement",
        level: 75,
        mitigation: "Secure payment systems and credit insurance",
      },
      {
        title: "Default",
        level: 70,
        mitigation: "Diversified portfolio and strong legal frameworks",
      },
    ],
  },
]

const riskFramework = [
  {
    title: "Identification",
    icon: <AlertTriangle className="h-6 w-6" />,
    description: "Systematic process to identify potential risks across all operations",
    steps: ["Regular risk assessments", "Market analysis and monitoring", "Stakeholder feedback integration"],
  },
  {
    title: "Assessment",
    icon: <BarChart className="h-6 w-6" />,
    description: "Comprehensive evaluation of identified risks and their potential impact",
    steps: ["Risk quantification", "Impact analysis", "Probability assessment"],
  },
  {
    title: "Mitigation",
    icon: <Shield className="h-6 w-6" />,
    description: "Development and implementation of risk mitigation strategies",
    steps: ["Strategy development", "Control implementation", "Continuous monitoring"],
  },
  {
    title: "Monitoring",
    icon: <LineChart className="h-6 w-6" />,
    description: "Ongoing monitoring and review of risk management effectiveness",
    steps: ["Performance tracking", "Strategy adjustment", "Regular reporting"],
  },
]

export default function RiskManagementPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const [activeCategory, setActiveCategory] = useState("Market Risk")

  // Add animated progress values
  const progressValue = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
      {/* Enhanced Header with Dynamic Background */}
      <div className="relative bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 py-32 overflow-hidden">
        {/* Improved animated background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 opacity-10"
            animate={{ 
              backgroundPosition: ["0px 0px", "100px 100px"],
              transition: { duration: 30, repeat: Infinity, repeatType: "reverse" }
            }}
            style={{ 
              backgroundImage: 'url("/grid-pattern.svg")',
              backgroundSize: '30px 30px',
              filter: 'blur(1px)'
            }}
          />
          {/* Enhanced floating elements with parallax */}
          <motion.div
            className="absolute inset-0"
            style={{ y: backgroundY }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
              className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-3xl"
            />
          </motion.div>
        </div>

        {/* Enhanced Header Content */}
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
                <span className="px-6 py-2 bg-gradient-to-r from-orange-500/20 to-orange-400/10 
                  text-orange-200 rounded-full text-sm font-medium border border-orange-400/20
                  shadow-lg shadow-orange-900/5 backdrop-blur-sm"
                >
                  Advanced Protection
                </span>
              </motion.div>
              <h1 className="text-7xl font-bold text-white leading-tight tracking-tight">
                Risk{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 relative">
                  Management
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h1>
              <p className="text-xl text-teal-50/90 leading-relaxed max-w-2xl">
                Sophisticated risk assessment and mitigation strategies for energy trading
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Framework Cards with Better Shadows */}
      <div className="relative -mt-20 z-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {riskFramework.map((phase, index) => (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/95 backdrop-blur-sm border-2 border-teal-100/50 
                    hover:border-orange-200/50 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] 
                    hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all 
                    duration-300 group hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-teal-50/30 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardHeader className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 
                        flex items-center justify-center mb-4 group-hover:scale-110 transition-transform
                        duration-300 shadow-lg group-hover:shadow-xl transform group-hover:-rotate-3">
                        <div className="text-white transform group-hover:scale-110 transition-transform">
                          {phase.icon}
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold text-teal-900 mb-2">
                        {phase.title}
                      </CardTitle>
                      <CardDescription className="text-teal-600 text-base leading-relaxed">
                        {phase.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <ul className="space-y-4">
                        {phase.steps.map((step, i) => (
                          <motion.li 
                            key={i} 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            viewport={{ once: true }}
                            className="flex items-center text-teal-700 group/item"
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 
                              mr-3 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                            <span className="group-hover/item:text-teal-900 transition-colors">
                              {step}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Enhanced Risk Analysis Section with Better Tabs */}
      <div className="container mx-auto px-4 py-32">
        <AnimatedSection>
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-teal-900">
              Comprehensive Risk Analysis
            </h2>
            <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mt-6" />
            <p className="mt-6 text-xl text-teal-700 max-w-3xl mx-auto">
              Advanced risk assessment and mitigation strategies across all operational aspects
            </p>
          </motion.div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 p-2 bg-gradient-to-br 
              from-teal-50 to-teal-100/50 rounded-xl min-h-[70px] gap-2 shadow-inner">
              {riskCategories.map((category) => (
                <TabsTrigger 
                  key={category.title} 
                  value={category.title}
                  className="relative data-[state=active]:bg-white data-[state=active]:text-teal-900 
                    data-[state=active]:shadow-lg transition-all duration-300
                    hover:bg-white/80 rounded-lg h-full data-[state=active]:scale-105
                    data-[state=active]:border-2 data-[state=active]:border-teal-200/50
                    overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-teal-50/50 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <div className="w-6 h-6 flex-shrink-0 transform group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <span className="hidden sm:inline font-medium whitespace-nowrap group-hover:text-teal-900">
                      {category.title}
                    </span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {riskCategories.map((category) => (
              <TabsContent key={category.title} value={category.title}>
                <Card className="bg-white/95 backdrop-blur-sm border-2 border-teal-200 shadow-xl 
                  hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Add subtle gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-orange-50/30" />
                  
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-teal-900">
                      <div className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-orange-200">
                        {category.icon}
                      </div>
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-teal-700 text-lg">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {category.details.map((detail, index) => (
                        <motion.div 
                          key={index} 
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-teal-900">{detail.title}</span>
                            <span className="text-sm text-teal-600">{detail.level}%</span>
                          </div>
                          <Progress 
                            value={detail.level} 
                            className="h-2 bg-teal-100 [&>div]:bg-gradient-to-r [&>div]:from-teal-500 [&>div]:to-orange-500"
                          />
                          <p className="text-sm text-teal-600">{detail.mitigation}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedSection>
      </div>

      {/* Enhanced Call to Action */}
      <div className="bg-gradient-to-b from-white via-teal-50/20 to-teal-100/20 py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-teal-900 mb-6">
                Protect Your Operations
              </h2>
              <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mb-8" />
              <p className="text-xl text-teal-700 mb-12 max-w-2xl mx-auto">
                Connect with our risk management experts to develop a comprehensive strategy 
                tailored to your needs.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 
                    hover:to-teal-800 text-white shadow-xl hover:shadow-2xl transition-all 
                    duration-300 px-8 py-6 text-lg"
                >
                  <Link href="/contact">
                    Contact Our Risk Team
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}

