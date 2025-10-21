# 🎯 Complete Deployment Checklist

## ✅ Step-by-Step Deployment Guide

Print this checklist and check off items as you complete them!

---

## PHASE 1: Preparation (10 minutes)

### Prerequisites
- [ ] Azure account active
- [ ] Azure CLI installed: `az --version`
- [ ] Node.js 18+ installed: `node --version`
- [ ] Azure Functions Core Tools: `func --version`
- [ ] PostgreSQL database created in Azure

### Database Verification
- [ ] Database name: `techvision`
- [ ] Connection tested successfully
- [ ] Firewall allows Azure services
- [ ] Admin credentials saved securely

---

## PHASE 2: Database Setup (5 minutes)

- [ ] Open Azure Data Studio or psql
- [ ] Connect to your PostgreSQL server
- [ ] Run file: `api/database/schema.sql`
- [ ] Verify 5 tables created: `\dt`
  - [ ] contacts
  - [ ] leads
  - [ ] quote_requests
  - [ ] admin_users
  - [ ] admin_sessions
- [ ] Verify admin user exists: `SELECT * FROM admin_users;`

---

## PHASE 3: API Setup (10 minutes)

### Install Dependencies
```powershell
cd api
npm install
```
- [ ] Dependencies installed (no errors)
- [ ] node_modules folder created

### Configure Environment
Create `api/.env` file with:
```env
DB_HOST=your-server.postgres.database.azure.com
DB_PORT=5432
DB_NAME=techvision
DB_USER=your-username
DB_PASSWORD=your-password
DB_SSL=true
JWT_SECRET=your-super-secret-jwt-key-at-least-64-chars
ALLOWED_ORIGINS=https://red-grass-0a2c21e0f.3.azurestaticapps.net
```
- [ ] .env file created
- [ ] All values filled in
- [ ] JWT_SECRET is 64+ characters

### Test Locally (Optional)
```powershell
cd api
npm start
```
- [ ] API starts without errors
- [ ] Shows: "Http Functions: contact, lead, quote, etc."
- [ ] Test endpoint: `http://localhost:7071/api/contact`

---

## PHASE 4: Deploy API (15 minutes)

### Create Function App
```powershell
az login
az group create --name techvision-rg --location eastus
az storage account create --name techvisionstorage --resource-group techvision-rg
az functionapp create --name techvision-api --resource-group techvision-rg --storage-account techvisionstorage --runtime node --runtime-version 18 --functions-version 4 --os-type Linux
```
- [ ] Resource group created
- [ ] Storage account created
- [ ] Function App created

### Deploy Functions
```powershell
cd api
func azure functionapp publish techvision-api
```
- [ ] Deployment successful
- [ ] All 8 functions deployed
- [ ] URLs displayed in output

### Configure Environment Variables
```powershell
az functionapp config appsettings set --name techvision-api --resource-group techvision-rg --settings "DB_HOST=your-server" "DB_PORT=5432" "DB_NAME=techvision" "DB_USER=your-user" "DB_PASSWORD=your-pass" "DB_SSL=true" "JWT_SECRET=your-secret" "ALLOWED_ORIGINS=https://red-grass-0a2c21e0f.3.azurestaticapps.net"
```
- [ ] All environment variables set
- [ ] Verify in Azure Portal → Configuration

### Restart Function App
```powershell
az functionapp restart --name techvision-api --resource-group techvision-rg
```
- [ ] Function App restarted

---

## PHASE 5: Update Frontend (5 minutes)

### Create Environment Variable
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://techvision-api.azurewebsites.net/api
```
- [ ] File created in project root

### Update Azure Static Web Apps
In Azure Portal:
- [ ] Go to Static Web Apps → your site
- [ ] Click Configuration
- [ ] Add Application Setting:
  - Name: `NEXT_PUBLIC_API_URL`
  - Value: `https://techvision-api.azurewebsites.net/api`
- [ ] Save changes

---

## PHASE 6: Deploy Frontend (5 minutes)

### Build Locally (Optional Test)
```powershell
npm run build
```
- [ ] Build completes successfully
- [ ] No errors

### Deploy
```powershell
git add .
git commit -m "Add admin panel with forms"
git push origin main
```
- [ ] Changes committed
- [ ] Pushed to GitHub
- [ ] GitHub Actions workflow triggered
- [ ] Wait for deployment (~3 minutes)
- [ ] Deployment successful

---

## PHASE 7: Testing (10 minutes)

### Test API Endpoints

**Test 1: Contact Form**
```powershell
$body = @{ name="Test"; email="test@test.com"; phone="+1234567890"; message="Test" } | ConvertTo-Json
Invoke-RestMethod -Uri "https://techvision-api.azurewebsites.net/api/contact" -Method POST -Body $body -ContentType "application/json"
```
- [ ] Returns success response
- [ ] Check database: Data saved

**Test 2: Admin Login**
```powershell
$login = @{ username="admin"; password="admin123" } | ConvertTo-Json
$response = Invoke-RestMethod -Uri "https://techvision-api.azurewebsites.net/api/admin/login" -Method POST -Body $login -ContentType "application/json"
$token = $response.data.token
```
- [ ] Returns JWT token
- [ ] Token copied for next test

