import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Visions.services - Next-Gen Software Solutions",
  description: "Complete software development solutions including web apps, UI/UX design, SEO, cloud optimization (AWS/GCP/Azure), digital marketing, automation tools, and AI chatbots. Bharat Utsav Sale Oct 2025 - Mar 2026!",
  keywords: [
    "software development company",
    "web development India",
    "mobile app development",
    "UI/UX design services",
    "SEO optimization",
    "cloud solutions AWS Azure GCP",
    "AI chatbot development",
    "digital marketing services",
    "automation tools",
    "custom software development",
  ],
  canonicalUrl: "/",
});
