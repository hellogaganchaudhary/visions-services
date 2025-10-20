'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '@/data/testimonials';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  variant?: 'default' | 'featured' | 'compact';
}

export default function TestimonialsCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  variant = 'default',
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, nextTestimonial]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevTestimonial();
      } else if (e.key === 'ArrowRight') {
        nextTestimonial();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextTestimonial, prevTestimonial]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative">
      {/* Carousel container */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <TestimonialCard
              testimonial={testimonials[currentIndex]}
              variant={variant}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {showControls && (
        <>
          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {/* Previous button */}
            <button
              onClick={prevTestimonial}
              className="group p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>

            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`transition-all ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-blue-500'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  } rounded-full`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={nextTestimonial}
              className="group p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>

            {/* Play/Pause button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="group p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all ml-2"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              ) : (
                <Play className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              )}
            </button>
          </div>

          {/* Progress bar */}
          {isPlaying && (
            <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: interval / 1000, ease: 'linear' }}
                key={currentIndex}
              />
            </div>
          )}

          {/* Counter */}
          <div className="text-center mt-4 text-sm text-gray-400">
            {currentIndex + 1} / {testimonials.length}
          </div>
        </>
      )}
    </div>
  );
}
