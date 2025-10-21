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
exports.updateStatus = updateStatus;
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
async function updateStatus(request, context) {
    var _a;
    context.log('Update status request received');
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')[0]) || '*',
        'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    if (request.method === 'OPTIONS') {
        return { status: 200, headers };
    }
    try {
        // Verify authentication
        const user = verifyToken(request);
        context.log('Authenticated user:', user.username);
        const body = await request.json();
        if (!body.id || !body.status || !body.table) {
            return {
                status: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'ID, status, and table are required'
                })
            };
        }
        // Validate table name
        const allowedTables = ['contacts', 'leads', 'quote_requests'];
        if (!allowedTables.includes(body.table)) {
            return {
                status: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Invalid table name'
                })
            };
        }
        // Update status
        const result = await (0, db_1.query)(`UPDATE ${body.table} SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`, [body.status, body.id]);
        if (result.rows.length === 0) {
            return {
                status: 404,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Record not found'
                })
            };
        }
        context.log('Status updated successfully:', body.id);
        return {
            status: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Status updated successfully',
                data: result.rows[0]
            })
        };
    }
    catch (error) {
        context.error('Error updating status:', error);
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
                message: 'Failed to update status',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
}
functions_1.app.http('updateStatus', {
    methods: ['PATCH', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'api-admin/status',
    handler: updateStatus
});
//# sourceMappingURL=updateStatus.js.map