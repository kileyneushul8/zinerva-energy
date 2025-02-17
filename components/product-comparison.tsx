"use client"

import React, { useState } from "react"
import { Check, X, ChevronDown, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"

// Enhanced product data structure
const products = [
  {
    name: "Brent Crude",
    type: "Crude Oil",
    unit: "bbl",
    tradingVenues: ["ICE", "NYMEX"],
    specs: {
      quality: {
        "Quality Grade": { value: "Premium", color: "text-teal-600" },
        "Purity Level": { value: "High", color: "text-teal-600" },
        "Consistency": { value: "Excellent", color: "text-teal-600" }
      },
      market: {
        "Coverage": { value: "Global", color: "text-teal-600" },
        "Supply Chain": { value: "Extensive", color: "text-teal-600" },
        "Availability": { value: "High", color: "text-teal-600" }
      },
      operations: {
        "Delivery": { value: "Flexible", color: "text-teal-600" },
        "Storage": { value: "Standard", color: "text-teal-600" },
        "Handling": { value: "Complex", color: "text-orange-500" }
      },
      technical: {
        "API Gravity": { value: "38.06°", color: "text-teal-600" },
        "Sulfur Content": { value: "0.45%", color: "text-teal-600" },
        "Pour Point": { value: "-3°C", color: "text-teal-600" },
        "Viscosity": { value: "4.3 cSt", color: "text-teal-600" }
      }
    }
  },
  {
    name: "WTI Crude",
    type: "Crude Oil",
    unit: "bbl",
    specs: {
      quality: {
        "Quality Grade": { value: "Premium", color: "text-teal-600" },
        "Purity Level": { value: "High", color: "text-teal-600" },
        "Consistency": { value: "Good", color: "text-teal-600" }
      },
      market: {
        "Coverage": { value: "Regional", color: "text-teal-600" },
        "Supply Chain": { value: "Good", color: "text-teal-600" }
      },
      operations: {
        "Delivery": { value: "Standard", color: "text-teal-600" },
        "Storage": { value: "Complex", color: "text-orange-500" },
        "Handling": { value: "Standard", color: "text-teal-600" }
      },
      technical: {
        "API Gravity": { value: "39.6°", color: "text-teal-600" },
        "Sulfur Content": { value: "0.24%", color: "text-teal-600" },
        "Pour Point": { value: "-12°C", color: "text-teal-600" },
        "Viscosity": { value: "4.1 cSt", color: "text-teal-600" }
      }
    }
  },
  {
    name: "Dubai Crude",
    type: "Crude Oil",
    unit: "bbl",
    specs: {
      quality: {
        "Quality Grade": { value: "Standard", color: "text-teal-600" },
        "Purity Level": { value: "Medium", color: "text-teal-600" },
        "Consistency": { value: "Good", color: "text-teal-600" }
      },
      market: {
        "Coverage": { value: "Regional", color: "text-teal-600" },
        "Supply Chain": { value: "Good", color: "text-teal-600" }
      },
      operations: {
        "Delivery": { value: "Standard", color: "text-teal-600" },
        "Storage": { value: "Standard", color: "text-teal-600" },
        "Handling": { value: "Standard", color: "text-teal-600" }
      },
      technical: {
        "API Gravity": { value: "31°", color: "text-teal-600" },
        "Sulfur Content": { value: "2%", color: "text-teal-600" },
        "Pour Point": { value: "-8°C", color: "text-teal-600" },
        "Viscosity": { value: "5.1 cSt", color: "text-teal-600" }
      }
    }
  }
  // ... add other products with similar structure
]

const comparisonData = {
  simple: [
    { category: "Quality", features: ["Quality Grade", "Purity Level", "Consistency"] },
    { category: "Market", features: ["Coverage", "Supply Chain", "Availability"] },
    { category: "Operations", features: ["Delivery", "Storage", "Handling"] }
  ],
  detailed: [
    { category: "Technical", features: ["API Gravity", "Sulfur Content", "Pour Point", "Viscosity"] }
  ]
}

export function ProductComparison({ productName }: { productName: string }) {
  const [view, setView] = useState<'simple' | 'detailed'>('simple')
  const [activeCategory, setActiveCategory] = useState<string>("Quality")
  const [compareProducts, setCompareProducts] = useState<string[]>([
    "WTI Crude",
    "Dubai Crude"
  ])
  const router = useRouter()

  const currentSection = comparisonData[view].find(section => section.category === activeCategory)
  const currentProduct = products.find(p => p.name === productName)

  const getSpecValue = (product: string, feature: string) => {
    const prod = products.find(p => p.name === product)
    const category = activeCategory.toLowerCase()
    return prod?.specs[category as keyof typeof prod.specs]?.[feature]
  }

  const handleProductChange = (index: number, value: string) => {
    const newProducts = [...compareProducts]
    newProducts[index] = value
    setCompareProducts(newProducts)
  }

  const features = {
    Quality: ["Quality Grade", "Purity Level", "Consistency"],
    Market: ["Coverage", "Supply Chain", "Availability"],
    Operations: ["Delivery", "Storage", "Handling"],
    Technical: ["API Gravity", "Sulfur Content", "Pour Point", "Viscosity"]
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AnimatedSection>
        <Card className="bg-white/80 backdrop-blur-sm border border-teal-100 overflow-hidden">
          <CardContent className="p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-teal-900">Compare</h2>
                <p className="text-teal-600 mt-1">with other products</p>
              </div>
              <div className="flex gap-3 items-center">
                {/* View Toggle */}
                <div className="flex bg-teal-50 rounded-full p-0.5">
                  <button
                    onClick={() => setView('simple')}
                    className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                      view === 'simple'
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'text-teal-700 hover:text-teal-900'
                    }`}
                  >
                    Simple
                  </button>
                  <button
                    onClick={() => setView('detailed')}
                    className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                      view === 'detailed'
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'text-teal-700 hover:text-teal-900'
                    }`}
                  >
                    Detailed
                  </button>
                </div>
                {/* Category Selector */}
                <div className="relative">
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="appearance-none bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5 pr-8 text-sm text-teal-700 focus:outline-none hover:bg-teal-100/70 transition-colors cursor-pointer min-w-[120px]"
                  >
                    {Object.keys(features).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-teal-100">
                    <th className="text-left py-2 w-1/4"></th>
                    <th className="text-center py-2 px-4 w-1/4">
                      <div className="relative pt-2 pb-1">
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                          Current
                        </div>
                        <span className="font-medium text-teal-900 mt-2 block">{productName}</span>
                      </div>
                    </th>
                    {[0, 1].map((index) => (
                      <th key={index} className="text-center py-2 px-4 w-1/4">
                        <div className="relative">
                          <select
                            value={compareProducts[index]}
                            onChange={(e) => handleProductChange(index, e.target.value)}
                            className="appearance-none bg-transparent w-full text-center font-medium text-teal-600 focus:outline-none cursor-pointer hover:text-teal-800 transition-colors py-1"
                          >
                            <option value={compareProducts[index]}>{compareProducts[index]}</option>
                            {products
                              .filter(p => p.name !== productName && !compareProducts.includes(p.name))
                              .map((product) => (
                                <option key={product.name} value={product.name}>
                                  {product.name}
                                </option>
                              ))}
                          </select>
                          <ChevronDown className="absolute right-1/4 top-1/2 -translate-y-1/2 h-4 w-4 text-teal-600 pointer-events-none" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features[activeCategory as keyof typeof features].map((feature) => (
                    <tr key={feature} className="border-t border-teal-100 last:border-b">
                      <td className="py-3 text-sm font-medium text-teal-700">{feature}</td>
                      {[productName, ...compareProducts].map((product, i) => {
                        const spec = getSpecValue(product, feature)
                        return (
                          <td key={i} className="text-center py-3">
                            {spec ? (
                              <span className={`text-sm font-medium ${spec.color}`}>
                                {spec.value}
                              </span>
                            ) : (
                              <X className="inline h-4 w-4 text-red-400" />
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => router.push('/contact')}
                className="text-sm bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
              >
                Request Quote
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="text-sm text-teal-600 hover:text-orange-500 transition-colors inline-flex items-center gap-2 group"
              >
                View detailed comparison
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  )
} 