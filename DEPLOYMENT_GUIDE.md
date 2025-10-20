# 🚀 Complete Redeployment Guide - GitHub + Azure Static Web Apps

## 📋 Prerequisites Checklist

- [ ] GitHub account ready
- [ ] Azure account with active subscription
- [ ] Git installed locally
- [ ] Code ready to push (all errors fixed ✅)

---

## Step 1: Create New GitHub Repository

### Option A: Via GitHub Website
1. Go to https://github.com/new
2. Repository name: `techvision-website` (or your preferred name)
3. Description: "TechVision - Professional SaaS Platform Website"
4. Visibility: **Private** (recommended) or Public
5. ❌ **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Option B: Via GitHub CLI
```bash
gh repo create techvision-website --private --description "TechVision Website"
```

---

## Step 2: Initialize Local Git Repository

Open PowerShell in your project directory and run:

```powershell
# Navigate to project directory
cd "C:\Users\Gagan Chaudhary\Downloads\gaganvision\visions-main"

# Remove old git history if exists
Remove-Item -Path .git -Recurse -Force -ErrorAction SilentlyContinue

# Initialize new git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Production ready website with 48 service pages"

# Rename branch to main
git branch -M main

# Add remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

---

## Step 3: Create Azure Static Web App

### Via Azure Portal (Recommended for Beginners)

1. **Go to Azure Portal**
   - Visit: https://portal.azure.com
   - Sign in with your account

2. **Create Resource**
   - Click "Create a resource"
   - Search for "Static Web App"
   - Click "Create"

3. **Basics Tab**
   - **Subscription:** Select your subscription
   - **Resource Group:** Create new → `rg-techvision-prod`
   - **Name:** `techvision-website` (must be globally unique)
   - **Plan type:** 
     - **Free** - For testing (100GB bandwidth/month)
     - **Standard** - For production ($9/month, 100GB + additional features)
   - **Region:** Select closest to your users (e.g., East US, West Europe)
   - **Deployment source:** GitHub

4. **GitHub Configuration**
   - Click "Sign in with GitHub"
   - Authorize Azure Static Web Apps
   - **Organization:** Your GitHub username
   - **Repository:** Select your repo (techvision-website)
   - **Branch:** main

5. **Build Details**
   ```
   Build Presets: Next.js
   App location: /
   Api location: (leave empty for now, add "api" later)
   Output location: out
   ```

6. **Review + Create**
   - Review all settings
   - Click "Create"
   - Wait 2-3 minutes for deployment

---

## Step 4: Verify Deployment

### Check GitHub Actions
1. Go to your GitHub repository
2. Click "Actions" tab
3. You should see a workflow running
4. Wait for ✅ green checkmark (takes 3-5 minutes)

### View Live Site
1. Go back to Azure Portal
2. Open your Static Web App resource
3. Click "Browse" or copy the URL
4. Your site should be live at: `https://YOUR-SITE-NAME.azurestaticapps.net`

### Test All Pages
- ✅ Home: `/`
- ✅ Services: `/services`
- ✅ Service Detail: `/services/wordpress-website`
- ✅ About: `/about`
- ✅ Contact: `/contact`

---

## Step 5: Configure Custom Domain (Optional)

### Add Custom Domain
1. In Azure Portal → Your Static Web App
2. Click "Custom domains" in left menu
3. Click "+ Add"
4. Enter your domain: `www.yourdomain.com`
5. Follow DNS verification steps:
   - Add CNAME record: `www` → `YOUR-SITE.azurestaticapps.net`
   - Or TXT record for apex domain
6. Wait for DNS propagation (5-60 minutes)
7. SSL certificate automatically provisioned ✅

---

## Step 6: Prepare for Backend Integration (Tomorrow)

### Create API Folder Structure

```powershell
# Create API directory
New-Item -Path "api" -ItemType Directory

# Create sample contact function
New-Item -Path "api/contact" -ItemType Directory
```

### Sample Azure Function (api/contact/index.js)

```javascript
module.exports = async function (context, req) {
    context.log('Contact form submission received');

    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        context.res = {
            status: 400,
            body: { error: "Missing required fields" }
        };
        return;
    }

    // TODO: Save to database
    // TODO: Send email notification

    context.res = {
        status: 200,
        body: { 
            success: true,
            message: "Thank you for contacting us!" 
        }
    };
};
```

### Azure Functions Configuration (api/host.json)

```json
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond": 20
      }
    }
  },
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[3.*, 4.0.0)"
  }
}
```

### Update GitHub Workflow

When you add the `api` folder, update the workflow configuration:

```yaml
# In .github/workflows/azure-static-web-apps-*.yml
api_location: "api"  # Add this line
```

---

## 🎯 Backend Options Comparison

### Option 1: Azure Functions (Serverless) ⭐ **RECOMMENDED**
**Best for:** Contact forms, APIs, background jobs

