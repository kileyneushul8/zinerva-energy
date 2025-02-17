"use client"

import { Globe, Truck, Activity, Clock, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"

const networkFeatures = [
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Strategically located distribution centers ensuring efficient delivery to markets worldwide."
  },
  {
    icon: Truck,
    title: "Multimodal Transport",
    description: "Utilizing a combination of sea, land, and air transport to optimize delivery routes and times."
  },
  {
    icon: Activity,
    title: "Real-time Tracking",
    description: "Advanced tracking systems providing real-time updates on shipment status and location."
  },
  {
    icon: Clock,
    title: "Just-in-Time Delivery",
    description: "Optimized inventory management and distribution schedules to meet client needs efficiently."
  }
]

export function DistributionNetwork() {
  const router = useRouter()

  return (
    <section className="py-16 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-900 mb-4">Our Global Network</h2>
          <p className="text-teal-600 max-w-2xl mx-auto">
            Leverage our global network and expertise to streamline your energy distribution processes and reach new markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {networkFeatures.map((feature, index) => (
            <AnimatedSection
              key={index}
              className="h-full"
            >
              <Card className="bg-white/80 backdrop-blur-sm border border-teal-100 h-full hover:border-teal-200 transition-colors">
                <CardContent className="p-6">
                  <feature.icon className="h-8 w-8 text-teal-600 mb-4" />
                  <h3 className="text-lg font-semibold text-teal-800 mb-2">{feature.title}</h3>
                  <p className="text-teal-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push('/contact')}
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-colors"
          >
            Contact Our Distribution Team
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
} 