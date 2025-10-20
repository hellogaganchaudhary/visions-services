'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${particle.opacity})`;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-primary-500/30 rounded-full px-6 py-2"
          >
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-gray-300">Next-Generation Software Solutions</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
          >
            <span className="gradient-text">Transform Your Digital</span>
            <br />
            <span className="text-white">Presence Today</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4"
          >
            From stunning websites to AI-powered solutions, we deliver complete software development services including UI/UX design, SEO, cloud optimization (AWS/GCP/Azure), and digital marketing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center space-x-2 hover:shadow-2xl hover:shadow-primary-500/50 transition-all"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group glass border border-primary-500/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center space-x-2 hover:border-primary-500 transition-all"
            >
              <Zap className="w-5 h-5 text-primary-400" />
              <span>View Our Work</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10"
          >
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '200+', label: 'Happy Clients' },
              { value: '50+', label: 'Team Members' },
              { value: '99%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="space-y-2"
              >
                <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
