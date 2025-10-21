# Quick Start Commands

## 🚀 Complete Setup in 10 Commands

### 1. Install API Dependencies
```powershell
cd api
npm install
```

### 2. Create Environment File
```powershell
# Create api/.env file with your database credentials
@"
DB_HOST=your-server.postgres.database.azure.com
DB_PORT=5432
DB_NAME=techvision
DB_USER=your-username
DB_PASSWORD=your-password
DB_SSL=true
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
ALLOWED_ORIGINS=https://red-grass-0a2c21e0f.3.azurestaticapps.net,http://localhost:3000
"@ | Out-File -FilePath .env -Encoding UTF8
```

### 3. Initialize Database
```powershell
# Option A: Using psql command line
psql -h your-server.postgres.database.azure.com -U your-username -d postgres -f database/schema.sql

# Option B: Using Azure Data Studio
# 1. Open Azure Data Studio
# 2. Connect to your PostgreSQL server
# 3. Open database/schema.sql
# 4. Click "Run"
```

### 4. Test API Locally (Optional)
```powershell
cd api
npm start
# API runs at http://localhost:7071
```

### 5. Test Login Endpoint
```powershell
# Using PowerShell
$body = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:7071/api/admin/login" -Method POST -Body $body -ContentType "application/json"
```

### 6. Install Azure Functions Core Tools (if not installed)
```powershell
# Using npm
npm install -g azure-functions-core-tools@4 --unsafe-perm true

# OR using Chocolatey
choco install azure-functions-core-tools-4
```

### 7. Login to Azure
```powershell
az login
```

### 8. Deploy API to Azure Functions
```powershell
cd api

# Create Function App (first time only)
az functionapp create --name techvision-api --resource-group techvision-rg --storage-account techvisionstorage --runtime node --runtime-version 18 --functions-version 4 --os-type Linux --consumption-plan-location eastus

# Deploy
func azure functionapp publish techvision-api
```

### 9. Configure Function App Environment Variables
```powershell
az functionapp config appsettings set --name techvision-api --resource-group techvision-rg --settings `
  "DB_HOST=your-server.postgres.database.azure.com" `
  "DB_PORT=5432" `
  "DB_NAME=techvision" `
  "DB_USER=your-username" `
  "DB_PASSWORD=your-password" `
  "DB_SSL=true" `
  "JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long" `
  "ALLOWED_ORIGINS=https://red-grass-0a2c21e0f.3.azurestaticapps.net"
```

### 10. Update Frontend and Deploy
```powershell
cd ..

# Create .env.local for development
@"
NEXT_PUBLIC_API_URL=https://techvision-api.azurewebsites.net/api
"@ | Out-File -FilePath .env.local -Encoding UTF8

# Build
npm run build

# Deploy (if using GitHub Actions, just push)
git add .
git commit -m "Add admin panel with API integration"
git push

# OR deploy manually to Azure Static Web Apps
# (will auto-deploy from GitHub if connected)
```

---

## ✅ Verification Commands

### Check if API is running locally
```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:7071/api/contact" -Method POST

# Should return validation errors (expected)
```

### Check if API is deployed
```powershell
# Health check
Invoke-RestMethod -Uri "https://techvision-api.azurewebsites.net/api/admin/login" -Method POST

# Should return validation errors (expected)
```

### Test Contact Form Submission
```powershell
$contactData = @{
    name = "Test User"
    email = "test@example.com"
    phone = "+1234567890"
    message = "This is a test message"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://techvision-api.azurewebsites.net/api/contact" -Method POST -Body $contactData -ContentType "application/json"
```

### Test Admin Login
```powershell
$loginData = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "https://techvision-api.azurewebsites.net/api/admin/login" -Method POST -Body $loginData -ContentType "application/json"
$token = $response.data.token
Write-Host "Token: $token"
```

### Test Protected Endpoint
```powershell
# Use token from previous command
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "https://techvision-api.azurewebsites.net/api/admin/contacts" -Method GET -Headers $headers
```

---

## 🔧 Troubleshooting Commands

### Check Azure Function Logs
```powershell
# Stream logs in real-time
az webapp log tail --name techvision-api --resource-group techvision-rg
```

### Check Function App Settings
```powershell
az functionapp config appsettings list --name techvision-api --resource-group techvision-rg
```

### Restart Function App
```powershell
az functionapp restart --name techvision-api --resource-group techvision-rg
```

### Check PostgreSQL Connection
```powershell
# Test connection
psql -h your-server.postgres.database.azure.com -U your-username -d techvision -c "SELECT COUNT(*) FROM contacts;"
```

### Check Database Tables
```powershell
psql -h your-server.postgres.database.azure.com -U your-username -d techvision -c "\dt"
```

### View Recent Contacts
```powershell
psql -h your-server.postgres.database.azure.com -U your-username -d techvision -c "SELECT id, name, email, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 5;"
```

---

## 🗑️ Cleanup Commands (if needed)

### Delete Function App
```powershell
az functionapp delete --name techvision-api --resource-group techvision-rg
```

