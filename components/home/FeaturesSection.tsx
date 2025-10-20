'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Shield, Zap, Users, Award, Clock } from 'lucide-react';

const FeaturesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description: 'Agile development process ensuring quick turnaround times',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime guarantee',
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized code for blazing-fast loading speeds',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: '50+ skilled developers, designers, and marketers',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Rigorous testing to ensure bug-free delivery',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance whenever you need it',
    },
  ];

  return (
    <section ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary-950/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Why Choose </span>
            <span className="gradient-text">TechVision?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We combine technical excellence with creative innovation to deliver exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-8 hover:border-primary-500/50 transition-all"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-primary-500 to-accent-500 p-4 rounded-xl w-fit mb-4"
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
