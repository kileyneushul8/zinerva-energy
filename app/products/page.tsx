"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Droplet,
  Zap,
  Wind,
  Leaf,
  BarChart3,
  Globe2,
  Beaker,
  FlaskConical,
  Sparkles,
  TestTubes,
  Truck,
} from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import Image from "next/image"

// Update the Product type to match our data structure
type Product = {
  name: string
  description: string
  icon: JSX.Element
  features?: string[]  // Keep features optional
  details: string
  specifications: {
    category: string
    value: string
  }[]
  tradingVolume: string
  marketRegions: string[]
  keyBenefits: string[]
  applications: string[]
  qualityStandards: string[]
  deliveryOptions: string[]
  sustainability: {
    carbonFootprint: string
    renewableContent?: string
    environmentalCertifications: string[]
  }
  marketInsights: {
    priceHistory: string
    demandTrend: string
    seasonalFactors: string[]
  }
  logistics: {
    storageRequirements: string
    transportationModes: string[]
    handlingPrecautions: string[]
  }
}

const products = {
  "Crude Oil": [
    {
      name: "Brent Crude",
      description: "Light sweet crude oil, global benchmark for oil prices",
      icon: <Droplet className="w-6 h-6" />,
      features: [
        "North Sea sourced",
        "Global price benchmark",
        "Light sweet characteristics",
        "International trading standard"
      ],
      details: "Brent Crude is sourced from the North Sea and is used to price two-thirds of the world's internationally traded crude oil supplies.",
      specifications: [
        { category: "API Gravity", value: "38.06°" },
        { category: "Sulfur Content", value: "0.37%" },
        { category: "Acidity", value: "0.12 mg KOH/g" },
        { category: "Pour Point", value: "-3°C" }
      ],
      tradingVolume: "Over 100M barrels/day",
      marketRegions: ["Europe", "Asia Pacific", "Americas", "Middle East"],
      keyBenefits: [
        "High yield of gasoline and middle distillates",
        "Low sulfur content reduces processing costs",
        "Excellent market liquidity",
        "Reliable pricing benchmark"
      ],
      applications: [
        "Gasoline production",
        "Diesel fuel",
        "Petrochemical feedstock",
        "Aviation fuel"
      ],
      qualityStandards: [
        "ISO 13738",
        "ASTM D4057",
        "EN 590"
      ],
      deliveryOptions: [
        "FOB North Sea terminals",
        "CIF Mediterranean",
        "Dated Brent contracts",
        "Forward month contracts"
      ],
      sustainability: {
        carbonFootprint: "High",
        renewableContent: "20%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline", "Tanker"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "West Texas Intermediate (WTI)",
      description: "High-quality, light crude oil, US benchmark",
      icon: <Droplet className="w-6 h-6" />,
      features: [
        "US benchmark crude",
        "Light sweet characteristics",
        "Ideal for gasoline",
        "Americas trading standard"
      ],
      details: "WTI is lighter and sweeter than Brent Crude, making it ideal for gasoline production. It's the main benchmark of crude oil in the Americas.",
      specifications: [
        { category: "API Gravity", value: "39.6°" },
        { category: "Sulfur Content", value: "0.24%" },
        { category: "Acidity", value: "0.10 mg KOH/g" },
        { category: "Pour Point", value: "-30°C" }
      ],
      tradingVolume: "Over 90M barrels/day",
      marketRegions: ["North America", "South America", "Asia Pacific", "Europe"],
      keyBenefits: [
        "Premium gasoline yields",
        "Minimal processing required",
        "High market liquidity",
        "Domestic US benchmark"
      ],
      applications: [
        "Premium gasoline",
        "Jet fuel production",
        "Petrochemical feed",
        "Ultra-low sulfur diesel"
      ],
      qualityStandards: [
        "ASTM D4814",
        "API Standards",
        "EPA Requirements"
      ],
      deliveryOptions: [
        "Cushing Oklahoma delivery",
        "Pipeline transport",
        "Gulf Coast delivery",
        "Futures contracts"
      ],
      sustainability: {
        carbonFootprint: "Moderate",
        renewableContent: "10%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline", "Tanker"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Dubai Crude",
      description: "Middle Eastern sour crude oil benchmark",
      icon: <Droplet className="w-6 h-6" />,
      features: [
        "Asian market benchmark",
        "Medium sour grade",
        "Physical delivery options",
        "Middle East standard"
      ],
      details: "Dubai Crude serves as the primary pricing benchmark for Persian Gulf oil exports to Asia, representing medium-sour crude grades.",
      specifications: [
        { category: "API Gravity", value: "31°" },
        { category: "Sulfur Content", value: "2.04%" },
        { category: "Density", value: "0.871 g/ml" },
        { category: "Pour Point", value: "+15°C" }
      ],
      tradingVolume: "Over 75M barrels/day",
      marketRegions: ["Asia", "Middle East", "East Africa", "Oceania"],
      keyBenefits: [
        "Asian market benchmark",
        "Reliable supply chain",
        "Strategic location",
        "Price transparency"
      ],
      applications: [
        "Heavy fuel production",
        "Industrial processes",
        "Power generation",
        "Marine fuels"
      ],
      qualityStandards: [
        "DME Standards",
        "ISO 8217",
        "JIS Standards"
      ],
      deliveryOptions: [
        "FOB Dubai",
        "CIF Asian ports",
        "Futures contracts",
        "Physical delivery"
      ],
      sustainability: {
        carbonFootprint: "Moderate",
        renewableContent: "10%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline", "Tanker"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    }
  ],
  "Natural Gas": [
    {
      name: "LNG Trading",
      description: "Liquefied Natural Gas trading solutions",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Global delivery network",
        "Storage solutions",
        "Temperature monitoring",
        "Transport optimization"
      ],
      details: "Comprehensive LNG trading and distribution services with global reach and advanced logistics capabilities.",
      specifications: [
        { category: "Methane Content", value: "87-99%" },
        { category: "Boiling Point", value: "-162°C" },
        { category: "Density", value: "0.45 kg/m³" },
        { category: "Energy Density", value: "22.2 MJ/L" }
      ],
      tradingVolume: "380M tonnes/year",
      marketRegions: ["Asia Pacific", "Europe", "Americas", "Middle East"],
      keyBenefits: [
        "Flexible delivery options",
        "Lower carbon emissions",
        "High energy density",
        "Global market access"
      ],
      applications: [
        "Power generation",
        "Industrial heating",
        "Marine transport",
        "Peak shaving"
      ],
      qualityStandards: [
        "ISO 16903",
        "GIIGNL Standards",
        "IGC Code"
      ],
      deliveryOptions: [
        "FOB terminals",
        "DES contracts",
        "Spot trading",
        "Long-term contracts"
      ],
      sustainability: {
        carbonFootprint: "Moderate",
        renewableContent: "20%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline", "Tanker"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Pipeline Gas",
      description: "Natural gas pipeline distribution services",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Network management",
        "Pressure control",
        "Volume optimization",
        "Quality monitoring"
      ],
      details: "Comprehensive pipeline network delivering natural gas with real-time monitoring and advanced pressure control systems.",
      specifications: [
        { category: "Methane Content", value: "95-98%" },
        { category: "Pressure Range", value: "30-80 bar" },
        { category: "Calorific Value", value: "39.0 MJ/m³" },
        { category: "Wobbe Index", value: "49.5-54.7 MJ/m³" }
      ],
      tradingVolume: "250B m³/year",
      marketRegions: ["North America", "Europe", "Asia", "South America"],
      keyBenefits: [
        "Real-time monitoring",
        "Flexible delivery",
        "High reliability",
        "24/7 availability"
      ],
      applications: [
        "Industrial use",
        "Power generation",
        "Residential supply",
        "Commercial heating"
      ],
      qualityStandards: [
        "ISO 13686",
        "ASTM D1945",
        "EN 16726"
      ],
      deliveryOptions: [
        "High-pressure pipeline",
        "Distribution network",
        "City gate stations",
        "Direct industrial lines"
      ],
      sustainability: {
        carbonFootprint: "Low",
        renewableContent: "10%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Gas Storage",
      description: "Strategic gas storage solutions",
      icon: <Globe2 className="w-6 h-6" />,
      features: [
        "Underground storage",
        "Pressure management",
        "Inventory control",
        "Emergency supply"
      ],
      details: "Underground and surface storage facilities ensuring supply security and market flexibility.",
      specifications: [
        { category: "Storage Type", value: "Underground/Surface" },
        { category: "Working Capacity", value: "1-5B m³" },
        { category: "Injection Rate", value: "15M m³/day" },
        { category: "Withdrawal Rate", value: "25M m³/day" }
      ],
      tradingVolume: "100B m³ capacity",
      marketRegions: ["Europe", "North America", "Asia", "Middle East"],
      keyBenefits: [
        "Supply security",
        "Market flexibility",
        "Seasonal balancing",
        "Emergency backup"
      ],
      applications: [
        "Peak shaving",
        "Seasonal storage",
        "Market balancing",
        "Strategic reserves"
      ],
      qualityStandards: [
        "API RP 1170",
        "ISO 14313",
        "ASME B31.8"
      ],
      deliveryOptions: [
        "Fast-cycle storage",
        "Seasonal storage",
        "Strategic reserves",
        "Market balancing"
      ],
      sustainability: {
        carbonFootprint: "Low",
        renewableContent: "0%",
        environmentalCertifications: []
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    }
  ],
  "Renewables": [
    {
      name: "Solar Power Trading",
      description: "Advanced solar energy trading and distribution platforms",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Grid integration",
        "Power forecasting",
        "Storage solutions",
        "Real-time monitoring"
      ],
      details: "Comprehensive solar power trading solutions with advanced forecasting and grid integration capabilities.",
      specifications: [
        { category: "Power Range", value: "1-500 MW" },
        { category: "Grid Connection", value: "HV/MV" },
        { category: "Availability", value: "98.5%" },
        { category: "Response Time", value: "<15 minutes" }
      ],
      tradingVolume: "150 TWh/year",
      marketRegions: ["Europe", "Americas", "Asia Pacific", "Middle East"],
      keyBenefits: [
        "Zero emissions",
        "Predictable output",
        "Low maintenance",
        "Scalable capacity"
      ],
      applications: [
        "Utility power",
        "Industrial supply",
        "Microgrids",
        "Green hydrogen"
      ],
      qualityStandards: [
        "IEC 61730",
        "IEEE 1547",
        "EN 50549"
      ],
      deliveryOptions: [
        "Grid injection",
        "Direct supply",
        "Virtual PPA",
        "Capacity contracts"
      ],
      sustainability: {
        carbonFootprint: "Low",
        renewableContent: "100%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in summer", "Lower in winter"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Wind Energy Solutions",
      description: "Comprehensive wind power trading and management",
      icon: <Wind className="w-6 h-6" />,
      features: [
        "Weather forecasting",
        "Grid balancing",
        "Capacity optimization",
        "Performance analytics"
      ],
      details: "Advanced wind energy trading platform with sophisticated forecasting and grid balancing capabilities.",
      specifications: [
        { category: "Power Range", value: "2-1000 MW" },
        { category: "Grid Connection", value: "HV/MV" },
        { category: "Availability", value: "95-98%" },
        { category: "Response Time", value: "<10 minutes" }
      ],
      tradingVolume: "180 TWh/year",
      marketRegions: ["Europe", "North America", "Asia", "Oceania"],
      keyBenefits: [
        "Weather-independent operation",
        "Offshore capabilities",
        "Grid stabilization",
        "Large-scale deployment"
      ],
      applications: [
        "Utility-scale power",
        "Offshore wind farms",
        "Hybrid installations",
        "Industrial power"
      ],
      qualityStandards: [
        "IEC 61400",
        "GL Certification",
        "DNV Standards"
      ],
      deliveryOptions: [
        "Power purchase agreements",
        "Grid connection services",
        "Balancing services",
        "Storage integration"
      ],
      sustainability: {
        carbonFootprint: "Low",
        renewableContent: "100%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Biomass Energy",
      description: "Sustainable biomass trading and supply chain solutions",
      icon: <Leaf className="w-6 h-6" />,
      features: [
        "Supply chain tracking",
        "Quality assurance",
        "Sustainability metrics",
        "Carbon accounting"
      ],
      details: "End-to-end biomass energy solutions with comprehensive supply chain management and sustainability tracking.",
      specifications: [
        { category: "Capacity Range", value: "5-200 MW" },
        { category: "Feedstock Types", value: "Multiple" },
        { category: "Moisture Content", value: "<15%" },
        { category: "Energy Density", value: "17-20 GJ/t" }
      ],
      tradingVolume: "120M tonnes/year",
      marketRegions: ["Europe", "Americas", "Southeast Asia", "Africa"],
      keyBenefits: [
        "Carbon neutral",
        "Reliable baseload",
        "Local sourcing",
        "Waste reduction"
      ],
      applications: [
        "Power generation",
        "District heating",
        "Industrial process",
        "Combined heat & power"
      ],
      qualityStandards: [
        "ISO 17225",
        "ENplus",
        "SBP Certification"
      ],
      deliveryOptions: [
        "Bulk shipping",
        "Container delivery",
        "Local collection",
        "Storage solutions"
      ],
      sustainability: {
        carbonFootprint: "Low",
        renewableContent: "100%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Bulk shipping"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    }
  ],
  "Refined Products": [
    {
      name: "Gasoline",
      description: "High-quality gasoline products",
      icon: <Droplet className="w-6 h-6" />,
      features: [
        "Octane optimization",
        "Seasonal blending",
        "Additive packages",
        "Quality monitoring"
      ],
      details: "Premium gasoline products with advanced additive packages and seasonal optimization.",
      specifications: [
        { category: "Octane Rating", value: "87-93" },
        { category: "Sulfur Content", value: "<10 ppm" },
        { category: "Volatility", value: "RVP 7-15 psi" },
        { category: "Benzene", value: "<1.0% vol" }
      ],
      tradingVolume: "95M barrels/day",
      marketRegions: ["North America", "Europe", "Asia Pacific", "Latin America"],
      keyBenefits: [
        "Superior engine performance",
        "Reduced emissions",
        "Enhanced fuel economy",
        "Engine protection"
      ],
      applications: [
        "Passenger vehicles",
        "Light-duty trucks",
        "Marine leisure",
        "Small engines"
      ],
      qualityStandards: [
        "ASTM D4814",
        "EN 228",
        "EPA Tier 3"
      ],
      deliveryOptions: [
        "Terminal loading",
        "Pipeline transfer",
        "Marine delivery",
        "Truck transport"
      ],
      sustainability: {
        carbonFootprint: "Moderate",
        renewableContent: "10%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Diesel",
      description: "Clean diesel fuel solutions",
      icon: <Droplet className="w-6 h-6" />,
      features: [
        "Ultra-low sulfur",
        "Cold flow properties",
        "Cetane enhancement",
        "Bio-blend options"
      ],
      details: "Ultra-low sulfur diesel with advanced performance additives and cold weather capabilities.",
      specifications: [
        { category: "Cetane Number", value: "40-55" },
        { category: "Sulfur Content", value: "<15 ppm" },
        { category: "Cloud Point", value: "-12 to -1°C" },
        { category: "Density", value: "820-845 kg/m³" }
      ],
      tradingVolume: "80M barrels/day",
      marketRegions: ["Europe", "North America", "Asia", "Africa"],
      keyBenefits: [
        "High fuel efficiency",
        "Lower emissions",
        "Cold weather performance",
        "Extended engine life"
      ],
      applications: [
        "Heavy transport",
        "Construction equipment",
        "Agricultural machinery",
        "Marine vessels"
      ],
      qualityStandards: [
        "EN 590",
        "ASTM D975",
        "ISO 8217"
      ],
      deliveryOptions: [
        "Bulk delivery",
        "Pipeline transport",
        "Marine bunkering",
        "Terminal pickup"
      ],
      sustainability: {
        carbonFootprint: "Moderate",
        renewableContent: "0%",
        environmentalCertifications: []
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Jet Fuel",
      description: "Aviation fuel distribution",
      icon: <Globe2 className="w-6 h-6" />,
      features: [
        "Quality certification",
        "Storage management",
        "Supply reliability",
        "Safety protocols"
      ],
      details: "High-performance aviation fuel meeting strict international safety and quality standards.",
      specifications: [
        { category: "Flash Point", value: ">38°C" },
        { category: "Freezing Point", value: "<-47°C" },
        { category: "Thermal Stability", value: "JFTOT >260°C" },
        { category: "Sulfur Content", value: "<3000 ppm" }
      ],
      tradingVolume: "6.5M barrels/day",
      marketRegions: ["Global Airports", "Asia Pacific", "Americas", "EMEA"],
      keyBenefits: [
        "High energy density",
        "Thermal stability",
        "Low temperature performance",
        "Global availability"
      ],
      applications: [
        "Commercial aviation",
        "Military aircraft",
        "Private aviation",
        "Helicopter operations"
      ],
      qualityStandards: [
        "ASTM D1655",
        "DEF STAN 91-091",
        "IATA Guidance"
      ],
      deliveryOptions: [
        "Airport hydrant",
        "Tanker truck",
        "Storage facilities",
        "Emergency supply"
      ],
      sustainability: {
        carbonFootprint: "Moderate",
        renewableContent: "0%",
        environmentalCertifications: []
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    }
  ],
  "Petrochemicals": [
    {
      name: "Base Chemicals",
      description: "Essential petrochemical products",
      icon: <FlaskConical className="w-6 h-6" />,
      features: [
        "Ethylene production",
        "Propylene processing",
        "Butadiene handling",
        "Benzene distribution"
      ],
      details: "Core petrochemical products serving as building blocks for various industrial applications.",
      specifications: [
        { category: "Purity", value: "99.9%" },
        { category: "Storage Temp", value: "15-25°C" },
        { category: "Pressure", value: "1 atm" },
        { category: "Phase", value: "Liquid/Gas" }
      ],
      tradingVolume: "150M tonnes/year",
      marketRegions: ["Asia Pacific", "North America", "Europe", "Middle East"],
      keyBenefits: [
        "High purity standards",
        "Consistent quality",
        "Flexible delivery options",
        "Technical support"
      ],
      applications: [
        "Plastics manufacturing",
        "Synthetic fibers",
        "Industrial solvents",
        "Chemical synthesis"
      ],
      qualityStandards: [
        "ASTM D3960",
        "ISO 9001:2015",
        "REACH Compliance"
      ],
      deliveryOptions: [
        "Bulk liquid",
        "ISO containers",
        "Pipeline transfer",
        "Specialized tankers"
      ],
      sustainability: {
        carbonFootprint: "Moderate",
        renewableContent: "10%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Polymers",
      description: "Industrial polymer solutions",
      icon: <Beaker className="w-6 h-6" />,
      features: [
        "Custom formulations",
        "Multiple grades",
        "Process optimization",
        "Technical support"
      ],
      details: "Advanced polymer products for diverse industrial applications with customizable properties.",
      specifications: [
        { category: "Density", value: "0.91-0.97 g/cm³" },
        { category: "Melt Index", value: "0.5-25 g/10min" },
        { category: "Tensile Strength", value: "20-45 MPa" },
        { category: "Molecular Weight", value: "50k-200k Da" }
      ],
      tradingVolume: "200M tonnes/year",
      marketRegions: ["Asia", "Europe", "Americas", "Africa"],
      keyBenefits: [
        "Customizable properties",
        "High performance",
        "Cost-effective",
        "Sustainable options"
      ],
      applications: [
        "Packaging solutions",
        "Automotive parts",
        "Construction materials",
        "Consumer goods"
      ],
      qualityStandards: [
        "ISO 1872",
        "ASTM D1238",
        "EN 15342"
      ],
      deliveryOptions: [
        "Pellet form",
        "Bulk containers",
        "Custom packaging",
        "Direct delivery"
      ],
      sustainability: {
        carbonFootprint: "Moderate",
        renewableContent: "10%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Specialty Chemicals",
      description: "Advanced chemical products",
      icon: <TestTubes className="w-6 h-6" />,
      features: [
        "High purity products",
        "Custom synthesis",
        "Quality assurance",
        "R&D collaboration"
      ],
      details: "High-value specialty chemicals designed for specific industrial applications and performance requirements.",
      specifications: [
        { category: "Purity", value: "99.99%" },
        { category: "Stability", value: "High" },
        { category: "Reactivity", value: "Controlled" },
        { category: "Shelf Life", value: "24 months" }
      ],
      tradingVolume: "75M tonnes/year",
      marketRegions: ["North America", "Europe", "Asia Pacific", "Latin America"],
      keyBenefits: [
        "Superior performance",
        "Application-specific",
        "Technical expertise",
        "R&D support"
      ],
      applications: [
        "Electronic materials",
        "Coating additives",
        "Performance chemicals",
        "Process catalysts"
      ],
      qualityStandards: [
        "ISO 9001:2015",
        "REACH",
        "GMP Standards"
      ],
      deliveryOptions: [
        "Small containers",
        "Custom packaging",
        "Temperature controlled",
        "Secure transport"
      ],
      sustainability: {
        carbonFootprint: "Moderate",
        renewableContent: "10%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Pipeline"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    }
  ],
  "Biofuels": [
    {
      name: "Biodiesel",
      description: "Sustainable biodiesel solutions",
      icon: <Leaf className="w-6 h-6" />,
      features: [
        "Multi-feedstock capability",
        "FAME production",
        "Quality monitoring",
        "Sustainability tracking"
      ],
      details: "Advanced biodiesel products from multiple feedstocks with comprehensive sustainability tracking.",
      specifications: [
        { category: "FAME Content", value: ">96.5%" },
        { category: "Cetane Number", value: ">51" },
        { category: "Oxidation Stability", value: ">8 hours" },
        { category: "Cold Filter Point", value: "-5 to -15°C" }
      ],
      tradingVolume: "45M tonnes/year",
      marketRegions: ["Europe", "Americas", "Asia Pacific", "Africa"],
      keyBenefits: [
        "Carbon reduction",
        "Engine compatibility",
        "Renewable source",
        "Local production"
      ],
      applications: [
        "Transport fleets",
        "Marine vessels",
        "Industrial equipment",
        "Power generation"
      ],
      qualityStandards: [
        "EN 14214",
        "ASTM D6751",
        "ISO 16128"
      ],
      deliveryOptions: [
        "Bulk transport",
        "Blending facilities",
        "Direct delivery",
        "Storage solutions"
      ],
      sustainability: {
        carbonFootprint: "Low",
        renewableContent: "100%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Bulk shipping"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Ethanol",
      description: "Renewable ethanol products",
      icon: <Leaf className="w-6 h-6" />,
      features: [
        "High-purity production",
        "Multiple feedstocks",
        "Flexible blending",
        "Quality assurance"
      ],
      details: "High-quality renewable ethanol from various feedstocks for fuel and industrial applications.",
      specifications: [
        { category: "Purity", value: ">99.5%" },
        { category: "Water Content", value: "<0.5%" },
        { category: "Acidity", value: "<0.007%" },
        { category: "Density", value: "789 kg/m³" }
      ],
      tradingVolume: "110B liters/year",
      marketRegions: ["Americas", "Europe", "Asia", "Africa"],
      keyBenefits: [
        "High octane rating",
        "Reduced emissions",
        "Agricultural support",
        "Energy security"
      ],
      applications: [
        "Gasoline blending",
        "Chemical industry",
        "Pharmaceutical use",
        "Industrial processes"
      ],
      qualityStandards: [
        "ASTM D4806",
        "EN 15376",
        "ABNT NBR"
      ],
      deliveryOptions: [
        "Rail transport",
        "Truck delivery",
        "Marine shipment",
        "Pipeline transfer"
      ],
      sustainability: {
        carbonFootprint: "Low",
        renewableContent: "100%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Bulk shipping"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    },
    {
      name: "Advanced Biofuels",
      description: "Next-generation biofuel solutions",
      icon: <Sparkles className="w-6 h-6" />,
      features: [
        "Advanced processing",
        "Non-food feedstocks",
        "Carbon reduction",
        "Innovative technology"
      ],
      details: "Innovative biofuel technologies utilizing advanced feedstocks and production processes.",
      specifications: [
        { category: "Carbon Intensity", value: "-80% vs fossil" },
        { category: "Energy Content", value: "32-36 MJ/L" },
        { category: "Feedstock", value: "Non-food" },
        { category: "Production", value: "Advanced tech" }
      ],
      tradingVolume: "15M tonnes/year",
      marketRegions: ["North America", "EU", "Asia Pacific", "Middle East"],
      keyBenefits: [
        "Zero food competition",
        "Higher efficiency",
        "Advanced sustainability",
        "Future-proof solution"
      ],
      applications: [
        "Aviation fuel",
        "Heavy transport",
        "Marine shipping",
        "Industrial use"
      ],
      qualityStandards: [
        "ASTM D7566",
        "EU RED II",
        "ISCC Plus"
      ],
      deliveryOptions: [
        "Specialized transport",
        "Custom blending",
        "Direct supply",
        "Research quantities"
      ],
      sustainability: {
        carbonFootprint: "Low",
        renewableContent: "100%",
        environmentalCertifications: ["ISO 14064", "REACH"]
      },
      marketInsights: {
        priceHistory: "Stable",
        demandTrend: "Slightly increasing",
        seasonalFactors: ["Higher in winter", "Lower in summer"]
      },
      logistics: {
        storageRequirements: "Underground/Surface",
        transportationModes: ["Bulk shipping"],
        handlingPrecautions: ["Use gloves", "Avoid direct contact"]
      }
    }
  ]
}

export default function ProductsPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("Crude Oil")
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleQuickview = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleContactNavigation = () => {
    router.push("/contact")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Simple Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 to-teal-900/80 z-10" />
          <Image
            src="/oil-tank-view.jpeg"
            alt="Zinerva Products"
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
              Our Products
            </h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full" />
            <p className="text-xl text-teal-50/90 leading-relaxed">
              Comprehensive portfolio of energy products and trading solutions designed
              to meet the evolving needs of the global market.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {["Energy Trading", "Global Distribution", "Sustainable Solutions"].map((tag, index) => (
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

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-teal-100">
            {/* Tabs and Product Cards */}
            <Tabs defaultValue="Crude Oil" className="w-full">
              <TabsList className="flex overflow-x-auto md:overflow-visible justify-start md:justify-center items-center 
                gap-2 md:gap-6 mb-12 p-2 
                bg-white/50 backdrop-blur-sm rounded-full border border-teal-100 shadow-sm 
                w-full max-w-4xl mx-auto scrollbar-hide md:scrollbar-default">
                {Object.keys(products).map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="px-4 md:px-6 py-2.5 rounded-full 
                      data-[state=active]:bg-teal-600 
                      data-[state=active]:text-white 
                      data-[state=active]:shadow-md
                      hover:bg-teal-50 
                      transition-all 
                      duration-300 
                      text-teal-700 
                      text-sm
                      font-medium
                      border border-transparent
                      hover:border-teal-200 
                      whitespace-nowrap 
                      flex items-center justify-center
                      min-w-[110px] md:min-w-[130px]
                      data-[state=active]:scale-105
                      data-[state=active]:hover:bg-teal-600
                      flex-shrink-0 md:flex-shrink"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(products).map(([category, items]) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((product, index) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="h-full"
                      >
                        <Card className="bg-white/95 backdrop-blur-sm border-2 border-teal-100 
                          hover:border-orange-200 transition-all duration-300 shadow-lg 
                          hover:shadow-xl group h-full flex flex-col">
                          <CardHeader>
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 
                                text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                {product.icon}
                              </div>
                              <div>
                                <CardTitle className="text-xl font-bold text-teal-900 mb-2">
                                  {product.name}
                                </CardTitle>
                                <CardDescription className="text-teal-700">
                                  {product.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow flex flex-col justify-between">
                            <div className="space-y-4">
                              <div className="text-sm text-teal-700">{product.details}</div>
                              <div className="space-y-2">
                                {product.features?.map((feature, i) => (
                                  <div key={i} className="flex items-center text-teal-600">
                                    <ArrowRight className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <Button
                              onClick={() => handleQuickview(product)}
                              className="w-full mt-6 bg-gradient-to-r from-teal-600 to-teal-700 
                                hover:from-teal-700 hover:to-teal-800 text-white shadow-lg 
                                hover:shadow-xl transition-all duration-300"
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </AnimatedSection>
      </div>

      {/* Infrastructure Section */}
      <section className="w-full py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-4xl font-bold text-teal-900">Our Infrastructure</h2>
            <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto" />
            <p className="text-base md:text-xl text-teal-700 max-w-3xl mx-auto px-4 md:px-0">
              State-of-the-art facilities enabling reliable and efficient energy distribution across the globe
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-100"
          >
            <Image
              src="/oil-tank-view.jpeg"
              alt="Industrial Oil Tanks Infrastructure"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <AnimatedSection>
        <div className="text-center mt-16 mb-24">
          <h2 className="text-3xl font-bold mb-4 text-teal-900">Need Custom Solutions?</h2>
          <p className="text-lg text-teal-600 max-w-2xl mx-auto mb-8">
            Our team of experts is ready to help you find the perfect energy solutions for your specific needs.
          </p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleContactNavigation}
          >
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </AnimatedSection>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] md:h-[80vh] md:max-w-[90vw] lg:max-w-[85vw] 
          bg-gradient-to-br from-white via-teal-50/30 to-orange-50/30 border-2 border-teal-200 
          shadow-2xl backdrop-blur-md p-4 md:p-6">
          <DialogHeader className="border-b-2 border-teal-200/50 pb-3">
            <DialogTitle className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <motion.div
                initial={{ scale: 0.9, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 
                  text-white shadow-xl hover:shadow-2xl transform hover:scale-105 hover:rotate-3 
                  transition-all duration-300 relative group w-fit"
              >
                <div className="relative w-6 h-6 md:w-8 md:h-8">
                  {selectedProduct?.icon}
                </div>
              </motion.div>
              <div className="flex-1 space-y-2 md:space-y-3">
                <motion.h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-950 
                  via-teal-800 to-teal-900 bg-clip-text text-transparent">
                  {selectedProduct?.name}
                </motion.h2>
                <motion.p className="text-teal-700 text-base md:text-lg font-medium">
                  {selectedProduct?.description}
                </motion.p>
                <motion.div className="flex items-center gap-4 mt-2">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 
                    rounded-full border border-orange-300 shadow-sm">
                    <span className="text-sm font-bold text-orange-800">
                      {selectedProduct?.tradingVolume}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-teal-600">Annual Trading Volume</span>
                </motion.div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 p-2 md:p-6 
            overflow-y-auto max-h-[calc(90vh-120px)] md:max-h-[calc(80vh-120px)]">
            {/* First Column */}
            <div className="space-y-4">
              {/* Product Overview */}
              <motion.div className="group bg-gradient-to-br from-teal-100 via-white to-teal-50 
                rounded-xl p-4 shadow-lg hover:shadow-xl border-2 border-teal-200">
                <h3 className="text-lg md:text-xl font-semibold text-teal-800 mb-3 flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
                  Product Overview
                </h3>
                <p className="text-teal-700 leading-relaxed text-sm md:text-base">
                  {selectedProduct?.details}
                </p>
              </motion.div>

              {/* Technical Specifications */}
              <motion.div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl border-2 border-teal-200">
                <h3 className="text-lg md:text-xl font-semibold text-teal-800 mb-3 flex items-center gap-3">
                  <Beaker className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
                  Technical Specifications
                </h3>
                <div className="grid gap-3">
                  {selectedProduct?.specifications.map((spec, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between 
                      p-3 rounded-lg bg-gradient-to-r from-teal-100/80 to-teal-50/50 
                      hover:from-teal-200/70 hover:to-teal-100/50 transition-colors duration-300 
                      group border border-teal-200">
                      <span className="text-teal-800 font-medium text-sm md:text-base mb-2 md:mb-0">
                        {spec.category}
                      </span>
                      <span className="font-bold text-teal-900 px-3 py-1.5 bg-white rounded-md 
                        shadow-md border border-teal-300 text-sm md:text-base">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Features & Benefits */}
              <motion.div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-4 
                shadow-lg hover:shadow-xl border-2 border-orange-200">
                <h3 className="text-lg md:text-xl font-semibold text-teal-800 mb-3 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                  Features & Benefits
                </h3>
                <div className="grid gap-3">
                  {selectedProduct?.features?.map((feature, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-start gap-3 p-3 rounded-lg 
                        hover:bg-gradient-to-r hover:from-orange-100 hover:to-orange-50/70 
                        border border-orange-100 hover:border-orange-200
                        transition-all duration-300">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 
                          group-hover:scale-125 transition-transform" />
                        <div>
                          <span className="text-teal-900 font-medium block text-sm md:text-base">{feature}</span>
                          <p className="text-teal-700 mt-1 text-sm md:text-base">
                            {selectedProduct?.keyBenefits[idx]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Second Column */}
            <div className="space-y-4">
              {/* Market Coverage */}
              <motion.div className="bg-gradient-to-br from-orange-100 via-white to-orange-50 
                rounded-xl p-4 shadow-lg hover:shadow-xl border-2 border-orange-200">
                <h3 className="text-lg md:text-xl font-semibold text-teal-800 mb-3 flex items-center gap-3">
                  <Globe2 className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                  Market Coverage
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedProduct?.marketRegions.map((region, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg 
                      shadow-sm border border-orange-100 hover:border-orange-200 
                      hover:shadow-md transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-teal-700 text-sm md:text-base">{region}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Applications */}
              <motion.div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl border-2 border-teal-200">
                <h3 className="text-lg md:text-xl font-semibold text-teal-800 mb-3 flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-teal-700" />
                  Applications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedProduct?.applications.map((app, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-gradient-to-r from-teal-50 to-transparent
                      hover:from-teal-100 transition-colors duration-300">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white rounded-md shadow-sm">
                          <ArrowRight className="w-4 h-4 text-orange-500" />
                        </div>
                        <span className="text-teal-800 font-medium text-sm md:text-base">{app}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quality & Delivery */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl border-2 border-teal-200">
                  <h3 className="text-lg font-semibold text-teal-800 mb-3">Quality Standards</h3>
                  <div className="space-y-2">
                    {selectedProduct?.qualityStandards.map((standard, idx) => (
                      <div key={idx} className="px-3 py-2 rounded-lg bg-teal-50 text-teal-800 
                        font-medium text-sm md:text-base hover:bg-teal-100 transition-colors duration-300">
                        {standard}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl border-2 border-teal-200">
                  <h3 className="text-lg font-semibold text-teal-800 mb-3">Delivery Options</h3>
                  <div className="space-y-2">
                    {selectedProduct?.deliveryOptions.map((option, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg 
                        hover:bg-orange-50 transition-colors duration-300">
                        <ArrowRight className="w-4 h-4 text-orange-500" />
                        <span className="text-teal-800 font-medium text-sm md:text-base">{option}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mt-6 border-t-2 border-teal-200/50 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Sustainability Section */}
              <motion.div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 
                shadow-lg hover:shadow-xl border-2 border-green-200">
                <h3 className="text-lg font-semibold text-teal-800 mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Sustainability
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/80 border border-green-100">
                    <span className="text-sm font-medium text-teal-600 block mb-1">Carbon Footprint</span>
                    <span className="text-teal-900">{selectedProduct?.sustainability.carbonFootprint}</span>
                  </div>
                  {selectedProduct?.sustainability.renewableContent && (
                    <div className="p-3 rounded-lg bg-white/80 border border-green-100">
                      <span className="text-sm font-medium text-teal-600 block mb-1">Renewable Content</span>
                      <span className="text-teal-900">{selectedProduct?.sustainability.renewableContent}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct?.sustainability.environmentalCertifications.map((cert, idx) => (
                      <span key={idx} className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Market Insights */}
              <motion.div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 
                shadow-lg hover:shadow-xl border-2 border-blue-200">
                <h3 className="text-lg font-semibold text-teal-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Market Insights
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/80 border border-blue-100">
                    <span className="text-sm font-medium text-teal-600 block mb-1">Price Trend</span>
                    <span className="text-teal-900">{selectedProduct?.marketInsights.priceHistory}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/80 border border-blue-100">
                    <span className="text-sm font-medium text-teal-600 block mb-1">Demand Outlook</span>
                    <span className="text-teal-900">{selectedProduct?.marketInsights.demandTrend}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-teal-600">Seasonal Factors</span>
                    {selectedProduct?.marketInsights.seasonalFactors.map((factor, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-teal-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {factor}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Logistics Information */}
              <motion.div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 
                shadow-lg hover:shadow-xl border-2 border-purple-200">
                <h3 className="text-lg font-semibold text-teal-800 mb-3 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-purple-600" />
                  Logistics
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-white/80 border border-purple-100">
                    <span className="text-sm font-medium text-teal-600 block mb-1">Storage Requirements</span>
                    <span className="text-teal-900">{selectedProduct?.logistics.storageRequirements}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-teal-600">Transportation Modes</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct?.logistics.transportationModes.map((mode, idx) => (
                        <span key={idx} className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-teal-600">Handling Precautions</span>
                    {selectedProduct?.logistics.handlingPrecautions.map((precaution, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-teal-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {precaution}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

