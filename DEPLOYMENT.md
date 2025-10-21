# Production Deployment Guide 🚀

Complete guide for deploying TechVision to production.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Azure Static Web Apps Deployment](#azure-static-web-apps-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [CI/CD Pipeline](#cicd-pipeline)
- [Post-Deployment](#post-deployment)
- [Rollback Strategy](#rollback-strategy)

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] SSL certificates ready
- [ ] Domain configured
- [ ] Backup strategy in place
- [ ] Monitoring setup
- [ ] Error tracking configured

## Azure Static Web Apps Deployment

### Method 1: GitHub Actions (Recommended)

#### Step 1: Create Azure Static Web App

```bash
# Install Azure CLI
brew install azure-cli  # macOS
# or
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash  # Linux

# Login to Azure
az login

# Create resource group
az group create \
  --name techvision-rg \
  --location "East US"

# Create Static Web App
az staticwebapp create \
  --name techvision-app \
  --resource-group techvision-rg \
  --source https://github.com/YOUR_USERNAME/YOUR_REPO \
  --location "East US" \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location ".next" \
  --login-with-github
```

#### Step 2: Configure GitHub Actions

Create `.github/workflows/azure-static-web-apps.yml`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build API
        run: npm run build:api

      - name: Build Frontend
        run: npm run build:next

      - name: Deploy to Azure Static Web Apps
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: "api"
          output_location: ".next"

  close_pull_request:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request
    steps:
      - name: Close Pull Request
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```

#### Step 3: Add GitHub Secrets

1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Add `AZURE_STATIC_WEB_APPS_API_TOKEN` (get from Azure Portal)

### Method 2: Manual Deployment

```bash
# Build for production
npm run build

# Deploy using Azure CLI
az staticwebapp deploy \
  --name techvision-app \
  --resource-group techvision-rg \
  --source .next \
  --api-location api
```

### Method 3: VS Code Extension

1. Install "Azure Static Web Apps" extension
2. Sign in to Azure
3. Right-click on project → Deploy to Static Web App
4. Follow the prompts

## Environment Variables

### Setting Up in Azure Portal

1. Go to Azure Portal → Your Static Web App
2. Settings → Configuration
3. Click "+ Add"
4. Add each variable:

```bash
POSTGRES_HOST=your-production-db.postgres.database.azure.com
POSTGRES_DATABASE=visions_prod
POSTGRES_USER=produser
POSTGRES_PASSWORD=SECURE_PASSWORD_HERE
POSTGRES_PORT=5432
POSTGRES_SSL=true
JWT_SECRET=GENERATE_NEW_SECURE_SECRET_32_CHARS_MIN
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
ADMIN_SESSION_DURATION=86400
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-app.azurestaticapps.net/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Using Azure CLI

```bash
# Set environment variables
az staticwebapp appsettings set \
  --name techvision-app \
  --resource-group techvision-rg \
  --setting-names \
    POSTGRES_HOST="your-db.postgres.database.azure.com" \
    POSTGRES_DATABASE="visions_prod" \
    POSTGRES_USER="produser" \
    POSTGRES_PASSWORD="YOUR_SECURE_PASSWORD" \
    JWT_SECRET="YOUR_SECURE_JWT_SECRET" \
    NODE_ENV="production"
```

## Database Setup

### Azure PostgreSQL Database

#### Step 1: Create Database

```bash
# Create PostgreSQL server
az postgres flexible-server create \
  --name techvision-db \
  --resource-group techvision-rg \
  --location eastus \
  --admin-user dbadmin \
  --admin-password YOUR_SECURE_PASSWORD \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --version 14 \
  --storage-size 32 \
  --public-access 0.0.0.0

# Create database
az postgres flexible-server db create \
  --server-name techvision-db \
  --resource-group techvision-rg \
  --database-name visions_prod
```

#### Step 2: Configure Firewall

```bash
# Allow Azure services
az postgres flexible-server firewall-rule create \
  --resource-group techvision-rg \
  --name techvision-db \
  --rule-name AllowAllAzureIPs \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Add your IP for management
az postgres flexible-server firewall-rule create \
  --resource-group techvision-rg \
  --name techvision-db \
  --rule-name AllowMyIP \
  --start-ip-address YOUR_IP \
  --end-ip-address YOUR_IP
```

#### Step 3: Initialize Production Database

```bash
# Connect to production database
psql "host=techvision-db.postgres.database.azure.com port=5432 dbname=visions_prod user=dbadmin password=YOUR_PASSWORD sslmode=require"

# Run schema
\i api/database/schema.sql

# Exit
\q
```

Or use the init script:

```bash
# Set production environment variables locally
export POSTGRES_HOST=techvision-db.postgres.database.azure.com
export POSTGRES_DATABASE=visions_prod
export POSTGRES_USER=dbadmin
export POSTGRES_PASSWORD=YOUR_PASSWORD

# Run init script
cd api/database
node init-db.js
cd ../..
```

## CI/CD Pipeline

### Build Process

The CI/CD pipeline should:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Tests** (when available)
   ```bash
   npm test
   ```

3. **Build API**
   ```bash
   npm run build:api
   ```

4. **Build Frontend**
   ```bash
   npm run build:next
   ```

5. **Deploy**
   - Push to Azure Static Web Apps
   - Update environment variables if needed

### Health Checks

Add health check endpoints:

```typescript
// api/src/health.ts
import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export async function health(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    return {
        status: 200,
        jsonBody: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: process.env.npm_package_version || '1.0.0'
        }
    };
}

app.http('health', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: health
});
```

## Post-Deployment

### 1. Verify Deployment

```bash
# Check frontend
curl https://yourdomain.com

# Check API health
curl https://your-app.azurestaticapps.net/api/health

# Check database connection
curl -X POST https://your-app.azurestaticapps.net/api/submitContact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test"}'
```

### 2. Monitor Application

- Set up Application Insights
- Configure alerts
- Monitor error rates
- Track performance metrics

### 3. Set Up Backups

```bash
# Create backup policy for database
az postgres flexible-server backup create \
  --resource-group techvision-rg \
  --name techvision-db \
  --backup-name daily-backup
```

### 4. Configure Custom Domain

```bash
# Add custom domain
az staticwebapp hostname set \
  --name techvision-app \
  --resource-group techvision-rg \
  --hostname yourdomain.com
```

### 5. Set Up SSL

Azure Static Web Apps automatically provisions SSL certificates.

## Rollback Strategy

### Quick Rollback

```bash
# Rollback to previous deployment
az staticwebapp deployment rollback \
  --name techvision-app \
  --resource-group techvision-rg
```

### Database Rollback

```bash
# Restore from backup
az postgres flexible-server restore \
  --resource-group techvision-rg \
  --name techvision-db-restored \
  --source-server techvision-db \
  --restore-time "2025-10-22T10:00:00Z"
```

## Performance Optimization

### 1. Enable Caching

```javascript
// next.config.mjs
export default {
  // ... other config
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

### 2. Optimize Images

```bash
# Use Next.js Image component
import Image from 'next/image';
```

### 3. Enable Compression

Already enabled by default in Next.js and Azure Static Web Apps.

## Security Checklist

- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] JWT secret is strong and unique
- [ ] CORS configured properly
- [ ] SQL injection protection enabled
- [ ] Rate limiting configured
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Dependencies audited

## Monitoring & Alerts

### Application Insights

```bash
# Enable Application Insights
az monitor app-insights component create \
  --app techvision-insights \
  --location eastus \
  --resource-group techvision-rg
```

Add to environment variables:
```bash
APPINSIGHTS_INSTRUMENTATIONKEY=your-key-here
```

### Set Up Alerts

Configure alerts for:
- High error rates
- Slow response times
- Database connection failures
- High memory usage
- SSL certificate expiration

## Cost Optimization

- Use Azure Free Tier for development
- Scale database based on usage
- Enable auto-scaling
- Monitor bandwidth usage
- Use CDN for static assets

## Support & Maintenance

### Regular Tasks

- Weekly: Review logs and metrics
- Monthly: Update dependencies
- Quarterly: Security audit
- Annually: Review infrastructure costs

### Backup Schedule

- Daily: Automated database backups
- Weekly: Full system backup
- Monthly: Disaster recovery test

---

## Need Help?

- Azure Support: https://azure.microsoft.com/support/
- Documentation: [README.md](README.md)
- Technical Support: admin@techvision.com

**Happy Deploying! 🚀**
