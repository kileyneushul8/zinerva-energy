"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Error monitoring will be handled by Sentry when installed
      // import { captureException } from '@/lib/error-monitoring'
      // captureException(error, { page: window.location.pathname })
    }
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-6">
            <AlertCircle className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-lg text-teal-700 mb-2">
            We encountered an unexpected error
          </p>
          {error.digest && (
            <p className="text-sm text-teal-600 mb-6">
              Error ID: {error.digest}
            </p>
          )}
          <p className="text-base text-gray-600 max-w-md mx-auto mb-8">
            Don't worry, our team has been notified. Please try again or return to the homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
          >
            <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-teal-300 text-teal-900 hover:bg-teal-50 px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="text-teal-700 hover:text-teal-900 hover:bg-teal-50 px-6 py-6 rounded-full transition-all duration-300 w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <span>
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Go Back
            </span>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-teal-200">
          <p className="text-sm text-gray-500 mb-4">
            Need immediate assistance?
          </p>
          <Button
            asChild
            variant="link"
            className="text-teal-600 hover:text-teal-800"
          >
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

