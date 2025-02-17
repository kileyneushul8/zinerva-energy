"use client"

import Globe from 'react-globe.gl'
import { useEffect, useRef, useState } from 'react'
import { Card } from './ui/card'

type Location = {
  name: string
  lat: number
  lng: number
  type: "Trading Hub" | "Storage Facility" | "Distribution Center"
  details: string
}

const locations: Location[] = [
  {
    name: "Houston",
    lat: 29.7604,
    lng: -95.3698,
    type: "Trading Hub",
    details: "Primary Gulf Coast operations center with integrated crude oil and natural gas trading facilities."
  },
  {
    name: "Rotterdam",
    lat: 51.9225,
    lng: 4.4792,
    type: "Storage Facility",
    details: "Europe's largest port facility for Zinerva's operations."
  },
  // Add more locations as needed
]

interface GlobePointEventParams {
  point: object
  event: MouseEvent
  coords: { lat: number; lng: number; altitude: number }
}

export function GlobeVisualization() {
  const globeRef = useRef<any>()
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null)

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls()
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.5
      controls.enableZoom = true
      controls.enablePan = true
      controls.minDistance = 200
      controls.maxDistance = 400
    }
  }, [])

  const markerData = locations.map(location => ({
    ...location,
    size: hoveredLocation?.name === location.name ? 1.5 : 1.2,
    color: getMarkerColor(location.type, hoveredLocation?.name === location.name),
  }))

  function getMarkerColor(type: Location['type'], isHovered: boolean): string {
    const baseColors = {
      "Trading Hub": "#14b8a6",
      "Storage Facility": "#f97316",
      "Distribution Center": "#0ea5e9"
    }
    return isHovered ? '#fbbf24' : baseColors[type]
  }

  const handlePointClick = (point: object) => {
    setSelectedLocation(point as Location)
  }

  const handlePointHover = (point: object | null, prevPoint: object | null) => {
    setHoveredLocation(point as Location | null)
    if (globeRef.current) {
      document.body.style.cursor = point ? 'pointer' : 'default'
    }
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <div className="flex items-center gap-2 text-sm text-teal-200">
          <div className="w-3 h-3 rounded-full bg-[#14b8a6]"></div>
          <span>Trading Hub</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-teal-200">
          <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
          <span>Storage Facility</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-teal-200">
          <div className="w-3 h-3 rounded-full bg-[#0ea5e9]"></div>
          <span>Distribution Center</span>
        </div>
      </div>

      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        width={800}
        height={600}
        atmosphereColor="#14b8a6"
        atmosphereAltitude={0.15}
        pointsData={markerData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius="size"
        pointAltitude={0.01}
        onPointClick={handlePointClick}
        onPointHover={handlePointHover}
        pointResolution={64}
        pointsMerge={false}
        pointLabel={(obj: object) => {
          const point = obj as Location
          return `
            <div class="bg-white/90 backdrop-blur-sm p-1 rounded shadow-sm border border-teal-200">
              <div class="text-xs font-semibold text-teal-900">${point.name}</div>
              <div class="text-xs text-teal-700">${point.type}</div>
            </div>
          `
        }}
      />

      {selectedLocation && (
        <Card className="absolute bottom-4 left-4 p-4 bg-white/10 backdrop-blur-md border-teal-200 max-w-sm">
          <h3 className="text-lg font-semibold text-teal-200">{selectedLocation.name}</h3>
          <p className="text-sm text-teal-300 mb-2">{selectedLocation.type}</p>
          <p className="text-sm text-teal-100">{selectedLocation.details}</p>
        </Card>
      )}
    </div>
  )
} 