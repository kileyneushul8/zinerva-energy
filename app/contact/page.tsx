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
  Network,
  CheckCircle2
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { useState, useEffect } from "react"
import { toast } from "sonner"

// Country codes with phone prefixes
const countries = [
  { code: 'US', name: 'United States', prefix: '+1' },
  { code: 'CA', name: 'Canada', prefix: '+1' },
  { code: 'GB', name: 'United Kingdom', prefix: '+44' },
  { code: 'ES', name: 'Spain', prefix: '+34' },
  { code: 'FR', name: 'France', prefix: '+33' },
  { code: 'DE', name: 'Germany', prefix: '+49' },
  { code: 'IT', name: 'Italy', prefix: '+39' },
  { code: 'NL', name: 'Netherlands', prefix: '+31' },
  { code: 'BE', name: 'Belgium', prefix: '+32' },
  { code: 'CH', name: 'Switzerland', prefix: '+41' },
  { code: 'AU', name: 'Australia', prefix: '+61' },
  { code: 'NZ', name: 'New Zealand', prefix: '+64' },
  { code: 'JP', name: 'Japan', prefix: '+81' },
  { code: 'CN', name: 'China', prefix: '+86' },
  { code: 'IN', name: 'India', prefix: '+91' },
  { code: 'BR', name: 'Brazil', prefix: '+55' },
  { code: 'MX', name: 'Mexico', prefix: '+52' },
  { code: 'AR', name: 'Argentina', prefix: '+54' },
  { code: 'ZA', name: 'South Africa', prefix: '+27' },
  { code: 'AE', name: 'United Arab Emirates', prefix: '+971' },
  { code: 'SA', name: 'Saudi Arabia', prefix: '+966' },
  { code: 'SG', name: 'Singapore', prefix: '+65' },
  { code: 'HK', name: 'Hong Kong', prefix: '+852' },
  { code: 'KR', name: 'South Korea', prefix: '+82' },
  { code: 'NO', name: 'Norway', prefix: '+47' },
  { code: 'SE', name: 'Sweden', prefix: '+46' },
  { code: 'DK', name: 'Denmark', prefix: '+45' },
  { code: 'FI', name: 'Finland', prefix: '+358' },
  { code: 'PL', name: 'Poland', prefix: '+48' },
  { code: 'PT', name: 'Portugal', prefix: '+351' },
  { code: 'GR', name: 'Greece', prefix: '+30' },
  { code: 'IE', name: 'Ireland', prefix: '+353' },
  { code: 'AT', name: 'Austria', prefix: '+43' },
  { code: 'RU', name: 'Russia', prefix: '+7' },
  { code: 'TR', name: 'Turkey', prefix: '+90' },
  { code: 'IL', name: 'Israel', prefix: '+972' },
  { code: 'EG', name: 'Egypt', prefix: '+20' },
  { code: 'NG', name: 'Nigeria', prefix: '+234' },
  { code: 'KE', name: 'Kenya', prefix: '+254' },
  { code: 'OTHER', name: 'Other', prefix: '+' },
]

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
    color: "text-teal-600",
    bgColor: "bg-teal-50"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon-Fri: 9:00 AM - 6:00 PM EST",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    country: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Get phone prefix based on selected country
  const getPhonePrefix = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode)
    return country ? country.prefix : '+'
  }

  // Format phone number with country prefix
  const formatPhoneNumber = (countryCode: string, phoneNumber: string) => {
    if (!countryCode || !phoneNumber) return phoneNumber
    const prefix = getPhonePrefix(countryCode)
    // Remove any existing prefix or spaces
    const cleaned = phoneNumber.replace(/^\+?\d+\s*/, '').replace(/\s+/g, '')
    return `${prefix} ${cleaned}`
  }

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Remove any existing prefix to avoid duplication
    const cleaned = value.replace(/^\+\d+\s*/, '')
    setFormData({ ...formData, phone: cleaned })
  }

  // Handle country change
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value
    // If phone number exists, clean it (remove any existing prefix)
    const cleanedPhone = formData.phone ? formData.phone.replace(/^\+\d+\s*/, '') : formData.phone
    setFormData({ ...formData, country: countryCode, phone: cleanedPhone })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Format phone number with country prefix before sending
      const selectedCountry = countries.find(c => c.code === formData.country)
      const formattedData = {
        ...formData,
        country: selectedCountry ? selectedCountry.name : formData.country,
        phone: formData.country && formData.phone 
          ? formatPhoneNumber(formData.country, formData.phone)
          : formData.phone
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Show success message with custom styling
      toast.success("Message sent successfully! We'll get back to you soon.", {
        duration: 5000,
        icon: <CheckCircle2 className="w-5 h-5 text-teal-600" />,
        className: "bg-teal-50 border border-teal-200 text-teal-900",
      })
      
      setFormData({ 
        name: '', 
        email: '', 
        subject: '', 
        message: '', 
        company: '', 
        position: '', 
        country: '',
        phone: '', 
        preferredContact: 'email' 
      })
    } catch (error) {
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
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-teal-200 
                hover:border-orange-300 transition-all duration-300 relative overflow-hidden">
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-50 to-orange-50 opacity-50 rounded-full blur-3xl -z-0" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-teal-900">Send us a Message</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-semibold text-teal-900 mb-2 block">Name <span className="text-orange-500">*</span></label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="mt-2 border-teal-300 focus:border-orange-500 focus:ring-orange-500/20 bg-white transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-teal-900 mb-2 block">Email <span className="text-orange-500">*</span></label>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-2 border-teal-300 focus:border-orange-500 focus:ring-orange-500/20 bg-white transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-semibold text-teal-900 mb-2 block">Company</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="mt-2 border-teal-300 focus:border-orange-500 focus:ring-orange-500/20 bg-white transition-colors"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-teal-900 mb-2 block">Position</label>
                        <Input
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          className="mt-2 border-teal-300 focus:border-orange-500 focus:ring-orange-500/20 bg-white transition-colors"
                          placeholder="Your position"
                        />
                      </div>
                    </div>

                  {/* Country Field */}
                  <div>
                    <label className="text-sm font-semibold text-teal-900 mb-2 block">Country <span className="text-orange-500">*</span></label>
                    <select
                      required
                      value={formData.country}
                      onChange={handleCountryChange}
                      className="mt-2 w-full rounded-md border border-teal-300 bg-white px-3 py-2 text-sm text-teal-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name} ({country.prefix})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Contact Preference */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-teal-900 mb-2 block">Phone</label>
                      <div className="relative mt-2">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-700 font-medium text-sm">
                          {formData.country ? getPhonePrefix(formData.country) : '+'}
                        </div>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className="pl-12 border-teal-300 focus:border-orange-500 focus:ring-orange-500/20 bg-white transition-colors"
                          placeholder={formData.country ? "1234567890" : "Select country first"}
                          disabled={!formData.country}
                        />
                      </div>
                      {formData.country && formData.phone && (
                        <p className="mt-1 text-xs text-teal-600">
                          Formatted: {formatPhoneNumber(formData.country, formData.phone)}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-teal-900 mb-2 block">Preferred Contact Method</label>
                      <select
                        value={formData.preferredContact}
                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                        className="mt-2 w-full rounded-md border border-teal-300 bg-white px-3 py-2 text-sm text-teal-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                    </div>
                  </div>

                    <div>
                      <label className="text-sm font-semibold text-teal-900 mb-2 block">Subject <span className="text-orange-500">*</span></label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="mt-2 border-teal-300 focus:border-orange-500 focus:ring-orange-500/20 bg-white transition-colors"
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-teal-900 mb-2 block">Message <span className="text-orange-500">*</span></label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-2 h-32 border-teal-300 focus:border-orange-500 focus:ring-orange-500/20 bg-white transition-colors resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 
                        hover:to-orange-500 text-white px-8 py-6 rounded-full shadow-lg 
                        hover:shadow-xl transition-all duration-300 group w-full md:w-auto
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
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
                  <Card className="bg-white/95 backdrop-blur-sm border-2 border-teal-200 
                    hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 group
                    hover:bg-gradient-to-br hover:from-white hover:to-teal-50/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${info.bgColor} shrink-0
                          group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                          <info.icon className={`w-5 h-5 ${info.color}`} />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-teal-900 mb-1">{info.title}</h3>
                          <p className="text-sm text-teal-700 whitespace-pre-line">{info.details}</p>
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
                <Card className="bg-white/95 backdrop-blur-sm border-2 border-teal-200 
                  hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 group
                  hover:bg-gradient-to-br hover:from-white hover:to-teal-50/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-teal-50 shrink-0
                        group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Network className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-teal-900 mb-1">Trading Operations</h3>
                        <p className="text-sm text-teal-700">24/7 market monitoring and trading capabilities</p>
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

