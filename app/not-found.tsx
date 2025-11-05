import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-teal-900 opacity-20">404</h1>
          <h2 className="text-4xl font-bold text-teal-900 mb-4 -mt-8">
            Page Not Found
          </h2>
          <p className="text-xl text-teal-700 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 
              hover:to-orange-500 text-white px-8 py-6 rounded-full shadow-lg 
              hover:shadow-xl transition-all duration-300"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-teal-300 text-teal-900 hover:bg-teal-50 
              hover:border-orange-300 px-8 py-6 rounded-full"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-teal-200">
          <p className="text-sm text-teal-600 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="text-teal-700 hover:text-orange-500 transition-colors">
              About Us
            </Link>
            <Link href="/products" className="text-teal-700 hover:text-orange-500 transition-colors">
              Products
            </Link>
            <Link href="/market-overview" className="text-teal-700 hover:text-orange-500 transition-colors">
              Market Overview
            </Link>
            <Link href="/contact" className="text-teal-700 hover:text-orange-500 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

