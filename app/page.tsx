"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import { PageHeader } from "@/components/page-header"

// Custom SVG icons
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
)

const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 22c1.25-1.67 2.5-3.33 3.75-5 1.67 1.67 3.33 3.33 5 5C12.5 20.33 13.75 18.67 15 17c1.67 1.67 3.33 3.33 5 5"></path>
    <path d="M2 12c1.25-1.67 2.5-3.33 3.75-5 1.67 1.67 3.33 3.33 5 5C12.5 10.33 13.75 8.67 15 7c1.67 1.67 3.33 3.33 5 5"></path>
    <path d="M2 2c1.25-1.67 2.5-3.33 3.75-5 1.67 1.67 3.33 3.33 5 5C12.5.33 13.75-1.33 15-3c1.67 1.67 3.33 3.33 5 5"></path>
  </svg>
)

// Enhanced animations throughout
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function HomePage() {
  useEffect(() => {
    // Force a re-render on mount
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-transparent to-orange-900/80 z-10" />
          <Image
            src="/bridge-sunset.jpg"
            alt="Zinerva Energy Global Infrastructure"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        <div className="relative z-20 container mx-auto h-full flex items-center px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Bridging Global Energy Markets with{" "}
                <span className="text-orange-400">Sustainable Solutions</span>
              </h1>
              <div className="w-20 h-1 bg-orange-500 rounded-full" />
              <p className="text-xl text-teal-50 max-w-2xl">
                Connecting suppliers and consumers across continents with innovative
                energy trading solutions and reliable distribution networks.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Link href="/products" scroll={false}>
                    Explore Our Products
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/90 backdrop-blur-sm text-teal-900 border-teal-200 
                    hover:bg-white hover:border-orange-200 hover:text-orange-600"
                >
                  <Link href="/about" scroll={false}>
                    About Us
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Zinerva section */}
      <section className="py-24 bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-teal-900">Why Choose Zinerva</h2>
              <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mt-6" />
            </motion.div>
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <GlobeIcon />,
                title: "Global Presence",
                description: "With operations spanning across continents, we deliver energy solutions on a global scale."
              },
              {
                icon: <ChartIcon />,
                title: "Market Expertise",
                description: "Our deep understanding of energy markets allows us to navigate complexities and seize opportunities."
              },
              {
                icon: <LeafIcon />,
                title: "Sustainability Focus",
                description: "We're committed to driving the transition towards cleaner, more sustainable energy solutions."
              }
            ].map((feature, index) => (
              <AnimatedSection key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="bg-white border-2 border-teal-100 shadow-lg 
                    hover:shadow-xl transition-all duration-300 hover:border-orange-200
                    hover:-translate-y-1 h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-teal-900">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 
                          text-white shadow-md">
                          {feature.icon}
                        </div>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-teal-700 text-lg">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-6 text-teal-900">Committed to a Sustainable Future</h2>
            <p className="max-w-2xl mx-auto mb-8 text-teal-700">
              Discover how Zinerva is leading the way in sustainable energy practices and environmental stewardship.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Link href="/sustainability">
                Explore Our Sustainability Efforts
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

