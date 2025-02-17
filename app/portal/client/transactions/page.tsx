import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Product Catalog</h1>

      <div className="flex gap-4 items-center">
        <Input className="max-w-xs" placeholder="Search products..." />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="devices">Devices</SelectItem>
            <SelectItem value="pods">Pods</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

const products = [
  { id: "PROD001", name: "Premium Flavor Pods", category: "Pods", price: 49.99, status: "In Stock" },
  { id: "PROD002", name: "Electronic Hookah Device", category: "Devices", price: 199.99, status: "In Stock" },
  { id: "PROD003", name: "Accessory Kit", category: "Accessories", price: 29.99, status: "In Stock" },
  { id: "PROD004", name: "Flavor Sampler Pack", category: "Pods", price: 39.99, status: "Low Stock" },
  { id: "PROD005", name: "Limited Edition Pods", category: "Pods", price: 59.99, status: "In Stock" },
  { id: "PROD006", name: "Cleaning Kit", category: "Accessories", price: 19.99, status: "In Stock" },
  { id: "PROD007", name: "Portable Hookah", category: "Devices", price: 149.99, status: "Out of Stock" },
  { id: "PROD008", name: "Flavor Enhancer", category: "Accessories", price: 9.99, status: "In Stock" },
]

