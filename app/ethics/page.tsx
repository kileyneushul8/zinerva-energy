import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export default function EthicsPage() {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-teal-900 mb-6">Ethics & Compliance Contact</h2>
            <Button
                variant="default"
                className="bg-teal-400 hover:bg-teal-500 text-white"
                onClick={() => window.location.href = 'mailto:account.management@zinervacompany.com'}
            >
                Contact Ethics Committee
                <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="mt-6 text-teal-600">
                All inquiries are treated with strict confidentiality
            </p>
        </div>
    )
} 