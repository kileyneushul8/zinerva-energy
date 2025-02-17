"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { PageHeader } from "@/components/page-header"

// Dynamically import the entire content component with no SSR
const GlobalNetworkContent = dynamic(
  () => import("@/components/global-network-content").then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-teal-600">Loading...</div>
      </div>
    )
  }
)

// Main page component
export default function GlobalNetworkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageHeader
        title="Global Network"
        description="Our worldwide energy distribution and trading network"
        variant="overlay"
      />
      <GlobalNetworkContent />
    </div>
  )
} 