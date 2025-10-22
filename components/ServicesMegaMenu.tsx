'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { serviceCategories } from './ServicesNavigation';

export default function ServicesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative hidden lg:block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-gray-300 hover:text-white transition-colors relative group"
      >
        <span>Services</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
        
        {/* Hover indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"
          style={{ transformOrigin: 'left' }}
        />
      </button>

      {/* Mega Menu Dropdown - Now a simple catalogue of 8 categories */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-0 right-0 top-[80px] mx-auto w-[95vw] max-w-4xl z-[100]"
            style={{ transformOrigin: 'top' }}
          >
            <div className="relative rounded-2xl backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))',
              }}
            >
              <div className="relative z-10 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Service Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="text-center mt-8">
                  <Link href="/services" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold shadow-lg hover:scale-105 transition-all">
                    View All Services
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
