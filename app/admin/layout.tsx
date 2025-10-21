'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      return;
    }

    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      const userData = localStorage.getItem('admin_user');

      if (!token || !userData) {
        // Not authenticated, redirect to login
        router.replace('/admin/login');
        return false;
      }

      try {
        // Validate user data is valid JSON
        const user = JSON.parse(userData);
        if (!user || !user.id || !user.username) {
          throw new Error('Invalid user data');
        }
        return true;
      } catch (error) {
        // Invalid data, clear and redirect
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.replace('/admin/login');
        return false;
      }
    };

    // Check auth on mount
    if (!checkAuth()) {
      return;
    }

    // Check auth on storage change (for multi-tab scenarios)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_token' || e.key === 'admin_user') {
        if (!e.newValue) {
          router.replace('/admin/login');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router, pathname]);

  return <>{children}</>;
}
