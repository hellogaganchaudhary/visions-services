'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code, Palette, Search, Cloud, Megaphone, Bot, Package, BarChart,
  ShoppingCart, Smartphone, Globe, Server, Mail, MessageSquare,
  Menu, X, ChevronDown, ChevronRight, Sparkles
} from 'lucide-react';

// Service categories with all services
export const serviceCategories = [
  {
    name: 'Web Development',
    slug: 'web-development',
    icon: Code,
    color: '#06b6d4',
    services: [
      { name: 'WordPress Website', slug: 'wordpress-website', icon: Globe },
      { name: 'Full-Stack Web App', slug: 'full-stack-web-app', icon: Code },
      { name: 'E-Commerce Website', slug: 'ecommerce-website', icon: ShoppingCart },
      { name: 'Landing Page', slug: 'landing-page', icon: Sparkles },
      { name: 'Progressive Web App', slug: 'progressive-web-app', icon: Smartphone },
      { name: 'Custom CMS', slug: 'custom-cms', icon: Server },
    ],
  },
  {
    name: 'App Development',
    slug: 'app-development',
    icon: Smartphone,
    color: '#a855f7',
    services: [
      { name: 'Android App Development', slug: 'android-app-development', icon: Smartphone },
      { name: 'iOS App Development', slug: 'ios-app-development', icon: Smartphone },
      { name: 'Cross-Platform App', slug: 'cross-platform-app', icon: Smartphone },
      { name: 'Enterprise Mobile App', slug: 'enterprise-mobile-app', icon: Server },
      { name: 'Mobile Game Development', slug: 'mobile-game-development', icon: Sparkles },
      { name: 'AR/VR App Development', slug: 'ar-vr-app-development', icon: Bot },
    ],
  },
  {
    name: 'Design Services',
    slug: 'design-services',
    icon: Palette,
    color: '#f43f5e',
    services: [
      { name: 'UI/UX Design', slug: 'ui-ux-design', icon: Palette },
      { name: 'Graphic Design', slug: 'graphic-design', icon: Palette },
      { name: 'Branding & Identity', slug: 'branding-identity', icon: Sparkles },
      { name: 'Motion Graphics', slug: 'motion-graphics', icon: Sparkles },
      { name: '3D Modeling & Animation', slug: '3d-modeling', icon: Bot },
      { name: 'Print Design', slug: 'print-design', icon: Palette },
    ],
  },
  {
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: Megaphone,
    color: '#10b981',
    services: [
      { name: 'Social Media Marketing', slug: 'social-media-marketing', icon: MessageSquare },
      { name: 'PPC Advertising', slug: 'ppc-advertising', icon: Megaphone },
      { name: 'Content Marketing', slug: 'content-marketing', icon: Mail },
      { name: 'Email Marketing', slug: 'email-marketing', icon: Mail },
      { name: 'Influencer Marketing', slug: 'influencer-marketing', icon: MessageSquare },
      { name: 'Video Marketing', slug: 'video-marketing', icon: Sparkles },
    ],
  },
  {
    name: 'Cloud & DevOps',
    slug: 'cloud-devops',
    icon: Cloud,
    color: '#0ea5e9',
    services: [
      { name: 'AWS Cloud Solutions', slug: 'aws-cloud-solutions', icon: Cloud },
      { name: 'Azure Cloud Services', slug: 'azure-cloud-services', icon: Cloud },
      { name: 'Google Cloud Platform', slug: 'google-cloud-platform', icon: Cloud },
      { name: 'CI/CD Pipeline Setup', slug: 'ci-cd-pipeline', icon: Server },
      { name: 'Kubernetes Deployment', slug: 'kubernetes-deployment', icon: Server },
      { name: 'Cloud Monitoring & Optimization', slug: 'cloud-monitoring', icon: BarChart },
    ],
  },
  {
    name: 'AI & Automation',
    slug: 'ai-automation',
    icon: Bot,
    color: '#f59e0b',
    services: [
      { name: 'AI Chatbot Development', slug: 'ai-chatbot-development', icon: Bot },
      { name: 'Machine Learning Solutions', slug: 'machine-learning-solutions', icon: Bot },
      { name: 'Process Automation (RPA)', slug: 'process-automation', icon: Server },
      { name: 'Recommendation Engine', slug: 'recommendation-engine', icon: Sparkles },
      { name: 'Natural Language Processing', slug: 'natural-language-processing', icon: MessageSquare },
      { name: 'Computer Vision', slug: 'computer-vision', icon: Bot },
    ],
  },
  {
    name: 'E-Commerce',
    slug: 'ecommerce',
    icon: ShoppingCart,
    color: '#6366f1',
    services: [
      { name: 'Shopify Store Setup', slug: 'shopify-store-setup', icon: ShoppingCart },
      { name: 'WooCommerce Development', slug: 'woocommerce-development', icon: ShoppingCart },
      { name: 'Custom E-Commerce Platform', slug: 'custom-ecommerce-platform', icon: Server },
      { name: 'Payment Gateway Integration', slug: 'payment-gateway-integration', icon: ShoppingCart },
      { name: 'Inventory Management System', slug: 'inventory-management', icon: Package },
      { name: 'E-Commerce SEO', slug: 'ecommerce-seo', icon: Search },
    ],
  },
  {
    name: 'Analytics & BI',
    slug: 'analytics-bi',
    icon: BarChart,
    color: '#14b8a6',
    services: [
      { name: 'Analytics Dashboard', slug: 'analytics-dashboard', icon: BarChart },
      { name: 'Business Intelligence', slug: 'business-intelligence', icon: BarChart },
      { name: 'Data Visualization', slug: 'data-visualization', icon: BarChart },
      { name: 'Custom Reporting', slug: 'custom-reporting', icon: BarChart },
      { name: 'Predictive Analytics', slug: 'predictive-analytics', icon: Bot },
      { name: 'Data Integration', slug: 'data-integration', icon: Server },
    ],
  },
];

export default function ServicesNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedCategory(null);
  }, [pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setExpandedCategory(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Filter services based on search
  const filteredCategories = serviceCategories.map(category => ({
    ...category,
    services: category.services.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.services.length > 0);

  const toggleCategory = (slug: string) => {
    setExpandedCategory(expandedCategory === slug ? null : slug);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9))',
        }}
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 lg:hidden overflow-y-auto"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-gray-900/95 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                  />
                </div>

                {/* Service Categories Catalogue */}
                <div className="space-y-4">
                  {serviceCategories.map((category) => {
                    const CategoryIcon = category.icon;
                    return (
                      <div key={category.slug} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <CategoryIcon className="w-8 h-8" style={{ color: category.color }} />
                        <div>
                          <div className="font-semibold text-lg text-white mb-1">{category.name}</div>
                          <div className="text-gray-400 text-sm mb-1">{category.services.length} services</div>
                          <div className="text-gray-300 text-xs">{category.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/services"
                  className="block w-full py-4 px-6 rounded-xl text-center font-bold text-white transition-all mt-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9))',
                  }}
                >
                  View All Services
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
