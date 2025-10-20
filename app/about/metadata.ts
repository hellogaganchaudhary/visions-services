import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "About Us - TechVision Solutions",
  description: "Learn about TechVision, a leading software development company offering innovative solutions in web development, mobile apps, UI/UX design, cloud services, and AI. Our mission is to transform businesses through technology.",
  keywords: [
    "about TechVision",
    "software development team",
    "tech company India",
    "web development agency",
    "our mission vision",
    "software development services",
    "technology solutions provider",
  ],
  canonicalUrl: "/about",
});
