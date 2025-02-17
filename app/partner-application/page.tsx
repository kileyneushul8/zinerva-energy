"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function PartnerApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert("Application submitted successfully!")
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/partners" className="inline-flex items-center text-white/70 hover:text-white mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Partners
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair mb-8">Partner Application</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required className="bg-white/10 border-white/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" required className="bg-white/10 border-white/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" className="bg-white/10 border-white/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company/Brand Name (if applicable)</Label>
            <Input id="company" className="bg-white/10 border-white/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website or Social Media URL</Label>
            <Input id="website" type="url" required className="bg-white/10 border-white/20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="followers">Number of Followers/Subscribers</Label>
            <Select required>
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue placeholder="Select follower range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1k">0 - 1,000</SelectItem>
                <SelectItem value="1k-10k">1,000 - 10,000</SelectItem>
                <SelectItem value="10k-50k">10,000 - 50,000</SelectItem>
                <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
                <SelectItem value="100k+">100,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience with Hookah Products</Label>
            <Select required>
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novice">Novice</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="motivation">Why do you want to partner with Nebben?</Label>
            <Textarea id="motivation" required className="bg-white/10 border-white/20 min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ideas">How would you promote Nebben products? (Optional)</Label>
            <Textarea id="ideas" className="bg-white/10 border-white/20 min-h-[100px]" />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </div>
    </main>
  )
}

