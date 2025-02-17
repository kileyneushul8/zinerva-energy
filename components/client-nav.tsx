"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export function ClientNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-1">
        <Link 
          href="/about"
          className={`relative group px-3 py-2 text-sm font-medium ${
            pathname === "/about" ? "text-orange-600" : "text-teal-600"
          } transition-colors`}
        >
          About Us
          {pathname === "/about" && (
            <motion.span
              className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-600"
              layoutId="underline"
            />
          )}
        </Link>
        {/* ... other navigation links ... */}
      </nav>

      {/* Mobile Navigation */}
      <button className="lg:hidden p-2 text-teal-600 hover:text-orange-600 transition-colors">
        <span className="sr-only">Open menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </>
  )
} 