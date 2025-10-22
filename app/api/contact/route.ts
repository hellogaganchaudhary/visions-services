import { NextRequest } from 'next/server';
import { query } from '@/lib/db';
import validator from 'validator';
import { handlePreflight, jsonResponse } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email || !phone) {
      return jsonResponse(
        { success: false, message: 'Name, email, and phone are required' },
        request,
        400
      );
    }

    if (!validator.isEmail(email)) {
      return jsonResponse(
        { success: false, message: 'Invalid email format' },
        request,
        400
      );
    }

    // Sanitize inputs
    const sanitized = {
      name: validator.escape(name.trim()),
      email: validator.normalizeEmail(email.trim()) || email.trim(),
      phone: validator.escape(phone.trim()),
      message: message ? validator.escape(message.trim()) : '',
    };

    // Insert into database
    const result = await query(
      'INSERT INTO contacts (name, email, phone, message, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [sanitized.name, sanitized.email, sanitized.phone, sanitized.message, 'new']
    );

    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submitted:', sanitized.email);
    }

    return jsonResponse(
      {
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        data: { id: result.rows[0].id },
      },
      request
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return jsonResponse(
      {
        success: false,
        message: 'Failed to submit contact form',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      request,
      500
    );
  }
}
