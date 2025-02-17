"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, Users, Shield, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Globe, Wind, Leaf, Zap, TreePine, Recycle } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import styles from '@/styles/sustainability.module.css'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"

// Custom SVG icons
const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 22c1.25-1.67 2.5-3.33 3.75-5 1.67 1.67 3.33 3.33 5 5C12.5 20.33 13.75 18.67 15 17c1.67 1.67 3.33 3.33 5 5" />
    <path d="M2 12c1.25-1.67 2.5-3.33 3.75-5 1.67 1.67 3.33 3.33 5 5C12.5 10.33 13.75 8.67 15 7c1.67 1.67 3.33 3.33 5 5" />
    <path d="M2 2c1.25-1.67 2.5-3.33 3.75-5 1.67 1.67 3.33 3.33 5 5C12.5.33 13.75-1.33 15-3c1.67 1.67 3.33 3.33 5 5" />
  </svg>
)

const RecycleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
    <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
    <path d="m14 16-3 3 3 3" />
    <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
    <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
    <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
  </svg>
)

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
)

// Update the timelineData to include focus areas and more details
const timelineData = [
  {
    year: "2023",
    title: "Foundation",
    description: "Established comprehensive ESG framework and sustainability goals",
    icon: <Leaf className="w-6 h-6" />,
    focusArea: "Environmental Impact",
    achievements: [
      "Launched global sustainability initiative",
      "Established baseline emissions metrics",
      "Developed ESG reporting structure",
      "Carbon footprint reduction programs",
      "Renewable energy integration started",
      "Waste management optimization"
    ],
    metrics: {
      emissions: "Baseline established",
      renewable: "20% integration",
      investment: "$50M committed"
    }
  },
  {
    year: "2024",
    title: "Implementation",
    description: "Rolling out key sustainability programs and infrastructure",
    icon: <Users className="w-6 h-6" />,
    focusArea: "Social Responsibility",
    achievements: [
      "Community engagement programs",
      "Stakeholder partnerships",
      "Social impact initiatives",
      "Supply chain optimization",
      "Green procurement guidelines",
      "Sustainability innovation hub"
    ],
    metrics: {
      emissions: "25% reduction",
      renewable: "40% integration",
      investment: "$100M deployed"
    }
  },
  {
    year: "2025",
    title: "Expansion",
    description: "Scaling sustainable practices globally",
    icon: <Shield className="w-6 h-6" />,
    focusArea: "Governance",
    achievements: [
      "Transparent reporting framework",
      "Ethical guidelines implementation",
      "Risk management systems",
      "Global standards rollout",
      "Advanced waste reduction",
      "Regional sustainability centers"
    ],
    metrics: {
      emissions: "50% reduction",
      renewable: "60% integration",
      investment: "$150M allocated"
    }
  },
  {
    year: "2026",
    title: "Innovation",
    description: "Pioneering new sustainable technologies",
    icon: <Zap className="w-6 h-6" />,
    focusArea: "Technology Integration",
    achievements: [
      "Clean energy R&D initiatives",
      "Circular economy model",
      "Industry partnerships",
      "Sustainability incubator",
      "Carbon capture solutions",
      "Knowledge network creation"
    ],
    metrics: {
      emissions: "75% reduction",
      renewable: "80% integration",
      investment: "$200M committed"
    }
  },
  {
    year: "2030",
    title: "Leadership",
    description: "Setting new industry standards in sustainability",
    icon: <Award className="w-6 h-6" />,
    focusArea: "Industry Leadership",
    achievements: [
      "Net-zero operations achieved",
      "Industry benchmark status",
      "Global initiative leadership",
      "Sustainability venture fund",
      "Industry-wide standards",
      "Future environmental programs"
    ],
    metrics: {
      emissions: "Net-zero achieved",
      renewable: "100% integration",
      investment: "Ongoing commitment"
    }
  }
]

// Update the TimelineEvent type to match our data structure
type TimelineEvent = {
  year: number
  title: string
  description: string
  icon: JSX.Element
  initiatives: string[]
}

