# 🚀 Production Deployment Guide for visions.services

## Overview

This guide covers deploying your application to production with proper environment configuration.

---

## 📁 Environment Files Explained

### `.env.local` (Local Development - NOT COMMITTED)
```bash
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:7071/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:7071
LOG_LEVEL=debug
```
✅ Used when you run `npm run dev` locally
✅ Automatically ignored by git
✅ Points to local Azure Functions (localhost:7071)

### `.env` (Production - COMMITTED but OVERRIDDEN in AWS Amplify)
```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://visions.services/api
NEXT_PUBLIC_SITE_URL=https://visions.services
ALLOWED_ORIGINS=https://visions.services,https://www.visions.services
LOG_LEVEL=error
```
✅ Used as fallback for production builds
✅ Safe to commit (no sensitive data should be here)
✅ Points to production domain

### AWS Amplify Environment Variables (Production - SET IN CONSOLE)
These **OVERRIDE** your `.env` file and should be set in AWS Amplify Console.

---

## 🔧 AWS Amplify Setup (REQUIRED)

### Step 1: Configure Environment Variables

Go to: **AWS Amplify Console** → Your App → **Environment variables**

Add ALL these variables:

```bash
# Environment
NODE_ENV=production

# Frontend URLs
NEXT_PUBLIC_API_URL=https://visions.services/api
NEXT_PUBLIC_SITE_URL=https://visions.services

# Database Configuration
POSTGRES_HOST=visions.postgres.database.azure.com
POSTGRES_DATABASE=visions
POSTGRES_USER=Gagan
POSTGRES_PASSWORD=Services@1507
POSTGRES_PORT=5432
POSTGRES_SSL=true

# Security & Authentication
JWT_SECRET=e2c6324c8caebd86af2391cdcbe1851877a48eca1d2361f86b07be5ae6f1ece7
ADMIN_SESSION_DURATION=86400

# CORS Configuration (CRITICAL!)
ALLOWED_ORIGINS=https://visions.services,https://www.visions.services

# Optional: SMTP (if you want email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
ADMIN_EMAIL=admin@yourdomain.com

# Application Insights (Azure monitoring - optional)
APPINSIGHTS_INSTRUMENTATIONKEY=your-key-if-you-have-one

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security Features
CSP_ENABLED=true
HSTS_ENABLED=true

# Logging
LOG_LEVEL=error
```

### Step 2: Verify Build Settings

In **AWS Amplify Console** → Your App → **Build settings**, ensure your `amplify.yml` has:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "Installing dependencies..."
        - npm ci --include=dev
    build:
      commands:
        - echo "Building API..."
        - npm run build:api
        - echo "Building Next.js frontend..."
        - npm run build:next
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
      - api/dist/**/*
```

---

## 🌐 How Production API Works

### Important: Where is Your API Actually Hosted?

Your current setup has **Next.js on AWS Amplify**, but your API is **Azure Functions**. You need to decide:

### Option 1: Deploy API to Azure Functions (RECOMMENDED)

**If you're using Azure Functions for your API:**

1. **Deploy Azure Functions to Azure:**
   ```bash
   cd api
   func azure functionapp publish <your-function-app-name>
   ```

2. **Get your Azure Functions URL:**
   ```
   https://<your-function-app-name>.azurewebsites.net/api
   ```

3. **Update AWS Amplify Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://<your-function-app-name>.azurewebsites.net/api
   ```

4. **Update CORS in Azure Portal:**
   - Go to Azure Portal → Your Function App → CORS
   - Add: `https://visions.services`

### Option 2: Deploy API as AWS Lambda (Alternative)

Convert Azure Functions to AWS Lambda (requires code changes).

### Option 3: Use Next.js API Routes (Simplest)

Move your API functions to Next.js API routes (requires refactoring).

---

## 🚨 CRITICAL: Current Issue

**Your production setup won't work yet** because:

