'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Code,
  Palette,
  Search,
  Cloud,
  Megaphone,
  Bot,
  Layers,
  Zap,
  ArrowRight,
  ShoppingCart,
  Smartphone,
  Globe,
  Server,
  Briefcase,
  Package,
  Sparkles,
  BarChart,
  Mail,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const ServicesPreview = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies',
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'rgba(59, 130, 246, 0.5)',
      shadowColor: '#3b82f6',
      subcategories: [
        {
          icon: Globe,
          name: 'WordPress Website',
          price: '₹15,000 - ₹30,000',
          description: 'Professional CMS-based websites',
          features: ['Custom Themes', 'Plugin Integration', 'SEO Ready'],
        },
        {
          icon: Code,
          name: 'Full-Stack Web App',
          price: '₹40,000 - ₹80,000',
          description: 'Complete MERN/MEAN stack solutions',
          features: ['React/Angular', 'Node.js Backend', 'Database'],
        },
        {
          icon: ShoppingCart,
          name: 'E-Commerce Website',
          price: '₹35,000 - ₹60,000',
          description: 'Online stores with payment gateway',
          features: ['Shopping Cart', 'Payment Gateway', 'Inventory'],
        },
        {
          icon: Briefcase,
          name: 'Business Website',
          price: '₹20,000 - ₹40,000',
          description: 'Corporate and portfolio sites',
          features: ['Responsive', 'CMS', 'Analytics'],
        },
        {
          icon: Zap,
          name: 'Landing Page',
          price: '₹10,000 - ₹20,000',
          description: 'High-converting landing pages',
          features: ['Fast Loading', 'SEO Optimized', 'Mobile First'],
        },
        {
          icon: Server,
          name: 'Web Portal',
          price: '₹50,000+',
          description: 'Enterprise-level portals',
          features: ['User Management', 'Dashboard', 'API Integration'],
        },
      ],
    },
    {
      icon: Smartphone,
      title: 'Application Development',
      description: 'Native and cross-platform mobile applications',
      color: 'from-purple-500 to-pink-500',
      glowColor: 'rgba(168, 85, 247, 0.5)',
      shadowColor: '#a855f7',
      subcategories: [
        {
          icon: Smartphone,
          name: 'Enterprise Mobile App',
          price: '₹80,000 - ₹150,000',
          description: 'Large-scale business applications',
          features: ['Native iOS/Android', 'Real-time Sync', 'Security'],
        },
        {
          icon: Package,
          name: 'Moderate Business App',
          price: '₹50,000 - ₹80,000',
          description: 'Mid-size app with core features',
          features: ['Cross-platform', 'Cloud Backend', 'Push Notifications'],
        },
        {
          icon: Layers,
          name: 'Basic Mobile App',
          price: '₹30,000 - ₹50,000',
          description: 'Simple and functional apps',
          features: ['React Native', 'Firebase', 'Basic Features'],
        },
        {
          icon: ShoppingCart,
          name: 'E-Commerce App',
          price: '₹60,000 - ₹100,000',
          description: 'Mobile shopping experience',
          features: ['Product Catalog', 'Payment', 'Order Tracking'],
        },
        {
          icon: MessageSquare,
          name: 'Social Media App',
          price: '₹70,000 - ₹120,000',
          description: 'Community and social platforms',
          features: ['User Profiles', 'Chat', 'Feed System'],
        },
        {
          icon: Briefcase,
          name: 'On-Demand Service App',
          price: '₹65,000 - ₹110,000',
          description: 'Uber-like service apps',
          features: ['Booking System', 'GPS Tracking', 'Payments'],
        },
      ],
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that engage users',
      color: 'from-pink-500 to-rose-500',
      glowColor: 'rgba(236, 72, 153, 0.5)',
      shadowColor: '#ec4899',
      subcategories: [
        {
          icon: Palette,
          name: 'Complete UI/UX Design',
          price: '₹25,000 - ₹50,000',
          description: 'Full design system and prototypes',
          features: ['User Research', 'Wireframes', 'High-Fidelity'],
        },
        {
          icon: Smartphone,
          name: 'Mobile App Design',
          price: '₹20,000 - ₹40,000',
          description: 'iOS and Android app interfaces',
          features: ['Material Design', 'iOS Guidelines', 'Animations'],
        },
        {
          icon: Globe,
          name: 'Website Design',
          price: '₹15,000 - ₹35,000',
          description: 'Responsive web interfaces',
          features: ['Desktop & Mobile', 'Interactive', 'Modern'],
        },
        {
          icon: Sparkles,
          name: 'Brand Identity',
          price: '₹18,000 - ₹40,000',
          description: 'Logo, colors, and brand guidelines',
          features: ['Logo Design', 'Color Palette', 'Brand Guide'],
        },
        {
          icon: Layers,
          name: 'Design System',
          price: '₹30,000 - ₹60,000',
          description: 'Component library and guidelines',
          features: ['Component Library', 'Documentation', 'Scalable'],
        },
        {
          icon: Code,
          name: 'UI Animation',
          price: '₹12,000 - ₹25,000',
          description: 'Micro-interactions and animations',
          features: ['Lottie', 'CSS Animations', 'Interactive'],
        },
      ],
    },
    {
      icon: Search,
      title: 'SEO Services',
      description: 'Boost your visibility and rank higher',
      color: 'from-green-500 to-emerald-500',
      glowColor: 'rgba(34, 197, 94, 0.5)',
      shadowColor: '#22c55e',
      subcategories: [
        {
          icon: Search,
          name: 'Technical SEO',
          price: '₹15,000/month',
          description: 'Site optimization and fixes',
          features: ['Site Speed', 'Mobile Optimization', 'Schema Markup'],
        },
        {
          icon: BarChart,
          name: 'Local SEO',
          price: '₹12,000/month',
          description: 'Rank in local searches',
          features: ['Google My Business', 'Local Citations', 'Reviews'],
        },
        {
          icon: Globe,
          name: 'On-Page SEO',
          price: '₹10,000/month',
          description: 'Content and keyword optimization',
          features: ['Keyword Research', 'Content Optimization', 'Meta Tags'],
        },
        {
          icon: Zap,
          name: 'Off-Page SEO',
          price: '₹18,000/month',
          description: 'Link building and authority',
          features: ['Backlinks', 'Guest Posting', 'Social Signals'],
        },
        {
          icon: Package,
          name: 'E-Commerce SEO',
          price: '₹20,000/month',
          description: 'Product page optimization',
          features: ['Product Schema', 'Category Optimization', 'Rich Snippets'],
        },
        {
          icon: Settings,
          name: 'SEO Audit',
          price: '₹8,000 - ₹15,000',
          description: 'Complete site analysis',
          features: ['Technical Audit', 'Content Audit', 'Action Plan'],
        },
      ],
    },
    {
      icon: Cloud,
      title: 'Cloud Optimization',
      description: 'AWS, GCP, and Azure infrastructure management',
      color: 'from-orange-500 to-red-500',
      glowColor: 'rgba(249, 115, 22, 0.5)',
      shadowColor: '#f97316',
      subcategories: [
        {
          icon: Cloud,
          name: 'AWS Configuration',
          price: '₹25,000 - ₹50,000',
          description: 'Complete AWS setup and optimization',
          features: ['EC2, S3, RDS', 'Load Balancing', 'Auto Scaling'],
        },
        {
          icon: Server,
          name: 'Azure Setup',
          price: '₹25,000 - ₹50,000',
          description: 'Microsoft Azure implementation',
          features: ['Virtual Machines', 'App Services', 'Databases'],
        },
        {
          icon: Globe,
          name: 'Google Cloud Platform',
          price: '₹25,000 - ₹50,000',
          description: 'GCP infrastructure setup',
          features: ['Compute Engine', 'Cloud Storage', 'BigQuery'],
        },
        {
          icon: BarChart,
          name: 'Cost Optimization',
          price: '₹15,000 - ₹30,000',
          description: 'Reduce cloud spending',
          features: ['Usage Analysis', 'Right-sizing', 'Reserved Instances'],
        },
        {
          icon: Settings,
          name: 'DevOps Setup',
          price: '₹30,000 - ₹60,000',
          description: 'CI/CD pipeline implementation',
          features: ['Jenkins/GitLab', 'Docker/Kubernetes', 'Monitoring'],
        },
        {
          icon: Zap,
          name: 'Migration Services',
          price: '₹40,000 - ₹80,000',
          description: 'Move to cloud infrastructure',
          features: ['Data Migration', 'App Migration', 'Zero Downtime'],
        },
      ],
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Strategic marketing campaigns that deliver results',
      color: 'from-yellow-500 to-orange-500',
      glowColor: 'rgba(234, 179, 8, 0.5)',
      shadowColor: '#eab308',
      subcategories: [
        {
          icon: BarChart,
          name: 'Social Media Marketing',
          price: '₹15,000/month',
          description: 'Grow your social presence',
          features: ['Content Creation', 'Engagement', 'Analytics'],
        },
        {
          icon: Search,
          name: 'PPC Advertising',
          price: '₹20,000/month',
          description: 'Google Ads and paid campaigns',
          features: ['Google Ads', 'Facebook Ads', 'Optimization'],
        },
        {
          icon: Mail,
          name: 'Email Marketing',
          price: '₹10,000/month',
          description: 'Automated email campaigns',
          features: ['Campaign Design', 'Automation', 'Analytics'],
        },
        {
          icon: Sparkles,
          name: 'Content Marketing',
          price: '₹12,000/month',
          description: 'Blog posts and articles',
          features: ['Blog Writing', 'SEO Content', 'Distribution'],
        },
        {
          icon: Megaphone,
          name: 'Influencer Marketing',
          price: '₹25,000/campaign',
          description: 'Partner with influencers',
          features: ['Influencer Research', 'Campaign Management', 'ROI Tracking'],
        },
        {
          icon: BarChart,
          name: 'Analytics & Reporting',
          price: '₹8,000/month',
          description: 'Data-driven insights',
          features: ['GA4 Setup', 'Custom Reports', 'Insights'],
        },
      ],
    },
    {
      icon: Bot,
      title: 'AI Chatbot',
      description: 'Intelligent chatbots for customer support',
      color: 'from-cyan-500 to-blue-500',
      glowColor: 'rgba(6, 182, 212, 0.5)',
      shadowColor: '#06b6d4',
      subcategories: [
        {
          icon: MessageSquare,
          name: 'Customer Support Bot',
          price: '₹30,000 - ₹50,000',
          description: '24/7 automated customer service',
          features: ['NLP', 'Multi-language', 'CRM Integration'],
        },
        {
          icon: ShoppingCart,
          name: 'E-Commerce Bot',
          price: '₹35,000 - ₹60,000',
          description: 'Shopping assistant chatbot',
          features: ['Product Recommendations', 'Order Tracking', 'Cart Management'],
        },
        {
          icon: Briefcase,
          name: 'Lead Generation Bot',
          price: '₹25,000 - ₹45,000',
          description: 'Qualify and capture leads',
          features: ['Lead Qualification', 'Appointment Booking', 'CRM Sync'],
        },
        {
          icon: Bot,
          name: 'AI Voice Assistant',
          price: '₹40,000 - ₹70,000',
          description: 'Voice-enabled AI assistant',
          features: ['Speech Recognition', 'Text-to-Speech', 'Multi-platform'],
        },
        {
          icon: MessageSquare,
          name: 'WhatsApp Bot',
          price: '₹20,000 - ₹40,000',
          description: 'WhatsApp Business automation',
          features: ['Auto-replies', 'Broadcasts', 'Analytics'],
        },
        {
          icon: Sparkles,
          name: 'Custom AI Bot',
          price: '₹50,000+',
          description: 'Tailored AI solution',
          features: ['GPT Integration', 'Custom Training', 'Advanced Features'],
        },
      ],
    },
    {
      icon: Layers,
      title: 'Custom Software',
      description: 'Bespoke software solutions for your business',
      color: 'from-indigo-500 to-purple-500',
      glowColor: 'rgba(99, 102, 241, 0.5)',
      shadowColor: '#6366f1',
      subcategories: [
        {
          icon: Briefcase,
          name: 'Enterprise Software',
          price: '₹100,000+',
          description: 'Large-scale business solutions',
          features: ['Scalable', 'Multi-user', 'Integration'],
        },
        {
          icon: Package,
          name: 'CRM System',
          price: '₹60,000 - ₹120,000',
          description: 'Customer relationship management',
          features: ['Contact Management', 'Sales Pipeline', 'Reports'],
        },
        {
          icon: BarChart,
          name: 'ERP System',
          price: '₹150,000+',
          description: 'Enterprise resource planning',
          features: ['Inventory', 'Accounting', 'HR Management'],
        },
        {
          icon: Settings,
          name: 'Inventory Management',
          price: '₹40,000 - ₹80,000',
          description: 'Stock and warehouse management',
          features: ['Stock Tracking', 'Alerts', 'Reports'],
        },
        {
          icon: Layers,
          name: 'Booking System',
          price: '₹35,000 - ₹70,000',
          description: 'Appointment and reservation system',
          features: ['Calendar', 'Payments', 'Notifications'],
        },
        {
          icon: Code,
          name: 'Custom Dashboard',
          price: '₹30,000 - ₹60,000',
          description: 'Data visualization and analytics',
          features: ['Real-time Data', 'Charts', 'Export'],
        },
      ],
    },
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
              Services
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-primary-500/50 transition-all group"
          >
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

