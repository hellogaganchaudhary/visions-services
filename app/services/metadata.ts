import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Our Services - Complete Software Development Solutions",
  description: "Explore our comprehensive software services: Web Development, Mobile Apps, UI/UX Design, SEO Optimization, Cloud Solutions (AWS/Azure/GCP), Digital Marketing, AI Chatbots, and Automation Tools. Get a free consultation!",
  keywords: [
    "software development services",
    "web development packages",
    "mobile app development cost",
    "UI/UX design services",
    "SEO services India",
    "cloud migration services",
    "AI chatbot development",
    "digital marketing packages",
    "custom software solutions",
    "e-commerce development",
  ],
  canonicalUrl: "/services",
});