❌ **Problem**: You're trying to use `/api` proxy in production, but:
- AWS Amplify hosts your Next.js frontend at `https://visions.services`
- Your API code is Azure Functions (needs to be deployed separately)
- The Next.js proxy only works when both are running together

✅ **Solution**: You need to deploy your Azure Functions API separately!

---

## 📋 Production Deployment Checklist

### Before Deploying:

- [ ] **Deploy Azure Functions API first**
  ```bash
  cd api
  func azure functionapp publish visions-api
  ```

- [ ] **Get your Azure Functions URL**
  ```
  Example: https://visions-api.azurewebsites.net/api
  ```

- [ ] **Update AWS Amplify Environment Variables**
  ```
  NEXT_PUBLIC_API_URL=https://visions-api.azurewebsites.net/api
  ```

- [ ] **Configure CORS in Azure Function App**
  - Azure Portal → Function App → CORS
  - Add: `https://visions.services`

- [ ] **Update your `.env` file**
  ```bash
  NEXT_PUBLIC_API_URL=https://visions-api.azurewebsites.net/api
  ```

- [ ] **Commit and push changes**
  ```bash
  git add .env
  git commit -m "Update production API URL"
  git push origin main
  ```

- [ ] **Wait for AWS Amplify build to complete**

### After Deployment:

- [ ] Test admin login: `https://visions.services/admin/login`
- [ ] Check browser console for errors
- [ ] Verify CORS headers in Network tab
- [ ] Test contact form submission
- [ ] Verify database connections work

---

## 🧪 Testing Production

### Test 1: Preflight Request
```bash
curl -X OPTIONS https://visions.services/api/api-admin/login \
  -H "Origin: https://visions.services" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

**Expected**: `204 No Content` with CORS headers

### Test 2: Admin Login
1. Go to: `https://visions.services/admin/login`
2. Enter credentials
3. Should redirect to dashboard without CORS errors

### Test 3: API Direct Call
```bash
curl https://visions-api.azurewebsites.net/api/api-admin/login \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Origin: https://visions.services" \
  -d '{"username":"admin","password":"your-password"}' \
  -v
```

---

## 🛠️ Quick Commands

### Local Development
```bash
npm run dev
# Frontend: http://localhost:3000
# API: http://localhost:7071
```

### Build Production Locally
```bash
npm run build
# Tests if production build works
```

### Deploy API to Azure
```bash
cd api
func azure functionapp publish visions-api
```

### Check AWS Amplify Build Status
```bash
# Go to: https://console.aws.amazon.com/amplify
# Or use AWS CLI:
aws amplify get-app --app-id <your-app-id>
```

---

## 📞 Troubleshooting

### Issue: "API calls failing in production"
**Cause**: API not deployed or wrong URL
**Fix**: Deploy Azure Functions and update `NEXT_PUBLIC_API_URL`

### Issue: "CORS errors in production"
**Cause**: CORS not configured in Azure Function App
**Fix**: Add `https://visions.services` to Azure CORS settings

### Issue: "Environment variables not loading"
**Cause**: Not set in AWS Amplify Console
**Fix**: Set them in AWS Amplify → Environment variables

### Issue: "Login works locally but not in production"
**Cause**: Different API URLs
**Fix**: Ensure `ALLOWED_ORIGINS` includes `https://visions.services` in Azure

---

## 🎯 Recommended Production Architecture

```
User Browser
    ↓
https://visions.services (AWS Amplify - Next.js Frontend)
    ↓
https://visions-api.azurewebsites.net/api (Azure Functions - API)
    ↓
Azure PostgreSQL Database
```

This is the cleanest setup for your current stack.

---

## 📌 Summary

**For Local Development:**
- Use `.env.local`
- Run `npm run dev`
- API at `http://localhost:7071`

**For Production:**
- Use AWS Amplify environment variables
- Deploy API to Azure Functions separately
- Update `NEXT_PUBLIC_API_URL` to your Azure Functions URL
- Add `https://visions.services` to Azure CORS

---

**Last Updated**: October 22, 2025
**Status**: ⚠️ Requires API deployment to Azure Functions for production
