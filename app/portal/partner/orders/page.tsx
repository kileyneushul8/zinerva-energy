import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Order Management</h1>
      <div className="flex justify-between items-center">
        <Input className="w-64" placeholder="Search orders..." />
        <Button>Create New Order</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>
                <Badge variant={order.status === "Completed" ? "default" : "secondary"}>{order.status}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const orders = [
  { id: "1234", customer: "Alice Johnson", date: "2023-06-01", total: 300, status: "Completed" },
  { id: "1235", customer: "Bob Smith", date: "2023-06-02", total: 150, status: "Processing" },
  { id: "1236", customer: "Charlie Brown", date: "2023-06-03", total: 200, status: "Completed" },
  { id: "1237", customer: "Diana Prince", date: "2023-06-04", total: 450, status: "Shipped" },
  { id: "1238", customer: "Ethan Hunt", date: "2023-06-05", total: 275, status: "Processing" },
]

