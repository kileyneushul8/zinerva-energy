export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zinerva Energy",
    "url": "https://www.zinervacompany.com",
    "logo": "https://www.zinervacompany.com/placeholder-logo.png",
    "description": "Leading global energy trading and distribution company connecting suppliers and consumers worldwide with sustainable energy solutions.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0000",
      "contactType": "Customer Service",
      "email": "admin@zinervacompany.com",
      "areaServed": "Worldwide",
      "availableLanguage": ["en"]
    },
    "sameAs": [
      // Add social media links when available
      // "https://www.linkedin.com/company/zinerva-energy",
      // "https://twitter.com/zinervaenergy"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zinerva Energy",
    "url": "https://www.zinervacompany.com",
    "description": "Global energy trading and distribution solutions",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.zinervacompany.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

