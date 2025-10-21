import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../database/db";
import validator from "validator";

interface QuoteRequestData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  projectDescription: string;
  budgetRange: string;
  timeline?: string;
  websiteUrl?: string;
  preferredContactMethod?: string;
}

export async function submitQuote(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Quote request submission received');

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS?.split(',')[0] || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle OPTIONS request for CORS
  if (request.method === 'OPTIONS') {
    return { status: 200, headers };
  }

  try {
    // Parse request body
    const body = await request.json() as QuoteRequestData;
    
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

    if (!body.serviceType || body.serviceType.trim().length < 2) {
      errors.push('Service type is required');
    }

    if (!body.projectDescription || body.projectDescription.trim().length < 20) {
      errors.push('Project description must be at least 20 characters long');
    }

    if (body.projectDescription && body.projectDescription.length > 3000) {
      errors.push('Project description is too long (max 3000 characters)');
    }

    if (!body.budgetRange) {
      errors.push('Budget range is required');
    }

    if (body.websiteUrl && !validator.isURL(body.websiteUrl, { require_protocol: false })) {
      errors.push('Please enter a valid website URL');
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

    // Determine source (check if from Google Ads)
    const referer = request.headers.get('referer') || '';
    const utmSource = new URL(request.url).searchParams.get('utm_source');
    const source = utmSource === 'google_ads' || referer.includes('googleadservices') ? 'google_ads' : 'direct';

    // Determine priority based on budget
    let priority = 'high'; // All quote requests are high priority by default
    const budgetLower = body.budgetRange.toLowerCase();
    if (budgetLower.includes('100000') || budgetLower.includes('enterprise') || budgetLower.includes('custom')) {
      priority = 'critical';
    }

    // Insert into database
    const result = await query(
      `INSERT INTO quote_requests (
        name, email, phone, company, service_type, project_description,
        budget_range, timeline, website_url, preferred_contact_method,
        priority, source, ip_address, user_agent
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING id, created_at`,
      [
        body.name.trim(),
        body.email.trim().toLowerCase(),
        body.phone.trim(),
        body.company?.trim() || null,
        body.serviceType.trim(),
        body.projectDescription.trim(),
        body.budgetRange.trim(),
        body.timeline?.trim() || null,
        body.websiteUrl?.trim() || null,
        body.preferredContactMethod?.trim() || 'email',
        priority,
        source,
        ipAddress,
        userAgent
      ]
    );

    context.log('Quote request submitted successfully:', result.rows[0].id);

    return {
      status: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Quote request submitted successfully. We will contact you within 24 hours.',
        data: {
          id: result.rows[0].id,
          submittedAt: result.rows[0].created_at
        }
      })
    };

  } catch (error: any) {
    context.error('Error submitting quote request:', error);
    
    return {
      status: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to submit quote request',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
}

app.http('submitQuote', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'quote',
  handler: submitQuote
});
