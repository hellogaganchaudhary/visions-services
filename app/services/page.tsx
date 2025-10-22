'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Code, Palette, Search, Cloud, Bot, 
  ShoppingCart, Smartphone, BarChart
} from 'lucide-react';

export default function ServicesPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const serviceCategories = [
    {
      icon: Code,
      name: 'Web Development',
      description: 'Custom websites and web applications',
      color: '#06b6d4',
      startingPrice: '₹15,000',
    },
    {
      icon: Smartphone,
      name: 'App Development',
      description: 'Native and cross-platform mobile applications',
      color: '#a855f7',
      startingPrice: '₹25,000',
    },
    {
      icon: Palette,
      name: 'Design Services',
      description: 'Beautiful, intuitive designs',
      color: '#f43f5e',
      startingPrice: '₹35,000',
    },
    {
      icon: Search,
      name: 'SEO Services',
      description: 'Boost your visibility and rank higher',
      color: '#10b981',
      startingPrice: '₹45,000',
    },
    {
      icon: Cloud,
      name: 'Cloud & DevOps',
      description: 'Infrastructure management',
      color: '#0ea5e9',
      startingPrice: '₹55,000',
    },
    {
      icon: Bot,
      name: 'AI & Automation',
      description: 'Intelligent chatbots and automation',
      color: '#f59e0b',
      startingPrice: '₹65,000',
    },
    {
      icon: ShoppingCart,
      name: 'E-Commerce',
      description: 'Online stores and payment gateways',
      color: '#6366f1',
      startingPrice: '₹75,000',
    },
    {
      icon: BarChart,
      name: 'Analytics & BI',
      description: 'Business intelligence and dashboards',
      color: '#14b8a6',
      startingPrice: '₹85,000',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <section className="relative pt-32 pb-20 px-6">
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions for your digital needs
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Transparent pricing • Expert team • Quality guaranteed
            </div>
          </motion.div>

          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <Link
                  key={category.name}
                  href="/get-started"
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-opacity-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full"
                    style={{
                      borderColor: category.color + '40',
                    }}
                  >
                    {/* Hydro glow effect on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
                      style={{
                        background: `radial-gradient(circle at center, ${category.color}, transparent 70%)`,
                      }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="inline-flex p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: category.color + '20' }}>
                        <Icon className="w-8 h-8" style={{ color: category.color }} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300" style={{ backgroundImage: `linear-gradient(135deg, ${category.color}, ${category.color}99)` }}>
                        {category.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                      
                      {/* Price Badge */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
                        <span className="text-xs text-gray-500">Starting from</span>
                        <span 
                          className="text-lg font-bold"
                          style={{ color: category.color }}
                        >
                          {category.startingPrice}
                        </span>
                      </div>

                      {/* Click indicator */}
                      <div className="mt-4 text-center">
                        <span className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors">
                          Click to get started →
                        </span>
                      </div>
                    </div>

                    {/* Corner accent with animated gradient */}
                    <div
                      className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      style={{ 
                        background: `linear-gradient(135deg, ${category.color}, transparent)`,
                      }}
                    ></div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
