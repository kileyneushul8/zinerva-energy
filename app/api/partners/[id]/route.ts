import { NextResponse } from "next/server"

// This is a mock database. In a real application, you would fetch this data from your actual database.
const partners = [
  { id: "1", name: "Partner 1", email: "partner1@example.com" },
  { id: "2", name: "Partner 2", email: "partner2@example.com" },
  // Add more mock partners as needed
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const partner = partners.find((p) => p.id === params.id)

  if (!partner) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 })
  }

  return NextResponse.json(partner)
}

