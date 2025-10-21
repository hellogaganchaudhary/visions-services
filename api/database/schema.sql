-- Azure PostgreSQL Database Schema for TechVision Admin Panel
-- Run this script in Azure PostgreSQL to create all required tables

-- Create database (if not exists)
-- CREATE DATABASE techvision_db;

-- Connect to database
-- \c techvision_db;

-- Note: Using gen_random_uuid() which is built-in to PostgreSQL 13+
-- No extension needed for Azure PostgreSQL Flexible Server

-- Table: contacts (from Contact Us form)
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50),
    user_agent TEXT
);

-- Table: leads (from Lead Generation form)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    requirement TEXT NOT NULL,
    budget VARCHAR(100),
    company VARCHAR(255),
    status VARCHAR(50) DEFAULT 'new',
    priority VARCHAR(50) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50),
    user_agent TEXT
);

-- Table: quote_requests (for Google Ads landing page)
CREATE TABLE IF NOT EXISTS quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    service_type VARCHAR(100) NOT NULL,
    project_description TEXT NOT NULL,
    budget_range VARCHAR(100) NOT NULL,
    timeline VARCHAR(100),
    website_url VARCHAR(500),
    preferred_contact_method VARCHAR(50) DEFAULT 'email',
    status VARCHAR(50) DEFAULT 'new',
    priority VARCHAR(50) DEFAULT 'high',
    source VARCHAR(100) DEFAULT 'google_ads',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50),
    user_agent TEXT
);

-- Table: admin_users (for admin authentication)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: admin_sessions (for session management)
CREATE TABLE IF NOT EXISTS admin_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
    session_token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50),
    user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_status ON contacts(status);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_priority ON leads(priority);

CREATE INDEX idx_quote_requests_email ON quote_requests(email);
CREATE INDEX idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_source ON quote_requests(source);

CREATE INDEX idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX idx_admin_sessions_expires ON admin_sessions(expires_at);

-- Insert default admin user (password: Admin@123)
-- You should change this password after first login
INSERT INTO admin_users (username, email, password_hash, full_name, role)
VALUES (
    'admin',
    'admin@techvision.com',
    '$2b$10$rKZE5YxZ9X.Qr7qQJ7qQJOX5YxZ9X.Qr7qQJ7qQJOX5YxZ9X.Qr7q',
    'System Administrator',
    'super_admin'
) ON CONFLICT (username) DO NOTHING;

-- Create view for contact statistics
CREATE OR REPLACE VIEW contact_statistics AS
SELECT 
    COUNT(*) as total_contacts,
    COUNT(CASE WHEN status = 'new' THEN 1 END) as new_contacts,
    COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted,
    COUNT(CASE WHEN status = 'closed' THEN 1 END) as closed,
    COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) as today_contacts
FROM contacts;

-- Create view for lead statistics
CREATE OR REPLACE VIEW lead_statistics AS
SELECT 
    COUNT(*) as total_leads,
    COUNT(CASE WHEN status = 'new' THEN 1 END) as new_leads,
    COUNT(CASE WHEN status = 'qualified' THEN 1 END) as qualified_leads,
    COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted_leads,
    COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority,
    COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) as today_leads
FROM leads;

-- Create view for quote request statistics
CREATE OR REPLACE VIEW quote_statistics AS
SELECT 
    COUNT(*) as total_quotes,
    COUNT(CASE WHEN status = 'new' THEN 1 END) as new_quotes,
    COUNT(CASE WHEN status = 'sent' THEN 1 END) as sent_quotes,
    COUNT(CASE WHEN status = 'accepted' THEN 1 END) as accepted_quotes,
    COUNT(CASE WHEN source = 'google_ads' THEN 1 END) as google_ads_quotes,
    COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) as today_quotes
FROM quote_requests;

-- Insert default admin user (password: admin123)
-- Password hash is bcrypt hash of 'admin123'
INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active)
VALUES (
    'admin',
    'admin@visions.com',
    '$2a$10$kQLb4lY1hPyslpqJXk2X4Oj25HJd2Z2bHAp.zB48Zyh.7CYWHsPwi',
    'System Administrator',
    'super_admin',
    true
)
ON CONFLICT (username) DO NOTHING;

