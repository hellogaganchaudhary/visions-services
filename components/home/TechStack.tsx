'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Server, Cloud, Blocks, Cpu, Globe, Palette } from 'lucide-react';

const TechStack = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const technologies = [
    { icon: Code2, name: 'React', color: '#61DAFB' },
    { icon: Blocks, name: 'Next.js', color: '#FFFFFF' },
    { icon: Server, name: 'Node.js', color: '#339933' },
    { icon: Database, name: 'Python', color: '#3776AB' },
    { icon: Cloud, name: 'AWS', color: '#FF9900' },
    { icon: Globe, name: 'GCP', color: '#4285F4' },
    { icon: Cpu, name: 'Azure', color: '#0078D4' },
    { icon: Palette, name: 'Tailwind', color: '#06B6D4' },
  ];

  return (
    <section ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Technologies We Master</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Working with the latest and most powerful technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.1 }}
              className="glass rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 hover:border-primary-500/50 transition-all"
            >
              <tech.icon className="w-12 h-12" style={{ color: tech.color }} />
              <span className="text-sm text-gray-300 font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
