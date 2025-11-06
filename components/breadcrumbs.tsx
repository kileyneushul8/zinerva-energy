"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

// Page title mapping
const pageTitles: Record<string, string> = {
  "/": "Home",
  "/about": "About Us",
  "/company-overview": "Company Overview",
  "/products": "Products",
  "/sustainability": "Sustainability",
  "/global-network": "Global Network",
  "/energy-trading": "Energy Trading",
  "/risk-management": "Risk Management",
  "/market-overview": "Market Overview",
  "/market-insights": "Market Insights",
  "/ethics-compliance": "Ethics & Compliance",
  "/ethics": "Ethics",
  "/contact": "Contact",
  "/leadership": "Leadership",
  "/careers": "Careers",
  "/news": "News",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
  "/cookies": "Cookie Policy",
}

export function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show breadcrumbs on home page
  if (pathname === "/") {
    return null
  }

  // Generate breadcrumb items
  const pathSegments = pathname.split("/").filter(Boolean)
  const breadcrumbs = [
    { href: "/", label: "Home" },
    ...pathSegments.map((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/")
      return {
        href: path,
        label: pageTitles[path] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      }
    }),
  ]

  // Remove last item's href (current page)
  const lastIndex = breadcrumbs.length - 1
  const currentBreadcrumb = breadcrumbs[lastIndex]
  const previousBreadcrumbs = breadcrumbs.slice(0, lastIndex)

  return (
    <nav
      aria-label="Breadcrumb"
      className="container mx-auto px-4 py-4"
    >
      <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
        {previousBreadcrumbs.map((crumb, index) => (
          <li
            key={crumb.href}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href={crumb.href}
              className={cn(
                "text-teal-700 hover:text-orange-500 transition-colors duration-200",
                "flex items-center gap-1"
              )}
              itemProp="item"
            >
              {index === 0 && <Home className="w-4 h-4" />}
              <span itemProp="name">{crumb.label}</span>
            </Link>
            <meta itemProp="position" content={String(index + 1)} />
            <ChevronRight className="w-4 h-4 text-teal-400 mx-2" />
          </li>
        ))}
        <li
          className="text-teal-900 font-medium"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          aria-current="page"
        >
          <span itemProp="name">{currentBreadcrumb.label}</span>
          <meta itemProp="position" content={String(breadcrumbs.length)} />
        </li>
      </ol>
    </nav>
  )
}

