"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Globe, Shield, Zap, BarChart } from "lucide-react"

interface DesktopNavDropdownProps {
  type: "about" | "services"
  active: boolean
  onToggle: () => void
  pathname: string
}

export function DesktopNavDropdown({ type, active, onToggle, pathname }: DesktopNavDropdownProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onToggle()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onToggle])

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center px-3 py-2 text-sm font-medium text-teal-600 hover:text-orange-600 transition-colors"
        onClick={onToggle}
      >
        {type === "about" ? "About Us" : "Services"}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {active && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          {type === "about" ? (
            <div className="py-1">
              <Link
                href="/about"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={onToggle}
              >
                Company Overview
              </Link>
              {/* Add other about links */}
            </div>
          ) : (
            <div className="py-1">
              <Link
                href="/global-network"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={onToggle}
              >
                <Globe className="inline-block mr-2 h-4 w-4" />
                Global Network
              </Link>
              {/* Add other service links */}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 