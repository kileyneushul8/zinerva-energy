"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/products"

export function ProductsOverview() {
  const [activeTab, setActiveTab] = useState("Crude Oil")

  const groupedProducts = {
    "Crude Oil": products.filter(p => p.category === "Crude Oil"),
    "Natural Gas": products.filter(p => p.category === "Natural Gas"),
    "Renewable Energy": products.filter(p => p.category === "Renewable Energy"),
    "Refined Products": products.filter(p => p.category === "Refined Products"),
    "Petrochemicals": products.filter(p => p.category === "Petrochemicals"),
    "Biofuels": products.filter(p => p.category === "Biofuels"),
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-teal-900">Our Products</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="Crude Oil">Crude Oil</TabsTrigger>
            <TabsTrigger value="Natural Gas">Natural Gas</TabsTrigger>
            <TabsTrigger value="Renewable Energy">Renewables</TabsTrigger>
            <TabsTrigger value="Refined Products">Refined Products</TabsTrigger>
            <TabsTrigger value="Petrochemicals">Petrochemicals</TabsTrigger>
            <TabsTrigger value="Biofuels">Biofuels</TabsTrigger>
          </TabsList>
          {Object.entries(groupedProducts).map(([category, items]) => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-teal-900">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((product) => (
                    <Link
                      key={product.name}
                      href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group h-full"
                    >
                      <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-200 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-teal-900">
                            <product.icon className="h-6 w-6 text-teal-600 shrink-0" />
                            {product.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                          <CardDescription className="text-teal-700 mb-4">
                            {product.description}
                          </CardDescription>
                          <p className="text-sm text-teal-600 mb-4 flex-grow">
                            {product.details}
                          </p>
                          <Button variant="outline" size="sm" className="group-hover:border-orange-300 mt-auto w-fit">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

