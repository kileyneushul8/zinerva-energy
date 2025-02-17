"use client"

import { useState } from "react"
import { ScrollHandler } from "./scroll-handler"

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollHandler />
      {children}
    </>
  )
} 