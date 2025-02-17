import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, CreditCard, Bell } from "lucide-react"

export default function ConsumerPortalPage() {
  return (
    <main className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-playfair mb-8">Consumer Portal</h1>
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="offers">Exclusive Offers</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>View and manage your recent orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Package className="h-6 w-6" />
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-white/70">Placed on {order.date}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Active Subscriptions</CardTitle>
                <CardDescription>Manage your current subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptions.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="h-6 w-6" />
                        <div>
                          <p className="font-medium">{sub.name}</p>
                          <p className="text-sm text-white/70">Next billing: {sub.nextBilling}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="offers">
            <Card>
              <CardHeader>
                <CardTitle>Exclusive Offers</CardTitle>
                <CardDescription>Special deals just for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {offers.map((offer) => (
                    <div key={offer.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Bell className="h-6 w-6" />
                        <div>
                          <p className="font-medium">{offer.name}</p>
                          <p className="text-sm text-white/70">Expires in {offer.expiresIn} days</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Claim
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

const orders = [
  { id: "1001", date: "May 1, 2023" },
  { id: "1002", date: "May 15, 2023" },
  { id: "1003", date: "June 1, 2023" },
]

const subscriptions = [
  { id: 1, name: "Premium Flavor Pack", nextBilling: "June 1, 2023" },
  { id: 2, name: "Device Maintenance", nextBilling: "June 15, 2023" },
]

const offers = [
  { id: 1, name: "Summer Sale: 20% Off", expiresIn: 7 },
  { id: 2, name: "Free Shipping on $50+", expiresIn: 5 },
  { id: 3, name: "Buy 2 Get 1 Free", expiresIn: 3 },
]

