'use client';

import { motion } from 'framer-motion';

const FloatingElements = () => {
  const shapes = [
    { size: 100, color: 'from-primary-500/20 to-accent-500/20', delay: 0, duration: 8 },
    { size: 150, color: 'from-accent-500/15 to-primary-500/15', delay: 1, duration: 10 },
    { size: 80, color: 'from-primary-400/25 to-accent-400/25', delay: 2, duration: 7 },
    { size: 120, color: 'from-accent-400/20 to-primary-400/20', delay: 1.5, duration: 9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-3xl`}
          style={{
            width: shape.size,
            height: shape.size,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
