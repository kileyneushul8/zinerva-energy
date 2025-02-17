"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { useEffect } from "react"

export default function PodsPage() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash === "#flavors") {
      const element = document.getElementById("flavors")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair mb-6">
                Premium Flavor
                <br />
                <span className="italic text-white/80">Pods</span>
              </h1>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Experience a new level of hookah enjoyment with our innovative pod system. Each pod is packed with
                premium flavors, ensuring a consistent and intense experience every time.
              </p>
              <div className="space-y-4 mb-8">
                {podFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-white/60" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg">
                <Link href="#flavors" className="flex items-center gap-2">
                  Explore Flavors
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[500px] lg:h-[600px]">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Nebben Flavor Pods"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pod System Explanation */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16">How Our Pod System Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {podSystemSteps.map((step, index) => (
              <div key={step.title} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-white/30 mb-4">{index + 1}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flavor Grid */}
      <section id="flavors" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-16">Explore Our Flavors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flavors.map((flavor) => (
              <div
                key={flavor.name}
                className="group relative bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="aspect-square relative mb-6">
                  <Image src={flavor.image || "/placeholder.svg"} alt={flavor.name} fill className="object-contain" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{flavor.name}</h3>
                <p className="text-white/70 mb-4">{flavor.description}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-semibold">{flavor.price}</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="group border-white/20 hover:border-white/40">
                    <Link href={`/pods/${flavor.slug}`} className="flex items-center gap-2">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">Never Run Out of Your Favorite Flavors</h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Subscribe to our pod delivery service and enjoy a constant supply of your preferred flavors. Customize your
            plan, adjust anytime, and save with our subscription model.
          </p>
          <Button asChild size="lg">
            <Link href="/subscribe" className="flex items-center gap-2">
              Start Your Subscription
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

const podFeatures = [
  "Premium Flavor Blends",
  "Long-lasting Pods",
  "Easy to Use",
  "No Mess, No Fuss",
  "Compatible with All Nebben Devices",
  "Consistent Flavor Every Time",
]

const podSystemSteps = [
  {
    title: "Choose Your Flavor",
    description:
      "Select from our wide range of premium flavored pods, each crafted to deliver an authentic hookah experience.",
  },
  {
    title: "Insert the Pod",
    description:
      "Simply insert the pod into your Nebben device. Our smart system will recognize the pod automatically.",
  },
  {
    title: "Enjoy Your Session",
    description:
      "Power on your device and enjoy a perfect hookah session with consistent flavor and optimal vapor production.",
  },
]

const flavors = [
  {
    name: "Double Apple",
    description: "A classic blend of two apple varieties, offering a perfect balance of sweet and tart notes.",
    price: "$24.99",
    image: "/placeholder.svg?height=400&width=400",
    slug: "double-apple",
  },
  {
    name: "Mint Fusion",
    description: "A refreshing mix of spearmint and peppermint for a cool, invigorating experience.",
    price: "$24.99",
    image: "/placeholder.svg?height=400&width=400",
    slug: "mint-fusion",
  },
  {
    name: "Berry Mix",
    description: "A delightful combination of strawberries, blueberries, and raspberries for a fruity punch.",
    price: "$24.99",
    image: "/placeholder.svg?height=400&width=400",
    slug: "berry-mix",
  },
  {
    name: "Tropical Paradise",
    description: "An exotic blend of pineapple, mango, and passion fruit that transports you to a sunny beach.",
    price: "$24.99",
    image: "/placeholder.svg?height=400&width=400",
    slug: "tropical-paradise",
  },
  {
    name: "Creamy Vanilla",
    description: "Smooth and rich vanilla flavor for a comforting and indulgent hookah session.",
    price: "$24.99",
    image: "/placeholder.svg?height=400&width=400",
    slug: "creamy-vanilla",
  },
  {
    name: "Citrus Burst",
    description: "A zesty mix of lemon, lime, and orange for a refreshing citrus explosion.",
    price: "$24.99",
    image: "/placeholder.svg?height=400&width=400",
    slug: "citrus-burst",
  },
]

