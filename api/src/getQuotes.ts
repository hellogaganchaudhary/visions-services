import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../database/db";
import * as jwt from "jsonwebtoken";

function verifyToken(request: HttpRequest): any {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function getQuotes(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Get quote requests received');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS?.split(',')[0] || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return { status: 200, headers };
  }

  try {
    // Verify authentication
    const user = verifyToken(request);
    context.log('Authenticated user:', user.username);

    // Get query parameters
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const source = url.searchParams.get('source');
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Build query
    let queryText = `
      SELECT id, name, email, phone, company, service_type, project_description,
             budget_range, timeline, website_url, preferred_contact_method,
             status, priority, source, created_at, updated_at
      FROM quote_requests
    `;
    const queryParams: any[] = [];
    const conditions: string[] = [];

    if (status) {
      conditions.push('status = $' + (queryParams.length + 1));
      queryParams.push(status);
    }

    if (source) {
      conditions.push('source = $' + (queryParams.length + 1));
      queryParams.push(source);
    }

    if (conditions.length > 0) {
      queryText += ' WHERE ' + conditions.join(' AND ');
    }

    queryText += ' ORDER BY created_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
    queryParams.push(limit, offset);

    // Get quote requests
    const quotesResult = await query(queryText, queryParams);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM quote_requests';
    const countParams: any[] = [];
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
      if (status) countParams.push(status);
      if (source) countParams.push(source);
    }
    const countResult = await query(countQuery, countParams);

    // Get statistics
    const statsResult = await query('SELECT * FROM quote_statistics');

    return {
      status: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          quotes: quotesResult.rows,
          pagination: {
            total: parseInt(countResult.rows[0].total),
            limit,
            offset,
            hasMore: (offset + limit) < parseInt(countResult.rows[0].total)
          },
          statistics: statsResult.rows[0]
        }
      })
    };

  } catch (error: any) {
    context.error('Error getting quote requests:', error);

    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return {
        status: 401,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Unauthorized'
        })
      };
    }

    return {
      status: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to get quote requests',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}

app.http('getQuotes', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'api-admin/quotes',
  handler: getQuotes
});
