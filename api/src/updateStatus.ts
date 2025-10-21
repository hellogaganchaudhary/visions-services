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

interface UpdateStatusData {
  id: string;
  status: string;
  table: 'contacts' | 'leads' | 'quote_requests';
}

export async function updateStatus(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Update status request received');

  // Handle preflight OPTIONS request
  if (isPreflight(request)) {
    return handlePreflight(request);
  }

  const headers = getCorsHeaders(request);

  try {
    // Verify authentication
    const user = verifyToken(request);
    context.log('Authenticated user:', user.username);

    const body = await request.json() as UpdateStatusData;

    if (!body.id || !body.status || !body.table) {
      return {
        status: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'ID, status, and table are required'
        })
      };
    }

    // Validate table name
    const allowedTables = ['contacts', 'leads', 'quote_requests'];
    if (!allowedTables.includes(body.table)) {
      return {
        status: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid table name'
        })
      };
    }

    // Update status
    const result = await query(
      `UPDATE ${body.table} SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [body.status, body.id]
    );

    if (result.rows.length === 0) {
      return {
        status: 404,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Record not found'
        })
      };
    }

    context.log('Status updated successfully:', body.id);

    return {
      status: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Status updated successfully',
        data: result.rows[0]
      })
    };

  } catch (error: any) {
    context.error('Error updating status:', error);

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
        message: 'Failed to update status',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}

app.http('updateStatus', {
  methods: ['PATCH', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'api-admin/status',
  handler: updateStatus
});
