'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface StatsCounterProps {
  stats: Stat[];
}

function Counter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, count, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ 
            y: -10, 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          className="relative group"
        >
          {/* Glow effect */}
          <div 
            className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500"
            style={{ background: stat.color }}
          ></div>

          {/* Card */}
          <div 
            className="relative glass rounded-2xl p-6 text-center border border-white/10 group-hover:border-white/30 transition-all duration-500"
            style={{
              background: 'rgba(15, 15, 35, 0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="mb-4 flex justify-center"
              style={{ color: stat.color }}
            >
              {stat.icon}
            </motion.div>

            {/* Counter */}
            <div 
              className="text-4xl lg:text-5xl font-bold mb-2"
              style={{
                background: `linear-gradient(135deg, #ffffff, ${stat.color})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <Counter 
                value={stat.value} 
                suffix={stat.suffix} 
                prefix={stat.prefix}
              />
            </div>

            {/* Label */}
            <p className="text-gray-400 font-medium">{stat.label}</p>

            {/* Decorative corner */}
            <div 
              className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at top right, ${stat.color}40, transparent)`,
              }}
            ></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
