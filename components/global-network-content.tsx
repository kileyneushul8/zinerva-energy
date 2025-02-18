"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Globe from "react-globe.gl"
import { motion, useScroll, useTransform } from "framer-motion"
import { Globe2, Truck, Activity, Clock, ArrowRight, Network, BarChart3, Building2, Play, Pause, Shield, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import { GlobeVisualization } from "@/components/globe-visualization"
import { GlobalOperationsMap } from "@/components/global-operations-map"
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

// First, update the Location interface to handle readonly arrays
interface Location {
  id: string
  name: string
  lat: number
  lng: number
  type: "Trading Hub" | "Storage Facility" | "Distribution Center"
  details: {
    overview: string
    specializations: readonly string[] // Changed to accept readonly arrays
    capacity: string
    employees: string
  }
}

// Remove the 'as const' from the locations array definition
const locations: Location[] = [
  {
    id: "th1",
    name: "London Trading Hub",
    lat: 51.5074,
    lng: -0.1278,
    type: "Trading Hub",
    details: {
      overview: "Primary European trading operations center with 24/7 market monitoring and execution capabilities",
      specializations: ["Oil", "Natural Gas", "Renewable Energy", "Carbon Credits"],
      capacity: "24/7 Operations",
      employees: "150+ Traders"
    }
  },
  {
    id: "th2",
    name: "Singapore Trading Hub",
    lat: 1.3521,
    lng: 103.8198,
    type: "Trading Hub",
    details: {
      overview: "Strategic Asian-Pacific trading headquarters managing regional energy flows and market operations",
      specializations: ["LNG", "Crude Oil", "Carbon Credits", "Power Trading"],
      capacity: "24/7 Operations",
      employees: "120+ Traders"
    }
  },
  {
    id: "th3",
    name: "Dubai Trading Hub",
    lat: 25.2048,
    lng: 55.2708,
    type: "Trading Hub",
    details: {
      overview: "Middle East energy trading center specializing in oil and gas markets with emerging renewables focus",
      specializations: ["Crude Oil", "Natural Gas", "Solar Energy"],
      capacity: "24/7 Operations",
      employees: "90+ Traders"
    }
  },
  {
    id: "sf1",
    name: "Rotterdam Storage",
    lat: 51.9225,
    lng: 4.4792,
    type: "Storage Facility",
    details: {
      overview: "Major European storage and distribution center with advanced logistics capabilities",
      specializations: ["Oil Storage", "LNG Terminal", "Biofuel Storage"],
      capacity: "5M Barrels",
      employees: "80+ Staff"
    }
  },
  {
    id: "sf2",
    name: "Fujairah Storage",
    lat: 25.1216,
    lng: 56.3366,
    type: "Storage Facility",
    details: {
      overview: "Strategic Middle Eastern storage hub with direct port access and state-of-the-art facilities",
      specializations: ["Crude Storage", "Refined Products", "Bunkering"],
      capacity: "3.5M Barrels",
      employees: "65+ Staff"
    }
  },
  {
    id: "dc1",
    name: "Houston Distribution",
    lat: 29.7604,
    lng: -95.3698,
    type: "Distribution Center",
    details: {
      overview: "Americas distribution and logistics hub with integrated pipeline networks and port facilities",
      specializations: ["Pipeline Distribution", "Maritime Logistics", "Terminal Operations"],
      capacity: "2M Barrels/day",
      employees: "200+ Staff"
    }
  },
  {
    id: "dc2",
    name: "Shanghai Distribution",
    lat: 31.2304,
    lng: 121.4737,
    type: "Distribution Center",
    details: {
      overview: "East Asian distribution center managing regional energy flows and last-mile delivery",
      specializations: ["Port Operations", "Regional Distribution", "Storage Management"],
      capacity: "1.5M Barrels/day",
      employees: "150+ Staff"
    }
  },
  {
    id: "sf3",
    name: "Cushing Storage",
    lat: 35.9849,
    lng: -96.7537,
    type: "Storage Facility",
    details: {
      overview: "Key North American crude oil storage and pipeline hub with strategic market position",
      specializations: ["Crude Storage", "Pipeline Hub", "Market Delivery Point"],
      capacity: "4.5M Barrels",
      employees: "95+ Staff"
    }
  },
  {
    id: "th4",
    name: "Tokyo Trading Hub",
    lat: 35.6762,
    lng: 139.6503,
    type: "Trading Hub",
    details: {
      overview: "Asia-Pacific energy derivatives and LNG trading center with advanced market analytics",
      specializations: ["LNG Trading", "Power Markets", "Energy Derivatives"],
      capacity: "24/7 Operations",
      employees: "85+ Traders"
    }
  },
  {
    id: "dc3",
    name: "Mumbai Distribution",
    lat: 19.0760,
    lng: 72.8777,
    type: "Distribution Center",
    details: {
      overview: "South Asian logistics hub managing regional energy distribution and storage operations",
      specializations: ["Regional Distribution", "Storage Operations", "Import/Export"],
      capacity: "1.2M Barrels/day",
      employees: "175+ Staff"
    }
  },
  {
    id: "th5",
    name: "New York Trading Hub",
    lat: 40.7128,
    lng: -74.0060,
    type: "Trading Hub",
    details: {
      overview: "North American financial trading center specializing in energy derivatives and commodities markets",
      specializations: ["Energy Derivatives", "Carbon Markets", "Power Trading", "Financial Products"],
      capacity: "24/7 Operations",
      employees: "175+ Traders"
    }
  },
  {
    id: "th6",
    name: "Barcelona Trading Hub",
    lat: 41.3851,
    lng: 2.1734,
    type: "Trading Hub",
    details: {
      overview: "Mediterranean energy trading center focusing on renewable energy and LNG markets",
      specializations: ["Renewable Energy", "LNG Trading", "Mediterranean Markets"],
      capacity: "24/7 Operations",
      employees: "65+ Traders"
    }
  },
  {
    id: "dc4",
    name: "Madrid Distribution",
    lat: 40.4168,
    lng: -3.7038,
    type: "Distribution Center",
    details: {
      overview: "Iberian Peninsula distribution hub managing cross-border energy flows and storage",
      specializations: ["Regional Distribution", "Cross-Border Operations", "Renewable Integration"],
      capacity: "800K Barrels/day",
      employees: "120+ Staff"
    }
  },
  {
    id: "sf4",
    name: "Los Angeles Storage",
    lat: 34.0522,
    lng: -118.2437,
    type: "Storage Facility",
    details: {
      overview: "West Coast strategic storage facility supporting Pacific trade routes and local distribution",
      specializations: ["Marine Terminal", "Clean Fuels Storage", "Strategic Reserves"],
      capacity: "3.2M Barrels",
      employees: "110+ Staff"
    }
  }
]

interface MarkerData extends Location {
  size: number
  color: string
}

interface Arc {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  color: string
}

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default function GlobalNetworkContent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const globeRef = useRef<any>()
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null)
  const [isRotating, setIsRotating] = useState(true)
  const lastMouseX = useRef<number>(0)
  const lastMouseY = useRef<number>(0)
  const rotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const { width } = useWindowSize();
  const [showFullSpecs, setShowFullSpecs] = useState(false);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = isRotating;
      controls.autoRotateSpeed = width < 768 ? 0.7 : 0.5;
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.minDistance = width < 768 ? 150 : 200;
      controls.maxDistance = width < 768 ? 400 : 500;
      controls.rotateSpeed = width < 768 ? 0.7 : 0.5;

      // Adjust initial position for mobile
      if (width < 768) {
        globeRef.current.pointOfView({
          lat: 20,
          lng: 0,
          altitude: 2.5
        }, 0);
      }
    }
  }, [isRotating, width]);

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

  const handleLocationSelect = useCallback(
    debounce((point: object) => {
      const location = point as Location
      setSelectedLocation(location)

      if (globeRef.current) {
        setIsRotating(false)
        globeRef.current.pointOfView(
          {
            lat: location.lat,
            lng: location.lng,
            altitude: 1.8
          },
          800,
          () => {
            globeRef.current.controls().enableZoom = true
          }
        )
      }
    }, 100),
    [setSelectedLocation, setIsRotating]
  )

  const handleGlobeReset = () => {
    if (globeRef.current) {
      setIsRotating(true)
      setSelectedLocation(null)
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 1000)
    }
  }

  const generateArcs = (): Arc[] => {
    const arcs: Arc[] = []
    locations.forEach(loc1 => {
      if (loc1.type === "Trading Hub") {
        // Find the nearest Storage Facility and Distribution Center
        const nearestStorage = findNearest(loc1, "Storage Facility")
        const nearestDistribution = findNearest(loc1, "Distribution Center")

        if (nearestStorage) {
          arcs.push({
            startLat: loc1.lat,
            startLng: loc1.lng,
            endLat: nearestStorage.lat,
            endLng: nearestStorage.lng,
            color: 'rgba(20, 184, 166, 0.15)'
          })
        }

        if (nearestDistribution) {
          arcs.push({
            startLat: loc1.lat,
            startLng: loc1.lng,
            endLat: nearestDistribution.lat,
            endLng: nearestDistribution.lng,
            color: 'rgba(20, 184, 166, 0.15)'
          })
        }
      }
    })
    return arcs
  }

  // Add this helper function to find nearest facility of a given type
  const findNearest = (source: Location, targetType: Location['type']): Location | null => {
    let nearest: Location | null = null
    let minDistance = Infinity

    locations.forEach(target => {
      if (target.type === targetType) {
        const distance = calculateDistance(
          source.lat,
          source.lng,
          target.lat,
          target.lng
        )
        if (distance < minDistance) {
          minDistance = distance
          nearest = target
        }
      }
    })

    return nearest
  }

  // Add this helper function to calculate distance between coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Throttle the rotation update
  const handleRotation = throttle((event: MouseEvent) => {
    if (!isRotating) return

    const deltaX = event.clientX - lastMouseX.current
    const deltaY = event.clientY - lastMouseY.current

    // Limit rotation speed
    const maxDelta = 5
    const boundedDeltaX = Math.min(Math.max(deltaX, -maxDelta), maxDelta)
    const boundedDeltaY = Math.min(Math.max(deltaY, -maxDelta), maxDelta)

    rotation.current = {
      x: rotation.current.x + boundedDeltaY * 0.5,
      y: rotation.current.y + boundedDeltaX * 0.5
    }

    lastMouseX.current = event.clientX
    lastMouseY.current = event.clientY
  }, 16) // ~60fps

  // Use requestAnimationFrame for smooth rotation
  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      if (isRotating) {
        rotation.current = {
          x: rotation.current.x,
          y: rotation.current.y + 0.1 // Slower default rotation
        }
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isRotating])

  // Mouse event handlers with performance optimizations
  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    setIsRotating(false)
    lastMouseX.current = event.clientX
    lastMouseY.current = event.clientY
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsRotating(true)
  }, [])

  const handleMouseOut = useCallback(() => {
    setIsRotating(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (globeRef.current) {
        const width = window.innerWidth < 768 ? window.innerWidth * 0.9 : 800
        const height = window.innerWidth < 768 ? window.innerWidth * 0.9 : 800
        globeRef.current.camera().aspect = width / height
        globeRef.current.camera().updateProjectionMatrix()
        globeRef.current.renderer().setSize(width, height)

        // Adjust controls for mobile
        const controls = globeRef.current.controls()
        controls.minDistance = window.innerWidth < 768 ? 150 : 200
        controls.maxDistance = window.innerWidth < 768 ? 250 : 300
        controls.rotateSpeed = window.innerWidth < 768 ? 0.7 : 0.5
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial setup

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isMounted) {
    return null // or a loading state
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header with clearer styling */}
      <div className="relative bg-gradient-to-br from-teal-900 to-teal-800 py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          {/* Removed opaque overlay, keeping only subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-transparent z-10" />
        </motion.div>

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
                  Global Infrastructure
                </span>
              </motion.div>
              <h1 className="text-7xl font-bold text-white leading-tight">
                Our Global{" "}
                <span className="text-orange-400 relative">
                  Network
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-orange-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h1>
              <p className="text-xl text-teal-50 leading-relaxed max-w-2xl">
                Connecting global energy markets through our advanced distribution infrastructure,
                ensuring reliable and efficient energy delivery worldwide.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Clearer background elements */}
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

      {/* Interactive Globe Section - Removed opaque background */}
      <div className="relative -mt-20 z-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div
              className="relative bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-teal-200 p-6 
                transition-all duration-300 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ borderColor: "rgb(20 184 166 / 0.4)" }}
            >
              {/* Globe Container */}
              <div className="relative w-full aspect-square max-w-[90vw] mx-auto md:max-w-4xl">
                <Globe
                  ref={globeRef}
                  globeImageUrl="/earth-blue-marble.jpg"
                  backgroundColor="rgba(0,0,0,0)"
                  width={width < 768 ? width * 0.9 : 800}
                  height={width < 768 ? width * 0.9 : 800}
                  atmosphereColor="#14b8a6"
                  atmosphereAltitude={0.25}
                  pointsData={markerData}
                  pointLat="lat"
                  pointLng="lng"
                  pointColor="color"
                  pointRadius={d => {
                    const size = width < 768 ?
                      (hoveredLocation?.id === (d as Location).id ? 4 : 3) :
                      (hoveredLocation?.id === (d as Location).id ? 2 : 1.4);
                    return size;
                  }}
                  pointAltitude={0.01}
                  pointResolution={width < 768 ? 32 : 64}
                  pointsMerge={false}
                  enablePointerInteraction={true}
                  onPointClick={handleLocationSelect}
                  onPointHover={(point: object | null) => {
                    setHoveredLocation(point as Location | null);
                    if (globeRef.current) {
                      document.body.style.cursor = point ? 'pointer' : 'default';
                    }
                  }}
                  pointLabel={(obj: object) => {
                    const point = obj as Location
                    return `
                      <div class="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-teal-200">
                        <div class="font-semibold text-teal-900">${point.name}</div>
                        <div class="text-sm text-teal-700">${point.type}</div>
                      </div>
                    `
                  }}
                  onGlobeClick={handleGlobeReset}
                  onGlobeRightClick={handleGlobeReset}
                  arcsData={generateArcs()}
                  arcColor="color"
                  arcStroke={0.3}
                  arcDashLength={0.4}
                  arcDashGap={2}
                  arcDashAnimateTime={3000}
                  arcAltitude={0.1}
                  onGlobeReady={() => {
                    if (globeRef.current) {
                      const controls = globeRef.current.controls();
                      controls.enableZoom = true;
                      controls.enablePan = true;
                      controls.enableRotate = true;
                      controls.minDistance = width < 768 ? 150 : 200;
                      controls.maxDistance = width < 768 ? 400 : 500;
                      controls.rotateSpeed = width < 768 ? 0.7 : 0.5;
                      controls.autoRotateSpeed = width < 768 ? 0.7 : 0.5;
                    }
                  }}
                />
                <GlobeLegend />
              </div>

              {/* Rotation Control */}
              <motion.button
                className="absolute top-8 left-8 z-10 bg-white/90 backdrop-blur-sm p-2 
                  rounded-lg border border-teal-200 shadow-sm"
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

              {/* Location Details Panel */}
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-sm p-4 
                    rounded-t-xl border-t border-teal-200 shadow-lg z-50
                    md:absolute md:bottom-auto md:top-8 md:right-8 md:left-auto md:w-96 md:rounded-xl 
                    md:border md:p-6"
                >
                  {/* Close button */}
                  <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-teal-50 text-teal-600 
                      hover:bg-teal-100 md:hidden"
                    onClick={() => setSelectedLocation(null)}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Preview content */}
                  <div className="max-h-[30vh] overflow-y-auto md:max-h-none md:overflow-visible">
                    <h3 className="text-xl font-bold text-teal-900 mb-2">{selectedLocation.name}</h3>
                    <p className="text-teal-700 mb-4">{selectedLocation.details.overview}</p>

                    {/* Key metrics in preview */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-teal-600">Capacity</div>
                        <div className="text-sm text-teal-800 font-medium">
                          {selectedLocation.details.capacity}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-teal-600">Team</div>
                        <div className="text-sm text-teal-800 font-medium">
                          {selectedLocation.details.employees}
                        </div>
                      </div>
                    </div>

                    {/* View Full Specifications button */}
                    <button
                      onClick={() => setShowFullSpecs(true)}
                      className="w-full mt-2 p-3 flex items-center justify-center gap-2 
                        bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700
                        text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      View Full Specifications
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatedSection>
        </div>
      </div>

      {/* Full Specifications Modal */}
      {selectedLocation && showFullSpecs && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowFullSpecs(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-teal-900">{selectedLocation.name}</h2>
                <button
                  onClick={() => setShowFullSpecs(false)}
                  className="p-2 rounded-full hover:bg-teal-50 text-teal-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-teal-800 mb-2">Overview</h3>
                  <p className="text-teal-700">{selectedLocation.details.overview}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-teal-800 mb-2">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation.details.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-sm rounded-full bg-teal-50 text-teal-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-teal-800 mb-2">Capacity</h3>
                    <p className="text-teal-700">{selectedLocation.details.capacity}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-800 mb-2">Team</h3>
                    <p className="text-teal-700">{selectedLocation.details.employees}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Enhanced Network Features */}
      <div className="container mx-auto px-4 py-32">
        <AnimatedSection>
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-teal-900">
              Global Reach, Local Impact
            </h2>
            <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mt-6" />
            <p className="mt-6 text-xl text-teal-700 max-w-3xl mx-auto">
              Leveraging our worldwide network to deliver efficient and sustainable energy solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe2,
                title: "Global Coverage",
                description: "Strategic presence in key energy markets worldwide",
                color: "from-teal-500 to-teal-600"
              },
              {
                icon: Network,
                title: "Smart Infrastructure",
                description: "Advanced digital network for optimal distribution",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Continuous monitoring and performance optimization",
                color: "from-teal-500 to-teal-600"
              },
              {
                icon: Building2,
                title: "Local Operations",
                description: "Dedicated regional teams ensuring seamless delivery",
                color: "from-orange-500 to-orange-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group bg-white border-2 border-teal-100 shadow-lg 
                  hover:shadow-xl transition-all duration-300 hover:border-orange-200
                  hover:-translate-y-1 overflow-hidden">
                  <CardContent className="p-6">
                    <motion.div
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.color}
                        text-white shadow-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-teal-900 mb-2">{feature.title}</h3>
                    <p className="text-teal-700">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

const GlobeLegend = () => (
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5">
    <div className="flex flex-wrap justify-center items-center gap-2 bg-white/95 backdrop-blur-sm 
      px-3 py-1.5 rounded-full border border-teal-200 shadow-sm text-xs">
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#14b8a6" }} />
        <span className="text-teal-900 whitespace-nowrap">Trading Hub</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#f97316" }} />
        <span className="text-teal-900 whitespace-nowrap">Storage Facility</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#0ea5e9" }} />
        <span className="text-teal-900 whitespace-nowrap">Distribution Center</span>
      </div>
    </div>
    <div className="text-xs text-teal-600 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-teal-200 shadow-sm">
      Double-click globe to reset view
    </div>
  </div>
) 