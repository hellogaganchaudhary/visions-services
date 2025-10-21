"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitLead = submitLead;
const functions_1 = require("@azure/functions");
const db_1 = require("../database/db");
const validator_1 = __importDefault(require("validator"));
async function submitLead(request, context) {
    var _a, _b, _c;
    context.log('Lead form submission request received');
    // CORS headers
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')[0]) || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    // Handle OPTIONS request for CORS
    if (request.method === 'OPTIONS') {
        return { status: 200, headers };
    }
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
        if (!body.requirement || body.requirement.trim().length < 10) {
            errors.push('Requirement must be at least 10 characters long');
        }
        if (body.requirement && body.requirement.length > 2000) {
            errors.push('Requirement is too long (max 2000 characters)');
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
        // Determine priority based on budget
        let priority = 'medium';
        if (body.budget) {
            const budgetLower = body.budget.toLowerCase();
            if (budgetLower.includes('50000') || budgetLower.includes('100000') || budgetLower.includes('enterprise')) {
                priority = 'high';
            }
            else if (budgetLower.includes('5000') || budgetLower.includes('10000')) {
                priority = 'low';
            }
        }
        // Insert into database
        const result = await (0, db_1.query)(`INSERT INTO leads (name, email, phone, requirement, budget, company, priority, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, created_at`, [
            body.name.trim(),
            body.email.trim().toLowerCase(),
            body.phone.trim(),
            body.requirement.trim(),
            ((_b = body.budget) === null || _b === void 0 ? void 0 : _b.trim()) || null,
            ((_c = body.company) === null || _c === void 0 ? void 0 : _c.trim()) || null,
            priority,
            ipAddress,
            userAgent
        ]);
        context.log('Lead form submitted successfully:', result.rows[0].id);
        return {
            status: 201,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Lead form submitted successfully',
                data: {
                    id: result.rows[0].id,
                    submittedAt: result.rows[0].created_at
                }
            })
        };
    }
    catch (error) {
        context.error('Error submitting lead form:', error);
        return {
            status: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'Failed to submit lead form',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
}
functions_1.app.http('submitLead', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'lead',
    handler: submitLead
});
//# sourceMappingURL=submitLead.js.map