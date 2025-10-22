'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';

interface QuoteRequestData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  projectDescription: string;
  budgetRange: string;
  timeline: string;
  websiteUrl: string;
  preferredContactMethod: string;
}

const serviceTypes = [
  'Web Development',
  'Mobile App Development',
  'Full Stack Development',
  'E-commerce Development',
  'UI/UX Design',
  'Digital Marketing & SEO',
  'Cloud Services & DevOps',
  'AI & Chatbot Development',
  'Custom Software Development',
  'Other'
];

const budgetRanges = [
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
  'Let\'s discuss'
];

const timelines = [
  '1-2 months',
  '3-4 months',
  '5-6 months',
  '6+ months',
  'Flexible'
];

export default function QuoteRequestForm() {
  const [formData, setFormData] = useState<QuoteRequestData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    projectDescription: '',
    budgetRange: '',
    timeline: '',
    websiteUrl: '',
    preferredContactMethod: 'email'
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          company: '',
          serviceType: '',
          projectDescription: '', 
          budgetRange: '',
          timeline: '',
          websiteUrl: '',
          preferredContactMethod: 'email'
        });
        
        // Keep success message visible
        setTimeout(() => setStatus('idle'), 8000);
      } else {
        setStatus('error');
        setErrorMessage(data.errors?.join(', ') || data.message || 'Failed to submit request');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Limited Time Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get Your Free Project Quote
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tell us about your project and receive a detailed proposal within 24 hours. 
            No commitment required.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700">
                Contact Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Rajesh Kumar"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your Company"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700">
                Project Details
              </h3>

              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a service</option>
                  {serviceTypes.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                  minLength={20}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Describe your project in detail. What problem are you trying to solve? What features do you need? Who is your target audience?"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Minimum 20 characters. More details help us provide a better quote.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget Range <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">₹</span>
                    <input
                      type="text"
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="10,000 or 5,00,000 or 10 Lakhs"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter your budget in Indian Rupees (₹)</p>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expected Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Website (if any)
                  </label>
                  <input
                    type="url"
                    id="websiteUrl"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    id="preferredContactMethod"
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-green-800 dark:text-green-300 font-semibold text-lg mb-2">
                      🎉 Your Quote Request Has Been Submitted!
                    </p>
                    <p className="text-green-700 dark:text-green-400 text-sm mb-2">
                      Thank you for your interest! Our team will review your requirements and send you a detailed proposal within 24 hours.
                    </p>
                    <p className="text-green-600 dark:text-green-500 text-xs">
                      Check your email for confirmation. We'll contact you at {formData.preferredContactMethod === 'both' ? 'both email and phone' : formData.preferredContactMethod}.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-300 text-sm">
                  {errorMessage}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg py-5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Submitting Your Request...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6" />
                  Get Your Free Quote
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% Free Quote</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>24-Hour Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No Obligation</span>
                </div>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          By submitting this form, you agree to our{' '}
          <a href="/privacy-policy" className="text-blue-600 hover:underline">
            privacy policy
          </a>
          . Your information is secure and will never be shared with third parties.
        </p>
      </div>
    </div>
  );
}
