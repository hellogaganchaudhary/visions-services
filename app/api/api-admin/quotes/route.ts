import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { isPreflight, handlePreflight, jsonResponse } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request);
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = verifyToken(request);
    console.log('Authenticated user:', user.username);

    // Get pagination params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Query quote requests
    const result = await query(
      `SELECT id, name, email, phone, company, service_type, project_description,
              budget_range, timeline, website_url, preferred_contact_method,
              status, priority, source, created_at, updated_at
       FROM quote_requests
       ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    // Get total count
    const countResult = await query('SELECT COUNT(*) as total FROM quote_requests');
    const total = parseInt(countResult.rows[0].total);

    // Get statistics
    const statsResult = await query('SELECT * FROM quote_statistics');
    const statistics = statsResult.rows[0] || {};

    return jsonResponse(
      {
        success: true,
        data: {
          quotes: result.rows,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
          statistics,
        },
      },
      request
    );
  } catch (error: any) {
    console.error('Get quotes error:', error);
    
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return jsonResponse(
        { success: false, message: 'Unauthorized' },
        request,
        401
      );
    }

    return jsonResponse(
      {
        success: false,
        message: 'Failed to fetch quote requests',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      request,
      500
    );
  }
}
