"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ClientLink } from "./client-link"

const serviceItems = [
  {
    href: "/global-network",
    title: "Global Network"
  },
  {
    href: "/energy-trading",
    title: "Energy Trading"
  },
  {
    href: "/risk-management",
    title: "Risk Management"
  },
  {
    href: "/market-overview",
    title: "Market Overview"
  }
]

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick: () => void
}) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <ClientLink
      href={href}
      onClick={onClick}
      className={`flex items-center px-4 py-2 text-sm font-medium ${
        active ? "text-orange-600" : "text-gray-700"
      } hover:text-orange-600 transition-colors`}
    >
      {children}
    </ClientLink>
  )
}

interface MobileNavItemsProps {
  onItemClick: () => void
}

export function MobileNavItems({ onItemClick }: MobileNavItemsProps) {
  return (
    <div className="flex flex-col mt-4">
      <MobileNavLink href="/about" onClick={onItemClick}>
        Company Overview
      </MobileNavLink>
      <MobileNavLink href="/sustainability" onClick={onItemClick}>
        Sustainability
      </MobileNavLink>
      <MobileNavLink href="/products" onClick={onItemClick}>
        Products
      </MobileNavLink>
      {serviceItems.map((item) => (
        <MobileNavLink key={item.href} href={item.href} onClick={onItemClick}>
          {item.title}
        </MobileNavLink>
      ))}
      <MobileNavLink href="/ethics-compliance" onClick={onItemClick}>
        Ethics & Compliance
      </MobileNavLink>
      <MobileNavLink href="/contact" onClick={onItemClick}>
        Contact
      </MobileNavLink>
    </div>
  )
} 