# 🔧 Local Development Setup Guide

## Problem Solved ✅

**Issue**: Login page was trying to use `/api` but API runs on `http://localhost:7071/api`

**Solution**: 
1. Created `.env.local` for local development settings
2. Updated login page to use relative `/api` path
3. Next.js proxy now correctly forwards requests from `/api/*` to `http://localhost:7071/api/*`

## How It Works Now

### Development (Local)
```
Browser Request: http://localhost:3000/api/api-admin/login
       ↓
Next.js Proxy (next.config.mjs rewrites)
       ↓
Azure Functions: http://localhost:7071/api/api-admin/login
```

### Production (AWS Amplify)
```
Browser Request: https://visions.services/api/api-admin/login
       ↓
Next.js Proxy (next.config.mjs rewrites)
       ↓
Azure Functions: (your deployed API endpoint)
```

## Files Changed

### 1. `.env.local` (NEW - Local Development Only)
```bash
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:7071/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:7071
```

### 2. `.env` (Production Settings)
```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://visions.services/api
NEXT_PUBLIC_SITE_URL=https://visions.services
ALLOWED_ORIGINS=https://visions.services,https://www.visions.services
```

### 3. `app/admin/login/page.tsx`
Changed from:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7071/api';
```

To:
```typescript
const API_URL = '/api'; // Uses Next.js proxy
```

Also added:
```typescript
credentials: 'include', // Important for CORS
```

## 🚀 How to Run Development

### Start Both Servers:
```bash
npm run dev
```

This runs:
- **Next.js** on `http://localhost:3000`
- **Azure Functions API** on `http://localhost:7071`

### Test Admin Login:

1. **Open**: http://localhost:3000/admin/login
2. **Credentials**: (your admin username/password)
3. **Expected**: Should login successfully!

### Verify API is Working:

```bash
# Test preflight
curl -X OPTIONS http://localhost:3000/api/api-admin/login \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -v

# Should return 204 with CORS headers
```

## 🌐 Production Deployment

When you deploy to AWS Amplify, it will:
1. Use `.env` settings (production)
2. `NEXT_PUBLIC_API_URL=https://visions.services/api`
3. Proxy still works the same way

**Important**: Make sure these variables are set in AWS Amplify Console:
```
NEXT_PUBLIC_API_URL=https://visions.services/api
NEXT_PUBLIC_SITE_URL=https://visions.services
ALLOWED_ORIGINS=https://visions.services,https://www.visions.services
```

## 🐛 Troubleshooting

### Issue: "Cannot connect to API"
**Solution**: Make sure Azure Functions is running:
```bash
cd api
npm start
```
Should see: `http://localhost:7071/api/api-admin/login`

### Issue: "CORS error in browser"
**Solution**: Check `.env.local` has:
```
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:7071
```

### Issue: "Login fails with network error"
**Solution**: 
1. Open DevTools → Network tab
2. Try login
3. Check if request goes to `/api/api-admin/login`
4. Verify response status

### Issue: "Environment variables not loading"
**Solution**: 
1. Stop dev server (Ctrl+C)
2. Run `npm run dev` again
3. Next.js loads `.env.local` on startup

## 📁 Environment Files Priority

Next.js loads environment files in this order (highest priority first):
1. `.env.local` ← **Used for local development** (not committed)
2. `.env.production` / `.env.development`
3. `.env` ← Used as fallback

## ✅ Checklist

Before committing:
- [ ] `.env.local` is NOT committed (it's in `.gitignore`)
- [ ] `.env` has production URLs
- [ ] `app/admin/login/page.tsx` uses relative `/api` path
- [ ] Tested login locally at http://localhost:3000/admin/login
- [ ] All 8 API endpoints have CORS utility imported

## 🎯 Next Steps

1. **Test locally** - Try logging in at http://localhost:3000/admin/login
2. **If it works** - Commit and push changes
3. **AWS Amplify** - Will auto-deploy with production settings

---

**Last Updated**: October 22, 2025
**Status**: ✅ Ready for local development and production
