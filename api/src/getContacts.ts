import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../database/db";
import * as jwt from "jsonwebtoken";
import { getCorsHeaders, isPreflight, handlePreflight } from "./utils/cors";

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

export async function getContacts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Get contacts request received');

  // Handle preflight OPTIONS request
  if (isPreflight(request)) {
    return handlePreflight(request);
  }

  const headers = getCorsHeaders(request);

  try {
    // Verify authentication
    const user = verifyToken(request);
    context.log('Authenticated user:', user.username);

    // Get query parameters
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Build query
    let queryText = `
      SELECT id, name, email, phone, message, status, created_at, updated_at
      FROM contacts
    `;
    const queryParams: any[] = [];

    if (status) {
      queryText += ' WHERE status = $1';
      queryParams.push(status);
    }

    queryText += ' ORDER BY created_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
    queryParams.push(limit, offset);

    // Get contacts
    const contactsResult = await query(queryText, queryParams);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM contacts';
    if (status) {
      countQuery += ' WHERE status = $1';
    }
    const countResult = await query(countQuery, status ? [status] : []);

    // Get statistics
    const statsResult = await query('SELECT * FROM contact_statistics');

    return {
      status: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          contacts: contactsResult.rows,
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
    context.error('Error getting contacts:', error);

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
        message: 'Failed to get contacts',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}

app.http('getContacts', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'api-admin/contacts',
  handler: getContacts
});
