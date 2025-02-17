import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Leadership Team | Zinerva Energy",
    description: "Meet Gabriel Hernandez, CEO of Zinerva Energy, leading our mission to revolutionize global energy trading with sustainable practices and innovative solutions.",
    openGraph: {
        title: "Leadership Team | Zinerva Energy",
        description: "Meet our visionary leadership team driving innovation in global energy trading.",
        images: [
            {
                url: "/og-leadership.jpg", // You'll need to add this image
                width: 1200,
                height: 630,
                alt: "Zinerva Energy Leadership"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Leadership Team | Zinerva Energy",
        description: "Meet our visionary leadership team driving innovation in global energy trading.",
        images: ["/og-leadership.jpg"]
    },
    keywords: [
        "Zinerva Energy",
        "Gabriel Hernandez",
        "Energy Trading",
        "Leadership",
        "Executive Team",
        "Sustainable Energy",
        "Global Energy Market"
    ]
} 