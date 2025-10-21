# 🚀 AWS Amplify Deployment Guide - FIXED!

## ✅ ISSUES FIXED

1. **TypeScript Compiler Error**: Moved TypeScript and @types/* to dependencies in API package
2. **Postinstall Hook Removed**: Removed automatic build on install to avoid AWS Amplify issues
3. **Build Order Fixed**: API builds before Next.js frontend
4. **amplify.yml Updated**: Proper configuration for monorepo with workspaces
5. **Dependencies**: All build dependencies now installed correctly

---

## 📋 WHAT WAS CHANGED

### 1. `package.json` (Root)
- ✅ Removed `postinstall` hook (was causing build failures)
- ✅ Changed build order: API first, then Next.js
- ✅ Simplified start script for production

### 2. `api/package.json`
- ✅ Moved TypeScript to `dependencies` (required for AWS Amplify build)
- ✅ Moved all `@types/*` to `dependencies` (required for build)
- ✅ Kept only `azure-functions-core-tools` in `devDependencies`

### 3. `amplify.yml`
- ✅ Updated to use `npm ci --include=dev` for proper dependency installation
- ✅ Separated API and frontend build steps with logging
- ✅ Added proper caching for both frontend and API
- ✅ Added API dist folder to cache

---

## 🔧 AWS AMPLIFY CONFIGURATION

### Current `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "Installing dependencies..."
        - npm ci --include=dev
        - echo "Dependencies installed successfully"
    build:
      commands:
        - echo "Building API..."
        - npm run build:api
        - echo "API built successfully"
        - echo "Building Next.js frontend..."
        - npm run build:next
        - echo "Frontend built successfully"
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - node_modules/**/*
      - api/node_modules/**/*
      - api/dist/**/*
```

---

## 🌐 AWS AMPLIFY SETUP INSTRUCTIONS

### Step 1: Connect Repository

1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Select "GitHub" (or your Git provider)
4. Authorize AWS Amplify
5. Select repository: `visions-services`
6. Select branch: `main`

### Step 2: Configure Build Settings

**App Settings:**
- App name: `techvision-production`
- Environment name: `production`

**Build Settings:**
- Build image: `Amazon Linux:2023` (recommended)
- Build specification: Use the `amplify.yml` in your repo
- Next.js version: `14.2.33`
- Node.js version: `18` or `20`

**Advanced Settings:**
Click "Advanced settings" and add:

### Step 3: Environment Variables (CRITICAL!)

Add ALL these environment variables in AWS Amplify Console:

| Variable | Value | Required |
|----------|-------|----------|
| `NODE_ENV` | `production` | ✅ |
| `NEXT_PUBLIC_API_URL` | `https://YOUR_API_URL/api` | ✅ |
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR_DOMAIN.com` | ✅ |
| `POSTGRES_HOST` | `your-db.postgres.database.azure.com` | ✅ |
| `POSTGRES_DATABASE` | `visions_production` | ✅ |
| `POSTGRES_USER` | `your_db_user` | ✅ |
| `POSTGRES_PASSWORD` | `your_secure_password` | ✅ |
| `POSTGRES_PORT` | `5432` | ✅ |
| `POSTGRES_SSL` | `true` | ✅ |
| `JWT_SECRET` | `your_64_char_secret` | ✅ |
| `ALLOWED_ORIGINS` | `https://YOUR_DOMAIN.com` | ✅ |

**To add environment variables:**
1. Go to AWS Amplify Console
2. Select your app
3. Click "Environment variables" in left menu
4. Click "Manage variables"
5. Add each variable
6. Click "Save"

### Step 4: Deploy

1. Click "Save and deploy"
2. Wait 5-10 minutes for build
3. Monitor build logs for any errors

---

## 🐛 TROUBLESHOOTING AWS AMPLIFY

### Error: "tsc: command not found"
**Status**: ✅ FIXED
- Moved TypeScript to dependencies in `api/package.json`

### Error: "postinstall script failed"
**Status**: ✅ FIXED
- Removed postinstall hook from root `package.json`

### Error: "Module not found"
**Solution**: Ensure all dependencies are listed correctly
```bash
# Test locally first
npm ci --include=dev
npm run build
```

### Error: Build timeout
**Solution**: 
- Check if database is accessible
- Verify environment variables are set
- Review build logs for specific errors

