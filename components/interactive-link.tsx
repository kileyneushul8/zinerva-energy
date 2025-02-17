"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface InteractiveLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onNavigate?: () => void
}

export function InteractiveLink({ href, children, className = "", onNavigate }: InteractiveLinkProps) {
  const pathname = usePathname()
  const active = pathname === href

  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
} 