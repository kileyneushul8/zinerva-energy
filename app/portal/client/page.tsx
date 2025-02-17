import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Gift, CreditCard, ShoppingBag } from "lucide-react"

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Welcome to Your Client Portal</h1>
        <Button>View All Orders</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rewards Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Rewards Program</CardTitle>
          <CardDescription>Join our rewards program to earn points and unlock benefits!</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Learn More About Rewards</Button>
        </CardContent>
      </Card>

      {/* Featured Products */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Products</CardTitle>
          <CardDescription>Check out our latest offerings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featuredProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-800 rounded-full">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const metrics = [
  {
    title: "Available Rewards",
    value: "2,500",
    icon: Gift,
    description: "Current point balance",
  },
  {
    title: "Reward Tier",
    value: "Silver",
    icon: ArrowUpRight,
    description: "Current tier status",
  },
  {
    title: "Products",
    value: "15",
    icon: ShoppingBag,
    description: "Available products",
  },
  {
    title: "Flavors",
    value: "25",
    icon: CreditCard,
    description: "Available flavors",
  },
]

const featuredProducts = [
  { name: "Premium Flavor Pods", category: "Pods" },
  { name: "Electronic Hookah Device", category: "Devices" },
  { name: "Accessory Kit", category: "Accessories" },
  { name: "Flavor Sampler Pack", category: "Pods" },
]

