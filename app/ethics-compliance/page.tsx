"use client"

import { motion } from "framer-motion"
import { Shield, FileCheck, Scale, Users, BookOpen, Award, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import Image from "next/image"

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
}

const buttonVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400
    }
  },
  tap: {
    scale: 0.95
  }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function EthicsCompliancePage() {
  const router = useRouter()
  const policies = [
    {
      title: "Code of Conduct",
      description: "Our comprehensive guidelines for ethical business practices",
      icon: Shield,
      color: "text-teal-500"
    },
    {
      title: "Regulatory Compliance",
      description: "Adherence to international energy trading regulations",
      icon: FileCheck,
      color: "text-orange-500"
    },
    {
      title: "Fair Trading Practices",
      description: "Commitment to market integrity and fair competition",
      icon: Scale,
      color: "text-blue-500"
    },
    {
      title: "Stakeholder Engagement",
      description: "Transparent communication with all stakeholders",
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Training & Education",
      description: "Continuous learning and development programs",
      icon: BookOpen,
      color: "text-green-500"
    },
    {
      title: "Industry Standards",
      description: "Leading by example in energy sector ethics",
      icon: Award,
      color: "text-red-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-teal-50/10 to-white">
      {/* Enhanced Header Section */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background Image - Updated with proper Next.js Image component */}
        <div className="absolute inset-0">
          <Image
            src="/courthouse.jpeg"  // Make sure the image is in the public folder
            alt="Courthouse pillars representing justice and compliance"
            fill
            priority
            quality={100}
            className="object-cover object-center brightness-95"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/85 to-teal-900/80" />

          {/* Add a subtle sun flare effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>

        {/* Header Content */}
        <div className="relative h-full container mx-auto px-4">
          <div className="flex flex-col justify-center h-full max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="px-4 py-2 bg-orange-500/20 text-orange-100 rounded-full text-sm font-medium">
                  Corporate Responsibility
                </span>
              </motion.div>
              <h1 className="text-6xl font-bold text-white leading-tight">
                Ethics &
                <span className="text-orange-400 relative ml-4">
                  Compliance
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h1>
              <p className="text-xl text-teal-50 leading-relaxed max-w-2xl">
                Setting the highest standards for ethical business practices and regulatory
                compliance in the global energy sector.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(251,146,60,0.1),transparent_70%)]" />
        </motion.div>
      </div>

      {/* Main Content with improved spacing */}
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mt-20 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-teal-900 mb-4">Our Ethical Framework</h2>
          <p className="text-lg text-teal-600 max-w-2xl mx-auto">
            Comprehensive guidelines and practices that define our commitment to ethical business operations
          </p>
        </motion.div>

        {/* Policies Grid with improved spacing and interactions */}
        <motion.div
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-32"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {policies.map((policy, index) => (
            <motion.div
              key={policy.title}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="h-full"
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm border-2 border-teal-100 
                hover:border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500
                relative overflow-hidden group rounded-xl">
                {/* Enhanced hover effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-teal-50/30 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_70%)] 
                  opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <CardHeader className="relative z-10 pt-8">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br from-white to-gray-50/80 
                      shadow-lg ${policy.color} transform group-hover:scale-110 group-hover:rotate-3
                      transition-all duration-500 relative`}>
                      <policy.icon className="h-7 w-7" />
                      {/* Decorative elements */}
                      <div className="absolute inset-0 rounded-xl bg-white/40 opacity-0 
                        group-hover:opacity-100 transition-all duration-300" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-teal-900 mb-2">{policy.title}</CardTitle>
                      <CardDescription className="text-teal-600 text-base">
                        {policy.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 pb-8">
                  <motion.div
                    className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-teal-500 rounded-full mt-4"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * index, duration: 1, ease: "easeOut" }}
                  />

                  {/* Interactive Learn More Button */}
                  <motion.button
                    className="mt-6 text-sm font-medium text-teal-600 hover:text-orange-500 
                      flex items-center gap-2 group/button"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Commitment Section with enhanced visuals */}
        <motion.div
          className="relative py-24 px-6 mb-32 rounded-2xl bg-gradient-to-b from-teal-50/50 to-white
            border-2 border-teal-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(251,146,60,0.1),transparent_70%)]" />

          <div className="relative text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-teal-900 mb-6">Our Commitment</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-teal-500 mx-auto rounded-full mb-8" />
            <p className="text-xl text-teal-700 leading-relaxed mb-16">
              We are committed to maintaining the highest standards of ethical conduct in all our operations.
              Our comprehensive compliance framework ensures transparency, accountability, and responsible
              business practices across our global network.
            </p>

            {/* Enhanced Code of Conduct Button */}
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={() => router.push('/ethics-compliance/code-of-conduct')}
                className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 
                  hover:to-orange-500 text-white px-12 py-8 rounded-2xl shadow-[0_0_30px_rgba(251,146,60,0.3)]
                  hover:shadow-[0_0_40px_rgba(251,146,60,0.5)] transition-all duration-500 group
                  relative overflow-hidden"
              >
                {/* Button background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/50 to-transparent
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <span className="relative z-10 text-xl font-medium tracking-wide">
                  View Our Code of Conduct
                </span>
                <ArrowRight className="relative z-10 ml-3 h-6 w-6 group-hover:translate-x-3 
                  transition-transform duration-500" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

