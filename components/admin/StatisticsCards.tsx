'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Users, FileText, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

interface Statistics {
  contacts: {
    total: number;
    new: number;
    in_progress: number;
    resolved: number;
  };
  leads: {
    total: number;
    new: number;
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  quotes: {
    total: number;
    new: number;
    google_ads: number;
    direct: number;
  };
}

export default function StatisticsCards() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const [contactsRes, leadsRes, quotesRes] = await Promise.all([
        fetch('/api/api-admin/contacts?limit=1', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/api-admin/leads?limit=1', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/api-admin/quotes?limit=1', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const contactsData = await contactsRes.json();
      const leadsData = await leadsRes.json();
      const quotesData = await quotesRes.json();

      if (contactsData.success && leadsData.success && quotesData.success) {
        setStats({
          contacts: contactsData.data.statistics,
          leads: leadsData.data.statistics,
          quotes: quotesData.data.statistics
        });
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    {
      title: 'Contact Forms',
      total: stats.contacts.total,
      icon: Mail,
      gradient: 'from-blue-500 to-cyan-500',
      stats: [
        { label: 'New', value: stats.contacts.new, color: 'text-blue-600' },
        { label: 'In Progress', value: stats.contacts.in_progress, color: 'text-yellow-600' },
        { label: 'Resolved', value: stats.contacts.resolved, color: 'text-green-600' }
      ]
    },
    {
      title: 'Lead Forms',
      total: stats.leads.total,
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      stats: [
        { label: 'Critical', value: stats.leads.critical, color: 'text-red-600' },
        { label: 'High', value: stats.leads.high, color: 'text-orange-600' },
        { label: 'Medium', value: stats.leads.medium, color: 'text-yellow-600' },
        { label: 'Low', value: stats.leads.low, color: 'text-green-600' }
      ]
    },
    {
      title: 'Quote Requests',
      total: stats.quotes.total,
      icon: FileText,
      gradient: 'from-green-500 to-teal-500',
      stats: [
        { label: 'Google Ads', value: stats.quotes.google_ads, color: 'text-blue-600' },
        { label: 'Direct', value: stats.quotes.direct, color: 'text-purple-600' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className={`bg-gradient-to-r ${card.gradient} p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">
                    {card.title}
                  </p>
                  <p className="text-white text-4xl font-bold">
                    {card.total}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="p-6 space-y-3">
              {card.stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </span>
                  <span className={`text-sm font-semibold ${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
