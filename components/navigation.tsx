"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ChevronUp, Globe2, LineChart, Shield, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"

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
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Ethics & Compliance",
    href: "/ethics-compliance",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

const serviceItems = [
  {
    title: "Global Network",
    href: "/global-network",
    description: "Worldwide operations",
  },
  {
    title: "Energy Trading",
    href: "/energy-trading",
    description: "Trading solutions",
  },
  {
    title: "Risk Management",
    href: "/risk-management",
    description: "Risk assessment",
  },
  {
    title: "Market Overview",
    href: "/market-overview",
    description: "Market analysis",
  },
  {
    title: "Global Distribution",
    href: "/global-distribution",
    description: "Distribution services",
  },
]

export function Navigation() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menus when route changes
  useEffect(() => {
    setActiveMenu(null)
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
      ref={menuRef}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-teal-900">
              Zinerva <span className="text-orange-500">LLC</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {mainNav.map((item) => (
              <div key={item.title} className="relative">
                {item.items ? (
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                    className={cn(
                      "flex items-center space-x-1 text-sm font-medium",
                      activeMenu === item.title ? "text-orange-500" : "text-teal-700 hover:text-orange-500"
                    )}
                  >
                    <span>{item.title}</span>
                    {activeMenu === item.title ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-teal-700 hover:text-orange-500"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.items && activeMenu === item.title && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-teal-100">
                    <div className="p-4 grid gap-4">
                      {item.items.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.href}
                          className="flex items-start space-x-3 p-2 rounded-lg hover:bg-teal-50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-teal-100">
                            <subitem.icon className="h-5 w-5 text-teal-600" />
                          </div>
                          <div>
                            <div className="font-medium text-teal-900">{subitem.title}</div>
                            <div className="text-sm text-teal-600">{subitem.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-teal-700 hover:text-orange-500"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white"
            >
              <nav className="py-4 space-y-2">
                {mainNav.map((item) => (
                  <div key={item.title}>
                    {item.items ? (
                      <>
                        <button
                          onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                          className="flex items-center justify-between w-full p-2 text-teal-700"
                        >
                          <span>{item.title}</span>
                          {activeMenu === item.title ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        {activeMenu === item.title && (
                          <div className="pl-4 space-y-2">
                            {item.items.map((subitem) => (
                              <Link
                                key={subitem.title}
                                href={subitem.href}
                                className="flex items-center space-x-2 p-2 text-teal-600 hover:text-orange-500"
                              >
                                <subitem.icon className="h-4 w-4" />
                                <span>{subitem.title}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block p-2 text-teal-700 hover:text-orange-500"
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

