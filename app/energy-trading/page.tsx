"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { LineChart, Zap, Globe2, Lightbulb, ArrowRightLeft, BarChart3, Shield, Workflow, Network } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
// import { AnimatedSection } from "@/components/animated-section" // Commented out since module not found
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"

export default function EnergyTradingPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
                  Strategic Solutions
                </span>
              </motion.div>
              <h1 className="text-7xl font-bold text-white leading-tight">
                Energy{" "}
                <span className="text-orange-400 relative">
                  Trading
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h1>
              <p className="text-xl text-teal-50 leading-relaxed max-w-2xl">
                Facilitating seamless energy transactions through innovative solutions and strategic market insights.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content - Adjusted to not overlap with header */}
      <div className="container mx-auto px-4">
        {/* 1. Overview Section */}
        <AnimatedSection className="py-24">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-teal-900">
                Innovative Trading Solutions
              </h2>
              <p className="text-teal-700 text-lg leading-relaxed">
                Through our advanced trading platforms and expert market analysis, we deliver
                comprehensive energy trading solutions that help our clients navigate complex
                global markets efficiently and profitably.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* 1. Strategic Advantages Section - Moved up */}
        <div className="relative -mt-20 z-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Globe2,
                    title: "Global Market Access",
                    description: "Connect with energy opportunities across international markets",
                    gradient: "from-teal-500 to-teal-600"
                  },
                  {
                    icon: Lightbulb,
                    title: "Strategic Insights",
                    description: "Make informed decisions with real-time market intelligence",
                    gradient: "from-orange-500 to-orange-600"
                  },
                  {
                    icon: Shield,
                    title: "Secure Transactions",
                    description: "Advanced systems ensuring reliable energy exchanges",
                    gradient: "from-teal-500 to-teal-600"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-8 shadow-xl border-2 border-teal-100
                      hover:border-orange-200 transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className={`p-4 bg-gradient-to-br ${feature.gradient}
                      rounded-xl w-fit text-white mb-6 group-hover:scale-110 transition-transform duration-300
                      shadow-lg`}
                    >
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-teal-900 mb-3">{feature.title}</h3>
                    <p className="text-lg text-teal-700">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 2. Key Benefits Section - Shows our strength */}
        <div className="container mx-auto px-4 py-24">
          <AnimatedSection>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  number: "24/7",
                  label: "Market Access",
                  description: "Continuous trading capabilities across time zones"
                },
                {
                  number: "100+",
                  label: "Global Markets",
                  description: "Connected energy markets worldwide"
                },
                {
                  number: "99.9%",
                  label: "Execution Rate",
                  description: "Successful transaction completion"
                },
                {
                  number: "<10ms",
                  label: "Response Time",
                  description: "Ultra-fast market connectivity"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-2xl p-8
                    shadow-xl group hover:from-teal-800 hover:to-teal-700 transition-all duration-500"
                >
                  <motion.div
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="space-y-2"
                  >
                    <h3 className="text-4xl font-bold text-white mb-1">{stat.number}</h3>
                    <div className="w-12 h-1 bg-orange-500 rounded-full" />
                    <p className="text-xl font-semibold text-teal-50">{stat.label}</p>
                    <p className="text-teal-100/80">{stat.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* 3. Trading Process Section - Shows how we work */}
        <div className="bg-gradient-to-b from-white to-teal-50/30 py-24">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <motion.div className="text-center mb-20">
                <h2 className="text-5xl font-bold text-teal-900">
                  Streamlined Trading Process
                </h2>
                <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mt-6" />
              </motion.div>

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    icon: Network,
                    title: "Market Connection",
                    description: "Access global energy markets through our network"
                  },
                  {
                    icon: Workflow,
                    title: "Strategic Execution",
                    description: "Implement optimal trading strategies"
                  },
                  {
                    icon: Shield,
                    title: "Risk Management",
                    description: "Comprehensive risk assessment and mitigation"
                  },
                  {
                    icon: BarChart3,
                    title: "Performance Tracking",
                    description: "Monitor and optimize trading outcomes"
                  }
                ].map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-teal-100
                      hover:border-orange-200 transition-all duration-300 group hover:-translate-y-1"
                    >
                      <div className="absolute -top-4 left-6 bg-orange-500 text-white w-8 h-8 rounded-full
                        flex items-center justify-center font-bold"
                      >
                        {index + 1}
                      </div>
                      <div className="pt-4">
                        <step.icon className="w-6 h-6 text-teal-600 mb-4" />
                        <h3 className="text-xl font-bold text-teal-900 mb-2">{step.title}</h3>
                        <p className="text-teal-700">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* 4. Market Solutions Section - Detailed capabilities */}
        <div className="container mx-auto px-4 py-32">
          <AnimatedSection>
            <motion.div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-teal-900">
                Comprehensive Market Solutions
              </h2>
              <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mt-6" />
              <p className="mt-6 text-xl text-teal-700 max-w-3xl mx-auto">
                Enabling efficient energy transactions through advanced technology and market expertise
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  title: "Market Intelligence",
                  description: "Access real-time data and analytics to identify optimal opportunities",
                  features: [
                    "Price trend analysis",
                    "Supply-demand forecasting",
                    "Market sentiment indicators"
                  ]
                },
                {
                  title: "Strategic Connections",
                  description: "Connect with key market participants across the energy sector",
                  features: [
                    "Global network access",
                    "Verified counterparties",
                    "Streamlined communications"
                  ]
                },
                {
                  title: "Transaction Excellence",
                  description: "Execute energy transactions with precision and reliability",
                  features: [
                    "Efficient processing",
                    "Risk management protocols",
                    "Settlement optimization"
                  ]
                },
                {
                  title: "Market Optimization",
                  description: "Maximize value through strategic market positioning",
                  features: [
                    "Portfolio optimization",
                    "Market timing analysis",
                    "Strategic planning tools"
                  ]
                }
              ].map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-xl border-2 border-teal-100
                    hover:border-orange-200 transition-all duration-300 group"
                >
                  <h3 className="text-2xl font-bold text-teal-900 mb-4">{solution.title}</h3>
                  <p className="text-teal-700 mb-6">{solution.description}</p>
                  <ul className="space-y-3">
                    {solution.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center text-teal-600"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <ArrowRightLeft className="w-5 h-5 text-orange-500 mr-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}