### Delete Resource Group (deletes everything)
```powershell
az group delete --name techvision-rg --yes
```

### Drop Database Tables
```powershell
psql -h your-server.postgres.database.azure.com -U your-username -d techvision -c "
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS quote_requests CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
"
```

---

## 📦 Package Management

### Update Dependencies
```powershell
cd api
npm update
```

### Check for Vulnerabilities
```powershell
cd api
npm audit
npm audit fix
```

### Install Additional Packages
```powershell
cd api
npm install <package-name>
```

---

## 🔐 Security Commands

### Generate JWT Secret
```powershell
# Generate a random 64-character secret
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

### Change Admin Password (in database)
```powershell
# First, generate a hash of your new password using Node.js
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-new-password', 10));"

# Then update in database (replace HASH with output from above)
psql -h your-server.postgres.database.azure.com -U your-username -d techvision -c "UPDATE admin_users SET password = 'HASH' WHERE username = 'admin';"
```

---

## 📊 Database Management

### Backup Database
```powershell
# Backup to file
pg_dump -h your-server.postgres.database.azure.com -U your-username -d techvision -f backup.sql

# Backup with Azure CLI
az postgres flexible-server backup create --name techvision-db --resource-group techvision-rg
```

### Restore Database
```powershell
psql -h your-server.postgres.database.azure.com -U your-username -d techvision -f backup.sql
```

### View Statistics
```powershell
# Contact statistics
psql -h your-server.postgres.database.azure.com -U your-username -d techvision -c "SELECT * FROM contact_statistics;"

# Lead statistics
psql -h your-server.postgres.database.azure.com -U your-username -d techvision -c "SELECT * FROM lead_statistics;"

# Quote statistics
psql -h your-server.postgres.database.azure.com -U your-username -d techvision -c "SELECT * FROM quote_statistics;"
```

---

## 🚀 Development Workflow

### Start Local Development
```powershell
# Terminal 1: Start API
cd api
npm start

# Terminal 2: Start Frontend
cd ..
npm run dev
```

### Access Local Admin Panel
```
Frontend: http://localhost:3000
Admin Login: http://localhost:3000/admin/login
Admin Dashboard: http://localhost:3000/admin/dashboard
Quote Form: http://localhost:3000/request-quote
```

### Build for Production
```powershell
# Build frontend
npm run build

# Test production build locally
npm start
```

---

## 📝 Git Commands

### Commit Changes
```powershell
git add .
git commit -m "Add admin panel and forms"
git push origin main
```

### Create New Branch
```powershell
git checkout -b feature/admin-panel
git push -u origin feature/admin-panel
```

### View Git Status
```powershell
git status
git log --oneline
```

---

## 🎯 Quick Test Script

Save this as `test-api.ps1`:

```powershell
# test-api.ps1
$API_URL = "https://techvision-api.azurewebsites.net/api"

Write-Host "Testing API Endpoints..." -ForegroundColor Cyan

# Test 1: Contact Form
Write-Host "`n1. Testing Contact Form..." -ForegroundColor Yellow
$contact = @{
    name = "Test User"
    email = "test@example.com"
    phone = "+1234567890"
    message = "Test message"
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "$API_URL/contact" -Method POST -Body $contact -ContentType "application/json"
    Write-Host "✓ Contact form works!" -ForegroundColor Green
} catch {
    Write-Host "✗ Contact form failed: $_" -ForegroundColor Red
}

# Test 2: Admin Login
Write-Host "`n2. Testing Admin Login..." -ForegroundColor Yellow
$login = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

try {
    $loginResult = Invoke-RestMethod -Uri "$API_URL/admin/login" -Method POST -Body $login -ContentType "application/json"
    $token = $loginResult.data.token
    Write-Host "✓ Admin login works!" -ForegroundColor Green
    
    # Test 3: Protected Endpoint
    Write-Host "`n3. Testing Protected Endpoint..." -ForegroundColor Yellow
    $headers = @{ "Authorization" = "Bearer $token" }
    $contacts = Invoke-RestMethod -Uri "$API_URL/admin/contacts" -Method GET -Headers $headers
    Write-Host "✓ Protected endpoint works!" -ForegroundColor Green
    Write-Host "   Found $($contacts.data.statistics.total) contacts" -ForegroundColor Cyan
    
} catch {
    Write-Host "✗ Authentication failed: $_" -ForegroundColor Red
}

Write-Host "`nAll tests completed!" -ForegroundColor Cyan
```

Run with:
```powershell
.\test-api.ps1
```

---

## 🎉 Success Indicators

After running the setup, you should see:

✅ API running at https://techvision-api.azurewebsites.net
✅ Frontend at https://red-grass-0a2c21e0f.3.azurestaticapps.net
✅ Admin login working at /admin/login
✅ Forms submitting successfully
✅ Dashboard displaying data
✅ Status updates working

---

**Total Setup Time: ~1 hour**
**Estimated Cost: $15-20/month**

Good luck! 🚀
