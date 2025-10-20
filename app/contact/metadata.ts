import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Contact Us - Get a Free Consultation | TechVision",
  description: "Get in touch with TechVision for custom software development solutions. Free consultation available! Contact us for web development, mobile apps, UI/UX design, cloud services, SEO, and more. Fast response guaranteed.",
  keywords: [
    "contact software company",
    "free consultation software development",
    "web development quote",
    "mobile app development inquiry",
    "get in touch TechVision",
    "software development contact",
    "request quote",
    "hire developers",
  ],
  canonicalUrl: "/contact",
});
