import ServiceDetailClient from './ServiceDetailClient';

// Define all service slugs for static generation
const allServiceSlugs = [
  // Web Development
  'wordpress-website',
  'full-stack-app',
  'ecommerce-website',
  'business-website',
  'landing-page',
  'web-portal',
  
  // Application Development
  'enterprise-mobile-app',
  'moderate-business-app',
  'basic-mobile-app',
  'ecommerce-app',
  'social-media-app',
  'on-demand-service-app',
  
  // UI/UX Design
  'complete-ui-ux-design',
  'mobile-app-design',
  'website-design',
  'brand-identity',
  'design-system',
  'ui-animation',
  
  // SEO Services
  'technical-seo',
  'local-seo',
  'on-page-seo',
  'off-page-seo',
  'ecommerce-seo',
  'seo-audit',
  
  // Cloud Optimization
  'aws-configuration',
  'azure-setup',
  'google-cloud-platform',
  'cost-optimization',
  'devops-setup',
  'migration-services',
  
  // Digital Marketing
  'social-media-marketing',
  'ppc-advertising',
  'email-marketing',
  'content-marketing',
  'influencer-marketing',
  'analytics-reporting',
  
  // AI Chatbot Development
  'customer-support-bot',
  'ecommerce-bot',
  'lead-generation-bot',
  'ai-voice-assistant',
  'whatsapp-bot',
  'custom-ai-bot',
  
  // Custom Software Development
  'enterprise-software',
  'crm-system',
  'erp-system',
  'inventory-management',
  'booking-system',
  'custom-dashboard',
];

export async function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({
    slug,
  }));
}

export default function ServiceDetailPage() {
  return <ServiceDetailClient allServices={[]} />;
}