# 🚀 Azure Deployment Guide - TechVision Website

## 📋 Pre-Deployment Checklist

### 1. **Prerequisites Installation**

**Install Azure Developer CLI:**
```powershell
# Install via Winget
winget install microsoft.azd

# Verify installation
azd version
```

**Install Docker Desktop:**
```powershell
# Install via Winget  
winget install Docker.DockerDesktop

# Verify installation
docker --version
```

**Install Azure CLI (if not already installed):**
```powershell
# Install via Winget
winget install Microsoft.AzureCLI

# Verify installation
az --version
```

### 2. **Azure Authentication**
```powershell
# Login to Azure
azd auth login

# Verify login
az account show
```

## 🏗️ Deployment Steps

### Step 1: Initialize Azure Environment
```powershell
# Navigate to project directory
cd "c:\Users\Gagan Chaudhary\Downloads\gaganvision\visions-main"

# Initialize Azure Developer CLI (if not already done)
azd init

# Set environment name (use lowercase, no spaces)
azd env set AZURE_ENV_NAME "techvision-prod"

# Set Azure region
azd env set AZURE_LOCATION "eastus"
```

### Step 2: Preview Deployment
```powershell
# Preview what will be created (recommended)
azd provision --preview
```

### Step 3: Deploy to Azure
```powershell
# Deploy infrastructure and application
azd up
```

**Expected Output:**
- Resource group creation
- Container registry setup
- Container Apps environment creation
- Application deployment
- Public URL assignment

## 🔍 Post-Deployment Verification

### Check Deployment Status
```powershell
# View deployment logs
azd logs

# Monitor application performance
azd monitor

# Check resource status
azd show
```

### Test Application Features
Visit the provided URL and verify:
- [ ] Homepage loads with 3D animations
- [ ] All 48 service pages are accessible
- [ ] Navigation menu works properly
- [ ] Contact forms function correctly
- [ ] Mobile responsiveness
- [ ] Page loading performance

## 🛠️ Troubleshooting

### Common Issues

**1. Build Failures:**
```powershell
# Check build logs
azd logs --follow

# Rebuild and redeploy
azd deploy
```

**2. Container Registry Issues:**
```powershell
# Check ACR permissions
az acr repository list --name <registry-name>

# Login to ACR manually if needed
az acr login --name <registry-name>
```

**3. Application Not Starting:**
```powershell
# Check container app logs
az containerapp logs show --name <app-name> --resource-group <rg-name>

# Check container app configuration
az containerapp show --name <app-name> --resource-group <rg-name>
```

## 🔧 Configuration Options

### Environment Variables
Update environment variables in Azure:
```powershell
# Set environment variable
az containerapp update --name <app-name> --resource-group <rg-name> --set-env-vars "KEY=VALUE"
```

### Scaling Configuration
```powershell
# Update scaling rules
az containerapp update --name <app-name> --resource-group <rg-name> --min-replicas 1 --max-replicas 10
```

## 📊 Monitoring & Logging

### Application Insights
- Navigate to Azure Portal
- Find your Application Insights resource
- Monitor performance metrics
- Set up alerts for errors or performance issues

### Container App Monitoring
```powershell
# View real-time logs
az containerapp logs show --name <app-name> --resource-group <rg-name> --follow

# Check revision status
az containerapp revision list --name <app-name> --resource-group <rg-name>
```

## 🌐 Custom Domain Setup (Optional)

### 1. Add Custom Domain
```powershell
# Add custom domain to container app
az containerapp hostname add --hostname <your-domain.com> --name <app-name> --resource-group <rg-name>
```

### 2. Configure SSL Certificate
```powershell
# Bind SSL certificate
az containerapp ssl bind --hostname <your-domain.com> --name <app-name> --resource-group <rg-name> --certificate <cert-id>
```

## 🔄 Updates & Redeployment

### Deploy Updates
```powershell
# After making code changes
azd deploy

# Or full redeploy
azd up
```

### Rollback
```powershell
# Rollback to previous revision
az containerapp revision set-mode --name <app-name> --resource-group <rg-name> --mode single --revision <previous-revision>
```

## 🧹 Cleanup Resources

### Remove All Resources
```powershell
# Remove all Azure resources
azd down

# Confirm deletion
azd down --force --purge
```

## 📞 Support & Resources

### Azure Documentation
- [Azure Container Apps Documentation](https://docs.microsoft.com/en-us/azure/container-apps/)
- [Azure Developer CLI Documentation](https://docs.microsoft.com/en-us/azure/developer/azure-developer-cli/)

### Monitoring URLs
After deployment, bookmark these URLs:
- **Application URL**: `https://<app-name>.azurecontainerapps.io`
- **Azure Portal**: `https://portal.azure.com`
- **Application Insights**: Available in Azure Portal
- **Container Registry**: Available in Azure Portal

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ Application loads at the provided URL
- ✅ All 48 service pages are accessible
- ✅ 3D animations render correctly
- ✅ Forms submit successfully
- ✅ Mobile responsiveness works
- ✅ Application Insights receives telemetry
- ✅ No console errors in browser
- ✅ Performance metrics are acceptable

---

**Need Help?** 
1. Check the troubleshooting section above
2. Review Azure Portal for error details
3. Check Application Insights for runtime issues
4. Review deployment logs with `azd logs`