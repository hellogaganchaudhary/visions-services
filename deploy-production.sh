#!/bin/bash
# Deploy API to Azure Functions and Frontend to AWS Amplify

set -e

echo "🚀 Production Deployment Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Azure Functions Core Tools is installed
if ! command -v func &> /dev/null; then
    echo -e "${RED}❌ Azure Functions Core Tools not found!${NC}"
    echo "Install it with: brew tap azure/functions && brew install azure-functions-core-tools@4"
    exit 1
fi

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo -e "${RED}❌ Azure CLI not found!${NC}"
    echo "Install it with: brew install azure-cli"
    exit 1
fi

echo -e "${YELLOW}📋 Pre-Deployment Checklist:${NC}"
echo ""
echo "Before proceeding, ensure you have:"
echo "1. ✅ Azure Function App created (e.g., visions-api)"
echo "2. ✅ Azure CLI logged in (az login)"
echo "3. ✅ Environment variables set in AWS Amplify Console"
echo "4. ✅ CORS configured in Azure Function App"
echo ""

read -p "Have you completed the checklist? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please complete the checklist first."
    exit 1
fi

echo ""
echo "======================================"
echo "Step 1: Deploy API to Azure Functions"
echo "======================================"
echo ""

# Get Function App name
read -p "Enter your Azure Function App name (e.g., visions-api): " FUNCTION_APP_NAME

if [ -z "$FUNCTION_APP_NAME" ]; then
    echo -e "${RED}❌ Function App name is required!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📦 Building API...${NC}"
cd api
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ API build failed!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}🚀 Deploying to Azure Functions: ${FUNCTION_APP_NAME}${NC}"
func azure functionapp publish "$FUNCTION_APP_NAME" --typescript

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Azure Functions deployment failed!${NC}"
    exit 1
fi

# Get the deployed API URL
API_URL="https://${FUNCTION_APP_NAME}.azurewebsites.net/api"
echo ""
echo -e "${GREEN}✅ API deployed successfully!${NC}"
echo -e "${GREEN}📍 API URL: ${API_URL}${NC}"

cd ..

echo ""
echo "========================================"
echo "Step 2: Update Production Configuration"
echo "========================================"
echo ""

# Update .env file
echo -e "${YELLOW}📝 Updating .env with new API URL...${NC}"

# Backup current .env
cp .env .env.backup

# Update NEXT_PUBLIC_API_URL in .env
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=${API_URL}|g" .env
else
    # Linux
    sed -i "s|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=${API_URL}|g" .env
fi

echo -e "${GREEN}✅ .env updated${NC}"

echo ""
echo "==========================================="
echo "Step 3: Configure CORS in Azure (IMPORTANT)"
echo "==========================================="
echo ""

echo "You need to add your domain to Azure CORS settings:"
echo ""
echo "Option 1: Using Azure CLI (automated):"
echo "----------------------------------------"
read -p "Configure CORS automatically? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Adding CORS origins..."
    az functionapp cors add \
        --name "$FUNCTION_APP_NAME" \
        --allowed-origins "https://visions.services" \
        --resource-group $(az functionapp show --name "$FUNCTION_APP_NAME" --query resourceGroup -o tsv)
    
    az functionapp cors add \
        --name "$FUNCTION_APP_NAME" \
        --allowed-origins "https://www.visions.services" \
        --resource-group $(az functionapp show --name "$FUNCTION_APP_NAME" --query resourceGroup -o tsv)
    
    echo -e "${GREEN}✅ CORS configured${NC}"
else
    echo ""
    echo "Option 2: Manual Configuration:"
    echo "-------------------------------"
    echo "1. Go to: https://portal.azure.com"
    echo "2. Navigate to: Function Apps → ${FUNCTION_APP_NAME} → CORS"
    echo "3. Add these origins:"
    echo "   - https://visions.services"
    echo "   - https://www.visions.services"
    echo "4. Click Save"
    echo ""
    read -p "Press Enter after configuring CORS manually..."
fi

echo ""
echo "================================================"
echo "Step 4: Update AWS Amplify Environment Variables"
echo "================================================"
echo ""

echo "⚠️  CRITICAL: Update AWS Amplify Console with new API URL"
echo ""
echo "1. Go to: https://console.aws.amazon.com/amplify"
echo "2. Select your app → Environment variables"
echo "3. Update or add:"
echo ""
echo "   NEXT_PUBLIC_API_URL=${API_URL}"
echo ""
echo "4. Click Save"
echo ""
read -p "Press Enter after updating AWS Amplify environment variables..."

echo ""
echo "================================="
echo "Step 5: Deploy Frontend to AWS"
echo "================================="
echo ""

echo -e "${YELLOW}📦 Building Next.js frontend...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📝 Committing changes...${NC}"
git add .env
git commit -m "Update production API URL to ${API_URL}"

echo ""
echo -e "${YELLOW}🚀 Pushing to GitHub (triggers AWS Amplify deploy)...${NC}"
git push origin main

echo ""
echo -e "${GREEN}✅ Code pushed to GitHub${NC}"
echo -e "${YELLOW}⏳ AWS Amplify is now building...${NC}"

echo ""
echo "================================================="
echo "✨ Deployment Initiated!"
echo "================================================="
echo ""
echo "📍 API URL: ${API_URL}"
echo "📍 Frontend: https://visions.services"
echo ""
echo "🔍 Monitor AWS Amplify build:"
echo "   https://console.aws.amazon.com/amplify"
echo ""
echo "🧪 Test after deployment completes:"
echo "   1. Admin login: https://visions.services/admin/login"
echo "   2. Check browser console for errors"
echo "   3. Verify API calls in Network tab"
echo ""
echo "📋 Quick test command:"
echo "   curl -X OPTIONS ${API_URL}/api-admin/login \\"
echo "     -H 'Origin: https://visions.services' \\"
echo "     -H 'Access-Control-Request-Method: POST' -v"
echo ""
echo -e "${GREEN}✅ Deployment script completed!${NC}"
