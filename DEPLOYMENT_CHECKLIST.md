# Deployment Checklist for Next.js 15 Migration

## Pre-Deployment ✅

- [x] Upgraded to Next.js 15.5.6 and React 19 RC
- [x] Created all 8 API routes in `app/api/`
- [x] Created utility libraries (`lib/db.ts`, `lib/cors.ts`, `lib/auth.ts`)
- [x] Removed old `api/` folder (Azure Functions)
- [x] Updated `package.json` (removed workspaces, Azure deps)
- [x] Updated `next.config.mjs` (removed API proxy)
- [x] Updated `.env` and `.env.local` (removed `NEXT_PUBLIC_API_URL`)
- [x] Updated `app/admin/login/page.tsx` (direct API calls)
- [x] Fixed TypeScript errors (`ServicesMegaMenu.tsx`)
- [x] Tested local build (`npm run build` - SUCCESS ✅)
- [x] Removed obsolete documentation (AWS_AMPLIFY_FIX.md, etc.)
- [x] Updated README.md for Next.js 15 architecture
- [x] Created MIGRATION.md documentation

## AWS Amplify Configuration

### Environment Variables to Update

Login to AWS Amplify Console → Your App → Environment Variables

**Keep these (no changes needed):**
```
POSTGRES_HOST=visions.postgres.database.azure.com
POSTGRES_PORT=5432
POSTGRES_DB=visions_db
POSTGRES_USER=visions_admin@visions
POSTGRES_PASSWORD=<your-password>
POSTGRES_SSL=true
JWT_SECRET=<your-jwt-secret>
SESSION_SECRET=<your-session-secret>
SESSION_MAX_AGE=86400000
```

**Update this:**
```
ALLOWED_ORIGINS=https://visions.services,https://www.visions.services
```

**REMOVE these (no longer needed):**
```
❌ NEXT_PUBLIC_API_URL
```

### Build Settings

Verify `amplify.yml` is correct (should be):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

## Deployment Steps

### 1. Commit and Push

```bash
cd /Users/ajaypawar/Downloads/visions-main

# Stage all changes
git add -A

# Commit
git commit -m "Complete migration to Next.js 15 - removed Azure Functions, added API routes"

# Push to trigger deployment
git push origin main
```

### 2. Monitor Deployment

1. Go to AWS Amplify Console
2. Watch the build progress
3. Check for any build errors

Expected build time: ~3-5 minutes

### 3. Verify Deployment

After deployment completes, test these endpoints:

#### Public Endpoints (No Auth Required)
```bash
# Test contact form
curl -X POST https://visions.services/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","message":"Test message"}'

# Test lead form
curl -X POST https://visions.services/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","requirement":"Test requirement"}'

# Test quote form
curl -X POST https://visions.services/api/quote \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","serviceType":"web-development","projectDescription":"Test project"}'
```

Expected Response: `{"success":true,"message":"..."}`

#### Admin Login
```bash
# Test admin login
curl -X POST https://visions.services/api/api-admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"<your-admin-email>","password":"<your-admin-password>"}'
```

Expected Response: `{"success":true,"data":{"token":"...","user":{...}}}`

#### Protected Endpoints (Requires JWT)
```bash
# Get contacts (replace TOKEN with actual JWT from login)
curl https://visions.services/api/api-admin/contacts \
  -H "Authorization: Bearer TOKEN"

# Get leads
curl https://visions.services/api/api-admin/leads \
  -H "Authorization: Bearer TOKEN"

# Get quotes
curl https://visions.services/api/api-admin/quotes \
  -H "Authorization: Bearer TOKEN"

# Update status
curl -X PATCH https://visions.services/api/api-admin/status \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"table":"contacts","id":1,"status":"completed"}'
```

Expected Response: `{"contacts":[...],"pagination":{...},"statistics":{...}}`

### 4. Test Admin Dashboard

1. Go to https://visions.services/admin/login
2. Login with admin credentials
3. Verify dashboard loads
4. Check contacts, leads, and quotes tables
5. Test status updates
6. Test logout

### 5. Test Contact Forms

1. Go to https://visions.services/contact
2. Fill and submit form
3. Check if submission appears in admin dashboard

4. Go to https://visions.services/get-started
5. Fill and submit lead form
6. Check if submission appears in admin dashboard

7. Go to https://visions.services/request-quote
8. Fill and submit quote form
9. Check if submission appears in admin dashboard

## Post-Deployment

### If Everything Works ✅

1. Mark migration as complete in project notes
2. Archive old Azure Functions code (already in git history)
3. Update any external documentation
4. Notify team/stakeholders

### If Issues Occur ❌

#### Issue: Build fails in AWS Amplify

**Check:**
- Build logs in AWS Amplify Console
- Environment variables are set correctly
- `amplify.yml` is correct

**Fix:**
```bash
# Test build locally first
npm run build

# If local build works but AWS fails, check Node.js version
# AWS Amplify should use Node 18+ (check in Amplify settings)
```

#### Issue: API routes return 404

**Check:**
- Files are in `app/api/` directory
- Files are named `route.ts` (not `route.tsx`)
- Build completed successfully

**Fix:**
- Redeploy or trigger rebuild in AWS Amplify

#### Issue: CORS errors

**Check:**
- `ALLOWED_ORIGINS` includes production domain
- API routes have OPTIONS handlers
- Browser dev tools for exact error

**Fix:**
- Update `ALLOWED_ORIGINS` in AWS Amplify environment variables
- Redeploy

#### Issue: Database connection fails

**Check:**
- Database credentials are correct in environment variables
- PostgreSQL server is running
- Firewall allows AWS Amplify IPs

**Fix:**
- Update environment variables in AWS Amplify
- Check PostgreSQL server firewall rules
- Test connection from another location

#### Issue: Authentication fails

**Check:**
- `JWT_SECRET` matches between deployments
- Admin user exists in database
- Password is correct

**Fix:**
- Verify `JWT_SECRET` in environment variables
- Check admin user credentials in database

## Rollback Plan

If critical issues occur and cannot be fixed quickly:

```bash
# Find commit before migration
git log --oneline

# Revert to previous version
git revert <migration-commit-hash>

# Push rollback
git push origin main
```

Note: This will restore the old Azure Functions architecture. You'll need to deploy the API separately.

## Success Criteria

- ✅ All pages load correctly
- ✅ Public forms submit successfully
- ✅ Admin login works
- ✅ Admin dashboard displays data
- ✅ Status updates work
- ✅ No console errors
- ✅ No CORS errors
- ✅ API response times < 2s
- ✅ Mobile responsive
- ✅ SEO metadata intact

## Support

If you need help during deployment:
- Check AWS Amplify build logs
- Review `MIGRATION.md` for technical details
- Check Next.js 15 documentation: https://nextjs.org/docs
- Contact: info@visions.services

---

**Ready to deploy!** 🚀

Remember:
1. Test everything locally first (`npm run build`)
2. Backup database before deploying
3. Deploy during low-traffic hours if possible
4. Monitor for the first 24 hours after deployment
