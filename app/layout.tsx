import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import { Globe2, LineChart, Shield, BarChart3 } from "lucide-react"
import { Metadata } from "next"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ClientProviders } from "@/components/client-providers"
import { Analytics } from "@/components/analytics"
import { StructuredData } from "@/components/structured-data"
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
    <html lang="en" className="h-full text-[15px]">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* Performance: Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://graph.microsoft.com" />
      </head>
      <body className={`${inter.className} h-full leading-relaxed`}>
        <StructuredData />
        <Analytics />
        <ClientProviders>
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <Breadcrumbs />
            <main id="main-content" className="flex-grow" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}