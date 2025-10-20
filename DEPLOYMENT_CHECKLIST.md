# ✅ Pre-Deployment Checklist

## Before Running `azd up`

### 1. **Prerequisites Installed**
- [ ] Azure Developer CLI: `winget install microsoft.azd`
- [ ] Docker Desktop: `winget install Docker.DockerDesktop`
- [ ] Azure CLI: `winget install Microsoft.AzureCLI`

### 2. **Authentication Setup**
- [ ] Login to Azure: `azd auth login`
- [ ] Verify account: `az account show`
- [ ] Ensure correct subscription is selected

### 3. **Project Verification**
- [ ] Navigate to project directory
- [ ] Run `npm run build` (should complete successfully ✅)
- [ ] Check that all required files exist:
  - [ ] `azure.yaml` ✅
  - [ ] `Dockerfile` ✅
  - [ ] `infra/main.bicep` ✅
  - [ ] `infra/main.parameters.json` ✅

### 4. **Azure Subscription Check**
- [ ] Sufficient quota for Container Apps
- [ ] Billing account configured
- [ ] Resource group creation permissions

---

## Deployment Command

```powershell
cd "c:\Users\Gagan Chaudhary\Downloads\gaganvision\visions-main"
azd up
```

---

## Post-Deployment Verification

- [ ] Application URL loads successfully
- [ ] Homepage displays with animations
- [ ] All service pages accessible (48 pages)
- [ ] Contact forms work
- [ ] Mobile responsiveness confirmed
- [ ] No console errors in browser

---

**Ready to deploy!** 🚀