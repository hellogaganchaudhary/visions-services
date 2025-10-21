# API Endpoints Reference

## Base URL
- **Local Development:** `http://localhost:7071/api`
- **Production:** `https://techvision-api.azurewebsites.net/api` (after deployment)

---

## 📝 Public Endpoints (No Authentication Required)

### 1. Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I'm interested in your services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "status": "new"
  }
}
```

**Validation Rules:**
- name: Required, min 2 characters
- email: Required, valid email format
- phone: Required, valid phone format (accepts various formats)
- message: Optional, max 5000 characters

---

### 2. Submit Lead Form
```http
POST /api/lead
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "budget": "$20,000 - $50,000",
  "requirement": "Need a new e-commerce platform with custom features"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead form submitted successfully",
  "data": {
    "id": 1,
    "name": "Jane Smith",
    "priority": "high",
    "status": "new"
  }
}
```

**Validation Rules:**
- name: Required, min 2 characters
- email: Required, valid email format
- phone: Required, valid format
- company: Optional
- budget: Required
- requirement: Required, min 10 chars, max 2000 chars

**Priority Assignment:**
- Contains "$100k" or "$100,000" → Critical
- Contains "$50k" or "$50,000" → High
- Contains "$20k" or "$20,000" → Medium
- Default → Low

---

### 3. Submit Quote Request
```http
POST /api/quote
Content-Type: application/json

{
  "name": "Bob Johnson",
  "email": "bob@example.com",
  "phone": "+1234567890",
  "company": "StartupXYZ",
  "website_url": "https://example.com",
  "service_type": "Web Development",
  "project_description": "We need a modern, responsive website with e-commerce capabilities",
  "budget_range": "$50,000 - $100,000",
  "timeline": "3-6 months",
  "preferred_contact": "Email"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quote request submitted successfully",
  "data": {
    "id": 1,
    "name": "Bob Johnson",
    "source": "google_ads",
    "status": "new"
  }
}
```

**Validation Rules:**
- name: Required, min 2 characters
- email: Required, valid email format
- phone: Required, valid format
- company: Optional
- website_url: Optional, valid URL if provided
- service_type: Required
- project_description: Required, min 20 chars, max 3000 chars
- budget_range: Required
- timeline: Required
- preferred_contact: Required

**Source Detection:**
- From Google Ads if URL contains `utm_source=google` or referrer is Google
- Otherwise marked as "direct"

**Priority Assignment:**
- Budget contains "$100k" or "$100,000" → Critical
- Otherwise → High

---

## 🔐 Protected Endpoints (JWT Authentication Required)

### 4. Admin Login
```http
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "full_name": "System Administrator",
      "role": "admin"
    }
  }
}
```

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**⚠️ Important:** Change the default password in production!

---

### 5. Get Contacts
```http
GET /api/admin/contacts?page=1&limit=10&status=new
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 10
- `status` (optional): Filter by status (new, in_progress, resolved)

**Response:**
```json
{
  "success": true,
  "message": "Contacts retrieved successfully",
  "data": {
    "contacts": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "message": "I'm interested...",
        "status": "new",
        "created_at": "2024-01-15T10:30:00Z",
        "ip_address": "192.168.1.1"
      }
    ],
    "statistics": {
      "total": 50,
      "new": 20,
      "in_progress": 15,
      "resolved": 15,
      "today": 5
    },
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50
    }
  }
}
```

---

