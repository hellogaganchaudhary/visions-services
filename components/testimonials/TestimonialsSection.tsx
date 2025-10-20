'use client';

import { motion } from 'framer-motion';
import { Star, Quote, Users, TrendingUp, Award } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import TestimonialsCarousel from './TestimonialsCarousel';
import { 
  testimonials, 
  getFeaturedTestimonials, 
  getRecentTestimonials,
  getAverageRating,
  getTotalTestimonials 
} from '@/data/testimonials';
import Link from 'next/link';

interface TestimonialsSectionProps {
  variant?: 'carousel' | 'grid' | 'featured';
  limit?: number;
  showStats?: boolean;
  title?: string;
  subtitle?: string;
}

export default function TestimonialsSection({
  variant = 'grid',
  limit = 6,
  showStats = true,
  title = 'What Our Clients Say',
  subtitle = 'Real feedback from real businesses who trusted us with their digital transformation',
}: TestimonialsSectionProps) {
  // Get testimonials based on variant
  const getDisplayTestimonials = () => {
    if (variant === 'featured') {
      return getFeaturedTestimonials().slice(0, limit);
    }
    return getRecentTestimonials(limit);
  };

  const displayTestimonials = getDisplayTestimonials();
  const averageRating = getAverageRating();
  const totalTestimonials = getTotalTestimonials();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-6"
          >
            <Star className="w-4 h-4 fill-blue-400" />
            Client Testimonials
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-space-grotesk">
            {title}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Stats */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            {/* Average Rating */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/10 rounded-lg mb-3">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {averageRating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>

            {/* Total Reviews */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg mb-3">
                <Quote className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {totalTestimonials}+
              </div>
              <div className="text-sm text-gray-400">Happy Clients</div>
            </div>

            {/* Projects Completed */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mb-3">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                150+
              </div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>

            {/* Success Rate */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-lg mb-3">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                98%
              </div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </motion.div>
        )}

        {/* Testimonials Display */}
        {variant === 'carousel' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <TestimonialsCarousel
              testimonials={displayTestimonials}
              autoPlay={true}
              interval={6000}
              showControls={true}
              variant="featured"
            />
          </motion.div>
        ) : (
          <div className={`grid gap-6 ${
            variant === 'featured' 
              ? 'grid-cols-1 md:grid-cols-2 gap-8' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {displayTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                variant={variant === 'featured' ? 'featured' : 'default'}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        {limit < totalTestimonials && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all transform hover:scale-105"
            >
              <Users className="w-5 h-5" />
              View All {totalTestimonials} Testimonials
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
