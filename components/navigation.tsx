"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"

const topNavItems = [
  {
    title: "About Us",
    href: "#",
    isMenu: true,
    submenu: [
      {
        title: "Company Overview",
        href: "/about",
        description: "Our mission and values",
      },
      {
        title: "Products",
        href: "/products",
        description: "Energy solutions",
      },
      {
        title: "Sustainability",
        href: "/sustainability",
        description: "Environmental commitment",
      },
    ],
  },
  {
    title: "Services",
    href: "#",
    isMenu: true,
    submenu: [
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

const serviceItems = [
  {
    title: "Global Network",
    href: "/global-network",
    description: "Our worldwide operational network",
  },
  {
    title: "Energy Trading",
    href: "/energy-trading",
    description: "Strategic energy trading solutions",
  },
  {
    title: "Risk Management",
    href: "/risk-management",
    description: "Advanced risk assessment and mitigation",
  },
  {
    title: "Market Overview",
    href: "/market-overview",
    description: "Comprehensive analysis of global energy markets",
  },
  {
    title: "Global Distribution",
    href: "/global-distribution",
    description: "International energy distribution services",
  },
]

export function Navigation() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
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
    setIsServicesOpen(false)
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

  // Enhanced animation variants
  const menuItemVariants = {
    initial: {
      y: -8,
      opacity: 0,
      filter: "blur(8px)"
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.97
    }
  }

  const submenuVariants = {
    hidden: {
      opacity: 0,
      y: -15,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.05,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  // Add hover animation for logo
  const logoVariants = {
    initial: {
      x: -20,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
      ref={menuRef}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-teal-900">
                Zinerva <span className="text-orange-500">LLC</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {topNavItems.map((item) => (
              <div key={item.title} className="relative">
                {item.isMenu ? (
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      activeMenu === item.title
                        ? "text-teal-900 bg-teal-50"
                        : "text-teal-600 hover:text-teal-800 hover:bg-teal-50/50"
                    )}
                  >
                    <span className="flex items-center">
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      pathname === item.href
                        ? "text-teal-900 bg-teal-50"
                        : "text-teal-600 hover:text-teal-800 hover:bg-teal-50/50"
                    )}
                  >
                    {item.title}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.isMenu && activeMenu === item.title && (
                  <div className="absolute top-full left-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2">
                    {item.submenu?.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-teal-700 hover:bg-teal-50 rounded-md"
                        onClick={() => setActiveMenu(null)}
                      >
                        <div className="font-medium mb-0.5">{subitem.title}</div>
                        <div className="text-xs text-teal-500">{subitem.description}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-teal-600 hover:text-teal-900 hover:bg-teal-50/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-teal-100"
          >
            <div className="container mx-auto px-6 py-4">
              <nav className="space-y-1">
                {topNavItems.map((item) => (
                  <div key={item.title}>
                    {item.isMenu ? (
                      <div>
                        <button
                          onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                          className="flex items-center justify-between w-full p-2 text-sm font-medium text-teal-700 rounded-md hover:bg-teal-50"
                        >
                          {item.title}
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              activeMenu === item.title ? "rotate-180" : ""
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeMenu === item.title && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1 mt-1"
                            >
                              {item.submenu?.map((subitem) => (
                                <Link
                                  key={subitem.href}
                                  href={subitem.href}
                                  className="block p-2 text-sm text-teal-600 hover:bg-teal-50 rounded-md"
                                  onClick={() => {
                                    setActiveMenu(null)
                                    setIsMobileMenuOpen(false)
                                  }}
                                >
                                  {subitem.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block p-2 text-sm font-medium text-teal-700 rounded-md hover:bg-teal-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

