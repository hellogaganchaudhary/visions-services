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

export async function getLeads(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Get leads request received');

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
    const priority = url.searchParams.get('priority');
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Build query
    let queryText = `
      SELECT id, name, email, phone, requirement, budget, company, status, priority, created_at, updated_at
      FROM leads
    `;
    const queryParams: any[] = [];
    const conditions: string[] = [];

    if (status) {
      conditions.push('status = $' + (queryParams.length + 1));
      queryParams.push(status);
    }

    if (priority) {
      conditions.push('priority = $' + (queryParams.length + 1));
      queryParams.push(priority);
    }

    if (conditions.length > 0) {
      queryText += ' WHERE ' + conditions.join(' AND ');
    }

    queryText += ' ORDER BY created_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
    queryParams.push(limit, offset);

    // Get leads
    const leadsResult = await query(queryText, queryParams);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM leads';
    const countParams: any[] = [];
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
      if (status) countParams.push(status);
      if (priority) countParams.push(priority);
    }
    const countResult = await query(countQuery, countParams);

    // Get statistics
    const statsResult = await query('SELECT * FROM lead_statistics');

    return {
      status: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          leads: leadsResult.rows,
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
    context.error('Error getting leads:', error);

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
        message: 'Failed to get leads',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}

app.http('getLeads', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'api-admin/leads',
  handler: getLeads
});
