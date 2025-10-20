'use client';

import { motion } from 'framer-motion';
import { Calendar, Gift } from 'lucide-react';

const SalesBanner = () => {
  return (
    <div className="fixed top-20 left-0 right-0 z-40 overflow-hidden animated-gradient py-2 sm:py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-3 text-white text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center space-x-2"
          >
            <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-bold text-sm sm:text-lg">🎉 BHARAT UTSAV SALE 🎉</span>
          </motion.div>
          <span className="text-xs sm:text-base flex items-center">
            <Calendar className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            October 2025 - March 2026
          </span>
          <span className="font-semibold bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm">
            Up to 50% OFF!
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalesBanner;
