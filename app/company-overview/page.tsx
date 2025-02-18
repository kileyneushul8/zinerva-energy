"use client"

import { motion } from "framer-motion"
import { Building2, Users, Globe2, ChartBar, Target, Award, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function CompanyOverview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 to-teal-900/80 z-10" />
          <Image
            src="/company-overview.jpg"
            alt="Zinerva Company Overview"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-3xl"
          >
            <h1 className="text-6xl font-bold text-white leading-tight">
              About Zinerva
            </h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full" />
            <p className="text-xl text-teal-50/90 leading-relaxed">
              Pioneering global energy distribution with integrity, innovation, and excellence since 1995
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {[
                "Environmental Stewardship",
                "Global Leadership",
                "Innovation Excellence",
                "Sustainable Growth"
              ].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="px-4 py-2 rounded-full bg-orange-500/20 backdrop-blur-sm 
                    border border-orange-300/30 text-white font-medium text-sm
                    hover:bg-orange-500/30 transition-colors duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <AnimatedSection className="mb-24">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-teal-900 text-center">Our Purpose</h2>
              <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mt-6 mb-16" />
            </motion.div>

            <div className="grid grid-cols-1 gap-12 max-w-3xl mx-auto">
              <motion.div
                variants={itemVariants}
                className="w-full bg-white rounded-2xl p-8 shadow-xl border-2 border-teal-100
                  hover:border-orange-200 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 
                    text-white shadow-lg">
                    <Eye className="w-8 h-8" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <h3 className="text-2xl font-bold text-teal-900">Our Vision</h3>
                    <p className="text-lg text-teal-700 leading-relaxed">
                      To revolutionize global energy distribution through sustainable practices,
                      cutting-edge technology, and unwavering commitment to excellence. We envision
                      a future where reliable energy solutions drive economic growth while preserving
                      our planet for generations to come.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="w-full bg-white rounded-2xl p-8 shadow-xl border-2 border-teal-100
                  hover:border-orange-200 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 
                    text-white shadow-lg">
                    <Target className="w-8 h-8" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <h3 className="text-2xl font-bold text-teal-900">Our Mission</h3>
                    <p className="text-lg text-teal-700 leading-relaxed">
                      To empower global progress through innovative energy solutions that:
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2.5" />
                          <span>Deliver reliable and sustainable energy products worldwide</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2.5" />
                          <span>Foster environmental stewardship and responsible trading practices</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2.5" />
                          <span>Create lasting value for our stakeholders and communities</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2.5" />
                          <span>Lead industry innovation in sustainable energy solutions</span>
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatedSection>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              icon: <Building2 className="h-6 w-6" />,
              title: "Global Presence",
              description: "Operating in major energy markets worldwide"
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "Expert Team",
              description: "Industry leaders with deep market expertise"
            },
            {
              icon: <Target className="h-6 w-6" />,
              title: "Strategic Vision",
              description: "Shaping the future of energy trading"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-100 
                hover:border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300
                hover:-translate-y-1">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-teal-100 text-teal-600">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-900">{item.title}</h3>
                    <p className="text-teal-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 