'use client';

import { motion } from 'framer-motion';
import { Home, Search, ArrowRight, Code, Palette, Cloud, Bot, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularServices = [
    {
      icon: Code,
      title: 'Web Development',
      href: '/services/web-development',
      color: 'from-blue-500 to-cyan-500',
      description: 'Custom websites & web apps',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      href: '/services/ui-ux-design',
      color: 'from-purple-500 to-pink-500',
      description: 'Beautiful user interfaces',
    },
    {
      icon: Cloud,
      title: 'Cloud Services',
      href: '/services/cloud-devops',
      color: 'from-cyan-500 to-blue-500',
      description: 'AWS, Azure, GCP solutions',
    },
    {
      icon: Bot,
      title: 'AI Chatbots',
      href: '/services/ai-chatbot',
      color: 'from-orange-500 to-red-500',
      description: 'Intelligent automation',
    },
  ];

  const quickLinks = [
    { label: 'All Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Home', href: '/' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080,
            }}
            animate={{
              y: [null, typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080],
              x: [null, typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Animated 404 */}
          <motion.div
            className="relative inline-block mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl" />
            
            {/* 404 Text */}
            <h1 className="relative text-9xl md:text-[180px] font-black font-space-grotesk">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                404
              </span>
            </h1>

            {/* Floating icons around 404 */}
            <motion.div
              className="absolute top-0 left-0 -translate-x-full -translate-y-1/2"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 text-yellow-400" />
            </motion.div>
            
            <motion.div
              className="absolute top-0 right-0 translate-x-full -translate-y-1/2"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Code className="w-12 h-12 text-blue-400" />
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
              animate={{ 
                y: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <TrendingUp className="w-12 h-12 text-green-400" />
            </motion.div>
          </motion.div>

          {/* Error message */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-space-grotesk"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 mb-2"
          >
            Oops! The page you're looking for doesn't exist.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mb-8"
          >
            It might have been moved or deleted. Let's get you back on track!
          </motion.p>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onSubmit={handleSearch}
            className="max-w-xl mx-auto mb-12"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for services..."
                className="w-full px-6 py-4 pl-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </motion.form>

          {/* Go Home button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Go Back Home
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Popular Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6 font-space-grotesk">
            Popular Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Link href={service.href}>
                  <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all transform hover:scale-105 hover:-translate-y-1">
                    {/* Glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity rounded-xl blur-xl" 
                      style={{ 
                        backgroundImage: `linear-gradient(to right, ${service.color})` 
                      }} 
                    />
                    
                    {/* Icon */}
                    <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} mb-3`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h4 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {service.description}
                    </p>
                    
                    {/* Arrow */}
                    <ArrowRight className="absolute top-6 right-6 w-5 h-5 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">Or explore:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-gray-300 hover:text-white transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
