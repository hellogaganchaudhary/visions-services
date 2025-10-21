# Quick Start Guide ⚡

Get TechVision up and running in 5 minutes!

## Prerequisites Check

```bash
# Check Node.js version (must be 18+)
node -v

# Check npm version (must be 9+)
npm -v

# Check Azure Functions Core Tools
func --version
```

If Azure Functions Core Tools is missing:
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

## 3-Step Setup

### 1️⃣ Install Dependencies

```bash
npm install
```

This installs everything you need (frontend + API).

### 2️⃣ Configure Environment

```bash
# Copy template
cp .env.example .env

# Edit with your database credentials
nano .env
```

**Minimum required:**
- `POSTGRES_HOST`
- `POSTGRES_DATABASE`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `JWT_SECRET`

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3️⃣ Initialize Database

```bash
cd api/database
node init-db.js
cd ../..
```

## 🎉 Start Developing!

```bash
npm run dev
```

This starts:
- ✅ Next.js Frontend → http://localhost:3000
- ✅ Azure Functions API → http://localhost:7071

## Test It Out

1. **Visit the homepage**: http://localhost:3000
2. **Try a form**: http://localhost:3000/contact
3. **Admin login**: http://localhost:3000/admin/login

## One-Command Deploy

```bash
# Build everything
npm run build

# Start production server
npm start
```

## Essential Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start development (frontend + API) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run clean` | Clean build artifacts |
| `npm run lint` | Run linting |

## Project Structure

```
├── app/              → Next.js pages
├── components/       → React components
├── api/              → Backend API functions
│   ├── src/         → API handlers
│   └── database/    → DB schema & scripts
└── .env             → Your configuration
```

## Need Help?

- 📖 Full docs: See [README.md](README.md)
- 🔧 Setup issues: See [SETUP.md](SETUP.md)
- 🐛 Troubleshooting: See [README.md#troubleshooting](README.md#troubleshooting)

## Common Issues

**Port already in use?**
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:7071 | xargs kill -9
```

**Database connection error?**
- Check `.env` credentials
- Verify PostgreSQL is running
- Check firewall rules

**API not building?**
```bash
npm run clean:api
npm run build:api
```

---

That's it! You're ready to build amazing things with TechVision! 🚀
