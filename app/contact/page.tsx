"use client"

import { motion } from "framer-motion"
import {
  Building2,
  Mail,
  Globe,
  MessageSquare,
  Send,
  Clock,
  ArrowRight,
  MapPin,
  Network
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { useState } from "react"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Building2,
    title: "Our Location",
    details: "Dover, DE",
    color: "text-teal-500",
    bgColor: "bg-teal-50"
  },
  {
    icon: Mail,
    title: "Email",
    details: "admin@zinervacompany.com",
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  {
    icon: Globe,
    title: "Global Presence",
    details: "Serving clients worldwide",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon-Fri: 9:00 AM - 6:00 PM EST",
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      toast.success("Message sent successfully! We'll get back to you soon.")
      setFormData({ 
        name: '', 
        email: '', 
        subject: '', 
        message: '', 
        company: '', 
        position: '', 
        phone: '', 
        preferredContact: 'email' 
      })
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
      {/* Enhanced Header Section */}
      <div className="relative bg-gradient-to-r from-teal-900 to-teal-800 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.2),transparent_70%)]" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-orange-500/20 text-orange-100 rounded-full text-sm font-medium">
                Global Network
              </span>
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Let's Start a{" "}
              <span className="text-orange-400 relative">
                Conversation
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h1>
            <p className="text-xl text-teal-50 leading-relaxed">
              Connect with our team to explore energy trading opportunities and strategic partnerships
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content - Moved down with more padding */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              className="md:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-teal-100 
                hover:border-orange-200 transition-all duration-300">
                <h2 className="text-2xl font-bold text-teal-900 mb-8">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-teal-900">Name</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-teal-900">Email</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-teal-900">Company</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="mt-2"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-teal-900">Position</label>
                      <Input
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="mt-2"
                        placeholder="Your position"
                      />
                    </div>
                  </div>

                  {/* Contact Preference */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-teal-900">Phone (Optional)</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-teal-900">Preferred Contact Method</label>
                      <select
                        value={formData.preferredContact}
                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                        className="mt-2 w-full rounded-md border border-teal-200 bg-white px-3 py-2 text-sm"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-teal-900">Subject</label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-2"
                      placeholder="Message subject"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-teal-900">Message</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 h-32"
                      placeholder="Your message"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 
                      hover:to-orange-500 text-white px-8 py-6 rounded-full shadow-lg 
                      hover:shadow-xl transition-all duration-300 group w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        <span>Send Message</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information Cards */}
            <div className="md:col-span-1 space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 
                    hover:border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${info.bgColor} shrink-0
                          group-hover:scale-110 transition-transform duration-300`}>
                          <info.icon className={`w-5 h-5 ${info.color}`} />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-teal-900 mb-1">{info.title}</h3>
                          <p className="text-sm text-teal-600 whitespace-pre-line">{info.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Trading Operations Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 
                  hover:border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-blue-50 shrink-0
                        group-hover:scale-110 transition-transform duration-300">
                        <Network className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-teal-900 mb-1">Trading Operations</h3>
                        <p className="text-sm text-teal-600">24/7 market monitoring and trading capabilities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

