'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import ServicesMegaMenu from './ServicesMegaMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-black/30 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold gradient-text font-space-grotesk">
              TechVision
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            {/* Services Mega Menu */}
            <ServicesMegaMenu />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-white py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full font-semibold mt-4">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
