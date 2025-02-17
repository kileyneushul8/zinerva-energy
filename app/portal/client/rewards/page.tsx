import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Award, Zap } from "lucide-react"

export default function RewardsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Rewards Program</h1>

      <Card>
        <CardHeader>
          <CardTitle>Join Our Rewards Program</CardTitle>
          <CardDescription>Earn points and unlock exclusive benefits with every purchase!</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Sign up now to start earning rewards on all your purchases. The more you shop, the more you earn!
          </p>
          <Button>Sign Up for Rewards</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rewardTiers.map((tier, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <tier.icon className="h-5 w-5" />
                {tier.name} Tier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {tier.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-medium">{tier.pointsRequired} points required</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Rewards</CardTitle>
          <CardDescription>Redeem your points for these exclusive rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {availableRewards.map((reward, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{reward.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{reward.pointsCost} points</Badge>
                    <Button size="sm">Redeem</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const rewardTiers = [
  {
    name: "Silver",
    icon: Gift,
    benefits: ["10% discount on all purchases", "Free shipping on orders over $50", "Early access to new flavors"],
    pointsRequired: 0,
  },
  {
    name: "Gold",
    icon: Award,
    benefits: [
      "15% discount on all purchases",
      "Free shipping on all orders",
      "Exclusive gold-member only products",
      "Priority customer support",
    ],
    pointsRequired: 5000,
  },
  {
    name: "Platinum",
    icon: Zap,
    benefits: [
      "20% discount on all purchases",
      "Free express shipping on all orders",
      "Personalized flavor profile",
      "Invitation to annual VIP event",
      "Dedicated account manager",
    ],
    pointsRequired: 10000,
  },
]

const availableRewards = [
  {
    name: "Free Flavor Pack",
    description: "Choose any flavor pack for free",
    pointsCost: 1000,
  },
  {
    name: "Exclusive Limited Edition Pod",
    description: "Get access to a rare, limited edition flavor pod",
    pointsCost: 2500,
  },
  {
    name: "Device Upgrade",
    description: "Upgrade your current device to the latest model",
    pointsCost: 5000,
  },
  {
    name: "VIP Experience",
    description: "Enjoy a guided tour of our flavor lab and create your own custom blend",
    pointsCost: 10000,
  },
]

