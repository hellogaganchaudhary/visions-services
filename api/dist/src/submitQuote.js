"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitQuote = submitQuote;
const functions_1 = require("@azure/functions");
const db_1 = require("../database/db");
const validator_1 = __importDefault(require("validator"));
const cors_1 = require("./utils/cors");
async function submitQuote(request, context) {
    var _a, _b, _c, _d;
    context.log('Quote request submission received');
    // Handle preflight OPTIONS request
    if ((0, cors_1.isPreflight)(request)) {
        return (0, cors_1.handlePreflight)(request);
    }
    const headers = (0, cors_1.getCorsHeaders)(request);
    try {
        // Parse request body
        const body = await request.json();
        // Validation
        const errors = [];
        if (!body.name || body.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        if (!body.email || !validator_1.default.isEmail(body.email)) {
            errors.push('Valid email is required');
        }
        if (!body.phone || !validator_1.default.isMobilePhone(body.phone, 'any', { strictMode: false })) {
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
        if (body.websiteUrl && !validator_1.default.isURL(body.websiteUrl, { require_protocol: false })) {
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
        const result = await (0, db_1.query)(`INSERT INTO quote_requests (
        name, email, phone, company, service_type, project_description,
        budget_range, timeline, website_url, preferred_contact_method,
        priority, source, ip_address, user_agent
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING id, created_at`, [
            body.name.trim(),
            body.email.trim().toLowerCase(),
            body.phone.trim(),
            ((_a = body.company) === null || _a === void 0 ? void 0 : _a.trim()) || null,
            body.serviceType.trim(),
            body.projectDescription.trim(),
            body.budgetRange.trim(),
            ((_b = body.timeline) === null || _b === void 0 ? void 0 : _b.trim()) || null,
            ((_c = body.websiteUrl) === null || _c === void 0 ? void 0 : _c.trim()) || null,
            ((_d = body.preferredContactMethod) === null || _d === void 0 ? void 0 : _d.trim()) || 'email',
            priority,
            source,
            ipAddress,
            userAgent
        ]);
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
    }
    catch (error) {
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
functions_1.app.http('submitQuote', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'quote',
    handler: submitQuote
});
//# sourceMappingURL=submitQuote.js.map