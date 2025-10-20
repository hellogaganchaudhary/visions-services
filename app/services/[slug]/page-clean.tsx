import ServiceDetailClient from './ServiceDetailClient';

// Generate static params for all service slugs
export async function generateStaticParams() {
  // All possible service slugs for static generation
  const allSlugs = [
    'wordpress-website', 'full-stack-app', 'ecommerce-website', 'business-website', 'landing-page', 'web-portal',
    'enterprise-mobile-app', 'moderate-business-app', 'basic-mobile-app', 'ecommerce-app', 'social-media-app', 'on-demand-service-app',
    'complete-ui-ux-design', 'mobile-app-design', 'website-design', 'brand-identity', 'design-system', 'ui-animation',
    'technical-seo', 'local-seo', 'on-page-seo', 'off-page-seo', 'ecommerce-seo', 'seo-audit',
    'aws-configuration', 'azure-setup', 'google-cloud-platform', 'cost-optimization', 'devops-setup', 'migration-services',
    'social-media-marketing', 'ppc-advertising', 'email-marketing', 'content-marketing', 'influencer-marketing', 'analytics-reporting',
    'customer-support-bot', 'ecommerce-bot', 'lead-generation-bot', 'ai-voice-assistant', 'whatsapp-bot', 'custom-ai-bot',
    'enterprise-software', 'crm-system', 'erp-system', 'inventory-management', 'booking-system', 'custom-dashboard'
  ];
  
  return allSlugs.map((slug) => ({
    slug: slug,
  }));
}

// Pass empty array for now - the ServiceDetailClient will handle the data internally
export default function ServiceDetailPage() {
  return <ServiceDetailClient allServices={[]} />;
}