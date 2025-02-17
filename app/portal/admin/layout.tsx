import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, TrendingUp, DollarSign, Boxes, FileText, Settings, Menu, Globe } from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/portal/admin" },
  { icon: Users, label: "Partners", href: "/portal/admin/partners" },
  { icon: Globe, label: "Distributors", href: "/portal/admin/distributors" },
  { icon: Boxes, label: "Inventory", href: "/portal/admin/inventory" },
  { icon: TrendingUp, label: "Analytics", href: "/portal/admin/analytics" },
  { icon: DollarSign, label: "Finances", href: "/portal/admin/finances" },
  { icon: FileText, label: "Reports", href: "/portal/admin/reports" },
  { icon: Settings, label: "Settings", href: "/portal/admin/settings" },
]

export default function AdminPortalLayout({ children }: { children: ReactNode }) {
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

