"use client"

import { motion } from "framer-motion"
import {
  Briefcase,
  Users,
  Globe,
  Rocket,
  Heart,
  GraduationCap,
  ArrowRight,
  Building2
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

const benefits = [
  {
    icon: GraduationCap,
    title: "Professional Development",
    description: "Continuous learning opportunities and career growth paths"
  },
  {
    icon: Globe,
    title: "Global Exposure",
    description: "Work with international markets and diverse teams"
  },
  {
    icon: Heart,
    title: "Comprehensive Benefits",
    description: "Competitive compensation and health benefits package"
  }
]

const values = [
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Join a team that values diversity, inclusion, and mutual support"
  },
  {
    icon: Rocket,
    title: "Innovation Focus",
    description: "Drive the future of energy trading through cutting-edge solutions"
  },
  {
    icon: Building2,
    title: "Work-Life Balance",
    description: "Flexible work arrangements and respect for personal time"
  }
]

// Add new section for growth opportunities
const growthOpportunities = [
  {
    title: "Mentorship Programs",
    description: "Learn from industry veterans and develop your expertise"
  },
  {
    title: "Leadership Development",
    description: "Clear paths to leadership roles and management opportunities"
  },
  {
    title: "Global Projects",
    description: "Work on international initiatives that shape the energy market"
  }
]

export default function CareersPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
      {/* Enhanced Header Section */}
      <div className="relative bg-gradient-to-r from-teal-900 to-teal-800 py-32 overflow-hidden">
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
                Join Our Team
              </span>
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Build Your Career at{" "}
              <span className="text-orange-400 relative">
                Zinerva
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h1>
            <p className="text-xl text-teal-50 leading-relaxed">
              Join a dynamic team shaping the future of global energy trading
            </p>
          </motion.div>
        </div>
      </div>

      {/* Unity Image Section */}
      <div className="relative -mt-16 z-10 mb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/unity-hands.jpg"
                alt="Unity and Collaboration at Zinerva"
                fill
                className="object-cover"
                priority
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">United in Purpose</h2>
                <p className="text-lg text-white/90">
                  At Zinerva, we believe in the power of collaboration and diverse perspectives
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-teal-900 mb-4">Why Join Zinerva?</h2>
          <p className="text-lg text-teal-600 max-w-2xl mx-auto">
            Experience a workplace that values innovation, growth, and work-life balance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 
                hover:border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100/50 
                      w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-teal-900 mb-2">{benefit.title}</h3>
                  <p className="text-teal-600">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-teal-100 
                hover:border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/50 
                      w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-teal-900 mb-2">{value.title}</h3>
                  <p className="text-teal-600">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Growth Opportunities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-24 mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-teal-900 mb-4">Growth Opportunities</h2>
            <p className="text-lg text-teal-600 max-w-2xl mx-auto">
              Your career development is our priority. We provide multiple paths for growth and advancement.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {growthOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-white to-teal-50/30 border-2 border-teal-100 
                  hover:border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-teal-900 mb-3">{opportunity.title}</h3>
                    <p className="text-teal-600">{opportunity.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-24"
        >
          <Button
            onClick={() => router.push('/careers/positions')}
            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 
              hover:to-orange-500 text-white px-8 py-6 rounded-full shadow-lg 
              hover:shadow-xl transition-all duration-300 group"
          >
            <Briefcase className="mr-2 h-5 w-5" />
            <span>View Open Positions</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

