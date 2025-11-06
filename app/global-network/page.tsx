"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { PageHeader } from "@/components/page-header"

import { LoadingState } from "@/components/loading-state"

// Dynamically import the entire content component with no SSR
const GlobalNetworkContent = dynamic(
  () => import("@/components/global-network-content").then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <LoadingState />
      </div>
    )
  }
)

// Main page component
export default function GlobalNetworkPage() {
  return <GlobalNetworkContent />
} 