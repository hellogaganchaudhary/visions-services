import ServiceDetailClient from './ServiceDetailClient';

const allServiceSlugs = [
  'wordpress-website', 'full-stack-web-app', 'ecommerce-website', 'business-website', 'landing-page', 'web-portal',
  'enterprise-mobile-app', 'moderate-business-app', 'basic-mobile-app', 'ecommerce-app', 'social-media-app', 'on-demand-service-app',
  'complete-ui-ux-design', 'mobile-app-design', 'website-design', 'brand-identity', 'design-system', 'ui-animation',
  'technical-seo', 'local-seo', 'on-page-seo', 'off-page-seo', 'ecommerce-seo', 'seo-audit',
  'aws-configuration', 'azure-setup', 'google-cloud-platform', 'cost-optimization', 'devops-setup', 'migration-services',
  'social-media-marketing', 'ppc-advertising', 'email-marketing', 'content-marketing', 'influencer-marketing', 'analytics-reporting',
  'customer-support-bot', 'ecommerce-bot', 'lead-generation-bot', 'ai-voice-assistant', 'whatsapp-bot', 'custom-ai-bot',
  'enterprise-software', 'crm-system', 'erp-system', 'inventory-management', 'booking-system', 'custom-dashboard',
];

export async function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({ slug }));
}

export default function ServiceDetailPage() {
  return <ServiceDetailClient allServices={[]} />;
}
