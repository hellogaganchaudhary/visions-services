# Migration Guide: Old Structure → Monorepo

This guide helps you migrate from the old two-package structure to the new monorepo.

## 🔄 What Changed

### Package Structure

**Before:**
```
visions-main/
├── package.json          # Frontend deps
├── node_modules/         # Frontend modules
└── api/
    ├── package.json      # API deps
    └── node_modules/     # API modules
```

**After:**
```
visions-main/
├── package.json          # Root + frontend deps (monorepo)
├── node_modules/         # Shared modules
└── api/
    ├── package.json      # API-only deps (workspace)
    └── node_modules/     # API-specific modules
```

### Commands Changed

| Old Command | New Command | Notes |
|------------|-------------|-------|
| `npm run dev` (terminal 1)<br>`cd api && npm start` (terminal 2) | `npm run dev` | Single command! |
| `npm install` (root)<br>`cd api && npm install` | `npm install` | Installs everything |
| `npm run build` (root)<br>`cd api && npm run build` | `npm run build` | Builds everything |

## 📋 Migration Steps

### Step 1: Backup Current Setup

```bash
# Backup package files
cp package.json package.json.old
cp api/package.json api/package.json.old

# Backup environment
cp .env .env.backup 2>/dev/null || cp api/.env .env.backup 2>/dev/null

# Backup node_modules (optional, can just reinstall)
# mv node_modules node_modules.backup
# mv api/node_modules api/node_modules.backup
```

### Step 2: Clean Old Installation

```bash
# Remove old dependencies
rm -rf node_modules
rm -rf api/node_modules
rm -rf .next
rm -rf api/dist

# Remove lock files
rm -f package-lock.json
rm -f api/package-lock.json
```

### Step 3: Update to New Structure

The new files are already in place! But if you need to manually update:

#### Root package.json

Replace with the new monorepo version that includes:
- `"workspaces": ["api"]`
- New scripts like `dev`, `dev:next`, `dev:api`
- `concurrently` dependency

#### API package.json

Update to workspace version:
- Change `"name"` to `"@techvision/api"`
- Add `"private": true`
- Keep only API-specific dependencies

### Step 4: Environment Variables

```bash
# If .env was in api/ folder, move to root
if [ -f api/.env ]; then
    mv api/.env .env
    echo "✅ Moved .env to root"
fi

# Or create new from example
cp .env.example .env
# Edit .env with your actual values
```

### Step 5: Install New Setup

```bash
# Install everything
npm install

# This will:
# - Install root dependencies
# - Install API workspace dependencies
# - Build API automatically
```

### Step 6: Verify Installation

```bash
# Check that API built correctly
ls -la api/dist

# Should see compiled .js files

# Test the setup
npm run dev

# Should start both frontend and API
```

## 🔧 Configuration Updates

### Update .gitignore

If you have custom .gitignore rules, merge them with the new one:

```bash
# Compare
diff .gitignore.old .gitignore

# Keep your custom rules
# Add new monorepo-specific rules
```

### Update next.config.mjs

The new version includes:
- API proxy for development
- Environment variable exposure
- Production optimizations

If you have custom Next.js config, merge carefully.

### Update CI/CD

If you have GitHub Actions or other CI/CD:

**Old workflow:**
```yaml
- run: npm install
- run: cd api && npm install
- run: npm run build
- run: cd api && npm run build
```

**New workflow:**
```yaml
- run: npm install
- run: npm run build
```

## 🐛 Troubleshooting Migration

### Issue: "Cannot find module"

**Cause:** API not built after migration

**Fix:**
```bash
npm run build:api
```

### Issue: Environment variables not working

**Cause:** .env in wrong location

**Fix:**
```bash
# Move to root if in api/
mv api/.env .env

# Or create new
cp .env.example .env
```

### Issue: Dependencies missing

**Cause:** Incomplete installation

**Fix:**
```bash
npm run clean:all
npm install
```

### Issue: Ports already in use

**Cause:** Old processes still running

**Fix:**
```bash
# Kill old processes
lsof -ti:3000 | xargs kill -9
lsof -ti:7071 | xargs kill -9

# Start fresh
npm run dev
```

### Issue: Git conflicts

**Cause:** Both old and new package.json committed

**Fix:**
```bash
# Use the new version
git checkout --theirs package.json
git checkout --theirs api/package.json

# Or manually resolve conflicts
```

## ✅ Verification Checklist

After migration, verify:

- [ ] `npm install` completes without errors
- [ ] `api/dist/` folder exists and has .js files
- [ ] `npm run dev` starts both services
- [ ] Frontend accessible at http://localhost:3000
- [ ] API accessible at http://localhost:7071
- [ ] Forms still work (test contact form)
- [ ] Admin login still works
- [ ] Database connections work
- [ ] Environment variables loaded correctly

## 🔄 Rollback Plan

If something goes wrong:

```bash
# Restore old package files
cp package.json.old package.json
cp api/package.json.old api/package.json

# Restore environment
cp .env.backup .env

# Reinstall old way
npm install
cd api && npm install && cd ..

# Start old way
npm run dev & cd api && npm start
```

## 📊 Benefits After Migration

### Before
- ❌ 2 terminal windows needed
- ❌ Manual coordination of services
- ❌ 2 separate installations
- ❌ Complex onboarding

### After
- ✅ 1 terminal window
- ✅ Automatic service coordination
- ✅ 1 unified installation
- ✅ Simple onboarding

## 📚 New Documentation Structure

After migration, read these in order:

1. **QUICKSTART.md** - Get running fast
2. **README.md** - Full documentation
3. **SETUP.md** - Detailed setup
4. **PROJECT_OVERVIEW.md** - Architecture
5. **QUICK_REFERENCE.md** - Daily commands

## 🎯 Next Steps After Migration

1. **Test Everything**
   ```bash
   npm run dev
   # Test all features
   ```

2. **Update Team**
   - Share QUICKSTART.md with team
   - Update team docs
   - Update onboarding process

3. **Update CI/CD**
   - Simplify build scripts
   - Update deployment configs
   - Test deployment pipeline

4. **Clean Up**
   ```bash
   # Remove backup files once verified
   rm package.json.old
   rm api/package.json.old
   rm .env.backup
   ```

## 💡 Tips

- Take it slow - verify each step
- Keep backups until fully tested
- Update one environment at a time (local → staging → production)
- Document any custom changes
- Test thoroughly before production deploy

## 🆘 Need Help?

If you encounter issues during migration:

1. Check [TROUBLESHOOTING.md](README.md#troubleshooting)
2. Review error messages carefully
3. Check environment variables
4. Verify Node/npm versions
5. Try clean install: `npm run clean:all && npm install`

## 📞 Support

- 📧 Email: admin@techvision.com
- 💬 GitHub Issues
- 📚 Documentation: README.md

---

**Migration complete?** Welcome to the monorepo! 🎉

Now you can use: `npm run dev` for everything!
