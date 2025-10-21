import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { isPreflight, handlePreflight, jsonResponse } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request);
}

export async function PATCH(request: NextRequest) {
  try {
    // Verify authentication
    const user = verifyToken(request);
    console.log('Authenticated user:', user.username);

    const body = await request.json();
    const { id, status, table } = body;

    // Validation
    if (!id || !status || !table) {
      return jsonResponse(
        { success: false, message: 'ID, status, and table are required' },
        request,
        400
      );
    }

    // Validate table name to prevent SQL injection
    const allowedTables = ['contacts', 'leads', 'quote_requests'];
    if (!allowedTables.includes(table)) {
      return jsonResponse(
        { success: false, message: 'Invalid table name' },
        request,
        400
      );
    }

    // Validate status
    const allowedStatuses = ['new', 'in_progress', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return jsonResponse(
        { success: false, message: 'Invalid status' },
        request,
        400
      );
    }

    // Update status
    const result = await query(
      `UPDATE ${table} SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return jsonResponse(
        { success: false, message: 'Record not found' },
        request,
        404
      );
    }

    console.log(`Status updated for ${table} ID ${id}:`, status);

    return jsonResponse(
      {
        success: true,
        message: 'Status updated successfully',
        data: result.rows[0],
      },
      request
    );
  } catch (error: any) {
    console.error('Update status error:', error);
    
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
        message: 'Failed to update status',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      request,
      500
    );
  }
}
