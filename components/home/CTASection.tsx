'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-accent-600/20 to-primary-600/20 blur-3xl"></div>
      
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 md:p-16 text-center border-2 border-primary-500/30"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Ready to <span className="gradient-text">Transform</span> Your Business?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Let's discuss how we can help you achieve your goals. Get started today and take advantage of our special Bharat Utsav Sale pricing!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 hover:shadow-2xl hover:shadow-primary-500/50 transition-all"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group glass border border-primary-500/30 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 hover:border-primary-500 transition-all"
            >
              <Phone className="w-5 h-5 text-primary-400" />
              <span>Schedule a Call</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 flex items-center justify-center space-x-2 text-gray-400"
          >
            <Mail size={18} className="text-primary-400" />
            <span>or email us at</span>
            <a href="mailto:info@techvision.com" className="text-primary-400 hover:text-primary-300 transition-colors">
              info@techvision.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
