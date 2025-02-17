"use client"

import { motion } from "framer-motion"
import { ClientLink } from "./client-link"
import { usePathname } from "next/navigation"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <div className="relative group px-3 py-2">
      <ClientLink
        href={href}
        className={`relative z-10 text-sm font-medium ${
          active ? "text-orange-600" : "text-teal-600"
        } transition-colors`}
      >
        {children}
      </ClientLink>
      {active && (
        <motion.span
          className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-600 transition-all duration-200"
          style={{
            width: "100%",
            transformOrigin: "left",
            transform: "scaleX(1)",
          }}
        />
      )}
    </div>
  )
} 