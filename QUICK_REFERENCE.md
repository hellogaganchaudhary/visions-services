# TechVision Quick Reference Card 🚀

> Keep this handy for daily development!

## 🎯 Most Used Commands

```bash
# Start everything (frontend + API)
npm run dev

# Build for production
npm run build

# Clean and restart
npm run clean && npm install && npm run dev
```

## 📂 Project Structure (Simplified)

```
visions-main/
├── app/           → Pages & routes
├── components/    → React components
├── api/src/       → API functions
└── api/database/  → DB scripts
```

## 🔥 Quick Start (Brand New Setup)

```bash
npm install
cp .env.example .env
# Edit .env with your credentials
cd api/database && node init-db.js && cd ../..
npm run dev
```

## 🌐 Local URLs

- **Frontend**: http://localhost:3000
- **API**: http://localhost:7071
- **Admin**: http://localhost:3000/admin/login

## 📝 Essential Files to Edit

### Frontend
```
app/page.tsx              # Homepage
components/Navbar.tsx     # Navigation
app/services/page.tsx     # Services
```

### Backend
```
api/src/submitContact.ts  # Contact form
api/src/adminLogin.ts     # Admin auth
```

### Config
```
.env                      # Environment variables
next.config.mjs           # Next.js config
tailwind.config.ts        # Styling
```

## 🔐 Environment Variables (Required)

```bash
POSTGRES_HOST=your-db-host
POSTGRES_DATABASE=visions
POSTGRES_USER=your-user
POSTGRES_PASSWORD=your-password
JWT_SECRET=your-secret-32-chars-min
```

## 🐛 Common Issues & Quick Fixes

### Port in use
```bash
lsof -ti:3000 | xargs kill -9  # Kill Next.js
lsof -ti:7071 | xargs kill -9  # Kill API
```

### Database connection error
```bash
cd api && node test-db-connection.js
```

### Build errors
```bash
npm run clean:api && npm run build:api
```

### Module not found
```bash
npm install
```

## 📚 Documentation Quick Links

| Need | Read |
|------|------|
| Overview | README.md |
| Setup help | SETUP.md |
| 5-min start | QUICKSTART.md |
| Deploy | DEPLOYMENT.md |
| Contribute | CONTRIBUTING.md |
| Architecture | PROJECT_OVERVIEW.md |

## 🎨 Key Directories

```
app/                    # Next.js pages
  ├── admin/           # Admin dashboard
  ├── services/        # Services pages
  └── contact/         # Contact page

components/            # React components
  ├── admin/          # Admin components
  ├── forms/          # Forms
  └── home/           # Homepage components

api/                   # Backend
  ├── src/            # API functions
  └── database/       # DB utilities
```

## 🚀 Deployment Checklist

- [ ] Environment variables configured in Azure
- [ ] Database initialized
- [ ] Build succeeds locally (`npm run build`)
- [ ] Push to main branch
- [ ] GitHub Actions runs successfully
- [ ] Test production URL

## 🔄 Daily Workflow

```bash
# Morning
git pull origin main
npm install  # If package.json changed
npm run dev

# Working
# Make changes...
# Test at localhost:3000

# Before commit
npm run lint
npm run build

# Commit
git add .
git commit -m "feat: your message"
git push origin your-branch
```

## 📊 npm Scripts Reference

| Script | Purpose |
|--------|---------|
| `dev` | Start development (both) |
| `dev:next` | Start frontend only |
| `dev:api` | Start API only |
| `build` | Build everything |
| `build:next` | Build frontend |
| `build:api` | Build API |
| `start` | Start production |
| `prod` | Build & start |
| `clean` | Clean builds |
| `clean:all` | Clean everything |
| `lint` | Run linter |

## 🔑 API Endpoints

### Public
```
POST /api/submitContact
POST /api/submitLead
POST /api/submitQuote
```

### Admin (requires JWT)
```
POST /api/adminLogin
GET  /api/getContacts
GET  /api/getLeads
GET  /api/getQuotes
POST /api/updateStatus
```

## 🛠️ Useful Commands

```bash
# Check Node version
node -v  # Should be 18+

# Check npm version
npm -v   # Should be 9+

# Check Azure Functions
func --version  # Should be 4.x

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Test API locally
curl http://localhost:7071/api/submitContact -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

## 📞 Help & Support

- 📖 Full Docs: See README.md
- 🐛 Issues: Check SETUP.md troubleshooting
- 📧 Contact: admin@techvision.com
- 💬 GitHub: Open an issue

## ⚡ Performance Tips

- Use `npm run dev` only in development
- Use `npm run prod` for production testing
- Clear `.next/` if builds are stale
- Restart if hot-reload stops working

## 🎯 Best Practices

1. ✅ Always pull before starting work
2. ✅ Test locally before pushing
3. ✅ Run `npm run lint` before commit
4. ✅ Keep .env updated but never commit it
5. ✅ Use feature branches
6. ✅ Write descriptive commit messages

## 📦 Package Management

```bash
# Add frontend dependency
npm install package-name

# Add API dependency
npm install package-name --workspace=api

# Update all dependencies
npm update

# Check for vulnerabilities
npm audit
```

## 🎉 That's It!

**Main command to remember:**
```bash
npm run dev
```

**Everything else is in the docs!** 📚

---

**Keep this card handy!** 📌
