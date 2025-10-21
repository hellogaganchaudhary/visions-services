'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Phone, Mail, Zap } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7071/api';

interface LeadFormData {
  name: string;
  phone: string;
  requirement: string;
  budget: string;
}

export default function GetStartedPage() {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    requirement: '',
    budget: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Generate a valid placeholder email based on phone number
    const timestamp = Date.now();
    const phoneDigits = formData.phone.replace(/\D/g, '').slice(-10);
    const placeholderEmail = `adlead_${phoneDigits}_${timestamp}@visions.services`;

    try {
      const response = await fetch(`${API_URL}/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: placeholderEmail,
          phone: formData.phone,
          requirement: formData.requirement,
          budget: formData.budget || 'Not specified',
          company: 'Google/Meta Ad Lead'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage('Thank you! We\'ll contact you within 24 hours.');
        setFormData({ name: '', phone: '', requirement: '', budget: '' });
      } else {
        setStatus('error');
        setMessage(data.errors ? data.errors.join(', ') : data.message || 'Something went wrong. Please try again.');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Limited Time Offer</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Business
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                With Expert Solutions
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get a free consultation and custom quote for your project. Our experts will contact you within 24 hours.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-white/90 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-300" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-300" />
                <span>24 Hour Response</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-300" />
                <span>No Obligation</span>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  We Received Your Request!
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our team will contact you within 24 hours to discuss your project.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Get Started Today
                  </h2>
                  <p className="text-gray-600">
                    Fill out this quick form and we'll reach out to you
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
                      placeholder="Rahul Sharma"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Requirement */}
                  <div>
                    <label htmlFor="requirement" className="block text-sm font-semibold text-gray-900 mb-2">
                      What Do You Need? *
                    </label>
                    <textarea
                      id="requirement"
                      name="requirement"
                      required
                      rows={4}
                      value={formData.requirement}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none text-gray-900"
                      placeholder="Describe your project or requirement..."
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Budget *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₹</span>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900"
                        placeholder="10,000 or 5,00,000 or 10 Lakhs"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter your budget in Indian Rupees (₹)</p>
                  </div>

                  {/* Error Message */}
                  {status === 'error' && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-700">
                      {message}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Free Consultation</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Trust Message */}
                  <p className="text-center text-sm text-gray-500">
                    🔒 Your information is secure and will never be shared
                  </p>
                </form>
              </>
            )}
          </motion.div>

          {/* Additional Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-6 text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Zap className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Quick Response</h3>
              <p className="text-white/80 text-sm">We respond within 24 hours</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Phone className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Direct Contact</h3>
              <p className="text-white/80 text-sm">Speak directly with experts</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Mail className="w-8 h-8 text-blue-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Custom Solutions</h3>
              <p className="text-white/80 text-sm">Tailored to your needs</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
