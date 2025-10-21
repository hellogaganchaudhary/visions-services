import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Check if it's an admin route (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for auth token in cookies
    const token = request.cookies.get('admin_token');
    
    if (!token) {
      // No token, redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing login page while authenticated, redirect to dashboard
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin_token');
    if (token) {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
