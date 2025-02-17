import Link from "next/link"
import { Mail } from "lucide-react"

const legalLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Ethics & Compliance", href: "/ethics-compliance" }
]

export function Footer() {
  return (
    <footer className="bg-teal-900 text-teal-100">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">About Zinerva</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-orange-300 transition-colors">
                  Company Overview
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-orange-300 transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-orange-300 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/energy-trading" className="hover:text-orange-300 transition-colors">
                  Energy Trading
                </Link>
              </li>
              <li>
                <Link href="/global-network" className="hover:text-orange-300 transition-colors">
                  Global Network
                </Link>
              </li>
              <li>
                <Link href="/risk-management" className="hover:text-orange-300 transition-colors">
                  Risk Management
                </Link>
              </li>
              <li>
                <Link href="/market-overview" className="hover:text-orange-300 transition-colors">
                  Market Overview
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-orange-300 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-300 shrink-0" />
                <a
                  href="mailto:account.management@zinervacompany.com"
                  className="hover:text-orange-300 transition-colors whitespace-nowrap"
                >
                  account.management@zinervacompany.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-teal-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Zinerva Energy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

