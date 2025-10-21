import { Metadata } from "next";

// Base URL configuration
export const siteConfig = {
  name: "Visions.services",
  description: "Complete software development solutions including web apps, UI/UX design, SEO, cloud optimization (AWS/GCP/Azure), digital marketing, automation tools, and AI chatbots.",
  url: "https://visions.services",
  ogImage: "/images/og-image.jpg",
  links: {
    twitter: "https://twitter.com/techvision",
    linkedin: "https://linkedin.com/company/techvision",
    github: "https://github.com/techvision",
  },
  creator: "Visions.services",
  keywords: [
    "software development",
    "web development",
    "UI/UX design",
    "SEO optimization",
    "cloud solutions",
    "AWS services",
    "GCP services",
    "Azure services",
    "digital marketing",
    "AI chatbot development",
    "automation tools",
    "CRM systems",
    "e-commerce solutions",
    "mobile app development",
    "DevOps services",
    "custom software",
    "India software company",
    "tech consulting",
  ],
};

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  canonicalUrl?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function generateSEO({
  title,
  description = siteConfig.description,
  keywords = [],
  ogImage = siteConfig.ogImage,
  ogType = "website",
  canonicalUrl,
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const allKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(", "),
    authors: authors ? authors.map(name => ({ name })) : [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.creator,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl || "/",
    },
    openGraph: {
      type: ogType,
      locale: "en_US",
      url: canonicalUrl || siteConfig.url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@techvision",
      site: "@techvision",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code", // Add your verification code
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
  };
}

// Structured Data Helpers
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Mumbai", // Update with your location
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.github,
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/services?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: service.provider,
    },
    areaServed: service.areaServed || "Worldwide",
    ...(service.offers && {
      offers: {
        "@type": "Offer",
        price: service.offers.price,
        priceCurrency: service.offers.priceCurrency,
      },
    }),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateReviewSchema(reviews: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: siteConfig.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: reviews.length.toString(),
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
      },
    })),
  };
}
