'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Code, Palette, Search, Cloud, Megaphone, Bot, Layers, Zap,
  CheckCircle, ArrowRight, Sparkles, Star, Clock, TrendingUp,
  ShoppingCart, Smartphone, Globe, Server, Briefcase, Package,
  BarChart, Mail, MessageSquare, Settings, ChevronLeft, ArrowLeft,
  Users, Target, Rocket, Shield, Award, DollarSign, Calendar,
  FileText, Headphones, ThumbsUp, Play, Download, Eye, Share2, PieChart
} from 'lucide-react';

export default function ServiceDetailClient({ allServices }: { allServices: any[] }) {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // Define all services data inline
  const servicesData = [
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
        // Add minimal data for other services to make them work
        {
          slug: 'full-stack-web-app',
          icon: Server,
          name: 'Full-Stack Web Application',
          tagline: 'Custom web applications with modern tech stack',
          price: '₹45,000 - ₹80,000',
          description: 'Build powerful, scalable web applications with React, Node.js, and database integration.',
          deliveryTime: '6-8 weeks',
          features: ['React Frontend', 'Node.js Backend', 'Database Integration', 'API Development'],
          process: [
            { step: 'Planning', description: 'Requirements analysis', duration: '1 week' },
            { step: 'Development', description: 'Building the application', duration: '4-6 weeks' },
            { step: 'Testing', description: 'Quality assurance', duration: '1 week' },
          ],
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          benefits: ['Scalable architecture', 'Modern tech stack', 'Custom features'],
          portfolio: [
            { name: 'SaaS Platform', industry: 'Software', result: '1000+ users' },
          ],
          faqs: [
            { q: 'What technology do you use?', a: 'We use modern MERN stack for scalable applications.' },
          ],
        },
        // Add placeholder data for other slugs
        {
          slug: 'ecommerce-website',
          icon: ShoppingCart,
          name: 'E-Commerce Website',
          tagline: 'Complete online store with payment gateway',
          price: '₹35,000 - ₹60,000',
          description: 'Launch your online store with a feature-rich e-commerce platform.',
          deliveryTime: '4-5 weeks',
          features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'Order Management'],
          process: [
            { step: 'Setup', description: 'Store configuration', duration: '1 week' },
            { step: 'Development', description: 'Building features', duration: '3 weeks' },
            { step: 'Launch', description: 'Going live', duration: '1 week' },
          ],
          technologies: ['WooCommerce', 'React', 'Node.js', 'Stripe'],
          benefits: ['Online sales', 'Secure payments', 'Inventory management'],
          portfolio: [
            { name: 'Fashion Store', industry: 'Retail', result: '₹5L+ monthly revenue' },
          ],
          faqs: [
            { q: 'Which payment gateways?', a: 'We support Razorpay, Stripe, and PayPal.' },
          ],
        },
        {
          slug: 'business-website',
          icon: Briefcase,
          name: 'Business Website',
          tagline: 'Professional corporate websites',
          price: '₹20,000 - ₹40,000',
          description: 'Establish your online presence with a professional business website.',
          deliveryTime: '2-4 weeks',
          features: ['Professional Design', 'CMS Integration', 'Contact Forms', 'Analytics'],
          process: [
            { step: 'Consultation', description: 'Understanding business needs', duration: '2 days' },
            { step: 'Development', description: 'Building the website', duration: '2-3 weeks' },
            { step: 'Launch', description: 'Going live', duration: '2 days' },
          ],
          technologies: ['WordPress', 'React', 'Next.js', 'Tailwind CSS'],
          benefits: ['Professional presence', 'Lead generation', 'Brand credibility'],
          portfolio: [
            { name: 'Consulting Firm', industry: 'Services', result: '150+ inquiries/month' },
          ],
          faqs: [
            { q: 'How long does it take?', a: 'Typically 2-4 weeks depending on complexity.' },
          ],
        },
        {
          slug: 'landing-page',
          icon: Zap,
          name: 'Landing Page',
          tagline: 'High-converting focused pages',
          price: '₹10,000 - ₹20,000',
          description: 'Get a laser-focused landing page optimized for conversions.',
          deliveryTime: '1-2 weeks',
          features: ['Conversion Optimization', 'Fast Loading', 'Mobile-First', 'Analytics'],
          process: [
            { step: 'Strategy', description: 'Defining goals', duration: '1 day' },
            { step: 'Design', description: 'Creating design', duration: '3 days' },
            { step: 'Development', description: 'Building page', duration: '4 days' },
            { step: 'Launch', description: 'Going live', duration: '1 day' },
          ],
          technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
          benefits: ['Higher conversions', 'Quick deployment', 'Mobile optimized'],
          portfolio: [
            { name: 'Product Launch', industry: 'Software', result: '32% conversion rate' },
          ],
          faqs: [
            { q: 'What is a landing page?', a: 'A single-page website focused on one conversion goal.' },
          ],
        },
        {
          slug: 'web-portal',
          icon: Server,
          name: 'Web Portal',
          tagline: 'Enterprise portals for organizations',
          price: '₹50,000+',
          description: 'Build sophisticated web portals with user management and dashboards.',
          deliveryTime: '6-8 weeks',
          features: ['User Management', 'Role-Based Access', 'Dashboards', 'Integrations'],
          process: [
            { step: 'Analysis', description: 'Requirements gathering', duration: '1 week' },
            { step: 'Development', description: 'Building portal', duration: '5-6 weeks' },
            { step: 'Testing', description: 'Quality assurance', duration: '1 week' },
          ],
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
          benefits: ['Centralized access', 'Secure data', 'Scalable architecture'],
          portfolio: [
            { name: 'Employee Portal', industry: 'Corporate', result: '5000+ daily users' },
          ],
          faqs: [
            { q: 'What is a web portal?', a: 'A secure gateway providing role-based access to information.' },
          ],
        },
      ],
    },
    // Add other categories with minimal data for other services
    {
      category: 'Application Development',
      categorySlug: 'application-development',
      categoryIcon: Smartphone,
      categoryColor: '#d946ef',
      services: [
        {
          slug: 'enterprise-mobile-app',
          icon: Smartphone,
          name: 'Enterprise Mobile App',
          tagline: 'Large-scale business applications',
          price: '₹80,000 - ₹150,000',
          description: 'Build powerful enterprise-grade mobile applications.',
          deliveryTime: '8-12 weeks',
          features: ['Native Development', 'Real-time Sync', 'Advanced Security', 'Offline Support'],
          process: [
            { step: 'Discovery', description: 'Requirements gathering', duration: '1-2 weeks' },
            { step: 'Development', description: 'Building the app', duration: '6-8 weeks' },
            { step: 'Testing', description: 'QA and deployment', duration: '2 weeks' },
          ],
          technologies: ['React Native', 'Swift', 'Kotlin', 'Node.js'],
          benefits: ['Streamlined operations', 'Improved productivity', 'Secure data'],
          portfolio: [
            { name: 'FieldForce Manager', industry: 'Logistics', result: '500+ users' },
          ],
          faqs: [
            { q: 'Do you build for both iOS and Android?', a: 'Yes, we develop for both platforms.' },
          ],
        },
        // Add minimal placeholders for other mobile app services
        { slug: 'moderate-business-app', icon: Briefcase, name: 'Business App', tagline: 'Mid-sized business apps', price: '₹50,000 - ₹80,000', description: 'Feature-rich apps for growing businesses.', deliveryTime: '6-8 weeks', features: ['Cross-Platform', 'User Auth', 'Push Notifications'], process: [{ step: 'Planning', description: 'Requirements', duration: '1 week' }], technologies: ['Flutter', 'Firebase'], benefits: ['Cost-effective', 'Quick delivery'], portfolio: [{ name: 'Business App', industry: 'Business', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
        { slug: 'basic-mobile-app', icon: Smartphone, name: 'Basic Mobile App', tagline: 'Simple apps for startups', price: '₹30,000 - ₹50,000', description: 'Launch your mobile presence with a clean app.', deliveryTime: '4-6 weeks', features: ['Cross-Platform', 'Basic Features'], process: [{ step: 'Development', description: 'Building app', duration: '4 weeks' }], technologies: ['Flutter', 'Firebase'], benefits: ['Affordable', 'Quick delivery'], portfolio: [{ name: 'Startup App', industry: 'Startup', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
        { slug: 'ecommerce-app', icon: ShoppingCart, name: 'E-Commerce App', tagline: 'Shopping apps with payments', price: '₹60,000 - ₹100,000', description: 'Complete e-commerce solution for mobile.', deliveryTime: '6-9 weeks', features: ['Product Catalog', 'Shopping Cart', 'Payments'], process: [{ step: 'Development', description: 'Building features', duration: '6 weeks' }], technologies: ['React Native', 'Node.js'], benefits: ['Direct sales', 'Mobile commerce'], portfolio: [{ name: 'Fashion App', industry: 'Retail', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
        { slug: 'social-media-app', icon: MessageSquare, name: 'Social Media App', tagline: 'Community and social platforms', price: '₹70,000 - ₹120,000', description: 'Create engaging social platforms.', deliveryTime: '8-10 weeks', features: ['User Profiles', 'News Feed', 'Messaging'], process: [{ step: 'Development', description: 'Building features', duration: '8 weeks' }], technologies: ['React Native', 'Node.js'], benefits: ['Community building', 'User engagement'], portfolio: [{ name: 'Social App', industry: 'Social', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
        { slug: 'on-demand-service-app', icon: Zap, name: 'On-Demand Service App', tagline: 'Uber-like service apps', price: '₹80,000 - ₹150,000', description: 'Complete solution for service marketplaces.', deliveryTime: '8-12 weeks', features: ['GPS Tracking', 'Real-time Booking', 'Payments'], process: [{ step: 'Development', description: 'Building features', duration: '10 weeks' }], technologies: ['React Native', 'Google Maps'], benefits: ['Service scaling', 'Automated operations'], portfolio: [{ name: 'Service App', industry: 'Services', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      ],
    },
    // Add placeholder categories for other service types
    { category: 'UI/UX Design', categorySlug: 'ui-ux-design', categoryIcon: Palette, categoryColor: '#f43f5e', services: [
      { slug: 'complete-ui-ux-design', icon: Palette, name: 'Complete UI/UX Design', tagline: 'End-to-end design', price: '₹25,000 - ₹50,000', description: 'Comprehensive design solution.', deliveryTime: '3-5 weeks', features: ['User Research', 'Wireframes', 'Prototypes'], process: [{ step: 'Research', description: 'User research', duration: '1 week' }], technologies: ['Figma', 'Adobe XD'], benefits: ['User-centered', 'Better UX'], portfolio: [{ name: 'App Design', industry: 'Tech', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'mobile-app-design', icon: Smartphone, name: 'Mobile App Design', tagline: 'iOS and Android designs', price: '₹20,000 - ₹40,000', description: 'Beautiful mobile app interfaces.', deliveryTime: '2-4 weeks', features: ['Mobile Guidelines', 'App Icons'], process: [{ step: 'Design', description: 'Creating designs', duration: '3 weeks' }], technologies: ['Figma', 'Sketch'], benefits: ['Platform-specific', 'Intuitive UX'], portfolio: [{ name: 'Mobile Design', industry: 'Mobile', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'website-design', icon: Globe, name: 'Website Design', tagline: 'Responsive web designs', price: '₹15,000 - ₹35,000', description: 'Modern responsive web designs.', deliveryTime: '2-3 weeks', features: ['Responsive Design', 'Interactive Elements'], process: [{ step: 'Design', description: 'Creating layouts', duration: '2 weeks' }], technologies: ['Figma', 'Adobe XD'], benefits: ['Professional look', 'Mobile-friendly'], portfolio: [{ name: 'Website Design', industry: 'Web', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'brand-identity', icon: Sparkles, name: 'Brand Identity', tagline: 'Complete visual identity', price: '₹18,000 - ₹40,000', description: 'Build memorable brand identity.', deliveryTime: '2-4 weeks', features: ['Logo Design', 'Brand Guidelines'], process: [{ step: 'Discovery', description: 'Brand research', duration: '1 week' }], technologies: ['Illustrator', 'Photoshop'], benefits: ['Brand recognition', 'Professional credibility'], portfolio: [{ name: 'Brand Design', industry: 'Branding', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'design-system', icon: Layers, name: 'Design System', tagline: 'Scalable component library', price: '₹30,000 - ₹60,000', description: 'Comprehensive design system.', deliveryTime: '4-6 weeks', features: ['Component Library', 'Design Tokens'], process: [{ step: 'Planning', description: 'System planning', duration: '2 weeks' }], technologies: ['Figma', 'Storybook'], benefits: ['Consistency', 'Scalability'], portfolio: [{ name: 'Design System', industry: 'Enterprise', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'ui-animation', icon: Code, name: 'UI Animation', tagline: 'Motion design for interfaces', price: '₹12,000 - ₹25,000', description: 'Engaging animations for UI.', deliveryTime: '1-3 weeks', features: ['Micro-interactions', 'Lottie Animations'], process: [{ step: 'Animation', description: 'Creating animations', duration: '2 weeks' }], technologies: ['After Effects', 'Lottie'], benefits: ['Enhanced UX', 'Modern feel'], portfolio: [{ name: 'Animation Work', industry: 'Digital', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
    ]},
    { category: 'SEO Services', categorySlug: 'seo-services', categoryIcon: Search, categoryColor: '#10b981', services: [
      { slug: 'technical-seo', icon: Search, name: 'Technical SEO', tagline: 'Site optimization for search', price: '₹15,000/month', description: 'Technical SEO improvements.', deliveryTime: 'Ongoing', features: ['Site Audit', 'Speed Optimization'], process: [{ step: 'Audit', description: 'Site analysis', duration: '1 week' }], technologies: ['Google Analytics', 'Search Console'], benefits: ['Better rankings', 'Faster loading'], portfolio: [{ name: 'SEO Work', industry: 'Digital', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'local-seo', icon: BarChart, name: 'Local SEO', tagline: 'Local search optimization', price: '₹12,000/month', description: 'Dominate local search results.', deliveryTime: 'Ongoing', features: ['Google Business Profile', 'Local Citations'], process: [{ step: 'Setup', description: 'Local setup', duration: '1 week' }], technologies: ['Google My Business'], benefits: ['Local visibility', 'More foot traffic'], portfolio: [{ name: 'Local SEO', industry: 'Local', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'on-page-seo', icon: Globe, name: 'On-Page SEO', tagline: 'Page optimization', price: '₹10,000/month', description: 'Optimize every page for search.', deliveryTime: 'Ongoing', features: ['Keyword Research', 'Meta Optimization'], process: [{ step: 'Research', description: 'Keyword research', duration: '1 week' }], technologies: ['SEMrush', 'Ahrefs'], benefits: ['Higher rankings', 'More traffic'], portfolio: [{ name: 'SEO Work', industry: 'Digital', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'off-page-seo', icon: Zap, name: 'Off-Page SEO', tagline: 'Build authority with backlinks', price: '₹18,000/month', description: 'Strategic link building.', deliveryTime: 'Ongoing', features: ['Link Building', 'Brand Mentions'], process: [{ step: 'Strategy', description: 'Link strategy', duration: '1 week' }], technologies: ['Ahrefs', 'Moz'], benefits: ['Higher authority', 'Better rankings'], portfolio: [{ name: 'Link Building', industry: 'SEO', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'ecommerce-seo', icon: ShoppingCart, name: 'E-Commerce SEO', tagline: 'SEO for online stores', price: '₹20,000/month', description: 'Drive sales with optimized product pages.', deliveryTime: 'Ongoing', features: ['Product Optimization', 'Schema Markup'], process: [{ step: 'Audit', description: 'Store audit', duration: '1 week' }], technologies: ['Shopify SEO', 'WooCommerce'], benefits: ['More sales', 'Better visibility'], portfolio: [{ name: 'Store SEO', industry: 'E-commerce', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'seo-audit', icon: BarChart, name: 'SEO Audit', tagline: 'Comprehensive analysis', price: '₹15,000 - ₹25,000', description: 'In-depth SEO audit and strategy.', deliveryTime: '1-2 weeks', features: ['Complete Audit', 'Action Plan'], process: [{ step: 'Analysis', description: 'Site analysis', duration: '1 week' }], technologies: ['Screaming Frog', 'SEMrush'], benefits: ['Clear roadmap', 'Quick wins'], portfolio: [{ name: 'SEO Audit', industry: 'SEO', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
    ]},
    { category: 'Cloud Optimization', categorySlug: 'cloud-optimization', categoryIcon: Cloud, categoryColor: '#fb923c', services: [
      { slug: 'aws-configuration', icon: Cloud, name: 'AWS Configuration', tagline: 'Complete AWS implementation', price: '₹25,000 - ₹50,000', description: 'Professional AWS setup.', deliveryTime: '3-5 weeks', features: ['EC2 Setup', 'S3 Configuration'], process: [{ step: 'Planning', description: 'Infrastructure planning', duration: '1 week' }], technologies: ['AWS', 'EC2', 'S3'], benefits: ['Scalable infrastructure', 'High availability'], portfolio: [{ name: 'AWS Setup', industry: 'Cloud', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'azure-setup', icon: Server, name: 'Azure Setup', tagline: 'Enterprise Azure configuration', price: '₹25,000 - ₹50,000', description: 'Complete Microsoft Azure implementation.', deliveryTime: '3-5 weeks', features: ['VM Configuration', 'Azure SQL'], process: [{ step: 'Setup', description: 'Azure setup', duration: '3 weeks' }], technologies: ['Azure', 'Azure SQL'], benefits: ['Enterprise features', 'Integration'], portfolio: [{ name: 'Azure Setup', industry: 'Enterprise', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'google-cloud-platform', icon: Globe, name: 'Google Cloud Platform', tagline: 'Leverage Google infrastructure', price: '₹25,000 - ₹50,000', description: 'GCP setup with AI/ML.', deliveryTime: '3-5 weeks', features: ['Compute Engine', 'BigQuery'], process: [{ step: 'Setup', description: 'GCP setup', duration: '3 weeks' }], technologies: ['GCP', 'BigQuery'], benefits: ['AI/ML capabilities', 'Data analytics'], portfolio: [{ name: 'GCP Setup', industry: 'Data', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'cost-optimization', icon: BarChart, name: 'Cost Optimization', tagline: 'Reduce cloud spending', price: '₹15,000 - ₹30,000', description: 'Optimize cloud costs.', deliveryTime: '2-3 weeks', features: ['Usage Analysis', 'Right-sizing'], process: [{ step: 'Analysis', description: 'Cost analysis', duration: '1 week' }], technologies: ['CloudHealth', 'Cost Explorer'], benefits: ['Cost reduction', 'Better efficiency'], portfolio: [{ name: 'Cost Optimization', industry: 'Cloud', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'devops-setup', icon: Settings, name: 'DevOps Setup', tagline: 'Automate deployment', price: '₹30,000 - ₹60,000', description: 'Complete DevOps pipeline.', deliveryTime: '4-6 weeks', features: ['CI/CD Pipeline', 'Docker'], process: [{ step: 'Setup', description: 'Pipeline setup', duration: '4 weeks' }], technologies: ['Jenkins', 'Docker'], benefits: ['Faster deployments', 'Automation'], portfolio: [{ name: 'DevOps Setup', industry: 'DevOps', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'migration-services', icon: Zap, name: 'Cloud Migration', tagline: 'Seamless cloud migration', price: '₹40,000 - ₹80,000', description: 'Professional migration services.', deliveryTime: '6-8 weeks', features: ['Migration Assessment', 'Zero Downtime'], process: [{ step: 'Assessment', description: 'Migration planning', duration: '2 weeks' }], technologies: ['Migration Tools'], benefits: ['Zero downtime', 'Modern architecture'], portfolio: [{ name: 'Migration', industry: 'Enterprise', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
    ]},
    { category: 'Digital Marketing', categorySlug: 'digital-marketing', categoryIcon: TrendingUp, categoryColor: '#a3e635', services: [
      { slug: 'social-media-marketing', icon: Share2, name: 'Social Media Marketing', tagline: 'Build engaged communities', price: '₹15,000 - ₹30,000/month', description: 'Complete social media management.', deliveryTime: 'Monthly', features: ['Content Creation', 'Community Management'], process: [{ step: 'Strategy', description: 'Social strategy', duration: '1 week' }], technologies: ['Canva', 'Buffer'], benefits: ['Brand awareness', 'Engagement'], portfolio: [{ name: 'Social Campaign', industry: 'Marketing', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'ppc-advertising', icon: Target, name: 'PPC Advertising', tagline: 'Targeted paid campaigns', price: '₹20,000 - ₹40,000/month', description: 'Google and Facebook ads.', deliveryTime: 'Monthly', features: ['Google Ads', 'Facebook Ads'], process: [{ step: 'Setup', description: 'Campaign setup', duration: '1 week' }], technologies: ['Google Ads', 'Facebook Ads'], benefits: ['Immediate traffic', 'Targeted reach'], portfolio: [{ name: 'Ad Campaign', industry: 'Advertising', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'email-marketing', icon: Mail, name: 'Email Marketing', tagline: 'Nurture leads with email', price: '₹12,000 - ₹25,000/month', description: 'Strategic email campaigns.', deliveryTime: 'Monthly', features: ['Email Campaigns', 'Automation'], process: [{ step: 'Strategy', description: 'Email strategy', duration: '1 week' }], technologies: ['Mailchimp', 'SendGrid'], benefits: ['High ROI', 'Direct communication'], portfolio: [{ name: 'Email Campaign', industry: 'Marketing', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'content-marketing', icon: FileText, name: 'Content Marketing', tagline: 'Valuable content that converts', price: '₹18,000 - ₹35,000/month', description: 'Strategic content creation.', deliveryTime: 'Monthly', features: ['Blog Posts', 'SEO Content'], process: [{ step: 'Planning', description: 'Content planning', duration: '1 week' }], technologies: ['WordPress', 'SEO Tools'], benefits: ['Organic traffic', 'Brand authority'], portfolio: [{ name: 'Content Strategy', industry: 'Content', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'influencer-marketing', icon: Users, name: 'Influencer Marketing', tagline: 'Leverage creator networks', price: '₹25,000 - ₹50,000/campaign', description: 'End-to-end influencer campaigns.', deliveryTime: '4-6 weeks', features: ['Influencer Research', 'Campaign Management'], process: [{ step: 'Research', description: 'Influencer research', duration: '1 week' }], technologies: ['Influencer Platforms'], benefits: ['Authentic reach', 'Trust building'], portfolio: [{ name: 'Influencer Campaign', industry: 'Marketing', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'analytics-reporting', icon: PieChart, name: 'Analytics & Reporting', tagline: 'Data-driven insights', price: '₹10,000 - ₹20,000/month', description: 'Comprehensive analytics setup.', deliveryTime: 'Monthly', features: ['Analytics Setup', 'Custom Dashboards'], process: [{ step: 'Setup', description: 'Analytics setup', duration: '1 week' }], technologies: ['Google Analytics', 'Data Studio'], benefits: ['Clear ROI', 'Data-driven decisions'], portfolio: [{ name: 'Analytics Setup', industry: 'Analytics', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
    ]},
    { category: 'AI Chatbot Development', categorySlug: 'ai-chatbot', categoryIcon: Bot, categoryColor: '#0ea5e9', services: [
      { slug: 'customer-support-bot', icon: Headphones, name: 'Customer Support Bot', tagline: '24/7 intelligent support', price: '₹30,000 - ₹60,000', description: 'AI chatbot for customer service.', deliveryTime: '4-6 weeks', features: ['NLP', '24/7 Availability'], process: [{ step: 'Training', description: 'Bot training', duration: '2 weeks' }], technologies: ['Dialogflow', 'OpenAI'], benefits: ['Cost reduction', 'Instant responses'], portfolio: [{ name: 'Support Bot', industry: 'Customer Service', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'ecommerce-bot', icon: ShoppingCart, name: 'E-commerce Bot', tagline: 'AI shopping assistant', price: '₹40,000 - ₹70,000', description: 'Smart shopping assistant.', deliveryTime: '5-7 weeks', features: ['Product Search', 'Recommendations'], process: [{ step: 'Integration', description: 'Catalog integration', duration: '2 weeks' }], technologies: ['Dialogflow', 'E-commerce APIs'], benefits: ['Increased sales', 'Better UX'], portfolio: [{ name: 'Shopping Bot', industry: 'E-commerce', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'lead-generation-bot', icon: Target, name: 'Lead Generation Bot', tagline: 'Qualify leads automatically', price: '₹25,000 - ₹50,000', description: 'Intelligent lead qualification.', deliveryTime: '4-6 weeks', features: ['Lead Qualification', 'CRM Integration'], process: [{ step: 'Setup', description: 'Bot setup', duration: '3 weeks' }], technologies: ['Chatbot Framework', 'CRM APIs'], benefits: ['More qualified leads', 'Automation'], portfolio: [{ name: 'Lead Bot', industry: 'Sales', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'ai-voice-assistant', icon: Smartphone, name: 'Voice Assistant', tagline: 'Voice-powered AI', price: '₹50,000 - ₹100,000', description: 'Advanced voice AI.', deliveryTime: '6-8 weeks', features: ['Voice Synthesis', 'Speech Recognition'], process: [{ step: 'Development', description: 'Voice development', duration: '6 weeks' }], technologies: ['Speech APIs', 'Voice AI'], benefits: ['Natural interactions', 'Hands-free'], portfolio: [{ name: 'Voice Assistant', industry: 'AI', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'whatsapp-bot', icon: MessageSquare, name: 'WhatsApp Bot', tagline: 'Automate WhatsApp support', price: '₹20,000 - ₹40,000', description: 'WhatsApp Business API bot.', deliveryTime: '3-5 weeks', features: ['WhatsApp API', 'Auto-replies'], process: [{ step: 'Setup', description: 'WhatsApp setup', duration: '2 weeks' }], technologies: ['WhatsApp Business API'], benefits: ['High engagement', 'Personal channel'], portfolio: [{ name: 'WhatsApp Bot', industry: 'Messaging', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'custom-ai-bot', icon: Sparkles, name: 'Custom AI Bot', tagline: 'Tailored AI solution', price: '₹50,000 - ₹150,000', description: 'Fully custom AI chatbot.', deliveryTime: '8-12 weeks', features: ['Custom Training', 'Advanced NLP'], process: [{ step: 'Development', description: 'Custom development', duration: '10 weeks' }], technologies: ['Custom AI', 'Machine Learning'], benefits: ['Perfect fit', 'Advanced features'], portfolio: [{ name: 'Custom Bot', industry: 'AI', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
    ]},
    { category: 'Custom Software Development', categorySlug: 'custom-software', categoryIcon: Layers, categoryColor: '#7c3aed', services: [
      { slug: 'enterprise-software', icon: Briefcase, name: 'Enterprise Software', tagline: 'Scalable enterprise solutions', price: '₹200,000+', description: 'Custom enterprise-grade software.', deliveryTime: '4-8 months', features: ['Custom Logic', 'Role-Based Access'], process: [{ step: 'Analysis', description: 'Requirements analysis', duration: '1 month' }], technologies: ['Java', 'React', 'PostgreSQL'], benefits: ['Process automation', 'Efficiency'], portfolio: [{ name: 'Enterprise System', industry: 'Enterprise', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'crm-system', icon: Users, name: 'CRM System', tagline: 'Custom customer management', price: '₹80,000 - ₹200,000', description: 'Tailored CRM system.', deliveryTime: '3-5 months', features: ['Lead Management', 'Sales Pipeline'], process: [{ step: 'Analysis', description: 'Process analysis', duration: '1 month' }], technologies: ['React', 'Node.js', 'MongoDB'], benefits: ['Better tracking', 'Improved conversion'], portfolio: [{ name: 'CRM System', industry: 'Sales', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'erp-system', icon: Package, name: 'ERP System', tagline: 'Unified business operations', price: '₹300,000+', description: 'Complete ERP solution.', deliveryTime: '6-12 months', features: ['Financial Management', 'Inventory'], process: [{ step: 'Planning', description: 'Business planning', duration: '2 months' }], technologies: ['Java', 'PostgreSQL'], benefits: ['Unified data', 'Process automation'], portfolio: [{ name: 'ERP System', industry: 'Manufacturing', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'inventory-management', icon: Package, name: 'Inventory Management', tagline: 'Track stock intelligently', price: '₹40,000 - ₹100,000', description: 'Custom inventory system.', deliveryTime: '2-4 months', features: ['Real-time Tracking', 'Barcode Scanning'], process: [{ step: 'Setup', description: 'System setup', duration: '1 month' }], technologies: ['React', 'Node.js'], benefits: ['Accurate tracking', 'Reduced waste'], portfolio: [{ name: 'Inventory System', industry: 'Retail', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'booking-system', icon: Calendar, name: 'Booking System', tagline: 'Streamline appointments', price: '₹30,000 - ₹70,000', description: 'Custom booking system.', deliveryTime: '2-3 months', features: ['Online Booking', 'Calendar Sync'], process: [{ step: 'Development', description: 'System development', duration: '2 months' }], technologies: ['React', 'Node.js'], benefits: ['24/7 booking', 'Reduced no-shows'], portfolio: [{ name: 'Booking System', industry: 'Services', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
      { slug: 'custom-dashboard', icon: BarChart, name: 'Custom Dashboard', tagline: 'Visualize your data', price: '₹50,000 - ₹150,000', description: 'Interactive analytics dashboards.', deliveryTime: '2-4 months', features: ['Data Visualization', 'Real-time Updates'], process: [{ step: 'Analysis', description: 'Data analysis', duration: '1 month' }], technologies: ['React', 'D3.js'], benefits: ['Data insights', 'Better decisions'], portfolio: [{ name: 'Analytics Dashboard', industry: 'Analytics', result: 'Success' }], faqs: [{ q: 'Question?', a: 'Answer.' }] },
    ]},
  ];

  // Find the service
  let currentService: any = null;
  let currentCategory: any = null;

  for (const category of servicesData) {
    const service = category.services.find((s: any) => s.slug === slug);
    if (service) {
      currentService = service;
      currentCategory = category;
      break;
    }
  }

  const [selectedTab, setSelectedTab] = useState('overview');

  // Call hooks before any conditional returns
  const prefersReducedMotion = useReducedMotion();

  if (!currentService) {
    return (
      <motion.div 
        className="min-h-screen pt-32 pb-24 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <button
            onClick={() => router.push('/services')}
            className="text-primary-400 hover:underline"
          >
            Back to Services
          </button>
        </div>
      </motion.div>
    );
  }

  const Icon = currentService.icon;
  const CategoryIcon = currentCategory.categoryIcon;

  return (
    <motion.div 
      className="min-h-screen pt-32 pb-24"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
      transition={{ 
        duration: prefersReducedMotion ? 0.01 : 0.6, 
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth transitions
      }}
    >
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `${currentCategory.categoryColor}40` }}
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
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `${currentCategory.categoryColor}30` }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push('/services')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
            <span>Back to All Services</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Info */}
            <div>
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-xl"
                style={{
                  background: `linear-gradient(135deg, ${currentCategory.categoryColor}30, ${currentCategory.categoryColor}20)`,
                  border: `1px solid ${currentCategory.categoryColor}50`,
                }}
              >
                <CategoryIcon className="w-4 h-4" style={{ color: currentCategory.categoryColor }} />
                <span className="text-sm font-semibold" style={{ color: currentCategory.categoryColor }}>
                  {currentCategory.category}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl font-bold mb-4"
                style={{
                  background: `linear-gradient(135deg, #ffffff, ${currentCategory.categoryColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {currentService.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 mb-6 leading-relaxed"
              >
                {currentService.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 mb-8 leading-relaxed"
              >
                {currentService.description}
              </motion.p>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 rounded-xl backdrop-blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${currentCategory.categoryColor}20, ${currentCategory.categoryColor}10)`,
                    border: `1px solid ${currentCategory.categoryColor}30`,
                  }}
                >
                  <DollarSign className="w-6 h-6 mb-2" style={{ color: currentCategory.categoryColor }} />
                  <p className="text-sm text-gray-400 mb-1">Investment</p>
                  <p className="text-lg font-bold text-white">{currentService.price}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 rounded-xl backdrop-blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${currentCategory.categoryColor}20, ${currentCategory.categoryColor}10)`,
                    border: `1px solid ${currentCategory.categoryColor}30`,
                  }}
                >
                  <Clock className="w-6 h-6 mb-2" style={{ color: currentCategory.categoryColor }} />
                  <p className="text-sm text-gray-400 mb-1">Timeline</p>
                  <p className="text-lg font-bold text-white">{currentService.deliveryTime}</p>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/request-quote"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full font-bold inline-flex items-center justify-center gap-3 text-white relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${currentCategory.categoryColor}, ${currentCategory.categoryColor}CC)`,
                    boxShadow: `0 10px 40px ${currentCategory.categoryColor}40`,
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
                  <Rocket className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Get Quote</span>
                </motion.a>

                <motion.a
                  href="/request-quote"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full font-bold inline-flex items-center justify-center gap-3 backdrop-blur-xl"
                  style={{
                    border: `2px solid ${currentCategory.categoryColor}`,
                    background: `linear-gradient(135deg, ${currentCategory.categoryColor}20, ${currentCategory.categoryColor}10)`,
                  }}
                >
                  <MessageSquare className="w-5 h-5" style={{ color: currentCategory.categoryColor }} />
                  <span className="text-white">Get Quote</span>
                </motion.a>
              </div>
            </div>

            {/* Right: Icon Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
              style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative w-full aspect-square flex items-center justify-center"
              >
                {/* Animated Rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                      rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                    }}
                    transition={{
                      duration: 4 + i * 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor: `${currentCategory.categoryColor}40`,
                      transform: `scale(${0.6 + i * 0.2})`,
                    }}
                  />
                ))}

                {/* Central Icon */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="w-64 h-64 rounded-3xl flex items-center justify-center relative z-10"
                  style={{
                    background: `linear-gradient(135deg, ${currentCategory.categoryColor}60, ${currentCategory.categoryColor}40)`,
                    boxShadow: `0 20px 60px ${currentCategory.categoryColor}60`,
                  }}
                >
                  <Icon className="w-32 h-32 text-white drop-shadow-2xl" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 border-b border-white/10 pb-4">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'features', label: 'Features', icon: Sparkles },
              { id: 'process', label: 'Process', icon: Target },
              { id: 'portfolio', label: 'Portfolio', icon: Award },
              { id: 'faq', label: 'FAQ', icon: MessageSquare },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ 
                  scale: 0.98,
                }}
                className={`px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-all relative overflow-hidden ${
                  selectedTab === tab.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{
                  background: selectedTab === tab.id
                    ? `linear-gradient(135deg, ${currentCategory.categoryColor}40, ${currentCategory.categoryColor}20)`
                    : 'transparent',
                  border: selectedTab === tab.id
                    ? `1px solid ${currentCategory.categoryColor}50`
                    : '1px solid transparent',
                }}
              >
                {/* Ripple Effect on Hover */}
                {selectedTab !== tab.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    whileHover={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${currentCategory.categoryColor}30` }}
                  />
                )}
                
                {/* Animated Icon */}
                <motion.div
                  animate={{
                    rotate: selectedTab === tab.id ? [0, 5, -5, 0] : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: selectedTab === tab.id ? Infinity : 0,
                    repeatDelay: 3,
                  }}
                >
                  <tab.icon className="w-4 h-4 relative z-10" />
                </motion.div>
                
                <span className="relative z-10">{tab.label}</span>
                
                {/* Active Indicator Pulse */}
                {selectedTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${currentCategory.categoryColor}20, transparent)`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <ThumbsUp className="w-8 h-8" style={{ color: currentCategory.categoryColor }} />
                  Key Benefits
                </h2>
                <div className="space-y-4">
                  {currentService.benefits.map((benefit: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-start gap-4 p-4 rounded-xl backdrop-blur-xl"
                      style={{
                        background: `linear-gradient(90deg, ${currentCategory.categoryColor}15, transparent)`,
                        border: `1px solid ${currentCategory.categoryColor}20`,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${currentCategory.categoryColor}60, ${currentCategory.categoryColor}40)`,
                        }}
                      >
                        <CheckCircle className="w-5 h-5 text-white" />
                      </motion.div>
                      <p className="text-gray-300 leading-relaxed">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Settings className="w-8 h-8" style={{ color: currentCategory.categoryColor }} />
                  </motion.div>
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-3">
                  {currentService.technologies.map((tech: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ 
                        scale: 1.15, 
                        y: -8,
                        rotate: [0, -5, 5, 0],
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-full font-semibold backdrop-blur-xl relative overflow-hidden group cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${currentCategory.categoryColor}30, ${currentCategory.categoryColor}20)`,
                        border: `1px solid ${currentCategory.categoryColor}40`,
                        color: currentCategory.categoryColor,
                      }}
                    >
                      {/* Shine effect on hover */}
                      <motion.div
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{ 
                          x: '200%',
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      />
                      
                      {/* Pulsing background on hover */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ 
                          scale: 1.5, 
                          opacity: 0.3,
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: currentCategory.categoryColor }}
                      />
                      
                      <span className="relative z-10">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Features Tab */}
          {selectedTab === 'features' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentService.features.map((feature: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="p-6 rounded-2xl backdrop-blur-xl relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))`,
                      border: `1px solid ${currentCategory.categoryColor}30`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, ${currentCategory.categoryColor}20, transparent)`,
                      }}
                    />
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${currentCategory.categoryColor}60, ${currentCategory.categoryColor}40)`,
                      }}
                    >
                      <CheckCircle className="w-6 h-6 text-white" />
                    </motion.div>
                    <p className="text-white font-semibold relative z-10">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Process Tab */}
          {selectedTab === 'process' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
              <div className="space-y-6">
                {currentService.process.map((step: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="relative"
                  >
                    <div className="flex gap-6 items-start">
                      {/* Step Number */}
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold text-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${currentCategory.categoryColor}70, ${currentCategory.categoryColor}50)`,
                          boxShadow: `0 10px 30px ${currentCategory.categoryColor}40`,
                        }}
                      >
                        {idx + 1}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 p-6 rounded-2xl backdrop-blur-xl"
                        style={{
                          background: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))`,
                          border: `1px solid ${currentCategory.categoryColor}30`,
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-bold text-white">{step.step}</h3>
                          <span className="px-4 py-1 rounded-full text-sm font-semibold"
                            style={{
                              background: `${currentCategory.categoryColor}30`,
                              color: currentCategory.categoryColor,
                            }}
                          >
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {idx < currentService.process.length - 1 && (
                      <div className="ml-8 w-0.5 h-6 my-2"
                        style={{ background: `${currentCategory.categoryColor}40` }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Portfolio Tab */}
          {selectedTab === 'portfolio' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {currentService.portfolio.map((project: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -15, scale: 1.03 }}
                    className="p-8 rounded-2xl backdrop-blur-xl relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))`,
                      border: `1px solid ${currentCategory.categoryColor}30`,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: idx * 0.5,
                      }}
                      className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl"
                      style={{ background: currentCategory.categoryColor }}
                    />
                    <Award className="w-12 h-12 mb-4" style={{ color: currentCategory.categoryColor }} />
                    <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-gray-400 mb-4">{project.industry}</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" style={{ color: currentCategory.categoryColor }} />
                      <p className="font-bold" style={{ color: currentCategory.categoryColor }}>
                        {project.result}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ Tab */}
          {selectedTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="max-w-4xl mx-auto space-y-6">
                {currentService.faqs.map((faq: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ 
                      x: 10,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="p-6 rounded-2xl backdrop-blur-xl relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))`,
                      border: `1px solid ${currentCategory.categoryColor}30`,
                    }}
                  >
                    {/* Hover gradient */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${currentCategory.categoryColor}, transparent)`,
                      }}
                    />
                    
                    <div className="flex gap-4 relative z-10">
                      <motion.div
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -10, 10, -10, 0],
                          y: [0, -5, 0],
                        }}
                        transition={{ duration: 0.5 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <MessageSquare className="w-6 h-6" style={{ color: currentCategory.categoryColor }} />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                        <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-12 text-center overflow-hidden backdrop-blur-xl"
            style={{
              background: `linear-gradient(135deg, ${currentCategory.categoryColor}30, ${currentCategory.categoryColor}20)`,
              border: `1px solid ${currentCategory.categoryColor}40`,
            }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Get Your Quote?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's bring your vision to life with {currentService.name}
            </p>
            <motion.a
              href="/request-quote"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-white relative overflow-hidden group"
              style={{
                background: `linear-gradient(135deg, ${currentCategory.categoryColor}, ${currentCategory.categoryColor}CC)`,
                boxShadow: `0 10px 40px ${currentCategory.categoryColor}40`,
              }}
            >
              {/* Animated Shine Effect */}
              <motion.div
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              
              {/* Pulsing Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full blur-xl"
                style={{ background: currentCategory.categoryColor }}
              />
              
              {/* Rocket Icon with Hover Animation */}
              <motion.div
                whileHover={{ 
                  rotate: -15,
                  y: -3,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  damping: 10,
                }}
                className="relative z-10"
              >
                <Rocket className="w-6 h-6" />
              </motion.div>
              
              <span className="relative z-10">Get Your Quote Today</span>
              
              {/* Arrow Icon with Slide Animation */}
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}