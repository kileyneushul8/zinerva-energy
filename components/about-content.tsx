"use client"

import { motion } from "framer-motion"
import { Building2, Shield, Globe2, Award, Sparkles, Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "Upholding the highest standards of business ethics and transparency in all operations"
  },
  {
    icon: Globe2,
    title: "Global Excellence",
    description: "Delivering exceptional service and solutions across international markets"
  },
  {
    icon: Sparkles,
    title: "Sustainability",
    description: "Committed to environmental stewardship and sustainable business practices"
  }
]

export function AboutContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageHeader
        title="About"
        highlightText="Zinerva LLC"
        description="Pioneering global energy distribution with integrity, innovation, and excellence since 2023"
        variant="overlay"
      />

      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Our Story Section */}
        <AnimatedSection>
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
        </AnimatedSection>

        {/* Mission & Values Section */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">Our Mission & Values</h2>
            <p className="text-xl text-teal-700 mb-12">
              At Zinerva, our mission is to power the world's progress through responsible energy distribution, 
              fostering sustainability, and driving innovation in the global energy sector.
            </p>
            
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-100 
                    hover:border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-teal-100 to-teal-50">
                          <value.icon className="h-6 w-6 text-teal-600" />
                        </div>
                        <CardTitle className="text-xl text-teal-900">{value.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-teal-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Bridge Image Section - Now positioned as a transition to global presence */}
        <AnimatedSection className="!my-32"> {/* Added extra margin for better spacing */}
          <div className="max-w-6xl mx-auto">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/30 via-transparent to-orange-900/30 z-10" />
              <Image
                src="/bridge-sunset.jpg"
                alt="Global Energy Infrastructure"
                fill
                className="object-cover"
                quality={100}
                priority
              />
              <div className="absolute inset-0 z-20 flex items-center bg-gradient-to-t from-black/50 via-transparent to-transparent">
                <div className="container px-4 mt-auto pb-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-3xl mx-auto text-center"
                  >
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Building Bridges Across Global Energy Markets
                    </h3>
                    <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-4" />
                    <p className="text-xl text-white/90">
                      Our global infrastructure and strategic partnerships enable seamless 
                      energy distribution, connecting suppliers and consumers across continents 
                      with reliability and efficiency.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Leadership Section */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">Leadership</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-12" />
            
            <div className="space-y-12">
              {/* CEO Profile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-white to-teal-50/30 border-2 border-teal-100 
                  shadow-lg overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-[300px,1fr] gap-8 items-center">
                      {/* CEO Image */}
                      <div className="relative mx-auto md:mx-0">
                        <div className="w-72 h-72 rounded-xl overflow-hidden shadow-xl 
                          border-4 border-white relative z-10 bg-gradient-to-b from-gray-50 to-gray-100">
                          <Image
                            src="/gabriel-hernandez.jpg"
                            alt="Gabriel Hernandez - CEO of Zinerva LLC"
                            width={288}
                            height={288}
                            className="object-cover w-full h-full object-top"
                            priority
                            quality={100}
                          />
                        </div>
                        {/* Refined decorative elements to match professional tone */}
                        <div className="absolute -top-3 -right-3 w-72 h-72 rounded-xl 
                          bg-gradient-to-br from-teal-600/20 to-teal-400/20 -z-10 blur-sm" />
                        <div className="absolute -bottom-3 -left-3 w-72 h-72 rounded-xl 
                          bg-gradient-to-br from-orange-400/20 to-orange-300/20 -z-10 blur-sm" />
                      </div>

                      {/* CEO Bio - adjust styling to complement the professional photo */}
                      <div className="text-left space-y-5">
                        <div>
                          <h3 className="text-2xl font-bold text-teal-900 mb-1">Gabriel Hernandez</h3>
                          <p className="text-lg text-orange-600 font-medium">Founder & Chief Executive Officer</p>
                        </div>
                        <div className="space-y-4 text-teal-700">
                          <p className="leading-relaxed">
                            As the founder and CEO of Zinerva LLC, Gabriel Hernandez brings visionary leadership 
                            and strategic insight to our global energy trading operations. His innovative approach 
                            has been instrumental in establishing Zinerva as a pivotal player in the international 
                            energy market since our founding in 2023.
                          </p>
                          <p className="leading-relaxed">
                            Gabriel's expertise in global energy markets and commitment to sustainable practices 
                            drives our mission to revolutionize energy distribution. Under his leadership, 
                            Zinerva has rapidly expanded its presence while maintaining the highest standards 
                            of integrity and operational excellence.
                          </p>
                        </div>
                        
                        {/* Enhanced credentials section */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="bg-white/80 p-4 rounded-lg border border-teal-100 
                            shadow-sm hover:shadow-md transition-all duration-300">
                            <p className="text-sm font-medium text-teal-600">Leadership</p>
                            <p className="font-bold text-teal-900">Founder & CEO</p>
                          </div>
                          <div className="bg-white/80 p-4 rounded-lg border border-teal-100 
                            shadow-sm hover:shadow-md transition-all duration-300">
                            <p className="text-sm font-medium text-teal-600">Vision</p>
                            <p className="font-bold text-teal-900">Global Innovation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Rest of leadership section remains the same */}
              <Card className="bg-gradient-to-br from-white to-teal-50/30 border-2 border-teal-100 
                shadow-lg p-8">
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-full bg-teal-100 w-16 h-16 mx-auto flex items-center justify-center">
                    <Users className="h-8 w-8 text-teal-600" />
                  </div>
                  <p className="text-lg text-teal-700 max-w-2xl mx-auto">
                    Our leadership team brings together decades of experience in global energy markets, 
                    combining deep industry knowledge with innovative thinking to drive our company's 
                    success and growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>

        {/* Global Impact Section */}
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">Global Impact</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-8" />
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-100 shadow-lg p-6">
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-teal-100 w-12 h-12 mx-auto flex items-center justify-center">
                    <Globe2 className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-teal-900">Market Presence</h3>
                  <p className="text-teal-700">
                    Operating across key energy markets worldwide, facilitating efficient and 
                    reliable energy distribution.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-100 shadow-lg p-6">
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-teal-100 w-12 h-12 mx-auto flex items-center justify-center">
                    <Award className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-teal-900">Industry Leadership</h3>
                  <p className="text-teal-700">
                    Setting new standards in energy trading and distribution through innovation 
                    and sustainable practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
} 