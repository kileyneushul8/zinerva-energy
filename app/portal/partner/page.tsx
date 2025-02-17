import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, DollarSign, ShoppingCart, Users } from "lucide-react"

export default function PartnerPortalPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Partner Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your last 5 orders</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentOrders.map((order, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>Order #{order.id}</span>
                  <span>${order.amount}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Your best performing customers</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topCustomers.map((customer, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{customer.name}</span>
                  <span>${customer.totalSpent}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const dashboardCards = [
  { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, description: "+20.1% from last month" },
  { title: "Total Customers", value: "2,350", icon: Users, description: "+180.1% from last month" },
  { title: "Total Orders", value: "1,209", icon: ShoppingCart, description: "+19% from last month" },
  { title: "Active Products", value: "23", icon: BarChart, description: "86% of total inventory" },
]

const recentOrders = [
  { id: "1234", amount: 300 },
  { id: "1235", amount: 150 },
  { id: "1236", amount: 200 },
  { id: "1237", amount: 450 },
  { id: "1238", amount: 275 },
]

const topCustomers = [
  { name: "Alice Johnson", totalSpent: 1200 },
  { name: "Bob Smith", totalSpent: 950 },
  { name: "Charlie Brown", totalSpent: 875 },
  { name: "Diana Prince", totalSpent: 700 },
  { name: "Ethan Hunt", totalSpent: 650 },
]