**Pros:**
- ✅ Pay per execution (very cheap)
- ✅ Auto-scales infinitely
- ✅ Integrated with Static Web Apps
- ✅ No server management
- ✅ Multiple language support (Node.js, Python, C#)

**Cons:**
- ❌ Cold start delay (~1-2 seconds)
- ❌ Limited execution time (5-10 min)

**Use Cases:**
- Contact form submissions
- Newsletter subscriptions
- Payment processing
- File uploads
- Email notifications
- Database queries

---

### Option 2: Azure Container Apps
**Best for:** Full backend applications, real-time features

**Pros:**
- ✅ Always running (no cold starts)
- ✅ WebSocket support
- ✅ Any language/framework
- ✅ Docker-based

**Cons:**
- ❌ More expensive ($30-100/month)
- ❌ More complex setup

**Use Cases:**
- Real-time chat
- Complex business logic
- GraphQL APIs
- Microservices

---

### Option 3: Azure App Service
**Best for:** Traditional web apps, monoliths

**Pros:**
- ✅ Simple deployment
- ✅ Built-in CI/CD
- ✅ Managed environment

**Cons:**
- ❌ Most expensive option
- ❌ Less flexible

---

## 💾 Database Options

### Option 1: Azure SQL Database
**Best for:** Relational data, complex queries
- **Cost:** $5-100/month
- **Use case:** Users, orders, products

### Option 2: Azure Cosmos DB
**Best for:** Global scale, JSON documents
- **Cost:** $24/month minimum
- **Use case:** User profiles, real-time data

### Option 3: MongoDB Atlas (External)
**Best for:** Flexibility, easy setup
- **Cost:** Free tier available
- **Use case:** MVP, rapid development

### Option 4: Supabase (External)
**Best for:** Real-time features, auth included
- **Cost:** Free tier available
- **Use case:** Modern apps with auth

---

## 📊 Recommended Architecture for Your Project

### Phase 1: Current (Static Only)
```
GitHub → Azure Static Web Apps → CDN → Users
```

### Phase 2: With Backend (Tomorrow)
```
┌─────────────────────────────────────────────────┐
│     Azure Static Web Apps                       │
│                                                  │
│  ┌──────────────┐        ┌─────────────────┐   │
│  │   Frontend   │───────▶│ Azure Functions │   │
│  │   (Next.js)  │        │   (API Layer)   │   │
│  └──────────────┘        └─────────────────┘   │
│                                    │             │
└────────────────────────────────────┼────────────┘
                                     │
                          ┌──────────▼──────────┐
                          │   MongoDB Atlas     │
                          │   (Database)        │
                          └─────────────────────┘
```

### Benefits:
- ✅ Simple deployment
- ✅ Cost-effective (~$5-15/month)
- ✅ Scalable
- ✅ Secure

---

## 🔐 Security Checklist

- [ ] Environment variables stored in Azure App Settings (not in code)
- [ ] API authentication implemented
- [ ] CORS configured properly
- [ ] Input validation on all endpoints
- [ ] Rate limiting enabled
- [ ] HTTPS enforced (automatic)
- [ ] Database connection strings encrypted
- [ ] No sensitive data in logs

---

## 💰 Cost Estimate

### Minimal Setup (Recommended to Start)
- **Static Web App:** Free tier
- **Azure Functions:** Free tier (1M requests/month)
- **MongoDB Atlas:** Free tier (512MB)
- **Total:** $0/month ✅

### Production Setup
- **Static Web App:** $9/month (Standard)
- **Azure Functions:** ~$5/month (consumption plan)
- **MongoDB Atlas:** $9/month (Shared tier)
- **Total:** ~$25/month

### Enterprise Setup
- **Static Web App:** $9/month
- **Azure Functions:** ~$20/month
- **Azure Cosmos DB:** $24/month
- **Application Insights:** $2-5/month
- **Total:** ~$60/month

---

## 📝 Next Steps for Tomorrow

### Backend Integration Checklist

1. **Create API Folder**
   ```bash
   mkdir api
   cd api
   npm init -y
   ```

2. **Install Dependencies**
   ```bash
   npm install @azure/functions
   npm install mongoose  # If using MongoDB
   npm install nodemailer  # For emails
   ```

3. **Create Functions**
   - Contact form handler
   - Newsletter subscription
   - Service inquiry form

4. **Test Locally**
   ```bash
   npm install -g azure-functions-core-tools
   func start
   ```

5. **Deploy**
   ```bash
   git add api/
   git commit -m "Add Azure Functions API"
   git push
   ```

---

## 🆘 Troubleshooting

### Build Fails on GitHub Actions
- Check GitHub Actions logs
- Verify `output_location: "out"` in workflow
- Ensure `npm run build` works locally

### Site Shows 404
- Wait 5 minutes after first deployment
- Clear browser cache
- Check Azure Portal → Static Web App → "Browse"

### Functions Not Working
- Verify `api_location: "api"` in workflow
- Check function logs in Azure Portal
- Test locally with Azure Functions Core Tools

---

## 📚 Useful Resources

- **Azure Static Web Apps Docs:** https://learn.microsoft.com/azure/static-web-apps/
- **Azure Functions Docs:** https://learn.microsoft.com/azure/azure-functions/
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **GitHub Actions:** https://docs.github.com/actions

---

## ✅ Deployment Commands Summary

```bash
# 1. Initialize Git
git init
git add .
git commit -m "Initial commit"
git branch -M main

# 2. Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 3. Push to GitHub
git push -u origin main

# 4. Azure will automatically deploy via GitHub Actions

# 5. Check deployment status
# Visit: https://github.com/YOUR_USERNAME/YOUR_REPO/actions
```

---

**🎉 Your website will be live in 5-10 minutes after pushing to GitHub!**

Tomorrow, we'll add the backend API with Azure Functions for:
- Contact form processing
- Newsletter subscriptions  
- Service inquiries
- Database integration
