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
    const { name, email, phone, company, serviceType, projectDescription, budgetRange, timeline, websiteUrl, preferredContactMethod } = body;

    // Validation
    if (!name || !email || !phone || !serviceType || !projectDescription || !budgetRange) {
      return jsonResponse(
        { success: false, message: 'Name, email, phone, service type, project description, and budget range are required' },
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

    if (websiteUrl && !validator.isURL(websiteUrl)) {
      return jsonResponse(
        { success: false, message: 'Invalid website URL format' },
        request,
        400
      );
    }

    // Sanitize inputs
    const sanitized = {
      name: validator.escape(name.trim()),
      email: validator.normalizeEmail(email.trim()) || email.trim(),
      phone: validator.escape(phone.trim()),
      company: company ? validator.escape(company.trim()) : null,
      serviceType: validator.escape(serviceType.trim()),
      projectDescription: validator.escape(projectDescription.trim()),
      budgetRange: validator.escape(budgetRange.trim()),
      timeline: timeline ? validator.escape(timeline.trim()) : null,
      websiteUrl: websiteUrl ? validator.escape(websiteUrl.trim()) : null,
      preferredContactMethod: preferredContactMethod ? validator.escape(preferredContactMethod.trim()) : 'email',
    };

    // Insert into database
    const result = await query(
      `INSERT INTO quote_requests 
       (name, email, phone, company, service_type, project_description, budget_range, timeline, website_url, preferred_contact_method, status, priority, source) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
       RETURNING id`,
      [
        sanitized.name,
        sanitized.email,
        sanitized.phone,
        sanitized.company,
        sanitized.serviceType,
        sanitized.projectDescription,
        sanitized.budgetRange,
        sanitized.timeline,
        sanitized.websiteUrl,
        sanitized.preferredContactMethod,
        'new',
        'medium',
        'website'
      ]
    );

    if (process.env.NODE_ENV === 'development') {
      console.log('Quote request submitted:', sanitized.email);
    }

    return jsonResponse(
      {
        success: true,
        message: 'Thank you for your quote request! We will send you a detailed proposal soon.',
        data: { id: result.rows[0].id },
      },
      request
    );
  } catch (error: any) {
    console.error('Quote request error:', error);
    return jsonResponse(
      {
        success: false,
        message: 'Failed to submit quote request',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      request,
      500
    );
  }
}
