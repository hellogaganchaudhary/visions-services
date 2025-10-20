import ServiceDetailClient from './ServiceDetailClient';
import {
  Code, Palette, Search, Cloud, Bot, Layers, 
  Globe, Server, Briefcase, Package, Smartphone, MessageSquare
} from 'lucide-react';

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

// Simplified services data for static generation
const allServices = [
  {
    category: 'Web Development',
    categorySlug: 'web-development',
    categoryIcon: Code,
    categoryColor: '#06b6d4',
    services: [
      {
        slug: 'wordpress-website',
        icon: Globe,
        name: 'WordPress Website',
        tagline: 'Professional CMS-based websites with unlimited possibilities',
        price: '₹15,000 - ₹30,000',
        description: 'Get a fully functional WordPress website with custom themes, plugins, and complete control over your content.',
        deliveryTime: '2-3 weeks',
        features: ['Custom Theme Design', 'Plugin Integration', 'SEO-Ready Structure', 'Responsive Design'],
        process: [
          { step: 'Discovery', description: 'Understanding your needs', duration: '1-2 days' },
          { step: 'Design', description: 'Creating mockups', duration: '3-4 days' },
          { step: 'Development', description: 'Building the site', duration: '7-10 days' },
          { step: 'Launch', description: 'Going live', duration: '1 day' },
        ],
        technologies: ['WordPress', 'PHP', 'MySQL', 'CSS3', 'JavaScript'],
        benefits: ['Easy content management', 'SEO-friendly', 'Cost-effective'],
        portfolio: [
          { name: 'Local Restaurant', industry: 'Food', result: '300% increase in orders' },
        ],
        faqs: [
          { q: 'Can I update content myself?', a: 'Yes, WordPress is designed for easy updates.' },
        ],
      },
      // Add other services with minimal data to keep file size manageable
    ],
  },
  // Add other categories as needed
];

export default function ServiceDetailPage() {
  return <ServiceDetailClient allServices={allServices} />;
}