type TimelineProps = {
  event: TimelineEvent
  index: number
  isActive: boolean
  onClick: () => void
  progress: number
}

// Add type for the scroll direction
type ScrollDirection = 'left' | 'right'

const TimelineEvent = ({ event, index, isActive, onClick, progress }: TimelineProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex flex-col items-center relative"
    >
      <div
        className="absolute bottom-full w-1 bg-gradient-to-t from-teal-600 to-orange-500"
        style={{ height: `${progress * 100}%`, maxHeight: "100%" }}
      />
      <button
        onClick={onClick}
        className={`w-24 h-24 rounded-full bg-gradient-to-br ${isActive
          ? 'from-orange-400 to-orange-600 border-orange-300'
          : 'from-teal-500 to-teal-700 border-teal-300'
          } border-4 flex items-center justify-center z-10 transition-all duration-300 hover:scale-110 shadow-lg group`}
      >
        <div className="text-white transform transition-all duration-300 group-hover:scale-110">
          {event.icon}
        </div>
      </button>
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold text-teal-900">{event.year}</p>
        <p className="text-sm text-teal-700 font-medium">{event.title}</p>
      </div>
    </motion.div>
  )
}

export default function SustainabilityPage() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (timelineRef.current && !timelineRef.current.contains(event.target as Node)) {
        setSelectedYear(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleTimelineClick = (year: string) => {
    setSelectedYear(selectedYear === year ? null : year)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-teal-900 to-teal-800 py-48 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.2),transparent_70%)]" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium">
                  Environmental Stewardship
                </span>
              </motion.div>
              <h1 className="text-7xl font-bold text-white leading-tight">
                Our Vision for{" "}
                <span className="text-orange-400 relative">
                  Sustainability
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h1>
              <p className="text-xl text-teal-50 leading-relaxed max-w-2xl">
                Leading the energy industry's transition towards a sustainable future through
                innovation, responsibility, and commitment to environmental stewardship.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        {/* Vision Section with Image */}
        <AnimatedSection className="mb-48">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Content Side */}
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-teal-900">
                  Reducing Our Environmental Footprint
                </h2>
                <p className="text-teal-700 text-lg leading-relaxed">
                  Through sustainable practices and innovative technology adoption, we're
                  committed to minimizing our impact on the environment while maximizing
                  our positive contribution to society.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-teal-100">
                    <div className="text-4xl font-bold text-orange-500 mb-2">50%</div>
                    <div className="text-teal-900">Emission Reduction by 2025</div>
                  </div>
                  <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-teal-100">
                    <div className="text-4xl font-bold text-orange-500 mb-2">80%</div>
                    <div className="text-teal-900">Renewable Energy by 2026</div>
                  </div>
                </div>
              </div>

              {/* Image Side - Adjusted to remove white bar */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-[#f5e6d3]">
                <Image
                  src="/sustainability-hero.jpg"
                  alt="Sustainability Initiative"
                  fill
                  className="object-contain object-center scale-[0.98]"
                  priority
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Timeline Section */}
        <AnimatedSection className="mb-32 mt-20">
          <div className="max-w-7xl mx-auto text-center mb-24">
            <h2 className="text-5xl font-bold text-teal-900 mb-6">Our Sustainability Journey</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto" />
            <p className="mt-8 text-xl text-teal-700 max-w-3xl mx-auto">
              Charting our path to a sustainable future
            </p>
          </div>

          <div className="relative" ref={timelineRef}>
            {/* Timeline Track with Enhanced Color */}
            <div className="relative h-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400 rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                animate-shimmer" />
            </div>

            {/* Timeline Years with Enhanced Styling */}
            <div className="relative flex justify-between max-w-5xl mx-auto px-8 -mt-3">
              {timelineData.map((item) => (
                <motion.button
                  key={item.year}
                  onClick={() => handleTimelineClick(item.year)}
                  className={`relative flex flex-col items-center group`}
                >
                  {/* Year Marker - Larger size and darker colors */}
                  <div className={`relative w-16 h-16 rounded-full border-4 border-white shadow-lg 
                    ${selectedYear === item.year
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 scale-110'
                      : 'bg-gradient-to-r from-teal-600 to-teal-700'
                    } transition-all duration-300 group-hover:scale-110 flex items-center justify-center`}>
                    {/* Pulse Effect for Selected Year */}
                    {selectedYear === item.year && (
                      <div className="absolute inset-0 rounded-full animate-ping 
                        bg-orange-500/30" />
                    )}
                    {/* Icon in the center with enhanced styling */}
                    <div className="relative flex items-center justify-center w-full h-full">
                      <div className="w-10 h-10 text-white drop-shadow-lg transform transition-transform duration-300 
                        group-hover:scale-110 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                  </div>

                  {/* Year Label */}
                  <div className={`mt-2 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm
                    transition-all duration-300 ${selectedYear === item.year
                      ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 scale-110'
                      : 'bg-white text-teal-900 group-hover:text-orange-600'
                    }`}>
                    <span className="text-lg font-bold">{item.year}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Content Area with Enhanced Animation */}
            <AnimatePresence mode="wait">
              {selectedYear && (
                <motion.div
                  layout
                  className="mt-20 max-w-5xl mx-auto"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  {timelineData.map((item) => (
                    item.year === selectedYear && (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white rounded-2xl shadow-xl border-2 border-teal-100 p-8"
                      >
                        <div className="grid md:grid-cols-2 gap-12">
                          {/* Left Column */}
                          <div>
                            <div className="flex items-center gap-4 mb-6">
                              <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 
                                text-white shadow-md">
                                {item.icon}
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-teal-900">{item.title}</h3>
                                <div className="text-orange-500 font-medium">{item.focusArea}</div>
                              </div>
                            </div>

                            <p className="text-teal-700 text-lg mb-6 leading-relaxed">
                              {item.description}
                            </p>

                            <div className="grid grid-cols-3 gap-6">
                              {Object.entries(item.metrics).map(([key, value]) => (
                                <div key={key} className="bg-teal-50 rounded-lg p-4">
                                  <div className="text-sm uppercase tracking-wider text-teal-600">{key}</div>
                                  <div className="text-lg font-bold text-teal-900 mt-1">{value}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Column */}
                          <div>
                            <h4 className="text-lg font-semibold text-teal-900 mb-4">Key Achievements</h4>
                            <div className="space-y-3">
                              {item.achievements.map((achievement, i) => (
                                <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3
                                  border border-teal-100 shadow-sm">
                                  <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-teal-700">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Key Focus Areas */}
        <AnimatedSection className="mb-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-teal-900 mb-6">Key Focus Areas</h2>
              <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto" />
            </div>

            {/* Increased gap between cards */}
            <div className="grid md:grid-cols-3 gap-16">
              {[
                {
                  icon: Leaf,
                  title: "Environmental Impact",
                  description:
                    "Minimizing our environmental footprint through sustainable practices and green technology adoption",
                  items: [
                    "Carbon footprint reduction",
                    "Renewable energy integration",
                    "Waste management optimization",
                  ],
                },
                {
                  icon: Globe,
                  title: "Social Responsibility",
                  description:
                    "Supporting communities and ensuring responsible business practices across our operations",
                  items: [
                    "Community engagement",
                    "Stakeholder partnerships",
                    "Social impact programs",
                  ],
                },
                {
                  icon: TreePine,
                  title: "Governance",
                  description:
                    "Maintaining high standards of corporate governance and ethical business conduct",
                  items: [
                    "Transparent reporting",
                    "Ethical guidelines",
                    "Risk management",
                  ],
                },
              ].map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-lg border-2 border-teal-100 
                    hover:border-orange-200 transition-all duration-300 group"
                >
                  <div
                    className="p-4 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 
                      text-white shadow-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    <area.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-teal-900 mb-4">{area.title}</h3>
                  <p className="text-teal-700 mb-6">{area.description}</p>
                  <ul className="space-y-3">
                    {area.items.map((item, i) => (
                      <li key={i} className="flex items-center text-teal-700">
                        <ArrowRight className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

