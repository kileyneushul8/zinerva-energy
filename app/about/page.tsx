"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/animated-section"
import { Eye, Target } from "lucide-react"

export default function AboutPage() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const scaleInVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 to-teal-900/80 z-10" />
          <Image
            src="/eagle.jpeg"
            alt="Zinerva Leadership"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>
        <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              About Zinerva
            </h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full" />
            <p className="text-xl text-teal-50/90 leading-relaxed">
              Pioneering global energy distribution with integrity, innovation, and excellence since 1995
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6">
        {/* Our Story Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-teal-700">
              <p>
                Zinerva LLC, established in 2023, is an American trading company at the
                forefront of global energy distribution. Based in Dover, Delaware, with
                operations in Miami Beach, Florida, we've quickly become a pivotal player in
                the international energy market.
              </p>
              <p>
                Our rapid growth and success stem from our commitment to excellence, deep
                understanding of global energy dynamics, and our ability to navigate complex
                international markets. We pride ourselves on our American values of
                innovation, integrity, and exceptional service, which guide every aspect of our
                operations.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission with offset layout */}
        <AnimatedSection className="py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl font-bold text-teal-900">Our Purpose</h2>
              <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mt-6" />
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              {/* Vision Section - Offset Left */}
              <motion.div
                variants={scaleInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-[90%] bg-white p-10 rounded-2xl shadow-xl border-2 border-teal-100
                  hover:border-orange-200 transition-all duration-300 mb-24"
              >
                <div className="flex items-start gap-8">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 
                    text-white shadow-lg">
                    <Eye className="w-12 h-12" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <h3 className="text-3xl font-bold text-teal-900">Our Vision</h3>
                    <div className="w-20 h-1 bg-orange-500 rounded-full" />
                    <p className="text-xl text-teal-700 leading-relaxed">
                      To be a global leader in sustainable energy solutions, driving innovation and excellence
                      in energy distribution while maintaining the highest standards of integrity and environmental stewardship.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Mission Section - Offset Right */}
              <motion.div
                variants={scaleInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="ml-auto w-[90%] bg-white p-10 rounded-2xl shadow-xl border-2 border-teal-100
                  hover:border-orange-200 transition-all duration-300"
              >
                <div className="flex items-start gap-8">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 
                    text-white shadow-lg">
                    <Target className="w-12 h-12" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <h3 className="text-3xl font-bold text-teal-900">Our Mission</h3>
                    <div className="w-20 h-1 bg-orange-500 rounded-full" />
                    <p className="text-xl text-teal-700 leading-relaxed">
                      We are committed to delivering reliable, efficient, and sustainable energy solutions
                      that power progress and prosperity across the globe, while upholding the highest
                      standards of ethical business practices and environmental responsibility.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Core Values Section */}
        <AnimatedSection className="py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-teal-900">Our Core Values</h2>
              <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mt-6" />
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Integrity",
                  description: "We conduct our business with the highest ethical standards, ensuring transparency and trust in all our relationships."
                },
                {
                  title: "Innovation",
                  description: "We continuously seek innovative solutions to meet the evolving needs of the global energy market."
                },
                {
                  title: "Sustainability",
                  description: "We are committed to environmental stewardship and promoting sustainable energy practices."
                },
                {
                  title: "Excellence",
                  description: "We strive for excellence in every aspect of our operations, from service delivery to customer relationships."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
                    transform hover:-translate-y-1 border border-teal-100/50"
                >
                  <h3 className="text-xl font-semibold text-teal-800 mb-4">{value.title}</h3>
                  <p className="text-teal-700">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Bridge Widget Section */}
        <AnimatedSection className="py-24">
          <motion.div
            variants={scaleInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative h-[300px] rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-900/70 to-transparent z-10" />
            <Image
              src="/bridge-sunset.jpg"
              alt="Global Energy Infrastructure"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  variants={fadeUpVariant}
                  className="max-w-2xl space-y-6 p-8"
                >
                  <h2 className="text-3xl font-bold text-white">Bridging Global Markets</h2>
                  <div className="w-20 h-1 bg-orange-500 rounded-full" />
                  <p className="text-xl text-white/90">
                    Our worldwide network enables us to deliver innovative energy solutions
                    while maintaining deep connections with local communities and stakeholders.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Leadership Section */}
        <AnimatedSection className="py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <motion.div
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-4xl font-bold text-teal-900">Leadership</h2>
                  <div className="w-20 h-1 bg-orange-500 rounded-full" />
                  <h3 className="text-2xl font-semibold text-teal-800">Gabriel Hernandez</h3>
                  <p className="text-xl text-teal-600">Chief Executive Officer</p>
                  <p className="text-lg text-teal-700 leading-relaxed">
                    Under Gabriel's visionary leadership, Zinerva has established itself
                    as a pioneering force in the global energy sector. His forward-thinking
                    approach to sustainable energy solutions and deep industry expertise
                    drives our mission to transform the energy landscape.
                  </p>
                </motion.div>
              </div>
              <motion.div
                variants={scaleInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative h-[500px] w-[400px] justify-self-center rounded-2xl overflow-hidden shadow-xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent z-10 
                  transition-opacity duration-500 group-hover:opacity-0" />
                <Image
                  src="/gabriel-hernandez.jpg"
                  alt="Gabriel Hernandez - CEO of Zinerva"
                  fill
                  className="object-contain object-top transition-transform duration-500 group-hover:scale-102"
                  priority
                  quality={100}
                />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

