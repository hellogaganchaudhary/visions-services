/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const { query } = require('./db');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Health check endpoint
app.get('/api/health', async function(req, res) {
  try {
    console.log('=== Health Check ===');
    console.log('Environment variables:');
    console.log('- POSTGRES_HOST:', process.env.POSTGRES_HOST);
    console.log('- POSTGRES_DATABASE:', process.env.POSTGRES_DATABASE);
    console.log('- POSTGRES_USER:', process.env.POSTGRES_USER);
    console.log('- POSTGRES_PORT:', process.env.POSTGRES_PORT);
    console.log('- POSTGRES_SSL:', process.env.POSTGRES_SSL);
    
    // Try database connection
    const result = await query('SELECT NOW() as current_time, current_database() as db_name');
    console.log('Database query successful:', result.rows[0]);
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        ...result.rows[0]
      },
      environment: {
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        user: process.env.POSTGRES_USER,
        port: process.env.POSTGRES_PORT,
        ssl: process.env.POSTGRES_SSL
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      stack: error.stack
    });
  }
});

// Test admin user endpoint
app.get('/api/test-admin', async function(req, res) {
  try {
    console.log('=== Testing Admin User Query ===');
    
    // Check if admin_users table exists
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'admin_users'
    `);
    console.log('admin_users table exists:', tablesResult.rows.length > 0);
    
    // Query admin user
    const adminResult = await query(
      'SELECT id, username, is_active, email, LENGTH(password_hash) as hash_length FROM admin_users WHERE username = $1',
      ['admin']
    );
    
    console.log('Admin query result:', adminResult.rows);
    
    res.json({
      table_exists: tablesResult.rows.length > 0,
      admin_found: adminResult.rows.length > 0,
      admin_data: adminResult.rows[0] || null
    });
  } catch (error) {
    console.error('Test admin query failed:', error);
    res.status(500).json({
      error: error.message,
      code: error.code,
      stack: error.stack
    });
  }
});

// Test full login process
app.post('/api/test-login', async function(req, res) {
  const steps = [];
  try {
    const { username, password } = req.body;
    steps.push({ step: 1, desc: 'Received request', username, password: '***' });
    
    // Get admin user
    steps.push({ step: 2, desc: 'Querying database' });
    const result = await query(
      'SELECT id, username, password_hash, is_active FROM admin_users WHERE username = $1',
      [username]
    );
    steps.push({ step: 3, desc: 'Query result', rows: result.rows.length });
    
    if (result.rows.length === 0) {
      steps.push({ step: 4, desc: 'User not found' });
      return res.json({ success: false, reason: 'User not found', steps });
    }
    
    const admin = result.rows[0];
    steps.push({ step: 4, desc: 'User found', user: { id: admin.id, username: admin.username, is_active: admin.is_active } });
    
    if (!admin.is_active) {
      steps.push({ step: 5, desc: 'Account disabled' });
      return res.json({ success: false, reason: 'Account disabled', steps });
    }
    
    steps.push({ step: 5, desc: 'Verifying password', hash_length: admin.password_hash?.length });
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    steps.push({ step: 6, desc: 'Password verification result', isValid: isValidPassword });
    
    if (!isValidPassword) {
      steps.push({ step: 7, desc: 'Invalid password' });
      return res.json({ success: false, reason: 'Invalid password', steps });
    }
    
    steps.push({ step: 7, desc: 'Password valid - generating token' });
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '30m' }
    );
    steps.push({ step: 8, desc: 'Token generated', token_length: token.length });
    
    steps.push({ step: 9, desc: 'Creating session' });
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    await query(
      'INSERT INTO admin_sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3)',
      [admin.id, token, expiresAt]
    );
    steps.push({ step: 10, desc: 'Session created' });
    
    res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        username: admin.username
      },
      steps
    });
  } catch (error) {
    steps.push({ step: 'ERROR', error: error.message, type: error.constructor.name });
    res.status(500).json({
      success: false,
      error: error.message,
      steps
    });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

/**********************
 * Public API Routes  *
 **********************/

// Submit Contact Form
app.post('/api/submitContact', async function(req, res) {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validation
    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    if (!email || !validator.isEmail(email)) {
      errors.push('Valid email is required');
    }
    if (!phone || !validator.isMobilePhone(phone, 'any', { strictMode: false })) {
      errors.push('Valid phone number is required');
    }
    if (message && message.length > 5000) {
      errors.push('Message is too long (max 5000 characters)');
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Insert into database
    const result = await query(
      `INSERT INTO contacts (name, email, phone, message, status) 
       VALUES ($1, $2, $3, $4, 'new') 
       RETURNING id, created_at`,
      [name.trim(), email.toLowerCase().trim(), phone.trim(), message?.trim() || null]
    );

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Submit Lead Form
app.post('/api/submitLead', async function(req, res) {
  try {
    const { name, email, phone, company, service } = req.body;
    
    // Validation
    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    if (!email || !validator.isEmail(email)) {
      errors.push('Valid email is required');
    }
    if (!phone || !validator.isMobilePhone(phone, 'any', { strictMode: false })) {
      errors.push('Valid phone number is required');
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Insert into database
    const result = await query(
      `INSERT INTO leads (name, email, phone, company, service, status) 
       VALUES ($1, $2, $3, $4, $5, 'new') 
       RETURNING id, created_at`,
      [name.trim(), email.toLowerCase().trim(), phone.trim(), company?.trim() || null, service?.trim() || null]
    );

    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ error: 'Failed to submit lead' });
  }
});

// Submit Quote Request
app.post('/api/submitQuote', async function(req, res) {
  try {
    const { name, email, phone, company, service, budget, projectDetails } = req.body;
    
    // Validation
    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    if (!email || !validator.isEmail(email)) {
      errors.push('Valid email is required');
    }
    if (!phone || !validator.isMobilePhone(phone, 'any', { strictMode: false })) {
      errors.push('Valid phone number is required');
    }
    if (!service) {
      errors.push('Service selection is required');
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Insert into database
    const result = await query(
      `INSERT INTO quote_requests (name, email, phone, company, service, budget, project_details, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'new') 
       RETURNING id, created_at`,
      [
        name.trim(), 
        email.toLowerCase().trim(), 
        phone.trim(), 
        company?.trim() || null, 
        service, 
        budget || null, 
        projectDetails?.trim() || null
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error submitting quote:', error);
    res.status(500).json({ error: 'Failed to submit quote request' });
  }
});

/**********************
 * Admin API Routes   *
 **********************/

// Admin Login
app.post('/api/adminLogin', async function(req, res) {
  try {
    console.log('=== Admin Login Attempt ===');
    console.log('Request body:', JSON.stringify(req.body));
    
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Missing credentials');
      return res.status(400).json({ error: 'Username and password are required' });
    }

    console.log('Querying database for username:', username);
    
    // Get admin user
    const result = await query(
      'SELECT id, username, password_hash, is_active FROM admin_users WHERE username = $1',
      [username]
    );

    console.log('Database query result rows:', result.rows.length);

    if (result.rows.length === 0) {
      console.log('User not found in database');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = result.rows[0];
    console.log('Found admin:', { id: admin.id, username: admin.username, is_active: admin.is_active });

    if (!admin.is_active) {
      console.log('Account is disabled');
      return res.status(403).json({ error: 'Account is disabled' });
    }

    // Verify password
    console.log('Verifying password...');
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    console.log('Password valid:', isValidPassword);

    if (!isValidPassword) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '30m' }
    );
    console.log('Token generated successfully');

    // Create session
    console.log('Creating session...');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    await query(
      'INSERT INTO admin_sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3)',
      [admin.id, token, expiresAt]
    );
    console.log('Session created');

    console.log('Login successful!');
    res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('=== Login Error ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Database connection details:');
    console.error('- Host:', process.env.POSTGRES_HOST);
    console.error('- Database:', process.env.POSTGRES_DATABASE);
    console.error('- User:', process.env.POSTGRES_USER);
    console.error('- Port:', process.env.POSTGRES_PORT);
    console.error('- SSL:', process.env.POSTGRES_SSL);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get Contacts (Protected)
app.get('/api/getContacts', verifyToken, async function(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT id, name, email, phone, message, status, created_at 
       FROM contacts 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await query('SELECT COUNT(*) FROM contacts');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Get Leads (Protected)
app.get('/api/getLeads', verifyToken, async function(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT id, name, email, phone, company, service, status, created_at 
       FROM leads 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await query('SELECT COUNT(*) FROM leads');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Get Quotes (Protected)
app.get('/api/getQuotes', verifyToken, async function(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT id, name, email, phone, company, service, budget, project_details, status, created_at 
       FROM quote_requests 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await query('SELECT COUNT(*) FROM quote_requests');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

// Update Status (Protected)
app.put('/api/updateStatus', verifyToken, async function(req, res) {
  try {
    const { type, id, status } = req.body;

    const validTypes = ['contact', 'lead', 'quote'];
    const validStatuses = ['new', 'contacted', 'in-progress', 'completed', 'cancelled'];

    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid type' });
    }

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const tableMap = {
      contact: 'contacts',
      lead: 'leads',
      quote: 'quote_requests'
    };

    await query(
      `UPDATE ${tableMap[type]} SET status = $1 WHERE id = $2`,
      [status, id]
    );

    res.json({
      success: true,
      message: 'Status updated successfully'
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Export the app object
module.exports = app;

