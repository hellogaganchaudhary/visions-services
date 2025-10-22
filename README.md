# Visions Services 🚀

> Next-Gen SaaS Platform with Next.js 15 Full-Stack Architecture

A stunning, modern SaaS platform website built with Next.js 15, featuring 3D effects, smooth animations, comprehensive service showcase, and built-in API routes.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Available Commands](#available-commands)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This is a production-ready full-stack Next.js 15 application featuring:
- **Frontend**: Next.js 15 with React 19, Three.js, Framer Motion
- **API**: Built-in Next.js API routes with JWT authentication
- **Database**: PostgreSQL (Azure Database)

## ✨ Features

- 🎨 Modern, attractive UI with glassmorphism effects
- ✨ Smooth animations using Framer Motion
- 🌊 Floating elements and particle effects
- 📱 Fully responsive design
- 🎯 SEO optimized with metadata and structured data
- 🚀 Fast performance with Next.js 15
- 💫 Interactive 3D elements with Three.js
- 🎉 Special Bharat Utsav Sale banner (Oct 2025 - Mar 2026)
- 🔐 JWT-based authentication for admin panel
- 📊 Admin dashboard for managing leads, contacts, and quotes

## 📄 Pages

- **Home**: Hero section with particle effects, services preview, features, tech stack, and CTA
- **Services**: Complete service catalogue with detailed offerings
- **What We Do**: Company approach and expertise showcase
- **About Us**: Company story, values, and team statistics
- **Contact**: Contact form with validation
- **Get Started**: Lead generation form
- **Request Quote**: Detailed quote request form
- **Admin Dashboard**: Secure admin panel for managing submissions
- **Privacy Policy**: Comprehensive privacy policy

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - React library (v18 for Three.js compatibility)
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **Three.js & React Three Fiber** - 3D graphics
- **Lucide React** - Modern icon library

### Backend
- **Next.js API Routes** - Built-in serverless functions
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

## 📁 Project Structure

```
visions-main/
├── app/                        # Next.js 15 App Router
│   ├── api/                   # API Routes
│   │   ├── api-admin/        # Admin endpoints
│   │   │   ├── login/        # POST /api/api-admin/login
│   │   │   ├── contacts/     # GET /api/api-admin/contacts
│   │   │   ├── leads/        # GET /api/api-admin/leads
│   │   │   ├── quotes/       # GET /api/api-admin/quotes
│   │   │   └── status/       # PATCH /api/api-admin/status
│   │   ├── contact/          # POST /api/contact
│   │   ├── lead/             # POST /api/lead
│   │   └── quote/            # POST /api/quote
│   ├── admin/                # Admin pages
│   │   ├── login/           # Admin authentication
│   │   └── dashboard/       # Admin dashboard
│   ├── services/            # Service pages
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── get-started/         # Lead generation
│   ├── request-quote/       # Quote request
│   ├── what-we-do/          # Company info
│   └── privacy-policy/      # Privacy policy
├── components/              # React components
│   ├── admin/              # Admin components
│   │   ├── ContactsTable.tsx
│   │   ├── LeadsTable.tsx
│   │   ├── QuotesTable.tsx
│   │   └── StatisticsCards.tsx
│   ├── forms/              # Form components
│   │   ├── ContactForm.tsx
│   │   ├── LeadForm.tsx
│   │   └── QuoteRequestForm.tsx
│   ├── home/               # Homepage components
│   │   ├── SalesBanner.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TechStack.tsx
│   │   └── CTASection.tsx
│   └── testimonials/       # Testimonial components
├── lib/                    # Utilities
│   ├── db.ts              # PostgreSQL connection
│   ├── cors.ts            # CORS helpers
│   └── auth.ts            # JWT authentication

│   │   ├── submitQuote.ts│       ├── SalesBanner.tsx

│   │   ├── getContacts.ts│       ├── HeroSection.tsx

│   │   ├── getLeads.ts│       ├── ServicesPreview.tsx

│   │   ├── getQuotes.ts│       ├── FeaturesSection.tsx

│   │   └── updateStatus.ts│       ├── TechStack.tsx

│   ├── database/         # Database utilities & schema│       └── CTASection.tsx

│   │   ├── db.ts└── public/                  # Static assets

│   │   ├── schema.sql

│   │   ├── init-db.js```

│   │   └── insert-admin.js

│   ├── host.json         # Azure Functions config## Customization

│   └── package.json      # API dependencies

├── lib/                   # Shared utilities### Colors

├── data/                  # Static data

├── public/               # Static assetsEdit `tailwind.config.ts` to customize the color scheme.

├── .env.example          # Environment variables template

├── data/                   # Static data
│   └── testimonials.ts     # Testimonials data
├── .env                    # Production environment variables
├── .env.local              # Local environment variables
├── package.json            # Dependencies and scripts
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## ✅ Prerequisites

Before you begin, ensure you have:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL Database**: Azure PostgreSQL or local instance

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Navigate to project directory
cd visions-main

# Install dependencies
npm install
```

### 2. Configure Environment

Create `.env.local` for development:

```bash
# Database Configuration
POSTGRES_HOST=your-postgres-host
POSTGRES_PORT=5432
POSTGRES_DB=your-database
POSTGRES_USER=your-username
POSTGRES_PASSWORD=your-password
POSTGRES_SSL=true

# JWT Secret (generate a secure random string)
JWT_SECRET=your-jwt-secret

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000

# Session Configuration
SESSION_SECRET=your-session-secret
SESSION_MAX_AGE=86400000
```

For production, use `.env` with your production values and HTTPS origins.

### 3. Initialize Database (if needed)

If you need to set up the database schema, you can find the SQL schema in the original `api/database/schema.sql` (if you kept it).

### 4. Start Development Server

```bash
npm run dev
```

This will start Next.js at **http://localhost:3000** with API routes available at `/api/*`

## 📜 Available Commands

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Maintenance
npm run lint         # Run ESLint
npm run clean        # Remove .next and build artifacts
npm run clean:all    # Remove .next, node_modules, and lock file
```

## 🔌 API Routes

### Public Endpoints

- **POST** `/api/contact` - Submit contact form
- **POST** `/api/lead` - Submit lead generation form
- **POST** `/api/quote` - Submit quote request

### Admin Endpoints (Require JWT Authentication)

- **POST** `/api/api-admin/login` - Admin login
- **GET** `/api/api-admin/contacts` - Get all contacts
- **GET** `/api/api-admin/leads` - Get all leads
- **GET** `/api/api-admin/quotes` - Get all quote requests
- **PATCH** `/api/api-admin/status` - Update record status

### Authentication

Admin endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🔐 Environment Variables

### Required Variables (Both .env and .env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_HOST` | PostgreSQL host | `visions.postgres.database.azure.com` |
| `POSTGRES_PORT` | Database port | `5432` |
| `POSTGRES_DB` | Database name | `visions_db` |
| `POSTGRES_USER` | Database user | `visions_admin` |
| `POSTGRES_PASSWORD` | Database password | `your-password` |
| `POSTGRES_SSL` | Enable SSL | `true` |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | `your-random-secret` |
| `ALLOWED_ORIGINS` | CORS origins | `https://visions.services` |
| `SESSION_SECRET` | Session secret | `your-session-secret` |
| `SESSION_MAX_AGE` | Session duration (ms) | `86400000` (24h) |

### Development vs Production

**.env.local** (Development):
```bash
ALLOWED_ORIGINS=http://localhost:3000
```

**.env** (Production):
```bash
ALLOWED_ORIGINS=https://visions.services,https://www.visions.services
```

## 🔄 Development Workflow

### 1. Making Changes

```bash
# Start development server
npm run dev

# Make your changes in:
# - app/ (pages and API routes)
# - components/ (React components)
# - lib/ (utilities)

# Test your changes
# - Frontend: http://localhost:3000
# - API routes: http://localhost:3000/api/*
```

### 2. Testing API Routes

```bash
# Test public endpoints
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'

# Test admin login
curl -X POST http://localhost:3000/api/api-admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'

# Test authenticated endpoint (replace TOKEN with actual JWT)
curl http://localhost:3000/api/api-admin/contacts \
  -H "Authorization: Bearer TOKEN"
```

### 3. Building for Production

```bash
# Build
npm run build

# Test production build locally
npm start
```

## 🌐 Production Deployment

This project is configured for deployment on **AWS Amplify**.

### Pre-Deployment Checklist

- ✅ Update `.env` with production values
- ✅ Set `ALLOWED_ORIGINS` to production domains
- ✅ Verify database credentials
- ✅ Test build locally with `npm run build`
- ✅ Remove any test/development code

### Deployment via GitHub

```bash
# Push to main branch
git add .
git commit -m "Your changes"
git push origin main
```

AWS Amplify will automatically:
1. Detect the push
2. Run `npm run build`
3. Deploy the application
4. API routes will be available at your domain

### Environment Variables in AWS Amplify

Add these in AWS Amplify Console → App Settings → Environment Variables:

- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_SSL`
- `JWT_SECRET`
- `ALLOWED_ORIGINS`
- `SESSION_SECRET`
- `SESSION_MAX_AGE`

## 🐛 Troubleshooting

### Issue: Build fails

**Solution**: Check Next.js 15 compatibility
```bash
npm run build  # Check for errors locally first
```

### Issue: Database connection errors

**Solution**: 
1. Verify credentials in `.env.local`
2. Check PostgreSQL server firewall rules
3. Ensure SSL is properly configured

### Issue: API routes return 404

**Solution**: 
1. Verify files are in `app/api/` directory
2. Check file naming: `route.ts` (not `route.tsx`)
3. Rebuild: `npm run build`

### Issue: CORS errors

**Solution**: 
1. Verify `ALLOWED_ORIGINS` includes your domain
2. Check API routes use `getCorsHeaders()` helper
3. Ensure OPTIONS handler exists for preflight

### Issue: Authentication fails

**Solution**: 
1. Verify `JWT_SECRET` matches between environments
2. Check token format: `Bearer <token>`
3. Ensure token hasn't expired (24h default)

### Issue: Port already in use

**Solution**: Kill the process
```bash
lsof -ti:3000 | xargs kill -9
```

### Issue: Dependencies not installing

**Solution**: Clean and reinstall
```bash
npm run clean:all
npm install
```

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `next.config.mjs` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `.env` | Production environment variables |
| `.env.local` | Local environment variables |

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Content

Update the content in each page component to match your business needs.

### Services

Modify the services data in `components/ServicesNavigation.tsx`.

## 📝 License

This project is private and proprietary.

## 🆘 Support

For support, email: info@visions.services

## ENV
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://visions.services
POSTGRES_HOST=visions.postgres.database.azure.com
POSTGRES_DB=visions
POSTGRES_USER=Gagan
POSTGRES_PASSWORD=Services@1507
POSTGRES_PORT=5432
POSTGRES_SSL=true
JWT_SECRET=e2c6324c8caebd86af2391cdcbe1851877a48eca1d2361f86b07be5ae6f1ece7
ADMIN_SESSION_DURATION=86400
ALLOWED_ORIGINS=https://visions.services,https://www.visions.services
```

---

**Built with ❤️ using Next.js 15, React 18, and TypeScript**


