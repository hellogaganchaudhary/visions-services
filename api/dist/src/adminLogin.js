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
exports.adminLogin = adminLogin;
const functions_1 = require("@azure/functions");
const db_1 = require("../database/db");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
async function adminLogin(request, context) {
    var _a;
    context.log('Admin login request received');
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')[0]) || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') {
        return { status: 200, headers };
    }
    try {
        const body = await request.json();
        if (!body.username || !body.password) {
            return {
                status: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Username and password are required'
                })
            };
        }
        // Get user from database
        const result = await (0, db_1.query)('SELECT id, username, email, password_hash, full_name, role, is_active FROM admin_users WHERE username = $1', [body.username]);
        if (result.rows.length === 0) {
            return {
                status: 401,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Invalid username or password'
                })
            };
        }
        const user = result.rows[0];
        if (!user.is_active) {
            return {
                status: 403,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Account is disabled'
                })
            };
        }
        // Verify password
        const isValidPassword = await bcrypt.compare(body.password, user.password_hash);
        if (!isValidPassword) {
            return {
                status: 401,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Invalid username or password'
                })
            };
        }
        // Generate JWT token
        const token = jwt.sign({
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '24h' });
        // Update last login
        await (0, db_1.query)('UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);
        // Create session
        const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        await (0, db_1.query)(`INSERT INTO admin_sessions (user_id, session_token, expires_at, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`, [user.id, token, expiresAt, ipAddress, userAgent]);
        context.log('Admin login successful:', user.username);
        return {
            status: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Login successful',
                data: {
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        fullName: user.full_name,
                        role: user.role
                    }
                }
            })
        };
    }
    catch (error) {
        context.error('Error during admin login:', error);
        return {
            status: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'Login failed',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
}
functions_1.app.http('adminLogin', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'api-admin/login',
    handler: adminLogin
});
//# sourceMappingURL=adminLogin.js.map