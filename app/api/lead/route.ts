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
    const { name, email, phone, requirement, budget, company } = body;

    // Validation
    if (!name || !email || !phone || !requirement) {
      return jsonResponse(
        { success: false, message: 'Name, email, phone, and requirement are required' },
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
      requirement: validator.escape(requirement.trim()),
      budget: budget ? validator.escape(budget.trim()) : null,
      company: company ? validator.escape(company.trim()) : null,
    };

    // Insert into database
    const result = await query(
      'INSERT INTO leads (name, email, phone, requirement, budget, company, status, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [sanitized.name, sanitized.email, sanitized.phone, sanitized.requirement, sanitized.budget, sanitized.company, 'new', 'medium']
    );

    if (process.env.NODE_ENV === 'development') {
      console.log('Lead form submitted:', sanitized.email);
    }

    return jsonResponse(
      {
        success: true,
        message: 'Thank you for your interest! We will contact you shortly.',
        data: { id: result.rows[0].id },
      },
      request
    );
  } catch (error: any) {
    console.error('Lead form error:', error);
    return jsonResponse(
      {
        success: false,
        message: 'Failed to submit lead form',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      request,
      500
    );
  }
}
