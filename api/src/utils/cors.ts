import { HttpRequest } from "@azure/functions";

/**
 * Get CORS headers for API responses
 * Handles preflight requests and validates origins
 */
export function getCorsHeaders(request: HttpRequest): Record<string, string> {
  // Get origin from request
  const origin = request.headers.get('origin') || '';
  
  // Get allowed origins from environment
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || ['*'];
  
  // Check if origin is allowed
  const isAllowedOrigin = allowedOrigins.includes('*') || allowedOrigins.some(allowed => {
    // Support wildcards like https://*.example.com
    if (allowed.includes('*')) {
      const pattern = allowed.replace(/\*/g, '.*');
      return new RegExp(`^${pattern}$`).test(origin);
    }
    return allowed === origin;
  });

  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
    'Vary': 'Origin', // Important for caching
  };
}

/**
 * Handle OPTIONS preflight request
 */
export function handlePreflight(request: HttpRequest) {
  return {
    status: 204, // No Content is the standard for OPTIONS
    headers: getCorsHeaders(request),
    body: null
  };
}

/**
 * Check if request is OPTIONS preflight
 */
export function isPreflight(request: HttpRequest): boolean {
  return request.method === 'OPTIONS';
}
