import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Customer Management</h1>
      <div className="flex justify-between items-center">
        <Input className="w-64" placeholder="Search customers..." />
        <Button>Add New Customer</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.totalOrders}</TableCell>
              <TableCell>${customer.totalSpent}</TableCell>
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

const customers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", totalOrders: 5, totalSpent: 1200 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", totalOrders: 3, totalSpent: 950 },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", totalOrders: 7, totalSpent: 875 },
  { id: 4, name: "Diana Prince", email: "diana@example.com", totalOrders: 2, totalSpent: 700 },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", totalOrders: 4, totalSpent: 650 },
]