function ServiceCard({ service, index, inView }: { service: any; index: number; inView: boolean }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!isExpanded || !autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % service.subcategories.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [isExpanded, autoplay, service.subcategories.length]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev + 1) % service.subcategories.length);
    setTimeout(() => setAutoplay(true), 10000); // Resume autoplay after 10 seconds
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev - 1 + service.subcategories.length) % service.subcategories.length);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <motion.div
        whileHover={{ 
          y: -10,
          rotateY: isExpanded ? 0 : 5,
          scale: isExpanded ? 1 : 1.02,
        }}
        className="relative h-full"
      >
        {/* Main Service Card */}
        <div
          className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            boxShadow: `0 20px 60px ${service.shadowColor}20`,
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
            style={{ background: service.glowColor }}
          />

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 mx-auto"
              style={{
                backgroundImage: `linear-gradient(135deg, ${service.shadowColor}40, ${service.shadowColor}20)`,
              }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>

            <h3 className="text-xl font-bold mb-3 text-center">{service.title}</h3>
            <p className="text-gray-400 text-sm text-center mb-4">{service.description}</p>

            <div className="text-center">
              <span className="text-xs text-primary-400 font-medium">
                {isExpanded ? 'Click to collapse' : 'Click to explore'}
              </span>
            </div>
          </div>
        </div>

        {/* Expanded Carousel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden"
            >
              <div
                className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
                style={{
                  boxShadow: `0 20px 60px ${service.shadowColor}30`,
                }}
              >
                {/* Carousel Content */}
                <div className="relative h-80 overflow-hidden">
                  <AnimatePresence mode="wait" custom={currentSlide}>
                    <motion.div
                      key={currentSlide}
                      custom={currentSlide}
                      initial={{ opacity: 0, x: 100, rotateY: -20 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      exit={{ opacity: 0, x: -100, rotateY: 20 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute inset-0 p-4"
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
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {service.subcategories.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(i);
                          setAutoplay(false);
                          setTimeout(() => setAutoplay(true), 10000);
                        }}
                        className="transition-all duration-300"
                      >
                        <div
                          className={`h-2 rounded-full transition-all ${
                            i === currentSlide ? 'w-8' : 'w-2'
                          }`}
                          style={{
                            backgroundColor: i === currentSlide ? service.shadowColor : '#ffffff40',
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Autoplay indicator */}
                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500">
                    {autoplay ? '⏯ Auto-playing' : '⏸ Paused'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function SubcategoryCard({ subcategory, color }: { subcategory: any; color: string }) {
  const Icon = subcategory.icon;

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
          style={{
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
          }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </div>

        <h4 className="text-lg font-bold mb-2">{subcategory.name}</h4>
        <p className="text-sm text-gray-400 mb-3">{subcategory.description}</p>

        <div
          className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4"
          style={{
            background: `${color}20`,
            color: color,
          }}
        >
          {subcategory.price}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-2 font-semibold">Key Features:</p>
        <ul className="space-y-1">
          {subcategory.features.map((feature: string, i: number) => (
            <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
              <span style={{ color }} className="mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ServicesPreview;
