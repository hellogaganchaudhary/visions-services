import { NextRequest, NextResponse } from 'next/server';

/**
 * Get CORS headers for Next.js API responses
 */
export function getCorsHeaders(request: NextRequest): HeadersInit {
  const origin = request.headers.get('origin') || '';
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || ['*'];
  
  // Check if origin is allowed
  const isAllowedOrigin = allowedOrigins.includes('*') || allowedOrigins.some(allowed => {
    if (allowed.includes('*')) {
      const pattern = allowed.replace(/\*/g, '.*');
      return new RegExp(`^${pattern}$`).test(origin);
    }
    return allowed === origin;
  });

  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

/**
 * Handle OPTIONS preflight request
 */
export function handlePreflight(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

/**
 * Check if request is OPTIONS preflight
 */
export function isPreflight(request: NextRequest): boolean {
  return request.method === 'OPTIONS';
}

/**
 * Create JSON response with CORS headers
 */
export function jsonResponse(
  data: any,
  request: NextRequest,
  status: number = 200
) {
  return NextResponse.json(data, {
    status,
    headers: getCorsHeaders(request),
  });
}
