"use client"

import * as React from "react"
import Link from "next/link"

interface ClientLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ClientLink({ href, children, className = "", onClick }: ClientLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {children}
    </Link>
  )
} 