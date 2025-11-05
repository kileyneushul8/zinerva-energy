import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Zinerva Energy - Global Energy Trading & Distribution",
    template: "%s | Zinerva Energy"
  },
  description: "Leading global energy trading and distribution company connecting suppliers and consumers worldwide with sustainable energy solutions.",
  keywords: ["energy trading", "energy distribution", "global energy", "sustainable energy", "energy markets", "Zinerva"],
  authors: [{ name: "Zinerva Energy" }],
  creator: "Zinerva Energy",
  publisher: "Zinerva Energy",
  metadataBase: new URL("https://www.zinervacompany.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.zinervacompany.com",
    siteName: "Zinerva Energy",
    title: "Zinerva Energy - Global Energy Trading & Distribution",
    description: "Leading global energy trading and distribution company connecting suppliers and consumers worldwide with sustainable energy solutions.",
    images: [
      {
        url: "/bridge-sunset.jpg",
        width: 1200,
        height: 630,
        alt: "Zinerva Energy - Bridging Global Energy Markets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinerva Energy - Global Energy Trading & Distribution",
    description: "Leading global energy trading and distribution company connecting suppliers and consumers worldwide with sustainable energy solutions.",
    images: ["/bridge-sunset.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes when available
    // google: "your-google-verification-code",
    // bing: "your-bing-verification-code",
  },
}
