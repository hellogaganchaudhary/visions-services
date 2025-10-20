'use client';

import HeroSection from "@/components/home/HeroSection";
import SalesBanner from "@/components/home/SalesBanner";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturesSection from "@/components/home/FeaturesSection";
import TechStack from "@/components/home/TechStack";
import CTASection from "@/components/home/CTASection";
import FloatingElements from "@/components/FloatingElements";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import StructuredData from "@/components/StructuredData";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";

export default function Home() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <FloatingElements />
      <SalesBanner />
      <HeroSection />
      <ServicesPreview />
      <FeaturesSection />
      <TestimonialsSection variant="carousel" limit={5} />
      <TechStack />
      <CTASection />
    </>
  );
}
