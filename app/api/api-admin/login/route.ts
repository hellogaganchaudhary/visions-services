import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';
import { handlePreflight, jsonResponse } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return jsonResponse(
        { success: false, message: 'Username and password required' },
        request,
        400
      );
    }

    // Query database for user
    const result = await query(
      'SELECT id, username, email, password_hash, full_name, role, is_active FROM admin_users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return jsonResponse(
        { success: false, message: 'Invalid credentials' },
        request,
        401
      );
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return jsonResponse(
        { success: false, message: 'Account is inactive' },
        request,
        403
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return jsonResponse(
        { success: false, message: 'Invalid credentials' },
        request,
        401
      );
    }

    // Update last login
    await query(
      'UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );

    // Generate JWT
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    // Create session
    await query(
      'INSERT INTO admin_sessions (user_id, session_token, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
      [
        user.id,
        token,
        new Date(Date.now() + 24 * 60 * 60 * 1000),
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown',
      ]
    );

    if (process.env.NODE_ENV === 'development') {
      console.log('Admin login successful:', username);
    }

    return jsonResponse(
      {
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.full_name,
            role: user.role,
          },
        },
      },
      request
    );
  } catch (error: any) {
    console.error('Admin login error:', error);
    return jsonResponse(
      {
        success: false,
        message: 'Login failed',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      request,
      500
    );
  }
}
