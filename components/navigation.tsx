"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const topNavItems = [
  {
    title: "About Us",
    href: "#",
    isMenu: true,
    submenu: [
      {
        title: "Company Overview",
        href: "/about",
        description: "Learn about our mission and values",
      },
      {
        title: "Products",
        href: "/products",
        description: "Explore our innovative solutions",
      },
      {
        title: "Sustainability",
        href: "/sustainability",
        description: "Our commitment to sustainable practices",
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
      ref={menuRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white"
      )}
    >
      <nav className="border-b border-teal-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo Animation */}
            <Link href="/" className="group relative">
              <motion.div
                className="flex items-center space-x-2 relative z-10"
                variants={logoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
              >
                <motion.span className="text-2xl font-bold">
                  <span className="text-teal-900">Zinerva</span>{" "}
                  <span className="text-orange-500">LLC</span>
                </motion.span>
              </motion.div>
              <motion.div
                className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-50 to-orange-50/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                layoutId="logo-hover"
              />
            </Link>

            {/* Enhanced Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {topNavItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={menuItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.isMenu ? (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveMenu(activeMenu === item.title ? null : item.title)
                        }}
                        onMouseEnter={() => setActiveMenu(item.title)}
                        className={cn(
                          "relative py-4 px-2 text-sm font-medium transition-all",
                          "flex items-center space-x-1 group",
                          activeMenu === item.title
                            ? "text-teal-800"
                            : "text-teal-700 hover:text-teal-900"
                        )}
                      >
                        <span>{item.title}</span>
                        <motion.span
                          animate={{ rotate: activeMenu === item.title ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                        <motion.div
                          className="absolute inset-0 bg-teal-50 rounded-lg -z-10"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </button>

                      <AnimatePresence>
                        {activeMenu === item.title && (
                          <motion.div
                            className="absolute top-full left-0 w-72 pt-2 z-50"
                            variants={submenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onMouseLeave={() => setActiveMenu(null)}
                          >
                            <div
                              className="bg-white rounded-lg shadow-lg border border-teal-100 overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.submenu?.map((subitem) => (
                                <motion.div
                                  key={subitem.href}
                                  variants={menuItemVariants}
                                >
                                  <Link
                                    href={subitem.href}
                                    className={cn(
                                      "block p-4 transition-all",
                                      "hover:bg-teal-50 group",
                                      pathname === subitem.href
                                        ? "bg-teal-50"
                                        : ""
                                    )}
                                    onClick={() => setActiveMenu(null)}
                                  >
                                    <h3 className={cn(
                                      "font-medium mb-1",
                                      pathname === subitem.href
                                        ? "text-teal-900"
                                        : "text-teal-800 group-hover:text-teal-900"
                                    )}>
                                      {subitem.title}
                                    </h3>
                                    <p className="text-sm text-teal-600">{subitem.description}</p>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative py-4 text-sm font-medium transition-all",
                        "group hover:text-teal-900",
                        pathname === item.href
                          ? "text-teal-900"
                          : "text-teal-700"
                      )}
                    >
                      <span className="relative z-10">{item.title}</span>
                      <motion.span
                        className="absolute inset-0 bg-teal-50 rounded-lg -z-0"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      {pathname === item.href && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-900"
                          layoutId="underline"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }}
              className="md:hidden p-2 rounded-lg hover:bg-teal-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: isMobileMenuOpen ? 180 : 0,
                  scale: isMobileMenuOpen ? 0.9 : 1
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-teal-900" />
                ) : (
                  <Menu className="w-6 h-6 text-teal-900" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-teal-100 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-2">
                {topNavItems.map((item) => (
                  <div key={item.title}>
                    {item.isMenu ? (
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveMenu(activeMenu === item.title ? null : item.title)
                          }}
                          onMouseEnter={() => setActiveMenu(item.title)}
                          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-teal-50"
                        >
                          <span className="font-medium text-teal-900">
                            {item.title}
                          </span>
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 text-teal-500 transition-transform",
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
                              className="pl-4 space-y-2 mt-2"
                            >
                              {item.submenu?.map((subitem) => (
                                <Link
                                  key={subitem.href}
                                  href={subitem.href}
                                  className={cn(
                                    "block p-3 rounded-lg",
                                    pathname === subitem.href
                                      ? "bg-teal-50 text-teal-900"
                                      : "text-teal-600 hover:bg-teal-50 hover:text-teal-900"
                                  )}
                                  onClick={() => setActiveMenu(null)}
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
                        className={cn(
                          "block p-3 rounded-lg",
                          pathname === item.href
                            ? "bg-teal-50 text-teal-900"
                            : "text-teal-600 hover:bg-teal-50 hover:text-teal-900"
                        )}
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

