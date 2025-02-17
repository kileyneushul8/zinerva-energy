"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface AnimatedSectionProps {
    children: React.ReactNode
    className?: string
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    )
} 