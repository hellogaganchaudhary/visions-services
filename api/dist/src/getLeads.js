"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeads = getLeads;
const functions_1 = require("@azure/functions");
const db_1 = require("../database/db");
const jwt = __importStar(require("jsonwebtoken"));
function verifyToken(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No token provided');
    }
    const token = authHeader.substring(7);
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        throw new Error('Invalid token');
    }
}
async function getLeads(request, context) {
    var _a;
    context.log('Get leads request received');
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')[0]) || '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    if (request.method === 'OPTIONS') {
        return { status: 200, headers };
    }
    try {
        // Verify authentication
        const user = verifyToken(request);
        context.log('Authenticated user:', user.username);
        // Get query parameters
        const url = new URL(request.url);
        const status = url.searchParams.get('status');
        const priority = url.searchParams.get('priority');
        const limit = parseInt(url.searchParams.get('limit') || '100');
        const offset = parseInt(url.searchParams.get('offset') || '0');
        // Build query
        let queryText = `
      SELECT id, name, email, phone, requirement, budget, company, status, priority, created_at, updated_at
      FROM leads
    `;
        const queryParams = [];
        const conditions = [];
        if (status) {
            conditions.push('status = $' + (queryParams.length + 1));
            queryParams.push(status);
        }
        if (priority) {
            conditions.push('priority = $' + (queryParams.length + 1));
            queryParams.push(priority);
        }
        if (conditions.length > 0) {
            queryText += ' WHERE ' + conditions.join(' AND ');
        }
        queryText += ' ORDER BY created_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
        queryParams.push(limit, offset);
        // Get leads
        const leadsResult = await (0, db_1.query)(queryText, queryParams);
        // Get total count
        let countQuery = 'SELECT COUNT(*) as total FROM leads';
        const countParams = [];
        if (conditions.length > 0) {
            countQuery += ' WHERE ' + conditions.join(' AND ');
            if (status)
                countParams.push(status);
            if (priority)
                countParams.push(priority);
        }
        const countResult = await (0, db_1.query)(countQuery, countParams);
        // Get statistics
        const statsResult = await (0, db_1.query)('SELECT * FROM lead_statistics');
        return {
            status: 200,
            headers,
            body: JSON.stringify({
                success: true,
                data: {
                    leads: leadsResult.rows,
                    pagination: {
                        total: parseInt(countResult.rows[0].total),
                        limit,
                        offset,
                        hasMore: (offset + limit) < parseInt(countResult.rows[0].total)
                    },
                    statistics: statsResult.rows[0]
                }
            })
        };
    }
    catch (error) {
        context.error('Error getting leads:', error);
        if (error.message === 'No token provided' || error.message === 'Invalid token') {
            return {
                status: 401,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Unauthorized'
                })
            };
        }
        return {
            status: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'Failed to get leads',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
}
functions_1.app.http('getLeads', {
    methods: ['GET', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'api-admin/leads',
    handler: getLeads
});
//# sourceMappingURL=getLeads.js.map