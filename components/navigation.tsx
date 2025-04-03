"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ChevronUp, Globe2, LineChart, Shield, BarChart3, Leaf, Users, Target, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"

const mainNav = [
  {
    title: "About Us",
    items: [
      {
        title: "Company Overview",
        href: "/about",
        description: "Learn about our mission and values",
        icon: Users,
      },
      {
        title: "Products",
        href: "/products",
        description: "Explore our innovative solutions",
        icon: Target,
      },
      {
        title: "Sustainability",
        href: "/sustainability",
        description: "Our commitment to sustainable practices",
        icon: Leaf,
      },
    ],
  },
  {
    title: "Services",
    items: [
      {
        title: "Global Network",
        href: "/global-network",
        description: "Worldwide energy infrastructure",
        icon: Globe2,
      },
      {
        title: "Energy Trading",
        href: "/energy-trading",
        description: "Advanced trading solutions",
        icon: LineChart,
      },
      {
        title: "Risk Management",
        href: "/risk-management",
        description: "Comprehensive risk assessment",
        icon: Shield,
      },
      {
        title: "Market Overview",
        href: "/market-overview",
        description: "Energy market analysis",
        icon: BarChart3,
      },
    ],
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

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus when route changes
  useEffect(() => {
    setActiveMenu(null)
    setIsOpen(false)
  }, [pathname])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold">
              <span className="text-orange-500 hover:text-orange-600 transition-colors">Zinerva</span>{" "}
              <span className="text-orange-400">LLC</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {mainNav.map((item) => (
              <div key={item.title} className="relative">
                {item.items ? (
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                    className={cn(
                      "flex items-center space-x-1 text-sm font-medium py-1",
                      isScrolled
                        ? "text-teal-900 hover:text-orange-500"
                        : "text-white/90 hover:text-white",
                      activeMenu === item.title && "text-orange-500"
                    )}
                  >
                    <span>{item.title}</span>
                    {activeMenu === item.title ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium py-1",
                      isScrolled
                        ? "text-teal-900 hover:text-orange-500"
                        : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.title}
                  </Link>
                )}

                {/* Desktop Dropdown Menu */}
                {item.items && activeMenu === item.title && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-teal-100">
                    <div className="p-2 grid gap-1">
                      {item.items.map((subitem) => (
                        <Link
                          key={subitem.title}
                          href={subitem.href}
                          className="flex items-start space-x-3 p-2 rounded-md hover:bg-teal-50 transition-colors"
                        >
                          <div className="p-1.5 rounded-md bg-teal-100">
                            <subitem.icon className="h-4 w-4 text-teal-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-teal-900">{subitem.title}</div>
                            <div className="text-xs text-teal-600">{subitem.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-1.5 rounded-md",
                isScrolled ? "text-teal-900" : "text-white"
              )}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "md:hidden overflow-hidden",
              isScrolled ? "bg-white" : "bg-teal-900/95 backdrop-blur-md"
            )}
          >
            <nav className="py-2 space-y-0.5">
              {mainNav.map((item) => (
                <div key={item.title}>
                  {item.items ? (
                    <>
                      <button
                        onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                        className="flex items-center justify-between w-full p-2 text-teal-700 hover:bg-teal-50"
                      >
                        <span className="font-medium text-sm">{item.title}</span>
                        {activeMenu === item.title ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {activeMenu === item.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-teal-50/50"
                        >
                          {item.items.map((subitem) => (
                            <Link
                              key={subitem.title}
                              href={subitem.href}
                              className="flex items-start space-x-3 p-2 text-teal-700 hover:bg-teal-100"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="p-1.5 rounded-md bg-teal-100">
                                <subitem.icon className="h-4 w-4 text-teal-600" />
                              </div>
                              <div>
                                <div className="font-medium text-sm">{subitem.title}</div>
                                <div className="text-xs text-teal-600">{subitem.description}</div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block p-2 text-teal-700 hover:bg-teal-50 font-medium text-sm"
                      onClick={() => setIsOpen(false)}
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
    </motion.nav>
  )
}

