import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

/**
 * Verify JWT token from Authorization header
 */
export function verifyToken(request: NextRequest): AuthUser {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

/**
 * Generate JWT token
 */
export function generateToken(user: AuthUser): string {
  return jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: '24h',
  });
}
