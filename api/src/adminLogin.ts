import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../database/db";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

interface LoginData {
  username: string;
  password: string;
}

export async function adminLogin(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Admin login request received');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS?.split(',')[0] || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return { status: 200, headers };
  }

  try {
    const body = await request.json() as LoginData;

    if (!body.username || !body.password) {
      return {
        status: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Username and password are required'
        })
      };
    }

    // Get user from database
    const result = await query(
      'SELECT id, username, email, password_hash, full_name, role, is_active FROM admin_users WHERE username = $1',
      [body.username]
    );

    if (result.rows.length === 0) {
      return {
        status: 401,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid username or password'
        })
      };
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return {
        status: 403,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Account is disabled'
        })
      };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(body.password, user.password_hash);

    if (!isValidPassword) {
      return {
        status: 401,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Invalid username or password'
        })
      };
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Update last login
    await query(
      'UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );

    // Create session
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await query(
      `INSERT INTO admin_sessions (user_id, session_token, expires_at, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, token, expiresAt, ipAddress, userAgent]
    );

    context.log('Admin login successful:', user.username);

    return {
      status: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.full_name,
            role: user.role
          }
        }
      })
    };

  } catch (error: any) {
    context.error('Error during admin login:', error);

    return {
      status: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Login failed',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}

app.http('adminLogin', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'api-admin/login',
  handler: adminLogin
});
