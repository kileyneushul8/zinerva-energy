"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileNavItems } from "./mobile-nav-items"

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
)

export function MobileNavigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <button className="p-2 text-teal-600 hover:text-orange-600 transition-colors">
          <MenuIcon />
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full bg-white p-0">
        <MobileNavItems onItemClick={handleClose} />
      </SheetContent>
    </Sheet>
  )
} 