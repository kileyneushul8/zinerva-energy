"use client"

import Globe from 'react-globe.gl'
import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Globe2, Truck, Activity, Clock, Pause, Play } from "lucide-react"

type LocationDetails = {
  overview: string
  facilities: string[]
  specializations: string[]
  capacity: string
  employees: string
}

type Location = {
  id: number
  name: string
  lat: number
  lng: number
  type: "Trading Hub" | "Storage Facility" | "Distribution Center"
  details: LocationDetails | string
}

type MarkerData = Location & {
  size: number
  color: string
}

// Define our hub locations
const locations: Location[] = [
  {
    id: 1,
    name: "Los Angeles",
    lat: 34.0522,
    lng: -118.2437,
    type: "Trading Hub",
    details: {
      overview: "Our West Coast headquarters managing Pacific Rim trade flows.",
      facilities: [
        "State-of-the-art LNG terminals with 500,000 m³ capacity",
        "Renewable energy trading floor with 24/7 operations",
        "Advanced carbon credit verification center"
      ],
      specializations: [
        "Clean energy solutions and technology",
        "Carbon credit trading and verification",
        "Pacific Rim market operations"
      ],
      capacity: "Annual trading volume: $15B+",
      employees: "250+ energy professionals"
    }
  },
  {
    id: 2,
    name: "Houston",
    lat: 29.7604,
    lng: -95.3698,
    type: "Trading Hub",
    details: {
      overview: "Primary Gulf Coast operations center with integrated crude oil and natural gas trading facilities.",
      facilities: [
        "Petrochemical trading complex",
        "Strategic storage facilities (2M m³ capacity)",
        "Advanced risk management center"
      ],
      specializations: [
        "Crude oil and natural gas trading",
        "Petrochemical products",
        "Gulf Coast distribution"
      ],
      capacity: "Annual trading volume: $20B+",
      employees: "300+ energy professionals"
    }
  },
  {
    id: 3,
    name: "Rotterdam",
    lat: 51.9225,
    lng: 4.4792,
    type: "Storage Facility",
    details: {
      overview: "Europe's largest integrated port facility and strategic Northern European hub for Zinerva's operations.",
      facilities: [
        "2.5 million m³ storage capacity for crude oil",
        "Advanced biofuel blending and storage complex",
        "Green hydrogen pilot facility",
        "Smart logistics control center",
        "Multi-modal transport hub"
      ],
      specializations: [
        "North Sea oil distribution",
        "Renewable energy trading",
        "Strategic storage management",
        "Biofuel storage and distribution",
        "Northern European logistics"
      ],
      capacity: "Storage capacity: 4.2M m³",
      employees: "250+ logistics specialists"
    }
  },
  {
    id: 4,
    name: "New York",
    lat: 40.7128,
    lng: -74.0060,
    type: "Trading Hub",
    details: {
      overview: "Financial trading headquarters overseeing global risk management and derivatives trading.",
      facilities: [
        "Advanced analytics center",
        "24/7 commodity trading floor",
        "Risk management control room"
      ],
      specializations: [
        "Financial derivatives trading",
        "Global risk management",
        "Market intelligence"
      ],
      capacity: "Annual trading volume: $25B+",
      employees: "200+ financial specialists"
    }
  },
  {
    id: 5,
    name: "Madrid",
    lat: 40.4168,
    lng: -3.7038,
    type: "Distribution Center",
    details: {
      overview: "Southern European operations hub specializing in solar energy trading.",
      facilities: [
        "Solar energy monitoring center",
        "Carbon offset verification facility",
        "Mediterranean operations control"
      ],
      specializations: [
        "Solar energy trading",
        "Carbon offset programs",
        "Mediterranean market operations"
      ],
      capacity: "Distribution volume: 5GW renewable energy",
      employees: "120+ renewable energy experts"
    }
  },
  {
    id: 6,
    name: "Barcelona",
    lat: 41.3851,
    lng: 2.1734,
    type: "Storage Facility",
    details: {
      overview: "Mediterranean storage and distribution complex with integrated LNG facilities.",
      facilities: [
        "LNG regasification terminal",
        "Strategic storage tanks",
        "Distribution control center"
      ],
      specializations: [
        "LNG processing",
        "Mediterranean distribution",
        "North African market access"
      ],
      capacity: "Storage capacity: 1.8M m³",
      employees: "180+ terminal operators"
    }
  },
  {
    id: 7,
    name: "Hong Kong",
    lat: 22.3193,
    lng: 114.1694,
    type: "Trading Hub",
    details: "Asian-Pacific financial center managing regional energy trades and risk management. Specializes in LNG trading and renewable energy project financing for emerging markets.",
  },
  {
    id: 8,
    name: "Shanghai",
    lat: 31.2304,
    lng: 121.4737,
    type: "Distribution Center",
    details: "Strategic mainland China operations center with integrated trading and distribution capabilities. Focuses on industrial energy supply chains and emerging clean energy technologies.",
  },
  {
    id: 9,
    name: "London",
    lat: 51.5074,
    lng: -0.5278,
    type: "Trading Hub",
    details: {
      overview: "European headquarters coordinating global trading strategies and risk management.",
      facilities: [
        "Carbon trading desk and analytics center",
        "Renewable energy investment division",
        "ESG compliance monitoring center"
      ],
      specializations: [
        "Carbon credit trading and verification",
        "Renewable energy project financing",
        "ESG compliance and reporting",
        "European market operations"
      ],
      capacity: "Annual trading volume: $25B+",
      employees: "350+ energy professionals"
    }
  },
  {
    id: 10,
    name: "Miami",
    lat: 25.7617,
    lng: -80.1918,
    type: "Distribution Center",
    details: "Southeast regional hub managing Caribbean and Latin American operations. Specializes in biofuel distribution and renewable energy project development for emerging markets.",
  },
  {
    id: 11,
    name: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    type: "Trading Hub",
    details: "Southeast Asian trading headquarters with integrated maritime operations. Features advanced LNG trading facilities and renewable energy financing hub for ASEAN markets.",
  },
  {
    id: 12,
    name: "Dubai",
    lat: 25.2048,
    lng: 55.2708,
    type: "Distribution Center",
    details: "Middle East operations center coordinating regional energy distribution. Specializes in oil products trading and emerging renewable energy projects across the MENA region.",
  },
  {
    id: 14,
    name: "Tokyo",
    lat: 35.6762,
    lng: 139.6503,
    type: "Distribution Center",
    details: {
      overview: "Asia-Pacific distribution hub specializing in LNG and emerging energy technologies.",
      facilities: [
        "Advanced LNG distribution center",
        "Energy technology showcase",
        "Regional logistics command center"
      ],
      specializations: [
        "LNG distribution",
        "Clean energy technology",
        "Japanese market operations"
      ],
      capacity: "Distribution volume: 8GW energy equivalent",
      employees: "160+ distribution specialists"
    }
  }
]