### 6. Get Leads
```http
GET /api/admin/leads?page=1&limit=10&status=new&priority=high
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 10
- `status` (optional): Filter by status (new, contacted, qualified, converted, lost)
- `priority` (optional): Filter by priority (low, medium, high, critical)

**Response:**
```json
{
  "success": true,
  "message": "Leads retrieved successfully",
  "data": {
    "leads": [
      {
        "id": 1,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "phone": "+1234567890",
        "company": "Tech Corp",
        "budget": "$20,000 - $50,000",
        "requirement": "Need e-commerce platform",
        "priority": "high",
        "status": "new",
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "statistics": {
      "total": 100,
      "new": 30,
      "low": 20,
      "medium": 30,
      "high": 35,
      "critical": 15
    },
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100
    }
  }
}
```

---

### 7. Get Quote Requests
```http
GET /api/admin/quotes?page=1&limit=10&status=new&source=google_ads
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 10
- `status` (optional): Filter by status (new, reviewing, quoted, accepted, rejected)
- `source` (optional): Filter by source (google_ads, direct)

**Response:**
```json
{
  "success": true,
  "message": "Quote requests retrieved successfully",
  "data": {
    "quotes": [
      {
        "id": 1,
        "name": "Bob Johnson",
        "email": "bob@example.com",
        "phone": "+1234567890",
        "company": "StartupXYZ",
        "website_url": "https://example.com",
        "service_type": "Web Development",
        "project_description": "Modern website needed",
        "budget_range": "$50,000 - $100,000",
        "timeline": "3-6 months",
        "preferred_contact": "Email",
        "source": "google_ads",
        "status": "new",
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "statistics": {
      "total": 75,
      "new": 25,
      "google_ads": 40,
      "direct": 35
    },
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 75
    }
  }
}
```

---

### 8. Update Status
```http
PATCH /api/admin/status
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "table": "contacts",
  "id": 1,
  "status": "in_progress"
}
```

**Valid Tables:**
- `contacts` - Valid statuses: new, in_progress, resolved
- `leads` - Valid statuses: new, contacted, qualified, converted, lost
- `quote_requests` - Valid statuses: new, reviewing, quoted, accepted, rejected

**Response:**
```json
{
  "success": true,
  "message": "Status updated successfully",
  "data": {
    "id": 1,
    "status": "in_progress",
    "updated_at": "2024-01-15T11:00:00Z"
  }
}
```

---

## 🔑 Authentication

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token Expiration:** 24 hours

**Getting a Token:**
1. Call POST /api/admin/login with valid credentials
2. Extract the token from the response
3. Include it in the Authorization header for all protected requests

**Token Storage (Frontend):**
```javascript
// Store token after login
localStorage.setItem('admin_token', token);

// Use token in requests
const token = localStorage.getItem('admin_token');
fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## ❌ Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field_name": "Specific field error"
  }
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

**Example Validation Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "phone": "Phone number is required"
  }
}
```

---

## 🧪 Testing with cURL

### Test Contact Form
```bash
curl -X POST http://localhost:7071/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "message": "This is a test message"
  }'
```

### Test Admin Login
```bash
curl -X POST http://localhost:7071/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### Test Get Contacts (with token)
```bash
TOKEN="your-jwt-token-here"
curl -X GET "http://localhost:7071/api/admin/contacts?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔧 Environment Variables Required

Create `.env` file in the `api` directory:

```env
# Database
DB_HOST=your-server.postgres.database.azure.com
DB_PORT=5432
DB_NAME=techvision
DB_USER=your-username
DB_PASSWORD=your-password
DB_SSL=true

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# CORS
ALLOWED_ORIGINS=https://red-grass-0a2c21e0f.3.azurestaticapps.net,http://localhost:3000
```

---

## 📊 Rate Limiting

**Recommended (not yet implemented):**
- Public endpoints: 100 requests per IP per hour
- Admin endpoints: 1000 requests per token per hour

To implement, add rate limiting middleware to Azure Functions.

---

## 🔒 Security Best Practices

1. **Always use HTTPS** in production
2. **Change default admin password** immediately
3. **Rotate JWT secret** regularly
4. **Enable Azure Function authentication** for additional security
5. **Monitor API logs** for suspicious activity
6. **Set up alerts** for failed login attempts
7. **Backup database** regularly
8. **Use Azure Key Vault** for secrets in production

---

## 📞 Support

For issues or questions:
1. Check Azure Functions logs
2. Review database connection
3. Verify environment variables
4. Test with cURL/Postman
5. Check CORS settings

---

**Last Updated:** January 2024
**API Version:** 1.0.0
