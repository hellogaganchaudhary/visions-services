import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Contact Us - Get a Free Consultation | Visions.services",
  description: "Get in touch with Visions.services for custom software development solutions. Free consultation available! Contact us for web development, mobile apps, UI/UX design, cloud services, SEO, and more. Fast response guaranteed.",
  keywords: [
    "contact software company",
    "free consultation software development",
    "web development quote",
    "mobile app development inquiry",
    "get in touch Visions.services",
    "software development contact",
    "request quote",
    "hire developers",
  ],
  canonicalUrl: "/contact",
});