**Test 3: Get Contacts**
```powershell
$headers = @{ "Authorization" = "Bearer $token" }
Invoke-RestMethod -Uri "https://techvision-api.azurewebsites.net/api/admin/contacts" -Headers $headers
```
- [ ] Returns contacts list
- [ ] Statistics included

### Test Frontend

**Forms:**
- [ ] Visit: https://red-grass-0a2c21e0f.3.azurestaticapps.net/request-quote
- [ ] Quote form loads and looks good
- [ ] Submit test data
- [ ] Success message appears

**Admin Panel:**
- [ ] Visit: https://red-grass-0a2c21e0f.3.azurestaticapps.net/admin/login
- [ ] Login page loads
- [ ] Login with: admin / admin123
- [ ] Redirects to dashboard
- [ ] Dashboard shows statistics
- [ ] Click Contacts tab
- [ ] See test submission
- [ ] Change status dropdown
- [ ] Status updates successfully

---

## PHASE 8: Security (5 minutes)

### Change Admin Password
```powershell
# Generate new hash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourNewSecurePassword123!', 10));"

# Copy the hash and run in database:
# UPDATE admin_users SET password = 'HASH_HERE' WHERE username = 'admin';
```
- [ ] New password hash generated
- [ ] Password updated in database
- [ ] Test login with new password
- [ ] Old password no longer works

### Remove Localhost from CORS
```powershell
az functionapp config appsettings set --name techvision-api --resource-group techvision-rg --settings "ALLOWED_ORIGINS=https://red-grass-0a2c21e0f.3.azurestaticapps.net"
```
- [ ] CORS updated
- [ ] Function App restarted

---

## PHASE 9: Monitoring (5 minutes)

### Enable Application Insights
In Azure Portal:
- [ ] Go to Function App
- [ ] Enable Application Insights
- [ ] Create new resource or use existing
- [ ] Save changes

### Create Alerts
Create alerts for:
- [ ] Failed requests (>10 in 5 min)
- [ ] High response time (>5 seconds)
- [ ] Error rate (>5%)

### Check Logs
```powershell
az webapp log tail --name techvision-api --resource-group techvision-rg
```
- [ ] Logs streaming
- [ ] No errors visible
- [ ] API calls logging correctly

---

## PHASE 10: Documentation (5 minutes)

### Update README
- [ ] Add admin panel section to README
- [ ] Include admin login URL
- [ ] List form URLs
- [ ] Add maintenance notes

### Save Important Info
Create a secure document with:
- [ ] Admin username
- [ ] Admin password (new, secure one)
- [ ] Database connection string
- [ ] JWT secret
- [ ] Azure resource names
- [ ] API URL
- [ ] Frontend URL

---

## ✅ FINAL VERIFICATION

### All Systems Go
- [ ] ✅ Database is online and accessible
- [ ] ✅ API is deployed and responding
- [ ] ✅ Frontend is deployed and loading
- [ ] ✅ Forms submit successfully
- [ ] ✅ Admin login works
- [ ] ✅ Dashboard displays data
- [ ] ✅ Status updates work
- [ ] ✅ Mobile responsive
- [ ] ✅ Admin password changed
- [ ] ✅ Monitoring enabled
- [ ] ✅ Documentation updated

### URLs to Bookmark
- **Website:** https://red-grass-0a2c21e0f.3.azurestaticapps.net
- **Admin Login:** https://red-grass-0a2c21e0f.3.azurestaticapps.net/admin/login
- **Quote Form:** https://red-grass-0a2c21e0f.3.azurestaticapps.net/request-quote
- **API:** https://techvision-api.azurewebsites.net/api
- **Azure Portal:** https://portal.azure.com

---

## 🎉 SUCCESS!

**You're LIVE!** 🚀

Your complete admin panel is now deployed and operational.

### What You Have:
✅ 3 Professional Forms
✅ Admin Dashboard
✅ 8 Secure API Endpoints
✅ PostgreSQL Database
✅ JWT Authentication
✅ Real-time Status Management

### Next Steps:
1. Share admin credentials with team (securely)
2. Monitor submissions daily
3. Set up email notifications (optional)
4. Add reCAPTCHA to forms (optional)
5. Configure Google Analytics

---

## 📊 Estimated Costs

**Monthly Operating Cost:** $15-20
- Static Web Apps: $0 (free tier)
- Functions: $0 (free tier)
- PostgreSQL: $15-20 (B1ms)

**Total Setup Time:** ~1 hour

---

## 🆘 Quick Troubleshooting

**If forms don't submit:**
1. Check browser console for errors
2. Verify API_URL in environment variables
3. Check CORS settings in Function App

**If admin login fails:**
1. Check username/password in database
2. Verify JWT_SECRET is configured
3. Clear browser localStorage
4. Check Function App logs

**If API returns errors:**
1. Check Function App logs: `az webapp log tail --name techvision-api`
2. Verify database connection
3. Check environment variables
4. Restart Function App

---

## 📞 Support Resources

- **Complete Guide:** `COMPLETE_IMPLEMENTATION_GUIDE.md`
- **API Reference:** `API_REFERENCE.md`
- **Quick Commands:** `QUICK_START_COMMANDS.md`
- **Architecture:** `ARCHITECTURE.md`

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Status:** 🟢 LIVE

**Great job! Your admin panel is ready to handle submissions!** 🎊
