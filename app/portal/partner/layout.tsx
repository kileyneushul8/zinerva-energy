import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, ShoppingCart, DollarSign, FileText, Settings, Menu } from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/portal/partner" },
  { icon: Users, label: "Customers", href: "/portal/partner/customers" },
  { icon: ShoppingCart, label: "Orders", href: "/portal/partner/orders" },
  { icon: DollarSign, label: "Financials", href: "/portal/partner/financials" },
  { icon: FileText, label: "Marketing", href: "/portal/partner/marketing" },
  { icon: Settings, label: "Settings", href: "/portal/partner/settings" },
]

export default function PartnerPortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-4 hidden md:block">
        <nav className="space-y-2 pt-20">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="w-full justify-start">
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Main content */}
      <main className="flex-1 p-8 pt-24">{children}</main>
    </div>
  )
}

