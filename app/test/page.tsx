"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function TestPage() {
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleTest = async () => {
    try {
      const response = await fetch("/api/auth/test")
      const data = await response.json()
      setResult(data.message)
      setError("")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
      setResult("")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">JWT Configuration Test</h1>
        <Button onClick={handleTest} className="mb-4">
          Test JWT Configuration
        </Button>

        {error && (
          <div className="bg-red-900/50 border border-red-500 p-4 rounded-md mb-4">
            <h2 className="text-red-400 font-semibold mb-2">Error:</h2>
            <pre className="text-red-300">{error}</pre>
          </div>
        )}

        {result && (
          <div className="bg-green-900/50 border border-green-500 p-4 rounded-md">
            <h2 className="text-green-400 font-semibold mb-2">Success:</h2>
            <pre className="text-green-300 whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

