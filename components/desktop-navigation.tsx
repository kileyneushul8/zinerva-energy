"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { DesktopNavDropdown } from "./desktop-nav-dropdown"
import { NavLink } from "./nav-link"

export function DesktopNavigation() {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const pathname = usePathname() ?? ''

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      <DesktopNavDropdown
        type="about"
        active={activeDropdown === "about"}
        onToggle={() => toggleDropdown("about")}
        pathname={pathname}
      />
      <DesktopNavDropdown
        type="services"
        active={activeDropdown === "services"}
        onToggle={() => toggleDropdown("services")}
        pathname={pathname}
      />
      <NavLink href="/ethics-compliance">Ethics & Compliance</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </nav>
  )
} 