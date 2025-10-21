'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Mail, 
  Users, 
  FileText, 
  LogOut,
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react';
import ContactsTable from '@/components/admin/ContactsTable';
import LeadsTable from '@/components/admin/LeadsTable';
import QuotesTable from '@/components/admin/QuotesTable';
import StatisticsCards from '@/components/admin/StatisticsCards';


type TabType = 'overview' | 'contacts' | 'leads' | 'quotes';

interface AdminUser {
  id: number;
  username: string;
  full_name: string;
  role: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isValidating, setIsValidating] = useState(true);

  const handleLogout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    
    // Clear cookie
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict';
    
    // Redirect to login
    router.push('/admin/login');
  }, [router]);

  useEffect(() => {
    // Check authentication
    const validateAuth = () => {
      const token = localStorage.getItem('admin_token');
      const userData = localStorage.getItem('admin_user');

      if (!token || !userData) {
        router.replace('/admin/login');
        return false;
      }

      try {
        const parsedUser = JSON.parse(userData);
        if (!parsedUser || !parsedUser.id || !parsedUser.username) {
          throw new Error('Invalid user data');
        }
        setUser(parsedUser);
        setIsValidating(false);
        return true;
      } catch (error) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.replace('/admin/login');
        return false;
      }
    };

    // Initial validation
    if (!validateAuth()) {
      return;
    }

    // Re-validate every 5 minutes
    const validationInterval = setInterval(() => {
      if (!validateAuth()) {
        clearInterval(validationInterval);
      }
    }, 5 * 60 * 1000);

    // Auto-logout after 30 minutes of inactivity
    let inactivityTimeout: NodeJS.Timeout;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        handleLogout();
      }, 30 * 60 * 1000); // 30 minutes
    };

    // Track user activity
    const activities = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activities.forEach(activity => {
      document.addEventListener(activity, resetInactivityTimer);
    });

    // Initialize timer
    resetInactivityTimer();

    return () => {
      clearInterval(validationInterval);
      clearTimeout(inactivityTimeout);
      activities.forEach(activity => {
        document.removeEventListener(activity, resetInactivityTimer);
      });
    };
  }, [router, handleLogout]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'contacts', label: 'Contacts', icon: Mail },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'quotes', label: 'Quotes', icon: FileText },
  ];

  if (isValidating || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Validating session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Visions.services Management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.full_name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user.role}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`
                    flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap
                    ${isActive 
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Dashboard Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor your submissions and track performance
                </p>
              </div>
              <StatisticsCards />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Activity
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Track recent submissions and status changes
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Performance Metrics
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    View conversion rates and response times
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && <ContactsTable />}
          {activeTab === 'leads' && <LeadsTable />}
          {activeTab === 'quotes' && <QuotesTable />}
        </motion.div>
      </main>
    </div>
  );
}
