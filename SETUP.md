# TechVision Setup Guide 🚀

This guide will help you set up the TechVision monorepo from scratch.

## Quick Setup (Recommended)

```bash
# Run the automated setup script
./setup.sh

# Or manually:
npm install
```

## Detailed Manual Setup

### Step 1: Install Dependencies

```bash
# Install all dependencies (frontend + API)
npm install
```

This will:
- Install frontend dependencies
- Install API dependencies (workspace)
- Install concurrently for parallel execution
- Build the API automatically (postinstall hook)

### Step 2: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit with your values
nano .env
```

**Required Variables:**

```bash
# Database Configuration
POSTGRES_HOST=your-database-host.postgres.database.azure.com
POSTGRES_DATABASE=visions
POSTGRES_USER=your-username
POSTGRES_PASSWORD=your-secure-password
POSTGRES_PORT=5432
POSTGRES_SSL=true

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long

# CORS Origins
ALLOWED_ORIGINS=http://localhost:3000,https://your-production-domain.com

# Frontend URLs (optional, defaults provided)
NEXT_PUBLIC_API_URL=http://localhost:7071/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Generate JWT Secret:**
```bash
# Generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Initialize Database

```bash
# Navigate to database folder
cd api/database

# Run initialization script
node init-db.js

# Return to root
cd ../..
```

This will:
- Create all required tables
- Set up indexes
- Configure database schema

### Step 4: Create Admin User (Optional)

```bash
cd api/database

# Edit insert-admin.js with your admin credentials
node insert-admin.js

cd ../..
```

### Step 5: Verify Installation

```bash
# Test database connection
cd api
node test-db-connection.js
cd ..

# Check that everything is installed correctly
npm run build:api
```

### Step 6: Start Development

```bash
# Start both frontend and API
npm run dev
```

You should see:
- Next.js running on http://localhost:3000
- Azure Functions running on http://localhost:7071

## Verification Checklist

- [ ] Node.js v18+ installed
- [ ] npm v9+ installed
- [ ] Azure Functions Core Tools v4 installed
- [ ] PostgreSQL database accessible
- [ ] `.env` file configured
- [ ] Database initialized
- [ ] Dependencies installed
- [ ] API builds successfully
- [ ] Both services start without errors

## Common Setup Issues

### Issue: Azure Functions Core Tools not found

```bash
# Install globally
npm install -g azure-functions-core-tools@4 --unsafe-perm true

# Or on macOS
brew tap azure/functions
brew install azure-functions-core-tools@4
```

### Issue: Database connection fails

1. Check firewall rules allow your IP
2. Verify SSL is enabled
3. Test connection string
4. Check credentials

```bash
# Test connection
cd api
node test-db-connection.js
```

### Issue: Port already in use

```bash
# Kill processes on ports
lsof -ti:3000 | xargs kill -9  # Next.js
lsof -ti:7071 | xargs kill -9  # Azure Functions
```

### Issue: TypeScript compilation errors

```bash
# Clean and rebuild
npm run clean:api
npm run build:api
```

### Issue: Module not found errors

```bash
# Clean and reinstall
npm run clean:all
npm install
```

## Directory Structure After Setup

```
visions-main/
├── node_modules/          # Frontend dependencies
├── api/
│   ├── node_modules/     # API dependencies
│   └── dist/             # Built API (TypeScript compiled)
├── .next/                # Next.js build (after build)
├── .env                  # Your environment variables
└── ...
```

## Environment-Specific Setup

### Development Environment

```bash
# .env for development
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:7071/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production Environment

```bash
# .env for production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api.azurewebsites.net/api
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Azure Deployment Setup

### 1. Azure Static Web Apps

```bash
# Install Azure CLI
brew install azure-cli

# Login
az login

# Create Static Web App
az staticwebapp create \
  --name techvision-app \
  --resource-group your-resource-group \
  --source https://github.com/your-repo \
  --location "East US" \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location ".next"
```

### 2. Configure Environment Variables in Azure

Go to Azure Portal:
1. Navigate to your Static Web App
2. Settings → Configuration
3. Add all variables from `.env.example`

### 3. Configure GitHub Actions

The deployment workflow is in `.github/workflows/azure-static-web-apps.yml`

## Next Steps

After successful setup:

1. **Test the Application**
   - Visit http://localhost:3000
   - Try submitting forms
   - Test admin login at http://localhost:3000/admin/login

2. **Customize Content**
   - Update services in `app/services/`
   - Modify homepage in `app/page.tsx`
   - Update company info in `app/about/`

3. **Configure Email** (Optional)
   - Set up SMTP credentials in `.env`
   - Test email notifications

4. **Set Up CI/CD**
   - Configure GitHub Actions
   - Set up deployment pipelines

5. **Performance Optimization**
   - Configure caching
   - Optimize images
   - Set up CDN

## Support

If you encounter issues:

1. Check the [Troubleshooting](README.md#troubleshooting) section
2. Review logs in the terminal
3. Check Azure Functions logs
4. Contact support: admin@techvision.com

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Azure Functions Documentation](https://docs.microsoft.com/azure/azure-functions/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Happy Coding! 🎉**
