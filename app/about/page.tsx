'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Zap, Award, Target, TrendingUp, Star, Code2, Palette, Rocket, Shield, CheckCircle, Linkedin, Twitter, Github } from 'lucide-react';
import StatsCounter from '@/components/StatsCounter';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Client-Centric',
      description: 'Your success is our success. We go above and beyond to ensure client satisfaction.',
      color: '#ef4444',
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We stay ahead of the curve, leveraging the latest technologies and methodologies.',
      color: '#eab308',
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We deliver nothing but the best, maintaining the highest standards in everything we do.',
      color: '#3b82f6',
    },
    {
      icon: Users,
      title: 'Collaborative Spirit',
      description: 'We believe in transparency and working closely with our clients as partners.',
      color: '#22c55e',
    },
  ];

  const team = [
    {
      name: 'Aryan Chauhan',
      role: 'CEO & Founder',
      avatar: '👨‍💼',
      description: 'Visionary leader with 10+ years in software development',
      color: '#3b82f6',
      socials: { linkedin: '#', twitter: '#', github: '#' },
    },
    {
      name: 'Priya Sharma',
      role: 'CTO',
      avatar: '👩‍💻',
      description: 'Tech expert specializing in cloud architecture and AI',
      color: '#a855f7',
      socials: { linkedin: '#', twitter: '#', github: '#' },
    },
    {
      name: 'Rajesh Kumar',
      role: 'Head of Design',
      avatar: '👨‍🎨',
      description: 'Award-winning designer creating stunning experiences',
      color: '#ec4899',
      socials: { linkedin: '#', twitter: '#', github: '#' },
    },
    {
      name: 'Sneha Patel',
      role: 'Marketing Director',
      avatar: '👩‍💼',
      description: 'Growth strategist driving digital transformation',
      color: '#22c55e',
      socials: { linkedin: '#', twitter: '#', github: '#' },
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Top Rated Agency 2024',
      organization: 'Tech Excellence Awards',
      color: '#eab308',
    },
    {
      icon: Star,
      title: 'Best Cloud Solutions',
      organization: 'Cloud Innovation Summit',
      color: '#3b82f6',
    },
    {
      icon: TrendingUp,
      title: 'Fastest Growing Company',
      organization: 'Startup India',
      color: '#22c55e',
    },
    {
      icon: Shield,
      title: 'ISO 27001 Certified',
      organization: 'International Standards',
      color: '#a855f7',
    },
  ];

  const testimonials = [
    {
      name: 'Amit Verma',
      company: 'E-Commerce Solutions',
      role: 'CEO',
      avatar: '👨‍💼',
      rating: 5,
      text: 'Working with this team transformed our business. The attention to detail and technical expertise are unmatched.',
      color: '#3b82f6',
    },
    {
      name: 'Sarah Johnson',
      company: 'FinTech Innovations',
      role: 'CTO',
      avatar: '👩‍💼',
      rating: 5,
      text: 'Exceptional service from start to finish. They delivered beyond our expectations and on time.',
      color: '#ec4899',
    },
    {
      name: 'David Chen',
      company: 'Global Enterprises',
      role: 'Director',
      avatar: '👨‍💻',
      rating: 5,
      text: 'The best development partner we\'ve ever worked with. Highly professional and results-driven.',
      color: '#22c55e',
    },
  ];

  const statsData = [
    { value: 500, suffix: '+', label: 'Projects Delivered', icon: <Target className="w-6 h-6" />, color: '#3b82f6' },
    { value: 200, suffix: '+', label: 'Happy Clients', icon: <Users className="w-6 h-6" />, color: '#22c55e' },
    { value: 98, suffix: '%', label: 'Success Rate', icon: <TrendingUp className="w-6 h-6" />, color: '#eab308' },
    { value: 50, suffix: '+', label: 'Team Members', icon: <Award className="w-6 h-6" />, color: '#a855f7' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">About TechVision</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Pioneering digital innovation since our inception, transforming businesses through technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12"
          >
            <div className="flex items-center justify-center mb-8">
              <Target className="w-16 h-16 text-primary-400" />
            </div>
            <h2 className="text-4xl font-bold text-center mb-6 text-white">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                TechVision was born from a simple yet powerful vision: to democratize technology and make 
                world-class software development accessible to businesses of all sizes. What started as a 
                small team of passionate developers has grown into a full-service digital agency with a 
                proven track record of delivering exceptional results.
              </p>
              <p>
                Today, we're proud to serve over 200 clients across 15 countries, helping them navigate 
                the digital landscape with confidence. Our team of 50+ experts brings together diverse 
                skills in web development, UI/UX design, cloud optimization, digital marketing, and AI 
                solutions to provide comprehensive support for your digital transformation journey.
              </p>
              <p>
                We believe that great software should be powerful yet intuitive, innovative yet reliable, 
                and sophisticated yet accessible. This philosophy drives everything we do, from the first 
                consultation to ongoing support and optimization.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
            {/* Values Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
              Core Values
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.02,
                }}
                className="relative group"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              >
                <div 
                  className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 h-full"
                  style={{
                    boxShadow: `0 20px 60px ${value.color}20`,
                  }}
                >
                  {/* Animated glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{ background: `${value.color}20` }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                      style={{
                        background: `linear-gradient(135deg, ${value.color}40, ${value.color}20)`,
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: value.color }} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats Section with StatsCounter */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
              Impact
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Numbers that speak for our excellence
          </p>
        </motion.div>

        <StatsCounter stats={statsData} />
      </section>

      {/* Team Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
              Leadership
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The brilliant minds behind our success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -15,
                rotateY: 10,
                scale: 1.05,
              }}
              className="relative group"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              <div 
                className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
                style={{
                  boxShadow: `0 20px 60px ${member.color}20`,
                }}
              >
                {/* Animated glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ background: `${member.color}30` }}
                />
                
                <div className="relative z-10">
                  {/* Avatar */}
                  <div 
                    className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-5xl"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`,
                      boxShadow: `0 10px 30px ${member.color}30`,
                    }}
                  >
                    {member.avatar}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p 
                    className="text-sm font-semibold mb-3"
                    style={{ color: member.color }}
                  >
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {member.description}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex gap-3 justify-center">
                    <motion.a
                      href={member.socials.linkedin}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" style={{ color: member.color }} />
                    </motion.a>
                    <motion.a
                      href={member.socials.twitter}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Twitter className="w-4 h-4" style={{ color: member.color }} />
                    </motion.a>
                    <motion.a
                      href={member.socials.github}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-4 h-4" style={{ color: member.color }} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Awards &{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
              Recognition
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Industry recognition for our excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  rotateZ: 2,
                }}
                className="relative group"
              >
                <div 
                  className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center"
                  style={{
                    boxShadow: `0 20px 60px ${achievement.color}20`,
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{ background: `${achievement.color}20` }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${achievement.color}40, ${achievement.color}20)`,
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: achievement.color }} />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                    <p className="text-gray-400 text-sm">{achievement.organization}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
              Clients Say
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real feedback from real partnerships
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                scale: 1.02,
              }}
              className="relative group"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              <div 
                className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                style={{
                  boxShadow: `0 20px 60px ${testimonial.color}20`,
                }}
              >
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ background: `${testimonial.color}20` }}
                />
                
                <div className="relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${testimonial.color}40, ${testimonial.color}20)`,
                      }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Stats */}
      <section className="px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 border-2 border-primary-500/30"
          >
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Our Impact in Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Target, value: '500+', label: 'Projects Delivered' },
                { icon: Users, value: '200+', label: 'Happy Clients' },
                { icon: TrendingUp, value: '98%', label: 'Success Rate' },
                { icon: Award, value: '50+', label: 'Industry Experts' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                  <div className="text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 text-center border-2 border-primary-500/30"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Let's create something amazing together. Join our growing list of satisfied clients.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
