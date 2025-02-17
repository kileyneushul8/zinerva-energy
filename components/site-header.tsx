"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const mainNav = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
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

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold text-teal-900">
              Zinerva <span className="text-orange-500">LLC</span>
            </span>
          </motion.div>
        </Link>
        
        <nav className="flex items-center space-x-6">
          {mainNav.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium text-teal-700 transition-colors hover:text-orange-500",
                )}
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </header>
  )
} 