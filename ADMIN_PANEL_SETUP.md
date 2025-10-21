# TechVision Admin Panel - Complete Setup Guide

## 🎯 Overview

This guide will help you set up a complete admin panel system with:
- ✅ Contact Form submissions
- ✅ Lead Generation Form submissions  
- ✅ Quote Request Form (optimized for Google Ads)
- ✅ Secure Admin Panel to view all submissions
- ✅ Azure PostgreSQL Database
- ✅ Azure Functions Backend API

---

## 📋 Prerequisites

1. **Azure Account** with active subscription
2. **Node.js** 18+ installed
3. **Azure Functions Core Tools** v4
4. **PostgreSQL** client (pgAdmin or Azure Data Studio)
5. **Git** installed

---

## 🗄️ Step 1: Create Azure PostgreSQL Database

### 1.1 Create Database Server

```bash
# Login to Azure
az login

# Create resource group (if not exists)
az group create --name aivisions --location eastus2

# Create PostgreSQL Flexible Server
az postgres flexible-server create \
  --resource-group aivisions \
  --name techvision-db-server \
  --location eastus2 \
  --admin-user techvisionadmin \
  --admin-password "YourSecurePassword123!" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --version 14 \
  --storage-size 32 \
  --public-access 0.0.0.0-255.255.255.255

# Create database
az postgres flexible-server db create \
  --resource-group aivisions \
  --server-name techvision-db-server \
  --database-name techvision_db
```

### 1.2 Configure Firewall Rules

```bash
# Allow Azure services
az postgres flexible-server firewall-rule create \
  --resource-group aivisions \
  --name techvision-db-server \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Allow your IP (get your IP from https://whatismyipaddress.com/)
az postgres flexible-server firewall-rule create \
  --resource-group aivisions \
  --name techvision-db-server \
  --rule-name AllowMyIP \
  --start-ip-address YOUR_IP_ADDRESS \
  --end-ip-address YOUR_IP_ADDRESS
```

### 1.3 Run Database Schema

1. Connect to your PostgreSQL database using:
   - **Connection string**: `techvision-db-server.postgres.database.azure.com`
   - **Database**: `techvision_db`
   - **Username**: `techvisionadmin`
   - **Password**: `YourSecurePassword123!`

2. Run the SQL file: `api/database/schema.sql`

---

## ⚙️ Step 2: Set Up Azure Functions API

### 2.1 Navigate to API Directory

```powershell
cd api
```

### 2.2 Install Dependencies

```powershell
npm install
```

### 2.3 Create .env File

Copy `.env.example` to `.env` and update:

```env
POSTGRES_HOST=techvision-db-server.postgres.database.azure.com
POSTGRES_DATABASE=techvision_db
POSTGRES_USER=techvisionadmin
POSTGRES_PASSWORD=YourSecurePassword123!
POSTGRES_PORT=5432
POSTGRES_SSL=true

JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
ADMIN_SESSION_DURATION=86400
ALLOWED_ORIGINS=https://red-grass-0a2c21e0f.3.azurestaticapps.net,http://localhost:3000
```

### 2.4 Test Locally

```powershell
npm start
```

Your API will be available at: `http://localhost:7071`

Test endpoints:
- `POST http://localhost:7071/api/contact`
- `POST http://localhost:7071/api/lead`
- `POST http://localhost:7071/api/quote`

---

## 🚀 Step 3: Deploy Azure Functions

### 3.1 Create Function App

```bash
# Create Azure Functions app
az functionapp create \
  --resource-group aivisions \
  --consumption-plan-location eastus2 \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --name techvision-api \
  --storage-account techvisionstorage \
  --os-type Linux
```

### 3.2 Configure App Settings

```bash
# Set environment variables
az functionapp config appsettings set \
  --name techvision-api \
  --resource-group aivisions \
  --settings \
  "POSTGRES_HOST=techvision-db-server.postgres.database.azure.com" \
  "POSTGRES_DATABASE=techvision_db" \
  "POSTGRES_USER=techvisionadmin" \
  "POSTGRES_PASSWORD=YourSecurePassword123!" \
  "POSTGRES_PORT=5432" \
  "POSTGRES_SSL=true" \
  "JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long" \
  "ADMIN_SESSION_DURATION=86400" \
  "ALLOWED_ORIGINS=https://red-grass-0a2c21e0f.3.azurestaticapps.net"
```

### 3.3 Deploy Functions

```powershell
# From api directory
npm run build
func azure functionapp publish techvision-api
```

Your API will be available at: `https://techvision-api.azurewebsites.net`

---

## 🎨 Step 4: Update Frontend Forms

### 4.1 Update API Endpoint

In your Next.js app, create `lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://techvision-api.azurewebsites.net/api';

export async function submitContactForm(data: any) {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function submitLeadForm(data: any) {
  const response = await fetch(`${API_BASE_URL}/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function submitQuoteRequest(data: any) {
  const response = await fetch(`${API_BASE_URL}/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}
```

---

## 📊 Step 5: Database Costs Estimate

### Azure PostgreSQL Flexible Server

**Burstable Tier (Recommended for starting)**
- **B1ms** (1 vCore, 2 GB RAM, 32 GB storage)
- **Cost**: ~$12-15/month
- Perfect for: Up to 1000 form submissions/day

**General Purpose (For production)**
- **D2s_v3** (2 vCores, 8 GB RAM, 128 GB storage)
- **Cost**: ~$80-100/month
- Perfect for: High traffic, multiple concurrent users

---

## 🔐 Step 6: Admin Authentication Setup

### Generate Password Hash

Run this Node.js script to generate admin password:

```javascript
const bcrypt = require('bcryptjs');
const password = 'YourAdminPassword123!';
const hash = bcrypt.hashSync(password, 10);
console.log('Password hash:', hash);
```

Update the admin_users table with this hash.

---

## 📱 Step 7: Test Everything

### Test Contact Form
```bash
curl -X POST https://techvision-api.azurewebsites.net/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Test message"
  }'
```

### Test Lead Form
```bash
curl -X POST https://techvision-api.azurewebsites.net/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "requirement": "Need a custom web application",
    "budget": "$10,000 - $25,000"
  }'
```

### Test Quote Request
```bash
curl -X POST https://techvision-api.azurewebsites.net/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "phone": "+1234567890",
    "serviceType": "Full Stack Development",
    "projectDescription": "Enterprise level application with user authentication",
    "budgetRange": "$25,000 - $50,000",
    "timeline": "3-4 months"
  }'
```

---

## 🎯 Next Steps

1. ✅ Complete frontend form components (I'll create these next)
2. ✅ Build admin panel UI (I'll create this next)
3. ✅ Set up email notifications
4. ✅ Configure Google Ads tracking
5. ✅ Add analytics and monitoring

---

## 📞 Support

If you encounter any issues:
1. Check Azure Function logs: `func azure functionapp logstream techvision-api`
2. Verify database connection in Azure Portal
3. Test API endpoints using Postman or curl

---

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable SSL for PostgreSQL
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable Application Insights
- [ ] Regular database backups

---

**Your API is now ready!** 🎉

Next, I'll create the frontend forms and admin panel UI.
