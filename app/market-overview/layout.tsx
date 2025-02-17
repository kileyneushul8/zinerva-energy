import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Market Overview | Zinerva Energy",
  description: "Real-time insights into energy markets, product analysis, and global operations."
}

export default function MarketOverviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 