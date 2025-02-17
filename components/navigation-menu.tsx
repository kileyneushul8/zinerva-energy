"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronDown, Globe, Shield, Zap, BarChart } from "lucide-react"

const serviceItems = [
  {
    href: "/global-network",
    icon: Globe,
    title: "Global Network"
  },
  {
    href: "/energy-trading",
    icon: Zap,
    title: "Energy Trading"
  },
  {
    href: "/risk-management",
    icon: Shield,
    title: "Risk Management"
  },
  {
    href: "/market-overview",
    icon: BarChart,
    title: "Market Overview"
  }
]

const pathname = usePathname() || ''

export function NavigationMenu() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close dropdown when route changes
  useEffect(() => {
    setActiveDropdown(null)
  }, [pathname])

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  return (
    <div className="flex items-center space-x-4" ref={menuRef}>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-1">
        {/* About Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('about')}
            className={`flex items-center px-3 py-2 text-sm font-medium ${pathname.startsWith('/about') ? 'text-orange-600' : 'text-teal-600'
              } hover:text-orange-600 transition-colors`}
          >
            About Us
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          {activeDropdown === 'about' && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Company Overview
                </Link>
                <Link href="/sustainability" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sustainability
                </Link>
                <Link href="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Products
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Services Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('services')}
            className={`flex items-center px-3 py-2 text-sm font-medium ${pathname.startsWith('/services') ? 'text-orange-600' : 'text-teal-600'
              } hover:text-orange-600 transition-colors`}
          >
            Services
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          {activeDropdown === 'services' && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Regular Links */}
        <Link
          href="/ethics-compliance"
          className={`px-3 py-2 text-sm font-medium ${pathname === '/ethics-compliance' ? 'text-orange-600' : 'text-teal-600'
            } hover:text-orange-600 transition-colors`}
        >
          Ethics & Compliance
        </Link>
        <Link
          href="/contact"
          className={`px-3 py-2 text-sm font-medium ${pathname === '/contact' ? 'text-orange-600' : 'text-teal-600'
            } hover:text-orange-600 transition-colors`}
        >
          Contact
        </Link>
      </nav>

      {/* Mobile Navigation Button */}
      <button className="lg:hidden p-2 text-teal-600 hover:text-orange-600 transition-colors">
        <span className="sr-only">Open menu</span>
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  )
} 