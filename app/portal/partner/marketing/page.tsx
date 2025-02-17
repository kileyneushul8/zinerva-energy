import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download } from "lucide-react"

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Marketing Materials</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {marketingMaterials.map((material, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{material.title}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">{material.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const marketingMaterials = [
  { title: "Product Catalog", description: "Detailed information about our product range" },
  { title: "Brand Guidelines", description: "Our brand identity and usage guidelines" },
  { title: "Social Media Kit", description: "Templates and assets for social media marketing" },
  { title: "Email Templates", description: "Pre-designed email templates for campaigns" },
  { title: "Promotional Flyers", description: "Printable flyers for local marketing" },
  { title: "Video Assets", description: "Product demos and promotional videos" },
]

