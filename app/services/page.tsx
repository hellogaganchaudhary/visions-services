'use client';

import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Code, Palette, Search, Cloud, Megaphone, Bot, Layers, Zap,
  CheckCircle, ArrowRight, Sparkles, Star, Users, Clock, TrendingUp,
  ShoppingCart, Smartphone, Globe, Server, Briefcase, Package,
  BarChart, Mail, MessageSquare, Settings, ChevronLeft, ChevronRight, ExternalLink
} from 'lucide-react';

export default function ServicesPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      slug: 'web-development',
      description: 'Custom websites and web applications built with cutting-edge technologies',
      color: 'from-blue-600 via-cyan-500 to-teal-500',
      glowColor: 'rgba(6, 182, 212, 0.6)',
      shadowColor: '#06b6d4',
      subcategories: [
        {
          slug: 'wordpress-website',
          icon: Globe,
          name: 'WordPress Website',
          price: '₹15,000 - ₹30,000',
          description: 'Professional CMS-based websites',
          features: ['Custom Themes', 'Plugin Integration', 'SEO Ready', 'Responsive Design', 'Admin Training'],
          deliveryTime: '2-3 weeks',
        },
        {
          slug: 'full-stack-web-app',
          icon: Code,
          name: 'Full-Stack Web App',
          price: '₹40,000 - ₹80,000',
          description: 'Complete MERN/MEAN stack solutions',
          features: ['React/Angular', 'Node.js Backend', 'Database Design', 'API Development', 'Authentication'],
          deliveryTime: '4-6 weeks',
        },
        {
          slug: 'ecommerce-website',
          icon: ShoppingCart,
          name: 'E-Commerce Website',
          price: '₹35,000 - ₹60,000',
          description: 'Online stores with payment gateway',
          features: ['Shopping Cart', 'Payment Gateway', 'Inventory Management', 'Order Tracking', 'Admin Panel'],
          deliveryTime: '4-5 weeks',
        },
        {
          slug: 'business-website',
          icon: Briefcase,
          name: 'Business Website',
          price: '₹20,000 - ₹40,000',
          description: 'Corporate and portfolio sites',
          features: ['Responsive Design', 'CMS Integration', 'Analytics', 'Contact Forms', 'Blog'],
          deliveryTime: '2-4 weeks',
        },
        {
          slug: 'landing-page',
          icon: Zap,
          name: 'Landing Page',
          price: '₹10,000 - ₹20,000',
          description: 'High-converting landing pages',
          features: ['Fast Loading', 'SEO Optimized', 'Mobile First', 'Lead Capture', 'A/B Testing Ready'],
          deliveryTime: '1-2 weeks',
        },
        {
          slug: 'web-portal',
          icon: Server,
          name: 'Web Portal',
          price: '₹50,000+',
          description: 'Enterprise-level portals',
          features: ['User Management', 'Dashboard', 'API Integration', 'Role-based Access', 'Analytics'],
          deliveryTime: '6-8 weeks',
        },
      ],
    },
    {
      icon: Smartphone,
      title: 'Application Development',
      description: 'Native and cross-platform mobile applications',
      color: 'from-purple-600 via-fuchsia-500 to-pink-600',
      glowColor: 'rgba(217, 70, 239, 0.7)',
      shadowColor: '#d946ef',
      subcategories: [
        {
          slug: 'enterprise-mobile-app',
          icon: Smartphone,
          name: 'Enterprise Mobile App',
          price: '₹80,000 - ₹150,000',
          description: 'Large-scale business applications',
          features: ['Native iOS/Android', 'Real-time Sync', 'Advanced Security', 'Offline Support', 'Push Notifications'],
          deliveryTime: '8-12 weeks',
        },
        {
          slug: 'moderate-business-app',
          icon: Package,
          name: 'Moderate Business App',
          price: '₹50,000 - ₹80,000',
          description: 'Mid-size app with core features',
          features: ['Cross-platform', 'Cloud Backend', 'Push Notifications', 'In-app Purchases', 'Analytics'],
          deliveryTime: '6-8 weeks',
        },
        {
          slug: 'basic-mobile-app',
          icon: Layers,
          name: 'Basic Mobile App',
          price: '₹30,000 - ₹50,000',
          description: 'Simple and functional apps',
          features: ['React Native', 'Firebase', 'Basic Features', 'App Store Submission', 'Support'],
          deliveryTime: '4-6 weeks',
        },
        {
          slug: 'ecommerce-app',
          icon: ShoppingCart,
          name: 'E-Commerce App',
          price: '₹60,000 - ₹100,000',
          description: 'Mobile shopping experience',
          features: ['Product Catalog', 'Payment Integration', 'Order Tracking', 'Wishlist', 'Reviews'],
          deliveryTime: '6-10 weeks',
        },
        {
          slug: 'social-media-app',
          icon: MessageSquare,
          name: 'Social Media App',
          price: '₹70,000 - ₹120,000',
          description: 'Community and social platforms',
          features: ['User Profiles', 'Real-time Chat', 'Feed System', 'Media Sharing', 'Notifications'],
          deliveryTime: '8-12 weeks',
        },
        {
          slug: 'on-demand-service-app',
          icon: Briefcase,
          name: 'On-Demand Service App',
          price: '₹65,000 - ₹110,000',
          description: 'Uber-like service apps',
          features: ['Booking System', 'GPS Tracking', 'Payment Gateway', 'Driver/User Apps', 'Admin Panel'],
          deliveryTime: '8-10 weeks',
        },
      ],
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that engage users',
      color: 'from-pink-600 via-rose-500 to-red-500',
      glowColor: 'rgba(244, 63, 94, 0.7)',
      shadowColor: '#f43f5e',
      subcategories: [
        {
          slug: 'complete-ui-ux-design',
          icon: Palette,
          name: 'Complete UI/UX Design',
          price: '₹25,000 - ₹50,000',
          description: 'Full design system and prototypes',
          features: ['User Research', 'Wireframes', 'High-Fidelity Mockups', 'Prototypes', 'Design System'],
          deliveryTime: '3-5 weeks',
        },
        {
          slug: 'mobile-app-design',
          icon: Smartphone,
          name: 'Mobile App Design',
          price: '₹20,000 - ₹40,000',
          description: 'iOS and Android app interfaces',
          features: ['Material Design', 'iOS Guidelines', 'Animations', 'Icon Design', 'Clickable Prototype'],
          deliveryTime: '2-4 weeks',
        },
        {
          slug: 'website-design',
          icon: Globe,
          name: 'Website Design',
          price: '₹15,000 - ₹35,000',
          description: 'Responsive web interfaces',
          features: ['Desktop & Mobile', 'Interactive Elements', 'Modern Design', 'Style Guide', 'Assets'],
          deliveryTime: '2-3 weeks',
        },
        {
          slug: 'brand-identity',
          icon: Sparkles,
          name: 'Brand Identity',
          price: '₹18,000 - ₹40,000',
          description: 'Logo, colors, and brand guidelines',
          features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines', 'Stationery'],
          deliveryTime: '2-4 weeks',
        },
        {
          slug: 'design-system',
          icon: Layers,
          name: 'Design System',
          price: '₹30,000 - ₹60,000',
          description: 'Component library and guidelines',
          features: ['Component Library', 'Documentation', 'Figma/Sketch Files', 'Design Tokens', 'Scalable'],
          deliveryTime: '4-6 weeks',
        },
        {
          slug: 'ui-animation',
          icon: Code,
          name: 'UI Animation',
          price: '₹12,000 - ₹25,000',
          description: 'Micro-interactions and animations',
          features: ['Lottie Animations', 'CSS Animations', 'Interactive Prototypes', 'Motion Guidelines', 'Implementation Support'],
          deliveryTime: '1-3 weeks',
        },
      ],
    },
    {
      icon: Search,
      title: 'SEO Services',
      description: 'Boost your visibility and rank higher',
      color: 'from-green-600 via-emerald-500 to-teal-600',
      glowColor: 'rgba(16, 185, 129, 0.7)',
      shadowColor: '#10b981',
      subcategories: [
        {
          slug: 'technical-seo',
          icon: Search,
          name: 'Technical SEO',
          price: '₹15,000/month',
          description: 'Site optimization and fixes',
          features: ['Site Speed Optimization', 'Mobile Optimization', 'Schema Markup', 'XML Sitemaps', 'Crawl Error Fixes'],
          deliveryTime: 'Ongoing',
        },
        {
          slug: 'local-seo',
          icon: BarChart,
          name: 'Local SEO',
          price: '₹12,000/month',
          description: 'Rank in local searches',
          features: ['Google My Business', 'Local Citations', 'Review Management', 'Local Link Building', 'NAP Optimization'],
          deliveryTime: 'Ongoing',
        },
        {
          slug: 'on-page-seo',
          icon: Globe,
          name: 'On-Page SEO',
          price: '₹10,000/month',
          description: 'Content and keyword optimization',
          features: ['Keyword Research', 'Content Optimization', 'Meta Tags', 'Internal Linking', 'Image Optimization'],
          deliveryTime: 'Ongoing',
        },
        {
          slug: 'off-page-seo',
          icon: Zap,
          name: 'Off-Page SEO',
          price: '₹18,000/month',
          description: 'Link building and authority',
          features: ['Quality Backlinks', 'Guest Posting', 'Social Signals', 'Brand Mentions', 'Authority Building'],
          deliveryTime: 'Ongoing',
        },
        {
          slug: 'ecommerce-seo',
          icon: Package,
          name: 'E-Commerce SEO',
          price: '₹20,000/month',
          description: 'Product page optimization',
          features: ['Product Schema', 'Category Optimization', 'Rich Snippets', 'Product Feed', 'Shopping Ads'],
          deliveryTime: 'Ongoing',
        },
        {
          slug: 'seo-audit',
          icon: Settings,
          name: 'SEO Audit',
          price: '₹8,000 - ₹15,000',
          description: 'Complete site analysis',
          features: ['Technical Audit', 'Content Audit', 'Competitor Analysis', 'Action Plan', 'Priority Recommendations'],
          deliveryTime: '1-2 weeks',
        },
      ],
    },
    {
      icon: Cloud,
      title: 'Cloud Optimization',
      description: 'AWS, GCP, and Azure infrastructure management',
      color: 'from-orange-600 via-amber-500 to-yellow-500',
      glowColor: 'rgba(251, 146, 60, 0.7)',
      shadowColor: '#fb923c',
      subcategories: [
        {
          slug: 'aws-configuration',
          icon: Cloud,
          name: 'AWS Configuration',
          price: '₹25,000 - ₹50,000',
          description: 'Complete AWS setup and optimization',
          features: ['EC2, S3, RDS Setup', 'Load Balancing', 'Auto Scaling', 'Security Groups', 'Cost Optimization'],
          deliveryTime: '3-5 weeks',
        },
        {
          slug: 'azure-setup',
          icon: Server,
          name: 'Azure Setup',
          price: '₹25,000 - ₹50,000',
          description: 'Microsoft Azure implementation',
          features: ['Virtual Machines', 'App Services', 'SQL Database', 'Storage Accounts', 'Monitoring'],
          deliveryTime: '3-5 weeks',
        },
        {
          slug: 'google-cloud-platform',
          icon: Globe,
          name: 'Google Cloud Platform',
          price: '₹25,000 - ₹50,000',
          description: 'GCP infrastructure setup',
          features: ['Compute Engine', 'Cloud Storage', 'BigQuery', 'Cloud Functions', 'Networking'],
          deliveryTime: '3-5 weeks',
        },
        {
          slug: 'cost-optimization',
          icon: BarChart,
          name: 'Cost Optimization',
          price: '₹15,000 - ₹30,000',
          description: 'Reduce cloud spending',
          features: ['Usage Analysis', 'Right-sizing', 'Reserved Instances', 'Spot Instances', 'Budget Alerts'],
          deliveryTime: '2-3 weeks',
        },
        {
          slug: 'devops-setup',
          icon: Settings,
          name: 'DevOps Setup',
          price: '₹30,000 - ₹60,000',
          description: 'CI/CD pipeline implementation',
          features: ['Jenkins/GitLab CI', 'Docker/Kubernetes', 'Automated Testing', 'Deployment Pipeline', 'Monitoring'],
          deliveryTime: '4-6 weeks',
        },
        {
          slug: 'migration-services',
          icon: Zap,
          name: 'Migration Services',
          price: '₹40,000 - ₹80,000',
          description: 'Move to cloud infrastructure',
          features: ['Data Migration', 'App Migration', 'Zero Downtime', 'Testing', 'Optimization'],
          deliveryTime: '6-8 weeks',
        },
      ],
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Strategic marketing campaigns that deliver results',
      color: 'from-yellow-500 via-lime-500 to-green-500',
      glowColor: 'rgba(163, 230, 53, 0.7)',
      shadowColor: '#a3e635',
      subcategories: [
        {
          slug: 'social-media-marketing',
          icon: BarChart,
          name: 'Social Media Marketing',
          price: '₹15,000/month',
          description: 'Grow your social presence',
          features: ['Content Creation', 'Post Scheduling', 'Engagement', 'Community Management', 'Analytics'],
          deliveryTime: 'Ongoing',
        },
        {
          slug: 'ppc-advertising',
          icon: Search,
          name: 'PPC Advertising',
          price: '₹20,000/month',
          description: 'Google Ads and paid campaigns',
          features: ['Campaign Setup', 'Keyword Targeting', 'Ad Copywriting', 'A/B Testing', 'ROI Optimization'],
          deliveryTime: 'Ongoing',
        },
        {
          slug: 'email-marketing',
          icon: Mail,
          name: 'Email Marketing',
          price: '₹10,000/month',
          description: 'Automated email campaigns',
          features: ['Campaign Design', 'List Management', 'Automation', 'A/B Testing', 'Analytics'],
          deliveryTime: 'Ongoing',
        },
        {
          slug: 'content-marketing',
          icon: Sparkles,
          name: 'Content Marketing',
          price: '₹12,000/month',
          description: 'Blog posts and articles',
          features: ['Blog Writing', 'SEO Content', 'Content Calendar', 'Distribution', 'Performance Tracking'],
          deliveryTime: 'Ongoing',
        },
        {
          slug: 'influencer-marketing',
          icon: Megaphone,
          name: 'Influencer Marketing',
          price: '₹25,000/campaign',
          description: 'Partner with influencers',
          features: ['Influencer Research', 'Outreach', 'Campaign Management', 'Content Approval', 'ROI Tracking'],
          deliveryTime: '3-4 weeks',
        },
        {
          slug: 'analytics-reporting',
          icon: BarChart,
          name: 'Analytics & Reporting',
          price: '₹8,000/month',
          description: 'Data-driven insights',
          features: ['GA4 Setup', 'Custom Reports', 'Dashboard', 'Insights', 'Recommendations'],
          deliveryTime: 'Ongoing',
        },
      ],
    },
    {
      icon: Bot,
      title: 'AI Chatbot',
      description: 'Intelligent chatbots for customer support',
      color: 'from-cyan-600 via-sky-500 to-blue-600',
      glowColor: 'rgba(14, 165, 233, 0.7)',
      shadowColor: '#0ea5e9',
      subcategories: [
        {
          slug: 'customer-support-bot',
          icon: MessageSquare,
          name: 'Customer Support Bot',
          price: '₹30,000 - ₹50,000',
          description: '24/7 automated customer service',
          features: ['Natural Language Processing', 'Multi-language Support', 'CRM Integration', 'Analytics', 'Training'],
          deliveryTime: '4-6 weeks',
        },
        {
          slug: 'ecommerce-bot',
          icon: ShoppingCart,
          name: 'E-Commerce Bot',
          price: '₹35,000 - ₹60,000',
          description: 'Shopping assistant chatbot',
          features: ['Product Recommendations', 'Order Tracking', 'Cart Management', 'Payment Support', 'Personalization'],
          deliveryTime: '5-7 weeks',
        },
        {
          slug: 'lead-generation-bot',
          icon: Briefcase,
          name: 'Lead Generation Bot',
          price: '₹25,000 - ₹45,000',
          description: 'Qualify and capture leads',
          features: ['Lead Qualification', 'Appointment Booking', 'CRM Sync', 'Email Integration', 'Analytics'],
          deliveryTime: '3-5 weeks',
        },
        {
          slug: 'ai-voice-assistant',
          icon: Bot,
          name: 'AI Voice Assistant',
          price: '₹40,000 - ₹70,000',
          description: 'Voice-enabled AI assistant',
          features: ['Speech Recognition', 'Text-to-Speech', 'Multi-platform', 'Custom Commands', 'Integration'],
          deliveryTime: '6-8 weeks',
        },
        {
          slug: 'whatsapp-bot',
          icon: MessageSquare,
          name: 'WhatsApp Bot',
          price: '₹20,000 - ₹40,000',
          description: 'WhatsApp Business automation',
          features: ['Auto-replies', 'Broadcasts', 'Media Support', 'Templates', 'Analytics'],
          deliveryTime: '3-4 weeks',
        },
        {
          slug: 'custom-ai-bot',
          icon: Sparkles,
          name: 'Custom AI Bot',
          price: '₹50,000+',
          description: 'Tailored AI solution',
          features: ['GPT Integration', 'Custom Training', 'Advanced Features', 'API Integration', 'Maintenance'],
          deliveryTime: '8-12 weeks',
        },
      ],
    },
    {
      icon: Layers,
      title: 'Custom Software',
      description: 'Bespoke software solutions for your business',
      color: 'from-indigo-600 via-violet-500 to-purple-600',
      glowColor: 'rgba(124, 58, 237, 0.7)',
      shadowColor: '#7c3aed',
      subcategories: [
        {
          slug: 'enterprise-software',
          icon: Briefcase,
          name: 'Enterprise Software',
          price: '₹100,000+',
          description: 'Large-scale business solutions',
          features: ['Scalable Architecture', 'Multi-user Support', 'Integration', 'Security', 'Support'],
          deliveryTime: '12-16 weeks',
        },
        {
          slug: 'crm-system',
          icon: Package,
          name: 'CRM System',
          price: '₹60,000 - ₹120,000',
          description: 'Customer relationship management',
          features: ['Contact Management', 'Sales Pipeline', 'Email Integration', 'Reports', 'Mobile App'],
          deliveryTime: '8-12 weeks',
        },
        {
          slug: 'erp-system',
          icon: BarChart,
          name: 'ERP System',
          price: '₹150,000+',
          description: 'Enterprise resource planning',
          features: ['Inventory Management', 'Accounting', 'HR Management', 'Reporting', 'Multi-location'],
          deliveryTime: '16-20 weeks',
        },
        {
          slug: 'inventory-management',
          icon: Settings,
          name: 'Inventory Management',
          price: '₹40,000 - ₹80,000',
          description: 'Stock and warehouse management',
          features: ['Stock Tracking', 'Barcode Scanning', 'Alerts', 'Reports', 'Multi-warehouse'],
          deliveryTime: '6-8 weeks',
        },
        {
          slug: 'booking-system',
          icon: Layers,
          name: 'Booking System',
          price: '₹35,000 - ₹70,000',
          description: 'Appointment and reservation system',
          features: ['Calendar Management', 'Payment Integration', 'Notifications', 'Analytics', 'Mobile Support'],
          deliveryTime: '5-7 weeks',
        },
        {
          slug: 'custom-dashboard',
          icon: Code,
          name: 'Custom Dashboard',
          price: '₹30,000 - ₹60,000',
          description: 'Data visualization and analytics',
          features: ['Real-time Data', 'Interactive Charts', 'Export Options', 'User Permissions', 'API Integration'],
          deliveryTime: '4-6 weeks',
        },
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'TechStart India',
      image: '👨‍💼',
      rating: 5,
      text: 'Exceptional work! They delivered our e-commerce platform ahead of schedule and it exceeded all expectations.',
    },
    {
      name: 'Priya Sharma',
      company: 'Digital Solutions Ltd',
      image: '👩‍💼',
      rating: 5,
      text: 'The UI/UX design transformed our user engagement. Highly professional team!',
    },
    {
      name: 'Amit Patel',
      company: 'CloudTech Systems',
      image: '👨‍💻',
      rating: 5,
      text: 'Saved us 40% on cloud costs while improving performance. Outstanding service!',
    },
  ];

  return (
    <motion.div 
      className="min-h-screen pt-32 pb-24"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
      transition={{ 
        duration: prefersReducedMotion ? 0.01 : 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-24 relative">
        <div className="max-w-7xl mx-auto text-center relative">
          {/* Animated Background Elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
            className="absolute -top-40 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: 2,
            }}
            className="absolute -top-40 right-1/4 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 backdrop-blur-xl border border-primary-500/40 rounded-full px-8 py-3 mb-10 relative overflow-hidden group"
          >
            <motion.div
              animate={{
                x: [-100, 500],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles className="w-5 h-5 text-primary-400" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              48 Specialized Services
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 relative"
          >
            <motion.span 
              className="gradient-text inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              style={{
                backgroundSize: '200% auto',
              }}
            >
              Our Services
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Click any service to explore our comprehensive catalog. Each category features{' '}
            <span className="text-primary-400 font-semibold">6 specialized offerings</span> with{' '}
            <span className="text-accent-400 font-semibold">auto-sliding carousel</span> and{' '}
            <span className="text-pink-400 font-semibold">stunning 3D effects</span>.
          </motion.p>

          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[Code, Palette, Search, Cloud, Megaphone, Bot].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 2) * 30}%`,
                }}
              >
                <Icon className="w-8 h-8 text-primary-400/30" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid with Carousels */}
      <section ref={ref} className="px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} inView={inView} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-24 relative">
        <div className="max-w-7xl mx-auto">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20"
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="inline-block mb-4"
            >
              <Users className="w-12 h-12 text-primary-400" />
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-white">What Our </span>
              <motion.span 
                className="gradient-text inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: '200% auto',
                }}
              >
                Clients Say
              </motion.span>
            </h2>
            <p className="text-xl text-gray-400">Real results from real businesses</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.8,
                  type: "spring",
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.01,
                }}
                className="relative group"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="absolute inset-0 rounded-2xl blur-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                  }}
                />

                <div 
                  className="relative rounded-2xl p-8 backdrop-blur-xl border transition-all duration-500 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
                    borderColor: 'rgba(255,255,255,0.2)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                    transform: 'translateZ(20px)',
                  }}
                >
                  {/* Animated Quote Mark */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="absolute top-4 right-4 text-6xl font-serif text-primary-400/20"
                  >
                    "
                  </motion.div>

                  {/* Star Rating with Animation */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          delay: index * 0.15 + i * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{
                          scale: 1.15,
                        }}
                      >
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <p className="text-gray-300 mb-8 leading-relaxed italic text-lg relative z-10">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360,
                      }}
                      transition={{ duration: 0.5 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center text-3xl relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
                        }}
                      />
                      <span className="relative z-10">{testimonial.image}</span>
                    </motion.div>
                    <div>
                      <p className="font-bold text-white text-lg">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative">
          {/* Background Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-primary-500/40 to-accent-500/40 rounded-3xl blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative rounded-3xl p-12 text-center overflow-hidden backdrop-blur-xl border"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))',
              borderColor: 'rgba(255,255,255,0.2)',
              boxShadow: '0 20px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            {/* Animated Grid Background */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -50, 0],
                  x: [0, Math.sin(i) * 30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
                  left: `${10 + i * 10}%`,
                  bottom: 0,
                  filter: 'blur(1px)',
                }}
              />
            ))}

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  boxShadow: '0 10px 40px rgba(59,130,246,0.5)',
                }}
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2 
                className="text-4xl sm:text-5xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #ffffff, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% auto',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              >
                Ready to Get Started?
              </motion.h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Let's discuss your project and bring your vision to life with our cutting-edge solutions
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="/request-quote"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-10 py-5 rounded-full font-bold inline-flex items-center justify-center space-x-3 overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    boxShadow: '0 10px 40px rgba(59,130,246,0.4)',
                  }}
                >
                  <motion.div
                    animate={{
                      x: [-100, 300],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                  <Sparkles className="w-6 h-6 text-white relative z-10" />
                  <span className="text-white relative z-10 text-lg">Get Quote</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-white relative z-10" />
                  </motion.div>
                </motion.a>
                
                <motion.a
                  href="/request-quote"
                  whileHover={{ 
                    scale: 1.05,
                    y: -3,
                    borderColor: '#3b82f6',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-10 py-5 rounded-full font-bold inline-flex items-center justify-center space-x-3 backdrop-blur-xl overflow-hidden group"
                  style={{
                    border: '2px solid rgba(59,130,246,0.5)',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                    }}
                  />
                  <Clock className="w-6 h-6 text-primary-400 relative z-10" />
                  <span className="text-white relative z-10 text-lg">Get Quote</span>
                </motion.a>
              </div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-8 mt-12"
              >
                {[
                  { icon: Users, text: '500+ Clients' },
                  { icon: TrendingUp, text: '98% Success' },
                  { icon: Zap, text: 'Fast Delivery' },
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <badge.icon className="w-5 h-5 text-primary-400" />
                    <span className="text-sm font-semibold text-white">{badge.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

function ServiceCard({ service, index, inView }: { service: any; index: number; inView: boolean }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });
  const [isNearCard, setIsNearCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Transform values for layered parallax
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  
  // Depth layers for different elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const particleY = useTransform(scrollYProgress, [0, 1], [200, -200]);

  useEffect(() => {
    if (!isExpanded || !autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % service.subcategories.length);
    }, 10000); // Auto-slide every 10 seconds

    return () => clearInterval(interval);
  }, [isExpanded, autoplay, service.subcategories.length]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev + 1) % service.subcategories.length);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev - 1 + service.subcategories.length) % service.subcategories.length);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    // Simple tilt effect (reduced from before)
    const x = (e.clientX - rect.left - rect.width / 2) / 40;
    const y = (e.clientY - rect.top - rect.height / 2) / 40;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { 
        opacity: 1,
        y: 0,
      } : {}}
      style={{ 
        y,
        opacity,
        scale,
        perspective: '2000px', 
        transformStyle: 'preserve-3d',
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
      }}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          scale: 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        whileHover={{ 
          y: -8,
          scale: 1.02,
          transition: { 
            duration: 0.3,
          }
        }}
        className="relative h-full"
      >
        {/* Animated Background Particles with Parallax */}
        <motion.div 
          className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"
          style={{ y: backgroundY }}
        >
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${service.shadowColor}40 0%, transparent 50%),
                               radial-gradient(circle at 80% 80%, ${service.shadowColor}30 0%, transparent 50%)`,
              backgroundSize: '200% 200%',
            }}
          />
          
          {/* Floating Particle Effects with Depth Parallax */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i * 2) * 50, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              style={{ 
                y: particleY,
                translateZ: `${(i + 1) * 10}px`,
                background: service.shadowColor,
                left: `${15 + i * 15}%`,
                bottom: 0,
                filter: 'blur(2px)',
                boxShadow: `0 0 20px ${service.shadowColor}`,
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
              className="absolute w-3 h-3 rounded-full"
            />
          ))}
        </motion.div>

        {/* Floating Orbs with Parallax */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          style={{ 
            y: contentY,
            background: `radial-gradient(circle, ${service.shadowColor}70, transparent)`,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          style={{ 
            y: contentY,
            background: `radial-gradient(circle, ${service.shadowColor}60, transparent)`,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        />

        {/* Main Service Card with Content Parallax */}
        <motion.div
          style={{ 
            y: contentY,
            background: `linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))`,
            borderColor: `${service.shadowColor}50`,
            boxShadow: `
              0 8px 40px ${service.shadowColor}40,
              0 0 80px ${service.shadowColor}25,
              inset 0 1px 1px rgba(255,255,255,0.2),
              inset 0 -1px 1px rgba(0,0,0,0.3)
            `,
            transform: 'translateZ(20px)',
          }}
          className="relative p-8 rounded-2xl backdrop-blur-xl border cursor-pointer transition-all duration-500 overflow-hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Animated Border Gradient - Slowed down to prevent blinking */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-1000"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${service.shadowColor}50, transparent)`,
              filter: 'blur(30px)',
            }}
          />

          {/* Enhanced Glassmorphism Overlay */}
          <motion.div 
            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
            animate={{
              background: [
                'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                'linear-gradient(225deg, rgba(255,255,255,0.1), rgba(255,255,255,0.08))',
                'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Animated Light Refraction */}
            <motion.div
              animate={{
                x: ['-100%', '200%'],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
              className="absolute inset-y-0 w-32 blur-2xl"
              style={{
                background: `linear-gradient(90deg, transparent, ${service.shadowColor}40, transparent)`,
              }}
            />
            
            {/* Frosted Glass Texture */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Dynamic Blur Gradient */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 opacity-20"
              style={{
                background: `conic-gradient(from 0deg, 
                  transparent, 
                  ${service.shadowColor}30, 
                  transparent,
                  ${service.shadowColor}20,
                  transparent
                )`,
                filter: 'blur(40px)',
              }}
            />
          </motion.div>

          <div className="relative z-10">
            {/* Animated Icon Container */}
            <motion.div
              animate={{ 
                rotate: isExpanded ? 360 : 0,
                scale: isExpanded ? 1.1 : 1,
              }}
              transition={{ 
                duration: 0.6, 
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.15,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group/icon"
              style={{
                background: `linear-gradient(135deg, ${service.shadowColor}70, ${service.shadowColor}50)`,
                boxShadow: `
                  0 10px 50px ${service.shadowColor}50,
                  0 0 60px ${service.shadowColor}30,
                  inset 0 1px 0 rgba(255,255,255,0.4),
                  inset 0 -1px 0 rgba(0,0,0,0.3)
                `,
                transform: 'translateZ(50px)',
              }}
            >
              {/* Pulsing Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: service.shadowColor,
                  filter: 'blur(25px)',
                }}
              />
              
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${service.shadowColor}60, transparent, ${service.shadowColor}60, transparent)`,
                  opacity: 0.4,
                }}
              />
              
              <Icon className="w-10 h-10 text-white relative z-10 drop-shadow-2xl" />
            </motion.div>

            {/* Title with Gradient */}
            <motion.h3 
              className="text-2xl font-bold mb-4 text-center relative"
              style={{
                background: `linear-gradient(135deg, #ffffff, ${service.shadowColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
              }}
            >
              {service.title}
            </motion.h3>
            
            <p className="text-gray-300 text-sm text-center mb-6 leading-relaxed">
              {service.description}
            </p>

            {/* Interactive Button */}
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${service.shadowColor}30, ${service.shadowColor}20)`,
                  border: `1px solid ${service.shadowColor}50`,
                  boxShadow: `0 4px 20px ${service.shadowColor}30`,
                }}
              >
                <motion.div
                  animate={{
                    x: isExpanded ? [0, 100, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isExpanded ? 0 : Infinity,
                    repeatDelay: 2,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ width: '50%' }}
                />
                <Sparkles className="w-4 h-4" style={{ color: service.shadowColor }} />
                <span style={{ color: service.shadowColor }}>
                  {isExpanded ? 'Hide Services' : 'Explore 6 Services'}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isExpanded ? '▲' : '▼'}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Corner Accents */}
          <div 
            className="absolute top-0 right-0 w-20 h-20 opacity-30"
            style={{
              background: `radial-gradient(circle at top right, ${service.shadowColor}60, transparent)`,
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-20 h-20 opacity-30"
            style={{
              background: `radial-gradient(circle at bottom left, ${service.shadowColor}60, transparent)`,
            }}
          />
        </motion.div>

        {/* Expanded Carousel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16, scale: 1 }}
              exit={{ opacity: 0, height: 0, marginTop: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              className="relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-2xl backdrop-blur-xl border p-8 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))`,
                  borderColor: `${service.shadowColor}60`,
                  boxShadow: `
                    0 20px 60px ${service.shadowColor}40,
                    inset 0 1px 0 rgba(255,255,255,0.2),
                    inset 0 -1px 0 rgba(0,0,0,0.2)
                  `,
                  transform: 'translateZ(30px)',
                }}
              >
                {/* Animated Background Grid */}
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(${service.shadowColor}30 1px, transparent 1px),
                                     linear-gradient(90deg, ${service.shadowColor}30 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: service.shadowColor,
                        left: `${20 + i * 15}%`,
                        bottom: 0,
                        filter: 'blur(1px)',
                      }}
                    />
                  ))}
                </div>

                {/* Carousel Content */}
                <div className="relative h-[420px] overflow-hidden rounded-xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ 
                        opacity: 0, 
                        x: 100, 
                        rotateY: -30,
                        scale: 0.8,
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        rotateY: 0,
                        scale: 1,
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: -100, 
                        rotateY: 30,
                        scale: 0.8,
                      }}
                      transition={{ 
                        duration: 0.7,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className="absolute inset-0 p-6"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {service.subcategories[currentSlide] && (
                        <SubcategoryCard
                          subcategory={service.subcategories[currentSlide]}
                          color={service.shadowColor}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Slide Counter Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 px-4 py-2 rounded-full backdrop-blur-xl z-20"
                    style={{
                      background: `linear-gradient(135deg, ${service.shadowColor}40, ${service.shadowColor}20)`,
                      border: `1px solid ${service.shadowColor}60`,
                      boxShadow: `0 4px 20px ${service.shadowColor}30`,
                    }}
                  >
                    <span className="text-white font-bold text-sm">
                      {currentSlide + 1} / {service.subcategories.length}
                    </span>
                  </motion.div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="relative p-3 rounded-xl backdrop-blur-xl group/btn overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${service.shadowColor}30, ${service.shadowColor}20)`,
                      border: `1px solid ${service.shadowColor}50`,
                      boxShadow: `0 4px 20px ${service.shadowColor}30`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, ${service.shadowColor}50, ${service.shadowColor}30)`,
                      }}
                    />
                    <ChevronLeft className="w-6 h-6 relative z-10" style={{ color: service.shadowColor }} />
                  </motion.button>

                  {/* Animated Dots */}
                  <div className="flex gap-3">
                    {service.subcategories.map((_: any, i: number) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(i);
                          setAutoplay(false);
                          setTimeout(() => setAutoplay(true), 10000);
                        }}
                        className="relative transition-all duration-300"
                      >
                        <motion.div
                          animate={{
                            scale: i === currentSlide ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            duration: 1,
                            repeat: i === currentSlide ? Infinity : 0,
                          }}
                          className={`h-3 rounded-full transition-all duration-300 ${
                            i === currentSlide ? 'w-12' : 'w-3'
                          }`}
                          style={{
                            background: i === currentSlide 
                              ? `linear-gradient(90deg, ${service.shadowColor}, ${service.shadowColor}80)`
                              : '#ffffff30',
                            boxShadow: i === currentSlide 
                              ? `0 0 20px ${service.shadowColor}60`
                              : 'none',
                          }}
                        />
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="relative p-3 rounded-xl backdrop-blur-xl group/btn overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${service.shadowColor}30, ${service.shadowColor}20)`,
                      border: `1px solid ${service.shadowColor}50`,
                      boxShadow: `0 4px 20px ${service.shadowColor}30`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, ${service.shadowColor}50, ${service.shadowColor}30)`,
                      }}
                    />
                    <ChevronRight className="w-6 h-6 relative z-10" style={{ color: service.shadowColor }} />
                  </motion.button>
                </div>

                {/* Autoplay indicator with animation */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mt-4"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl"
                    style={{
                      background: `linear-gradient(135deg, ${service.shadowColor}20, ${service.shadowColor}10)`,
                      border: `1px solid ${service.shadowColor}30`,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: autoplay ? [1, 1.3, 1] : 1,
                        opacity: autoplay ? [1, 0.5, 1] : 0.5,
                      }}
                      transition={{
                        duration: 1,
                        repeat: autoplay ? Infinity : 0,
                      }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: service.shadowColor }}
                    />
                    <span className="text-xs text-gray-400 font-medium">
                      {autoplay ? 'Auto-sliding every 5 seconds' : 'Paused - will resume in 10s'}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function SubcategoryCard({ subcategory, color }: { subcategory: any; color: string }) {
  const Icon = subcategory.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  // Auto-rotate features every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % subcategory.features.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [subcategory.features.length]);

  const handleClick = () => {
    if (subcategory.slug) {
      router.push(`/services/${subcategory.slug}`);
    }
  };

  return (
    <motion.div 
      onClick={handleClick}
      className="h-full flex flex-col justify-between relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: -5,
        z: 50,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
        }
      }}
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          repeatType: 'reverse',
        }}
        className="absolute inset-0 rounded-xl opacity-20"
        style={{
          backgroundImage: `linear-gradient(135deg, ${color}40, transparent, ${color}40)`,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.4, 1] : 1,
          opacity: isHovered ? [0.4, 0.6, 0.4] : 0.2,
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${color}70, transparent)`,
          transform: 'translateZ(30px)',
        }}
      />
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? [0.3, 0.5, 0.3] : 0.15,
        }}
        transition={{
          duration: 4,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ 
          background: `radial-gradient(circle, ${color}60, transparent)`,
          transform: 'translateZ(30px)',
        }}
      />

      <div className="relative z-10">
        {/* Icon Container with Advanced Effects */}
        <motion.div
          whileHover={{ 
            scale: 1.08,
            y: -3,
          }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 300,
          }}
          className="relative w-18 h-18 rounded-2xl flex items-center justify-center mb-6 group/icon"
          style={{
            background: `linear-gradient(135deg, ${color}70, ${color}40)`,
            boxShadow: `
              0 10px 40px ${color}40,
              inset 0 2px 0 rgba(255,255,255,0.3),
              inset 0 -2px 0 rgba(0,0,0,0.3)
            `,
            transform: 'translateZ(40px)',
          }}
        >
          {/* Rotating Border - Slowed down to prevent blinking */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-2xl p-[2px]"
            style={{
              background: `conic-gradient(from 0deg, ${color}, transparent, ${color})`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0.6,
            }}
          />
          
          {/* Pulsing Glow */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-2xl"
            style={{
              background: color,
              filter: 'blur(15px)',
            }}
          />
          
          <Icon className="w-9 h-9 relative z-10 drop-shadow-2xl" style={{ color: '#ffffff' }} />
        </motion.div>

        {/* Title with Gradient and Glow */}
        <motion.h4 
          className="text-xl font-bold mb-3 relative"
          style={{
            background: `linear-gradient(135deg, #ffffff, ${color})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))',
          }}
        >
          {subcategory.name}
        </motion.h4>
        
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          {subcategory.description}
        </p>

        {/* Price Badge with Shine Effect */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative inline-block px-5 py-2 rounded-full text-sm font-bold mb-4 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
            border: `2px solid ${color}60`,
            color: color,
            boxShadow: `
              0 4px 20px ${color}40,
              inset 0 1px 0 rgba(255,255,255,0.3)
            `,
          }}
        >
          <motion.div
            animate={{
              x: [-100, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="absolute inset-0 w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
          />
          <span className="relative z-10">{subcategory.price}</span>
        </motion.div>

        {/* Delivery Time with Icon */}
        <motion.div 
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 mb-6 p-3 rounded-lg backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}10)`,
            border: `1px solid ${color}30`,
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Clock className="w-5 h-5" style={{ color }} />
          </motion.div>
          <span className="text-sm font-medium" style={{ color }}>
            {subcategory.deliveryTime}
          </span>
        </motion.div>
      </div>

      {/* Features List with Auto-Rotation */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color }} />
          </motion.div>
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
            Key Features ({currentFeatureIndex + 1}/{subcategory.features.length})
          </p>
        </div>
        
        <div className="h-24 mb-4 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeatureIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-3 p-3 rounded-lg backdrop-blur-sm"
              style={{
                background: `linear-gradient(90deg, ${color}20, ${color}10)`,
                border: `2px solid ${color}40`,
                boxShadow: `0 4px 20px ${color}30`,
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${color}80, ${color}60)`,
                  boxShadow: `0 4px 15px ${color}50`,
                }}
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-base font-medium text-white leading-relaxed">
                {subcategory.features[currentFeatureIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
          
          {/* Feature Progress Indicators */}
          <div className="flex gap-1 mt-3 justify-center">
            {subcategory.features.map((_: any, i: number) => (
              <motion.div
                key={i}
                animate={{
                  scale: i === currentFeatureIndex ? 1.2 : 1,
                  opacity: i === currentFeatureIndex ? 1 : 0.4,
                }}
                className="w-2 h-2 rounded-full"
                style={{
                  background: color,
                  boxShadow: i === currentFeatureIndex ? `0 0 10px ${color}` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="w-full mt-4 px-4 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 relative overflow-hidden group/btn"
          style={{
            background: `linear-gradient(135deg, ${color}70, ${color}50)`,
            boxShadow: `0 4px 20px ${color}40`,
          }}
        >
          <motion.div
            animate={{
              x: [-100, 200],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="absolute inset-0 w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
          />
          <span className="relative z-10">View Full Details</span>
          <ExternalLink className="w-4 h-4 relative z-10" />
        </motion.button>
      </div>

      {/* Bottom Gradient Line */}
      <motion.div
        animate={{
          scaleX: isHovered ? 1 : 0.5,
          opacity: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 20px ${color}60`,
        }}
      />
    </motion.div>
  );
}
