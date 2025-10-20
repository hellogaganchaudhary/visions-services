'use client';

import { motion } from 'framer-motion';
import { Star, Quote, MapPin, Calendar, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

export default function TestimonialCard({ 
  testimonial, 
  index = 0,
  variant = 'default'
}: TestimonialCardProps) {
  const { name, role, company, image, rating, text, service, location, date, projectDetails, featured } = testimonial;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  };

  // Render rating stars
  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  // Featured card (larger, more prominent)
  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative"
      >
        {/* Glow effect */}
        {featured && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all">
          {/* Quote icon */}
          <div className="absolute top-6 right-6 opacity-10">
            <Quote className="w-16 h-16 text-blue-400" />
          </div>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            {/* Avatar */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/50 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                {name.charAt(0)}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white mb-1">{name}</h4>
              <p className="text-gray-400 text-sm">
                {role} at {company}
              </p>
              <div className="mt-2">{renderStars()}</div>
            </div>

            {/* Featured badge */}
            {featured && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-xs font-semibold">
                Featured
              </span>
            )}
          </div>

          {/* Testimonial text */}
          <p className="text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
            "{text}"
          </p>

          {/* Service tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            {service}
          </div>

          {/* Project details (if available) */}
          {projectDetails && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-gray-500 text-xs mb-1">Duration</p>
                <p className="text-white font-semibold text-sm">{projectDetails.duration}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Investment</p>
                <p className="text-white font-semibold text-sm">{projectDetails.budget}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Outcome</p>
                <p className="text-green-400 font-semibold text-sm">{projectDetails.outcome}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(date)}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Compact card (for sidebars or grids)
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/30 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
              {name.charAt(0)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-white font-semibold truncate">{name}</h5>
            <p className="text-gray-400 text-sm truncate">{company}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-3">{renderStars()}</div>

        {/* Text (truncated) */}
        <p className="text-gray-300 text-sm line-clamp-3 mb-3">"{text}"</p>

        {/* Service */}
        <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs">
          {service}
        </span>
      </motion.div>
    );
  }

  // Default card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] transition-all"
    >
      {/* Quote background */}
      <div className="absolute top-4 right-4 opacity-5">
        <Quote className="w-12 h-12 text-blue-400" />
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-500/30 flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
            {name.charAt(0)}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-white mb-1">{name}</h4>
          <p className="text-gray-400 text-sm">
            {role} • {company}
          </p>
          <div className="mt-2">{renderStars()}</div>
        </div>
      </div>

      {/* Testimonial text */}
      <p className="text-gray-300 leading-relaxed mb-4 relative z-10">
        "{text}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium">
          {service}
        </span>
        <span className="text-gray-500 text-xs flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {location}
        </span>
      </div>
    </motion.div>
  );
}
