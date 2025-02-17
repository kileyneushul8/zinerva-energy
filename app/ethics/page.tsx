import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

// Update the contact button section
<Button
    variant="default"
    className="bg-teal-400 hover:bg-teal-500 text-white"
    onClick={() => window.location.href = 'mailto:account.management@zinervacompany.com'}
>
    Contact Ethics Committee
    <ArrowUpRight className="ml-2 h-4 w-4" />
</Button> 