export function GlobalOperationsMap() {
  const globeRef = useRef<any>()
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null)
  const [isRotating, setIsRotating] = useState(true)

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls()
      controls.autoRotate = isRotating
      controls.autoRotateSpeed = 0.5
      controls.enableZoom = true
      controls.enablePan = true
      controls.minDistance = 200
      controls.maxDistance = 300
      controls.enableDamping = true
      controls.dampingFactor = 0.1

      controls.distance = 250

      controls.rotateSpeed = 0.7
      controls.zoomSpeed = 0.8
    }
  }, [isRotating])

  const markerData: MarkerData[] = locations.map(location => ({
    ...location,
    size: hoveredLocation?.id === location.id ? 2 :
      selectedLocation?.id === location.id ? 1.8 :
        1.4,
    color: getMarkerColor(location.type, hoveredLocation?.id === location.id),
  }))

  function getMarkerColor(type: Location['type'], isHovered: boolean): string {
    const baseColors = {
      "Trading Hub": "#14b8a6",
      "Storage Facility": "#f97316",
      "Distribution Center": "#0ea5e9"
    }
    return isHovered ? '#fbbf24' : baseColors[type]
  }

  // Add animation variants for hover effects
  const cardVariants = {
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(255,255,255,0.95)",
      boxShadow: "0 10px 30px -10px rgba(20, 184, 166, 0.25)",
    }
  }

  const legendVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(255,255,255,0.95)",
      x: -5
    }
  }

  // Enhanced location selection with smoother transitions
  const handleLocationSelect = (point: object) => {
    const location = point as Location
    setSelectedLocation(location)

    if (globeRef.current) {
      const controls = globeRef.current.controls()
      setIsRotating(false)

      // Direct transition to the new location without the intermediate zoom out
      globeRef.current.pointOfView({
        lat: location.lat,
        lng: location.lng,
        altitude: 1.8
      }, 1500) // Smooth, direct transition
    }
  }

  // Update the globe click handler to be less jarring
  const handleGlobeClick = () => {
    if (selectedLocation) {
      setSelectedLocation(null)
      if (globeRef.current) {
        // Instead of resetting to Africa, just zoom out slightly from current position
        const controls = globeRef.current.controls()
        globeRef.current.pointOfView({
          lat: controls.getPolarAngle(),
          lng: controls.getAzimuthalAngle(),
          altitude: 2.5
        }, 1000)
        setTimeout(() => setIsRotating(true), 1000)
      }
    }
  }

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Title and Description */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-teal-900 mb-6">
            Optimize Your Energy Distribution
          </h2>
          <p className="text-lg text-teal-700 max-w-3xl mx-auto">
            Leverage our global network and expertise to streamline your energy distribution
            processes and reach new markets.
          </p>
        </div>

        {/* Updated Globe Section with integrated details */}
        <div className="mb-16">
          <motion.div
            className="relative bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-teal-200 p-6 transition-all duration-300 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ borderColor: "rgb(20 184 166 / 0.4)" }}
          >
            {/* Add rotation control */}
            <motion.button
              className="absolute top-8 left-8 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-teal-200 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRotating(!isRotating)}
            >
              <motion.div
                animate={{ rotate: isRotating ? 360 : 0 }}
                transition={{ duration: 2, repeat: isRotating ? Infinity : 0, ease: "linear" }}
              >
                {isRotating ? (
                  <Pause className="w-5 h-5 text-teal-600" />
                ) : (
                  <Play className="w-5 h-5 text-teal-600" />
                )}
              </motion.div>
            </motion.button>

            {/* Enhanced Legend overlay */}
            <motion.div
              className="absolute top-8 right-8 z-10 flex flex-col gap-3 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-teal-200 shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {[
                { color: "#14b8a6", label: "Trading Hub" },
                { color: "#f97316", label: "Storage Facility" },
                { color: "#0ea5e9", label: "Distribution Center" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2 p-1 rounded-md transition-colors"
                  variants={legendVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: item.color }}
                    whileHover={{ scale: 1.2 }}
                  />
                  <span className="text-sm text-teal-900">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Location Details Overlay */}
            <AnimatePresence mode="wait">
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="absolute left-8 top-1/2 transform -translate-y-1/2 w-[40rem] z-10"
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                >
                  <motion.div
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-teal-200 shadow-lg"
                    variants={cardVariants}
                    whileHover="hover"
                    layoutId="locationCard"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-teal-800 mb-1">{selectedLocation.name}</h3>
                      <div className="inline-block px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 text-sm">
                        {selectedLocation.type}
                      </div>
                    </div>

                    {typeof selectedLocation.details === 'string' ? (
                      <p className="text-teal-700 text-sm leading-relaxed">{selectedLocation.details}</p>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-teal-700 text-sm leading-relaxed">{selectedLocation.details.overview}</p>

                        <div>
                          <h4 className="text-sm font-semibold text-teal-800 mb-1">Key Operations</h4>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                            {selectedLocation.details.specializations.map((spec, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-teal-700">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                                {spec}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-teal-100">
                          <div>
                            <div className="text-xs text-teal-600">Scale</div>
                            <div className="text-sm text-teal-800 font-medium">{selectedLocation.details.capacity}</div>
                          </div>
                          <div>
                            <div className="text-xs text-teal-600">Team</div>
                            <div className="text-sm text-teal-800 font-medium">{selectedLocation.details.employees}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Globe */}
            <div className="aspect-square max-w-4xl mx-auto">
              <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundColor="rgba(0,0,0,0)"
                width={800}
                height={800}
                atmosphereColor="#14b8a6"
                atmosphereAltitude={0.35}
                pointsData={markerData}
                pointLat="lat"
                pointLng="lng"
                pointColor="color"
                pointRadius="size"
                pointAltitude={d => {
                  const loc = d as Location
                  return hoveredLocation?.id === loc.id ? 0.3 :
                    selectedLocation?.id === loc.id ? 0.25 :
                      0.02
                }}
                onGlobeClick={handleGlobeClick}
                onPointClick={handleLocationSelect}
                onPointHover={(point: object | null, prevPoint: object | null) => {
                  setHoveredLocation(point as Location | null)
                  if (globeRef.current) {
                    document.body.style.cursor = point ? 'pointer' : 'default'
                  }
                }}
                pointResolution={128}
                pointsMerge={false}
                pointLabel={(obj: object) => {
                  const point = obj as Location
                  return `
                    <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-teal-200 transform transition-all duration-300 hover:scale-105">
                      <div class="font-semibold text-teal-900">${point.name}</div>
                      <div class="text-sm text-teal-700">${point.type}</div>
                      <div class="text-xs text-teal-600 mt-1 max-w-[200px] opacity-0 transition-opacity duration-300 hover:opacity-100">
                        ${typeof point.details === 'string'
                      ? point.details
                      : point.details.overview}
                      </div>
                    </div>
                  `
                }}
              />
            </div>

            {/* Add helper text */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-teal-600 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-teal-200">
              Double-click globe to reset view • Click locations to explore
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-teal-200"
            variants={cardVariants}
            whileHover="hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="text-teal-600 mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-teal-800 mb-2">Global Coverage</h3>
            <p className="text-teal-600">
              Strategically located distribution centers ensuring efficient delivery to markets worldwide.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-teal-200"
            variants={cardVariants}
            whileHover="hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="text-teal-600 mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-teal-800 mb-2">Multimodal Transport</h3>
            <p className="text-teal-600">
              Utilizing a combination of sea, land, and air transport to optimize delivery routes and times.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-teal-200"
            variants={cardVariants}
            whileHover="hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="text-teal-600 mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-teal-800 mb-2">Real-time Tracking</h3>
            <p className="text-teal-600">
              Advanced tracking systems providing real-time updates on shipment status and location.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-teal-200"
            variants={cardVariants}
            whileHover="hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="text-teal-600 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-teal-800 mb-2">Just-in-Time Delivery</h3>
            <p className="text-teal-600">
              Optimized inventory management and distribution schedules to meet client needs efficiently.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

