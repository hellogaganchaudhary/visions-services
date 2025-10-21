import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://visions.services";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Common service slugs
  const serviceSlugs = [
    'wordpress-website', 'full-stack-web-app', 'ecommerce-website', 'business-website',
    'landing-page', 'web-portal', 'enterprise-mobile-app', 'moderate-business-app',
    'basic-mobile-app', 'ecommerce-app', 'social-media-app', 'on-demand-service-app',
    'complete-ui-ux-design', 'mobile-app-design', 'website-design', 'brand-identity',
    'design-system', 'ui-animation', 'technical-seo', 'local-seo', 'on-page-seo',
    'off-page-seo', 'ecommerce-seo', 'seo-audit', 'aws-configuration', 'azure-setup',
    'google-cloud-platform', 'cost-optimization', 'devops-setup', 'migration-services'
  ];

  // Dynamic service pages
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages];
}
