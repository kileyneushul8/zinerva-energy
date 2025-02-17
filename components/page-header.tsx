/**
 * PageHeader Component
 * Renders a configurable header section with optional image and variant styles
 */

"use client"

import Image, { StaticImageData } from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { StaticImport } from "next/dist/shared/lib/get-img-props"
import {
  LineChart,
  Globe,
  Shield,
  Leaf,
  Building2,
  Package
} from "lucide-react"

// Define variants outside the component
const headerVariants = {
  default: {
    height: "h-[400px]",
    container: "container mx-auto px-4 h-full flex items-center",
    content: "max-w-2xl space-y-4",
  },
  overlay: {
    height: "h-[500px]",
    container: "container mx-auto px-4 h-full flex items-center relative z-20",
    content: "max-w-3xl space-y-6 text-white",
  },
  side: {
    height: "h-[400px]",
    container: "grid md:grid-cols-2 h-full",
    content: "container mx-auto px-4 flex items-center max-w-xl space-y-4",
  },
  minimal: {
    height: "h-[300px]",
    container: "container mx-auto px-4 h-full flex items-center",
    content: "max-w-2xl space-y-4",
  }
} as const

type HeaderVariant = keyof typeof headerVariants

interface PageHeaderProps {
  title: string
  description: string
  highlightText?: string
  variant?: HeaderVariant
  image?: string | StaticImageData | StaticImport
  className?: string
}

export function PageHeader({
  title,
  description,
  highlightText,
  variant = 'default',
  image,
  className,
}: PageHeaderProps) {
  const safeVariant = variant as HeaderVariant
  const hasImage = Boolean(image && (safeVariant === "overlay" || safeVariant === "side"))

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        headerVariants[safeVariant].height,
        !hasImage && "bg-gradient-to-r from-teal-900 to-teal-800",
        className
      )}
    >
      {hasImage && image && (
        <>
          {safeVariant === "overlay" && (
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/80 to-orange-900/80 z-10" />
          )}
          <div className={cn(
            "relative h-full",
            safeVariant === "side" ? "md:col-span-1" : "absolute inset-0"
          )}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
              quality={100}
            />
          </div>
        </>
      )}

      <div className={headerVariants[safeVariant].container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={headerVariants[safeVariant].content}
        >
          <h1 className={cn(
            "text-4xl font-bold",
            (safeVariant === "overlay" || !hasImage) ? "text-white" : "text-teal-900"
          )}>
            {title}
          </h1>
          {description && (
            <p className={cn(
              "text-xl",
              (safeVariant === "overlay" || !hasImage) ? "text-teal-50" : "text-teal-700"
            )}>
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
} 