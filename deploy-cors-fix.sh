#!/bin/bash
# Deploy CORS fix to production

set -e  # Exit on error

echo "🚀 Deploying CORS fix to production..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must run from project root directory"
    exit 1
fi

# Check for uncommitted changes
if ! git diff --quiet; then
    echo "⚠️  Warning: You have uncommitted changes"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

echo "✅ Build successful"
echo ""

echo "📝 Staging changes..."
git add api/src/utils/cors.ts
git add api/src/adminLogin.ts
git add api/src/submitContact.ts
git add api/src/submitLead.ts
git add api/src/submitQuote.ts
git add api/src/getContacts.ts
git add api/src/getLeads.ts
git add api/src/getQuotes.ts
git add api/src/updateStatus.ts
git add CORS_FIX.md

echo "💾 Committing changes..."
git commit -m "Fix CORS preflight errors for all API endpoints

- Created centralized CORS utility (api/src/utils/cors.ts)
- Updated all 8 API functions to use new CORS handling
- Changed OPTIONS response to 204 (No Content)
- Added Access-Control-Allow-Credentials support
- Added Access-Control-Max-Age for preflight caching
- Implemented dynamic origin validation
- Added comprehensive CORS headers including Authorization

Fixes: Admin login 302 preflight error"

if [ $? -ne 0 ]; then
    echo "⚠️  Nothing to commit or commit failed"
fi

echo ""
echo "🌐 Pushing to remote..."
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ Push failed. Please check your git configuration."
    exit 1
fi

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "📋 Next steps:"
echo "1. Monitor AWS Amplify build at: https://console.aws.amazon.com/amplify"
echo "2. Verify ALLOWED_ORIGINS is set to: https://visions.services"
echo "3. Test admin login after deployment completes"
echo "4. Check browser console for any CORS errors"
echo ""
echo "🔍 To test preflight:"
echo "curl -X OPTIONS https://visions.services/api/api-admin/login \\"
echo "  -H 'Origin: https://visions.services' \\"
echo "  -H 'Access-Control-Request-Method: POST' \\"
echo "  -v"
echo ""
echo "✨ Done!"
