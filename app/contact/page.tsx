'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Shield, Users, TrendingUp, AlertCircle } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicePricing: Record<string, { price: string; delivery: string }> = {
    'web-development': { price: '₹25,000 - ₹50,000', delivery: '4-6 weeks' },
    'ui-ux-design': { price: '₹15,000 - ₹30,000', delivery: '2-4 weeks' },
    'seo': { price: '₹10,000/month', delivery: 'Ongoing' },
    'cloud': { price: '₹20,000 - ₹40,000', delivery: '3-5 weeks' },
    'marketing': { price: '₹15,000/month', delivery: 'Ongoing' },
    'ai-chatbot': { price: '₹30,000 - ₹50,000', delivery: '6-8 weeks' },
    'custom-software': { price: '₹40,000+', delivery: '8-12 weeks' },
    'automation': { price: '₹20,000 - ₹35,000', delivery: '4-6 weeks' },
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          message: `Service: ${formData.service}\n\n${formData.message}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        }, 5000);
      } else {
        setErrors({ submit: data.message || 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Get In Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Have a project in mind? Let's discuss how we can help bring your vision to life
          </motion.p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-xl text-gray-400 mb-6">
                  We've received your message and will get back to you within 24 hours.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">Expected response: Within 24 hours</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Send us a Message</h2>
                  <p className="text-gray-400">Fill out the form below and we'll respond within 24 hours</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary-500'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary-500'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="+91 8894357155"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none transition-colors ${
                        errors.service ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary-500'
                      }`}
                    >
                      <option value="" className="bg-gray-900">Select a service</option>
                      <option value="web-development" className="bg-gray-900">Web Development</option>
                      <option value="ui-ux-design" className="bg-gray-900">UI/UX Design</option>
                      <option value="seo" className="bg-gray-900">SEO Services</option>
                      <option value="cloud" className="bg-gray-900">Cloud Optimization</option>
                      <option value="marketing" className="bg-gray-900">Digital Marketing</option>
                      <option value="ai-chatbot" className="bg-gray-900">AI Chatbot</option>
                      <option value="custom-software" className="bg-gray-900">Custom Software</option>
                      <option value="automation" className="bg-gray-900">Automation Tools</option>
                    </select>
                    {errors.service && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.service}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Pricing Preview */}
                {formData.service && servicePricing[formData.service] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Estimated Investment</p>
                        <p className="text-2xl font-bold text-primary-400">
                          {servicePricing[formData.service].price}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Delivery Time</p>
                        <p className="text-lg font-semibold text-white flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary-400" />
                          {servicePricing[formData.service].delivery}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary-500'
                    }`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 py-4 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>24-Hour Response</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    <span>No Obligation</span>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-400 font-medium">Failed to send message</p>
                      <p className="text-red-400/80 text-sm mt-1">{errors.submit}</p>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner variant="circle" size="sm" color="white" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
