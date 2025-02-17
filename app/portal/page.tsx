import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Users, ShieldCheck } from "lucide-react"

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-playfair mb-8 text-center">Nebben Portals</h1>
        <p className="text-xl text-center mb-12 text-white/70">Select your portal type to access your dashboard</p>
        <div className="grid md:grid-cols-3 gap-8">
          {portalTypes.map((portal) => (
            <Card key={portal.title} className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {portal.icon}
                  <span>{portal.title}</span>
                </CardTitle>
                <CardDescription>{portal.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={portal.href}>Enter Portal</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

const portalTypes = [
  {
    title: "Consumer Portal",
    description: "Manage your orders, subscriptions, and view exclusive offers.",
    href: "/portal/consumer",
    icon: <User className="h-6 w-6" />,
  },
  {
    title: "Partner Portal",
    description: "Access marketing materials, track commissions, and manage your partnership.",
    href: "/portal/partner",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Admin Portal",
    description: "Oversee operations, manage inventory, and analyze business metrics.",
    href: "/portal/admin",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
]

