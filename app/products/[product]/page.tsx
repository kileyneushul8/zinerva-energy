"use client"

import { notFound } from "next/navigation"
import { ChevronLeft, Award, Globe2, HeadsetIcon, Leaf, ArrowRight, Check, X, InfoIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/products"
import { AnimatedSection } from "@/components/animated-section"
import { ProductComparison } from "@/components/product-comparison"
import { ProductHeader } from "@/components/product-header"

// Add this type for better organization
type ComparisonFeature = {
  category: string
  features: {
    name: string
    tooltip: string
  }[]
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    category: "Product Quality",
    features: [
      { name: "Quality Grade", tooltip: "Product quality certification level" },
      { name: "Purity Level", tooltip: "Percentage of pure product content" },
      { name: "Consistency", tooltip: "Batch-to-batch consistency rating" }
    ]
  },
  {
    category: "Market Performance",
    features: [
      { name: "Market Coverage", tooltip: "Geographic market availability" },
      { name: "Price Stability", tooltip: "Price fluctuation resistance" },
      { name: "Supply Reliability", tooltip: "Supply chain reliability score" }
    ]
  },
  {
    category: "Operations",
    features: [
      { name: "Delivery Speed", tooltip: "Average delivery time" },
      { name: "Storage Life", tooltip: "Recommended storage duration" },
      { name: "Handling Requirements", tooltip: "Special handling needs" }
    ]
  }
]

export default function ProductPage({ params }: { params: { product: string } }) {
  const product = products.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.product
  )

  if (!product) notFound()

  const Icon = product.icon

  const productInfo = {
    overview: {
      description: product.details,
      specifications: {
        technical: {
          "API Gravity": "38.06°",
          "Sulfur Content": "0.45% mass",
          "Pour Point": "-3°C",
          "Viscosity": "4.3 cSt at 40°C",
          "Flash Point": "28°C",
          "Water Content": "0.05% volume",
          "Total Acid Number": "0.12 mg KOH/g",
          "Density at 15°C": "834 kg/m³"
        },
        storage: {
          "Temperature": "15-25°C",
          "Pressure": "Atmospheric",
          "Container": "Carbon steel tanks",
          "Special Requirements": "Inert gas, explosion-proof equipment"
        }
      }
    },
    market: {
      current: { price: "$75.82/bbl", trend: "+2.3% MTD" },
      trading: {
        volume: "1.2M bbl/day",
        exchanges: ["ICE", "NYMEX", "DME"],
        delivery: ["Rotterdam", "Singapore", "Houston"]
      },
      forecast: "Upward pressure expected Q2 2024"
    },
    compliance: {
      quality: ["ISO 9001:2015", "API Standard 653"],
      environmental: ["ISO 14001:2015", "EU REACH", "IMO 2020"],
      safety: ["OHSAS 18001", "US EPA Standards"]
    },
    applications: [
      {
        name: "Energy Production",
        details: "Primary feedstock for refineries and power generation",
        specs: ["Combined cycle plants", "Modern refinery processes"],
        regions: "Europe, Asia"
      },
      {
        name: "Transportation",
        details: "Maritime and land transportation fuel production",
        specs: ["MARPOL Annex VI compliant", "Low sulfur content"],
        regions: "Global shipping routes"
      },
      {
        name: "Manufacturing",
        details: "Petrochemical product manufacturing",
        specs: ["High purity grade", "Consistent quality"],
        regions: "Americas, Asia-Pacific"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Hero Section with Image Background */}
      <div className="relative bg-teal-900 text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-800 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="pt-8 sm:pt-12">
            <Link 
              href="/products" 
              className="inline-flex items-center text-teal-200 hover:text-orange-300 transition-colors group"
            >
              <ChevronLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Products
            </Link>
          </div>
          <div className="mt-8 max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-200">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <Icon className="h-8 w-8 text-orange-300" />
              <span className="text-xl text-teal-100">{product.description}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-teal-50"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection>
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-200">
                <CardContent className="p-6">
                  <ProductHeader product={product} />

                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {Object.entries(productInfo.overview.specifications.technical).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-teal-100 py-2">
                        <span className="text-sm text-teal-600">{key}</span>
                        <span className="text-sm font-medium text-teal-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 gap-6">
              <AnimatedSection>
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-200 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-teal-800 mb-4">Storage & Handling</h3>
                    {Object.entries(productInfo.overview.specifications.storage).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-teal-100 py-2">
                        <span className="text-sm text-teal-600">{key}</span>
                        <span className="text-sm font-medium text-teal-900">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection>
                <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-200 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-teal-800 mb-4">Compliance</h3>
                    <div className="space-y-4">
                      {Object.entries(productInfo.compliance).map(([key, values]) => (
                        <div key={key} className="border-b border-teal-100 pb-2">
                          <dt className="text-sm text-teal-600 capitalize mb-1">{key}</dt>
                          <dd className="text-sm text-teal-900">{values.join(", ")}</dd>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AnimatedSection>
              <Card className="bg-gradient-to-br from-teal-900 to-teal-800 text-white">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-teal-100 mb-4">Applications</h2>
                  <div className="space-y-4">
                    {productInfo.applications.map((app) => (
                      <div key={app.name} className="border-b border-teal-700/50 pb-4 last:border-0">
                        <h3 className="font-medium text-teal-200 mb-1">{app.name}</h3>
                        <p className="text-sm text-teal-100">{app.details}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {app.specs.map((spec) => (
                            <span key={spec} className="text-xs bg-teal-800/50 text-teal-200 px-2 py-1 rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-200">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-teal-800 mb-4">Market Data</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline border-b border-teal-100 pb-2">
                      <span className="text-sm text-teal-600">Daily Volume</span>
                      <span className="text-sm font-medium text-teal-900">{productInfo.market.trading.volume}</span>
                    </div>
                    <div>
                      <dt className="text-sm text-teal-600 mb-1">Trading Venues</dt>
                      <dd className="text-sm text-teal-900">{productInfo.market.trading.exchanges.join(", ")}</dd>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Product Comparison Section */}
      <ProductComparison productName={product.name} />
    </div>
  )
}

