import { LucideIcon } from "lucide-react"
import { Droplet, Zap, Wind, Sun, Fuel, Leaf, Recycle } from "lucide-react"

export type Product = {
  name: string
  description: string
  icon: LucideIcon
  details: string
  category: string
}

export const products: Product[] = [
  {
    name: "Brent Crude",
    description: "Light sweet crude oil, global benchmark for oil prices",
    icon: Droplet,
    details:
      "Brent Crude is sourced from the North Sea and is used to price two-thirds of the world's internationally traded crude oil supplies.",
    category: "Crude Oil"
  },
  {
    name: "West Texas Intermediate (WTI)",
    description: "High-quality, light crude oil, US benchmark",
    icon: Droplet,
    details:
      "WTI is lighter and sweeter than Brent Crude, making it ideal for gasoline production. It's the main benchmark of crude oil in the Americas.",
    category: "Crude Oil"
  },
  {
    name: "Liquefied Natural Gas (LNG)",
    description: "Natural gas cooled to liquid form for easier storage and transport",
    icon: Zap,
    details:
      "LNG is natural gas that has been cooled to -162°C (-260°F), making it 600 times smaller in volume and ideal for transport over long distances.",
    category: "Natural Gas"
  },
  {
    name: "Compressed Natural Gas (CNG)",
    description: "Natural gas stored at high pressure, used as vehicle fuel",
    icon: Wind,
    details:
      "CNG is made by compressing natural gas to less than 1% of its volume at standard atmospheric pressure. It's a cleaner-burning alternative to gasoline and diesel.",
    category: "Natural Gas"
  },
  {
    name: "Solar PV Modules",
    description: "Photovoltaic panels for solar energy generation",
    icon: Sun,
    details:
      "Our solar PV modules use advanced monocrystalline silicon technology, offering high efficiency and durability for both residential and commercial applications.",
    category: "Renewable Energy"
  },
  {
    name: "Wind Turbine Components",
    description: "Key parts for wind energy generation systems",
    icon: Wind,
    details:
      "We supply critical components for both onshore and offshore wind turbines, including blades, generators, and control systems, supporting the growth of wind energy worldwide.",
    category: "Renewable Energy"
  },
  {
    name: "Premium Gasoline",
    description: "High-octane fuel for high-performance engines",
    icon: Fuel,
    details:
      "Our premium gasoline is formulated with advanced additives to enhance engine performance, improve fuel economy, and reduce emissions.",
    category: "Refined Products"
  },
  {
    name: "Ultra-Low Sulfur Diesel",
    description: "Clean-burning diesel fuel for modern engines",
    icon: Fuel,
    details:
      "This diesel fuel has significantly reduced sulfur content, meeting strict environmental standards and improving air quality.",
    category: "Refined Products"
  },
  {
    name: "Ethylene",
    description: "Basic building block for many plastics",
    icon: Recycle,
    details:
      "Ethylene is a versatile petrochemical used in the production of polyethylene, PVC, and other essential plastics and chemicals.",
    category: "Petrochemicals"
  },
  {
    name: "Propylene",
    description: "Key ingredient in many industrial products",
    icon: Recycle,
    details:
      "Propylene is used to produce polypropylene, acrylonitrile, and various other chemicals crucial for manufacturing processes.",
    category: "Petrochemicals"
  },
  {
    name: "Biodiesel",
    description: "Renewable fuel made from vegetable oils or animal fats",
    icon: Leaf,
    details:
      "Our biodiesel is a clean-burning alternative to petroleum diesel, reducing greenhouse gas emissions and promoting energy independence.",
    category: "Biofuels"
  },
  {
    name: "Ethanol",
    description: "Renewable fuel primarily made from corn or sugarcane",
    icon: Leaf,
    details: "Ethanol is commonly blended with gasoline to reduce emissions and decrease reliance on fossil fuels.",
    category: "Biofuels"
  },
]

