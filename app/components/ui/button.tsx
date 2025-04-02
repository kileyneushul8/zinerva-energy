import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'ghost' | 'outline'
    size?: 'default' | 'sm' | 'lg'
    children: React.ReactNode
}

export function Button({
    className,
    variant = 'default',
    size = 'default',
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
        default: 'bg-teal-600 text-white hover:bg-teal-700',
        ghost: 'hover:bg-teal-100/50',
        outline: 'border border-teal-200 hover:bg-teal-100/50'
    }

    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-sm',
        lg: 'h-12 px-6'
    }

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
} 