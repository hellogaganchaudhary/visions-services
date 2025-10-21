import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../database/db";
import validator from "validator";
import { getCorsHeaders, isPreflight, handlePreflight } from "./utils/cors";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export async function submitContact(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Contact form submission request received');

  // Handle preflight OPTIONS request
  if (isPreflight(request)) {
    return handlePreflight(request);
  }

  const headers = getCorsHeaders(request);

  try {
    // Parse request body
    const body = await request.json() as ContactFormData;
    
    // Validation
    const errors: string[] = [];

    if (!body.name || body.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!body.email || !validator.isEmail(body.email)) {
      errors.push('Valid email is required');
    }

    if (!body.phone || !validator.isMobilePhone(body.phone, 'any', { strictMode: false })) {
      errors.push('Valid phone number is required');
    }

    if (body.message && body.message.length > 5000) {
      errors.push('Message is too long (max 5000 characters)');
    }

    if (errors.length > 0) {
      return {
        status: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          errors 
        })
      };
    }

    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert into database
    const result = await query(
      `INSERT INTO contacts (name, email, phone, message, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [
        body.name.trim(),
        body.email.trim().toLowerCase(),
        body.phone.trim(),
        body.message?.trim() || null,
        ipAddress,
        userAgent
      ]
    );

    context.log('Contact form submitted successfully:', result.rows[0].id);

    return {
      status: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
        data: {
          id: result.rows[0].id,
          submittedAt: result.rows[0].created_at
        }
      })
    };

  } catch (error: any) {
    context.error('Error submitting contact form:', error);
    
    return {
      status: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to submit contact form',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}

app.http('submitContact', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'contact',
  handler: submitContact
});
