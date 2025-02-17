import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import { Globe2, LineChart, Shield, BarChart3 } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClientProviders } from "@/components/client-providers"
import { metadata } from "./metadata"

const inter = Inter({ subsets: ["latin"] })

const mainNav = [
  {
    title: "Our Services",
    items: [
      {
        title: "Global Network",
        href: "/global-network",
        description: "Our worldwide energy distribution infrastructure",
        icon: Globe2,
      },
      {
        title: "Energy Trading",
        href: "/energy-trading",
        description: "Advanced trading solutions and strategies",
        icon: LineChart,
      },
      {
        title: "Risk Management",
        href: "/risk-management",
        description: "Comprehensive risk assessment and mitigation",
        icon: Shield,
      },
      {
        title: "Market Insights",
        href: "/market-insights",
        description: "Analysis and trends in energy markets",
        icon: BarChart3,
      },
    ],
  },
  // ... rest of the navigation items stay the same
]

export { metadata }

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ClientProviders>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}