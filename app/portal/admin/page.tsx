import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, TrendingUp, DollarSign, Users, Globe, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button>Generate Report</Button>
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
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${metric.trend > 0 ? "text-green-500" : "text-red-500"}`}>
                  {metric.trend > 0 ? (
                    <ArrowUpRight className="inline h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="inline h-4 w-4" />
                  )}
                  {Math.abs(metric.trend)}%
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="distributors">Distributors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>Revenue by partner type</CardDescription>
              </CardHeader>
              <CardContent>
                {revenueDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                      <span>{item.type}</span>
                    </div>
                    <span className="font-medium">${item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <activity.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Partner Performance</CardTitle>
              <CardDescription>Top performing partners this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partnerPerformance.map((partner, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-muted-foreground">{partner.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${partner.revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{partner.orders} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distributors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distributor Network</CardTitle>
              <CardDescription>Active distributors by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {distributorNetwork.map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{region.name}</p>
                      <p className="text-sm text-muted-foreground">{region.activeDistributors} active distributors</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${region.revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{region.growth}% growth</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const metrics = [
  {
    title: "Total Revenue",
    value: "$678,345",
    icon: DollarSign,
    trend: 12.5,
  },
  {
    title: "Active Partners",
    value: "1,234",
    icon: Users,
    trend: 8.2,
  },
  {
    title: "Distributors",
    value: "245",
    icon: Globe,
    trend: -2.4,
  },
  {
    title: "Growth Rate",
    value: "24.5%",
    icon: TrendingUp,
    trend: 4.1,
  },
]

const revenueDistribution = [
  { type: "Direct Partners", amount: 245000, color: "#22c55e" },
  { type: "Distributors", amount: 186000, color: "#3b82f6" },
  { type: "Online Sales", amount: 142000, color: "#a855f7" },
  { type: "Other", amount: 105345, color: "#64748b" },
]

const recentActivities = [
  {
    title: "New distributor application received from Eastern Europe",
    timestamp: "2 minutes ago",
    icon: Globe,
  },
  {
    title: "Monthly partner performance reports generated",
    timestamp: "1 hour ago",
    icon: BarChart,
  },
  {
    title: "New partnership agreement signed with Major Corp",
    timestamp: "3 hours ago",
    icon: Users,
  },
  {
    title: "Quarterly financial reports published",
    timestamp: "5 hours ago",
    icon: DollarSign,
  },
]

const partnerPerformance = [
  {
    name: "Global Distribution Co",
    location: "North America",
    revenue: 125000,
    orders: 1250,
  },
  {
    name: "Euro Partners Ltd",
    location: "Europe",
    revenue: 98000,
    orders: 876,
  },
  {
    name: "Asia Trade Network",
    location: "Asia Pacific",
    revenue: 87500,
    orders: 654,
  },
  {
    name: "Middle East Ventures",
    location: "Middle East",
    revenue: 76000,
    orders: 543,
  },
]

const distributorNetwork = [
  {
    name: "North America",
    activeDistributors: 85,
    revenue: 245000,
    growth: 15.2,
  },
  {
    name: "Europe",
    activeDistributors: 64,
    revenue: 186000,
    growth: 12.8,
  },
  {
    name: "Asia Pacific",
    activeDistributors: 52,
    revenue: 142000,
    growth: 18.5,
  },
  {
    name: "Middle East",
    activeDistributors: 44,
    revenue: 105000,
    growth: 9.7,
  },
]

