# TechVision Monorepo 🚀# TechVision - Next-Gen SaaS Platform Website



> Next-Gen SaaS Platform with Next.js Frontend & Azure Functions APIA stunning, modern SaaS platform website built with Next.js, featuring 3D effects, smooth animations, and a comprehensive service showcase.



## 📋 Table of Contents## Features



- [Overview](#overview)- 🎨 Modern, attractive UI with glassmorphism effects

- [Project Structure](#project-structure)- ✨ Smooth animations using Framer Motion

- [Prerequisites](#prerequisites)- 🌊 Floating elements and particle effects

- [Quick Start](#quick-start)- 📱 Fully responsive design

- [Available Commands](#available-commands)- 🎯 SEO optimized

- [Environment Variables](#environment-variables)- 🚀 Fast performance with Next.js 14

- [Development Workflow](#development-workflow)- 💫 Interactive 3D elements

- [Production Deployment](#production-deployment)- 🎉 Special Bharat Utsav Sale banner (Oct 2025 - Mar 2026)

- [Troubleshooting](#troubleshooting)

## Pages

## 🎯 Overview

- **Home**: Hero section with particle effects, services preview, features, tech stack, and CTA

This is a production-ready monorepo containing:- **Services**: Complete service catalogue with detailed offerings

- **Frontend**: Next.js 14 with React 18, Three.js, Framer Motion- **What We Do**: Company approach and expertise showcase

- **Backend API**: Azure Functions with TypeScript- **About Us**: Company story, values, and team statistics

- **Database**: PostgreSQL (Azure Database)- **Contact**: Contact form with validation

- **Privacy Policy**: Comprehensive privacy policy

### Features

## Tech Stack

- 🎨 Modern, attractive UI with glassmorphism effects

- ✨ Smooth animations using Framer Motion- Next.js 14

- 🌊 Floating elements and particle effects- TypeScript

- 📱 Fully responsive design- Tailwind CSS

- 🎯 SEO optimized- Framer Motion

- 🚀 Fast performance with Next.js 14- Lucide React Icons

- 💫 Interactive 3D elements- React Icons

- 🔐 Admin dashboard with authentication

- 📊 Lead, contact, and quote management## Getting Started

- 🎉 Special Bharat Utsav Sale banner

### Install Dependencies

## 📁 Project Structure

```bash

```npm install

visions-main/```

├── app/                    # Next.js app directory

│   ├── admin/             # Admin dashboard pages### Run Development Server

│   │   ├── login/        # Admin login

│   │   └── dashboard/    # Admin dashboard```bash

│   ├── services/          # Services pagesnpm run dev

│   ├── about/            # About page```

│   ├── contact/          # Contact page

│   ├── get-started/      # Get started pageOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

│   ├── request-quote/    # Quote request page

│   └── what-we-do/       # What we do page### Build for Production

├── components/            # React components

│   ├── admin/            # Admin-specific components```bash

│   │   ├── ContactsTable.tsxnpm run build

│   │   ├── LeadsTable.tsxnpm start

│   │   ├── QuotesTable.tsx```

│   │   └── StatisticsCards.tsx

│   ├── forms/            # Form components## Project Structure

│   │   ├── ContactForm.tsx

│   │   ├── LeadForm.tsx```

│   │   └── QuoteRequestForm.tsx├── app/

│   ├── home/             # Homepage components│   ├── layout.tsx          # Root layout with navbar and footer

│   │   ├── SalesBanner.tsx│   ├── page.tsx             # Homepage

│   │   ├── HeroSection.tsx│   ├── globals.css          # Global styles

│   │   ├── ServicesPreview.tsx│   ├── services/            # Services page

│   │   ├── FeaturesSection.tsx│   ├── what-we-do/          # What We Do page

│   │   ├── TechStack.tsx│   ├── about/               # About Us page

│   │   └── CTASection.tsx│   ├── contact/             # Contact page

│   └── testimonials/     # Testimonial components│   └── privacy-policy/      # Privacy Policy page

├── api/                   # Azure Functions API (workspace)├── components/

│   ├── src/              # API function handlers│   ├── Navbar.tsx           # Navigation component

│   │   ├── adminLogin.ts│   ├── Footer.tsx           # Footer component

│   │   ├── submitContact.ts│   ├── FloatingElements.tsx # Animated background elements

│   │   ├── submitLead.ts│   └── home/                # Homepage components

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

├── package.json          # Root package.json (monorepo)### Content

└── README.md             # This file

```Update the content in each page component to match your business needs.



## ✅ Prerequisites### Services



Before you begin, ensure you have:Modify the services array in the respective components to showcase your offerings.



- **Node.js**: v18.0.0 or higher## License

- **npm**: v9.0.0 or higher

- **Azure Functions Core Tools**: v4.x (for API development)MIT License - feel free to use this for your projects!

- **PostgreSQL Database**: Azure PostgreSQL or local instance

## Support

### Install Azure Functions Core Tools

For support, email info@techvision.com

```bash
# macOS
brew tap azure/functions
brew install azure-functions-core-tools@4

# Or via npm (global)
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Navigate to project directory
cd visions-main

# Install all dependencies (frontend + API)
npm install
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your actual values
nano .env  # or use your preferred editor
```

**Important**: Update the following in `.env`:
- Database credentials (`POSTGRES_*`)
- JWT secret (`JWT_SECRET`)
- API URLs if different from defaults

### 3. Initialize Database

```bash
# Run database initialization script
cd api/database
node init-db.js
cd ../..
```

### 4. Start Development

```bash
# Start both Next.js and Azure Functions API
npm run dev
```

This will start:
- **Next.js Frontend**: http://localhost:3000
- **Azure Functions API**: http://localhost:7071

## 📜 Available Commands

### Development Commands

```bash
# Start both frontend and API in development mode
npm run dev

# Start only Next.js
npm run dev:next

# Start only API
npm run dev:api
```

### Build Commands

```bash
# Build both frontend and API
npm run build

# Build only Next.js
npm run build:next

# Build only API
npm run build:api
```

### Production Commands

```bash
# Build and start in production mode
npm run prod

# Start Next.js in production mode
npm run start:next

# Start API in production mode
npm run start:api
```

### Utility Commands

```bash
# Run linting
npm run lint

# Clean build artifacts
npm run clean

# Clean everything including node_modules
npm run clean:all

# Setup project from scratch
npm run setup

# Run tests (when available)
npm run test
```

### Workspace-Specific Commands

```bash
# Run command in API workspace only
npm run build --workspace=api

# Install dependency in API workspace
npm install <package-name> --workspace=api
```

## 🔐 Environment Variables

### Frontend Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API base URL | `http://localhost:7071/api` |
| `NEXT_PUBLIC_SITE_URL` | Site URL | `http://localhost:3000` |

### Backend Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `POSTGRES_HOST` | PostgreSQL host | ✅ |
| `POSTGRES_DATABASE` | Database name | ✅ |
| `POSTGRES_USER` | Database user | ✅ |
| `POSTGRES_PASSWORD` | Database password | ✅ |
| `POSTGRES_PORT` | Database port (default: 5432) | ✅ |
| `POSTGRES_SSL` | Enable SSL (true/false) | ✅ |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | ✅ |
| `ALLOWED_ORIGINS` | CORS origins (comma-separated) | ✅ |
| `ADMIN_SESSION_DURATION` | Session duration in seconds | ❌ |

## 🔄 Development Workflow

### 1. Feature Development

```bash
# Create a new branch
git checkout -b feature/your-feature

# Start development servers
npm run dev

# Make your changes
# Frontend: app/, components/, lib/
# Backend: api/src/

# Test your changes locally
# Frontend: http://localhost:3000
# API: http://localhost:7071/api/<function-name>
```

### 2. Adding Dependencies

```bash
# Add frontend dependency
npm install <package-name>

# Add API dependency
npm install <package-name> --workspace=api

# Add dev dependency to root
npm install -D <package-name>
```

### 3. Database Changes

```bash
# Update schema
nano api/database/schema.sql

# Run migrations
cd api/database
node init-db.js
```

### 4. Creating New API Functions

```bash
# Create new function file in api/src/
# Example: api/src/yourFunction.ts

# Azure Functions will auto-detect and register it
```

## 🚀 Production Deployment

### Azure Static Web Apps + Azure Functions

```bash
# Build for production
npm run build

# Frontend is in .next/ directory
# API is in api/dist/ directory
```

### Environment Variables Setup

**Azure Portal**:
1. Go to your Static Web App
2. Settings → Configuration
3. Add all variables from `.env.example`

### Deployment Steps

1. **Automatic Deployment via GitHub Actions**:
   ```bash
   git push origin main
   ```

2. **Manual Deployment using Azure CLI**:
   ```bash
   # Build production assets
   npm run build

   # Deploy
   az staticwebapp deploy \
     --app-name your-app-name \
     --resource-group your-resource-group \
     --output-location .next
   ```

## 🐛 Troubleshooting

### Issue: API not starting

**Solution**: Ensure Azure Functions Core Tools is installed
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

### Issue: Database connection errors

**Solution**: 
1. Verify credentials in `.env`
2. Check PostgreSQL server firewall rules
3. Ensure SSL is properly configured

```bash
# Test database connection
cd api/database
node ../test-db-connection.js
```

### Issue: Port already in use

**Solution**: Kill processes using the ports
```bash
# Kill process on port 3000 (Next.js)
lsof -ti:3000 | xargs kill -9

# Kill process on port 7071 (Azure Functions)
lsof -ti:7071 | xargs kill -9
```

### Issue: Dependencies not installing

**Solution**: Clean and reinstall
```bash
npm run clean:all
npm install
```

### Issue: TypeScript errors in API

**Solution**: Rebuild API
```bash
npm run clean:api
npm run build:api
```

### Issue: "Cannot find module" errors

**Solution**: Ensure API is built before starting
```bash
npm run build:api
npm run dev
```

## 📦 Monorepo Benefits

- ✅ **Single Command**: Start everything with `npm run dev`
- ✅ **Shared Dependencies**: Common packages installed once
- ✅ **Consistent Versioning**: All packages version-synced
- ✅ **Simplified CI/CD**: One build pipeline
- ✅ **Better DX**: Everything in one place
- ✅ **Easier Maintenance**: Update dependencies once

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Root monorepo configuration |
| `api/package.json` | API workspace configuration |
| `tsconfig.json` | Next.js TypeScript config |
| `api/tsconfig.json` | API TypeScript config |
| `next.config.mjs` | Next.js configuration |
| `api/host.json` | Azure Functions configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `.env.example` | Environment variables template |

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Content

Update the content in each page component to match your business needs.

### Services

Modify the services data to showcase your offerings.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 🆘 Support

For support, email: admin@techvision.com

---

**Built with ❤️ using Next.js, Azure Functions, and TypeScript**
