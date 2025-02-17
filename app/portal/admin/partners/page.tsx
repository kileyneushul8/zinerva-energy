import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PartnersPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Partner Management</h1>
        <Button>Add New Partner</Button>
      </div>

      <div className="flex gap-4 items-center">
        <Input className="max-w-xs" placeholder="Search partners..." />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Partners</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Partner Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell className="font-medium">{partner.name}</TableCell>
              <TableCell>{partner.type}</TableCell>
              <TableCell>{partner.location}</TableCell>
              <TableCell>${partner.revenue.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(partner.status)}>{partner.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const partners = [
  {
    id: 1,
    name: "Global Distribution Co",
    type: "Distributor",
    location: "North America",
    revenue: 125000,
    status: "active",
  },
  {
    id: 2,
    name: "Euro Partners Ltd",
    type: "Reseller",
    location: "Europe",
    revenue: 98000,
    status: "active",
  },
  {
    id: 3,
    name: "Asia Trade Network",
    type: "Distributor",
    location: "Asia Pacific",
    revenue: 87500,
    status: "pending",
  },
  {
    id: 4,
    name: "Middle East Ventures",
    type: "Reseller",
    location: "Middle East",
    revenue: 76000,
    status: "active",
  },
  {
    id: 5,
    name: "African Markets Ltd",
    type: "Distributor",
    location: "Africa",
    revenue: 45000,
    status: "suspended",
  },
]

function getStatusVariant(status: string) {
  switch (status) {
    case "active":
      return "default"
    case "pending":
      return "secondary"
    case "suspended":
      return "destructive"
    default:
      return "default"
  }
}

