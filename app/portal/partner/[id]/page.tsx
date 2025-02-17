import { notFound } from "next/navigation"

async function getPartner(id: string) {
  const res = await fetch(`/api/partners/${id}`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch partner")
  }
  return res.json()
}

export default async function PartnerPage({ params }: { params: { id: string } }) {
  let partner
  try {
    partner = await getPartner(params.id)
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Partner Details</h1>
        <div className="bg-white/5 rounded-lg p-6">
          <p className="mb-4">
            <span className="font-semibold">Name:</span> {partner.name}
          </p>
          <p className="mb-4">
            <span className="font-semibold">ID:</span> {partner.id}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {partner.email}
          </p>
        </div>
      </div>
    </div>
  )
}

