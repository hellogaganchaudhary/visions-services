'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { serviceCategories } from './ServicesNavigation';

export default function ServicesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

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

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-0 right-0 top-[80px] mx-auto w-[95vw] max-w-6xl z-[100]"
            style={{ transformOrigin: 'top' }}
          >
            <div className="relative rounded-2xl backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))',
              }}
            >
              {/* Animated Background Gradient */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #6366f1 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)',
                  backgroundSize: '400% 400%',
                  filter: 'blur(60px)',
                }}
              />

              <div className="relative z-10 p-8">
                <div className="grid grid-cols-12 gap-6">
                  {/* Category Sidebar */}
                  <div className="col-span-3 space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                      Categories
                    </h3>
                    {serviceCategories.map((category, index) => {
                      const CategoryIcon = category.icon;
                      const isActive = activeCategory === index;

                      return (
                        <motion.button
                          key={category.slug}
                          onClick={() => setActiveCategory(index)}
                          onMouseEnter={() => setActiveCategory(index)}
                          whileHover={{ x: 5 }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl transition-all relative overflow-hidden group"
                          style={{
                            background: isActive
                              ? `linear-gradient(135deg, ${category.color}30, ${category.color}20)`
                              : 'transparent',
                            border: `1px solid ${isActive ? category.color + '40' : 'transparent'}`,
                          }}
                        >
                          {/* Hover gradient */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 0.1 }}
                            className="absolute inset-0"
                            style={{ background: category.color }}
                          />
                          
                          <CategoryIcon 
                            className="w-5 h-5 relative z-10" 
                            style={{ color: isActive ? category.color : '#9ca3af' }} 
                          />
                          <div className="relative z-10 text-left flex-1">
                            <div className={`font-semibold text-sm transition-colors ${
                              isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                            }`}>
                              {category.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {category.services.length} services
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Services Grid */}
                  <div className="col-span-9">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {serviceCategories[activeCategory].name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Explore our {serviceCategories[activeCategory].services.length} specialized services
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {serviceCategories[activeCategory].services.map((service, index) => {
                            const ServiceIcon = service.icon;
                            const categoryColor = serviceCategories[activeCategory].color;

                            return (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                onClick={() => setIsOpen(false)}
                              >
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ 
                                    scale: 1.02, 
                                    y: -2,
                                    transition: { duration: 0.2 }
                                  }}
                                  className="p-4 rounded-xl backdrop-blur-xl relative overflow-hidden group cursor-pointer"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                  }}
                                >
                                  {/* Hover gradient */}
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 0.1 }}
                                    className="absolute inset-0"
                                    style={{ background: categoryColor }}
                                  />

                                  {/* Icon glow on hover */}
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1.5, opacity: 0.3 }}
                                    className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl"
                                    style={{ background: categoryColor }}
                                  />

                                  <div className="relative z-10 flex items-start gap-3">
                                    <motion.div
                                      whileHover={{ scale: 1.1, rotate: 5 }}
                                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                      style={{
                                        background: `linear-gradient(135deg, ${categoryColor}40, ${categoryColor}20)`,
                                      }}
                                    >
                                      <ServiceIcon className="w-5 h-5" style={{ color: categoryColor }} />
                                    </motion.div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all"
                                        style={{
                                          backgroundImage: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}CC)`,
                                        }}
                                      >
                                        {service.name}
                                      </h4>
                                      <p className="text-xs text-gray-400 mt-1">
                                        View details →
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* View All Link */}
                        <Link
                          href="/services"
                          onClick={() => setIsOpen(false)}
                          className="mt-6 block"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="p-4 rounded-xl text-center font-bold text-white relative overflow-hidden group"
                            style={{
                              background: `linear-gradient(135deg, ${serviceCategories[activeCategory].color}60, ${serviceCategories[activeCategory].color}40)`,
                              border: `1px solid ${serviceCategories[activeCategory].color}80`,
                            }}
                          >
                            View All {serviceCategories[activeCategory].name} Services
                            
                            {/* Animated shine */}
                            <motion.div
                              animate={{ x: ['-200%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            />
                          </motion.div>
                        </Link>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
