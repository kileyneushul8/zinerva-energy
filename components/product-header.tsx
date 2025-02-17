"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

type ProductHeaderProps = {
  product: {
    details: string
  }
}

export function ProductHeader({ product }: ProductHeaderProps) {
  const router = useRouter()
  
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-2xl font-semibold text-teal-800">Product Overview</h2>
        <p className="text-teal-700 mt-2">{product.details}</p>
      </div>
      <button
        onClick={() => router.push('/contact')}
        className="text-sm bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
      >
        Request Quote
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
} 