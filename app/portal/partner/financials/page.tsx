import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, DollarSign, TrendingUp } from "lucide-react"

export default function FinancialsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Financials & Commissions</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {financialCards.map((card, index) => (
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
      <Card>
        <CardHeader>
          <CardTitle>Commission History</CardTitle>
          <CardDescription>Your earnings over the past months</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissionHistory.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.month}</TableCell>
                  <TableCell>{record.orders}</TableCell>
                  <TableCell>${record.totalSales}</TableCell>
                  <TableCell>{record.commissionRate}%</TableCell>
                  <TableCell>${record.earnings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

const financialCards = [
  { title: "Total Earnings", value: "$12,345.67", icon: DollarSign, description: "Your total commissions to date" },
  { title: "This Month", value: "$2,345.67", icon: TrendingUp, description: "Your earnings this month" },
  { title: "Average Commission", value: "15%", icon: BarChart, description: "Your average commission rate" },
]

const commissionHistory = [
  { month: "June 2023", orders: 150, totalSales: 15000, commissionRate: 15, earnings: 2250 },
  { month: "May 2023", orders: 130, totalSales: 13000, commissionRate: 15, earnings: 1950 },
  { month: "April 2023", orders: 145, totalSales: 14500, commissionRate: 15, earnings: 2175 },
  { month: "March 2023", orders: 120, totalSales: 12000, commissionRate: 15, earnings: 1800 },
  { month: "February 2023", orders: 110, totalSales: 11000, commissionRate: 15, earnings: 1650 },
]

