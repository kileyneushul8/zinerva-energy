import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Analytics & Insights</h1>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue over the past year</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Region</CardTitle>
                <CardDescription>Distribution across regions</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Partner Type</CardTitle>
                <CardDescription>Distribution by partner category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={partnerTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Partner Growth</CardTitle>
              <CardDescription>Number of new partners over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={partnerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="partners" stroke="#a855f7" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Sales by product category</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#f43f5e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const revenueData = [
  { month: "Jan", revenue: 65000 },
  { month: "Feb", revenue: 72000 },
  { month: "Mar", revenue: 85000 },
  { month: "Apr", revenue: 95000 },
  { month: "May", revenue: 102000 },
  { month: "Jun", revenue: 115000 },
  { month: "Jul", revenue: 125000 },
  { month: "Aug", revenue: 132000 },
  { month: "Sep", revenue: 145000 },
  { month: "Oct", revenue: 155000 },
  { month: "Nov", revenue: 162000 },
  { month: "Dec", revenue: 175000 },
]

const regionData = [
  { region: "North America", revenue: 245000 },
  { region: "Europe", revenue: 186000 },
  { region: "Asia Pacific", revenue: 142000 },
  { region: "Middle East", revenue: 105000 },
]

const partnerTypeData = [
  { type: "Distributors", revenue: 320000 },
  { type: "Resellers", revenue: 240000 },
  { type: "Direct", revenue: 180000 },
]

const partnerGrowthData = [
  { month: "Jan", partners: 850 },
  { month: "Feb", partners: 920 },
  { month: "Mar", partners: 980 },
  { month: "Apr", partners: 1050 },
  { month: "May", partners: 1120 },
  { month: "Jun", partners: 1200 },
]

const productData = [
  { category: "Devices", sales: 1200 },
  { category: "Pods", sales: 2500 },
  { category: "Accessories", sales: 800 },
  { category: "Merchandise", sales: 400 },
]