### Error: "Cannot find module '@types/...'"
**Status**: ✅ FIXED
- Moved all @types/* to dependencies in API package

---

## 🔍 VERIFY BUILD LOCALLY FIRST

Before deploying to AWS Amplify, test locally:

```bash
# Clean everything
npm run clean:all

# Install dependencies (simulating AWS Amplify)
npm ci --include=dev

# Build API
npm run build:api

# Build Next.js
npm run build:next

# If all succeed, you're ready to deploy!
```

---

## 📊 BUILD PROCESS EXPLAINED

### What Happens During AWS Amplify Build:

1. **Clone Repository**
   - AWS pulls your code from GitHub

2. **Install Dependencies** (`preBuild`)
   ```bash
   npm ci --include=dev
   ```
   - Installs all dependencies including TypeScript
   - Installs workspace dependencies (API)

3. **Build API** (`build` phase)
   ```bash
   npm run build:api
   ```
   - Compiles TypeScript to JavaScript
   - Outputs to `api/dist/`

4. **Build Next.js** (`build` phase)
   ```bash
   npm run build:next
   ```
   - Builds optimized production Next.js app
   - Outputs to `.next/`

5. **Deploy**
   - AWS Amplify serves the `.next` directory
   - Your app is live!

---

## 🔐 SECURITY CHECKLIST FOR AWS AMPLIFY

- [ ] All environment variables set in AWS Amplify Console (not in code)
- [ ] `JWT_SECRET` is secure (64+ characters)
- [ ] `POSTGRES_PASSWORD` is strong
- [ ] `ALLOWED_ORIGINS` set to your domain only (no `*` or `localhost`)
- [ ] `POSTGRES_SSL` is `true`
- [ ] `.env` file in `.gitignore`
- [ ] Database firewall configured to allow AWS Amplify IPs

---

## 🌍 GET AWS AMPLIFY IP RANGES

AWS Amplify uses AWS IP ranges. To allow database access:

```bash
# Get AWS IP ranges
curl https://ip-ranges.amazonaws.com/ip-ranges.json | jq '.prefixes[] | select(.service=="CLOUDFRONT") | .ip_prefix'

# Or allow all AWS services (easier but less secure)
# In your database firewall, allow: 0.0.0.0/0 with connection limit
```

---

## 📈 MONITORING YOUR DEPLOYMENT

### AWS Amplify Console

1. **Build Status**: See if build succeeded
2. **Build Logs**: Check for errors
3. **Deployments**: View deployment history
4. **Domain Management**: Configure custom domain
5. **Environment Variables**: Manage secrets

### AWS CloudWatch

- Automatically configured
- View application logs
- Set up alerts for errors
- Monitor performance

---

## 🚀 CUSTOM DOMAIN SETUP

1. Go to AWS Amplify Console
2. Click "Domain management"
3. Click "Add domain"
4. Enter your domain: `yourdomain.com`
5. Follow DNS configuration instructions
6. Wait for SSL certificate (automatic, 10-20 minutes)

**DNS Records to Add:**
```
Type: CNAME
Name: www (or @)
Value: [provided by AWS Amplify]
```

---

## 💰 AWS AMPLIFY PRICING

- **Build minutes**: First 1000 minutes free, then $0.01/minute
- **Hosting**: First 15 GB free, then $0.15/GB
- **Data Transfer**: First 15 GB free, then $0.15/GB

**Estimated cost for small app**: $5-15/month

---

## 🔄 UPDATING YOUR APP

```bash
# Make changes locally
git add .
git commit -m "Your update message"
git push origin main

# AWS Amplify automatically detects and deploys!
```

### Manual Deploy (if needed)

1. Go to AWS Amplify Console
2. Click "Run build"
3. Select branch: `main`
4. Click "Deploy"

---

## 📞 AWS SUPPORT

- **Documentation**: https://docs.aws.amazon.com/amplify/
- **Support**: AWS Support Console
- **Community**: AWS Amplify Discord
- **Issues**: GitHub Issues in your repo

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] Code pushed to GitHub
- [ ] `amplify.yml` configured correctly
- [ ] All dependencies moved to correct locations
- [ ] Environment variables added to AWS Amplify
- [ ] Database accessible from AWS
- [ ] Build tested locally
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Monitoring set up

---

## 🎉 YOU'RE READY TO DEPLOY!

All issues have been fixed. Your app is now ready for AWS Amplify deployment!

**Next steps:**
1. Commit and push these changes
2. Set up AWS Amplify (follow Step 1-3 above)
3. Add environment variables
4. Deploy!

**Questions?** Check the troubleshooting section or AWS Amplify documentation.
