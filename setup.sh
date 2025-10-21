#!/bin/bash

# TechVision Monorepo Setup Script
# This script helps initialize the project

set -e

echo "🚀 TechVision Monorepo Setup"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js version
echo "📋 Checking prerequisites..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18 or higher is required${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi
echo -e "${GREEN}✅ Node.js version check passed${NC}"

# Check npm version
NPM_VERSION=$(npm -v | cut -d'.' -f1)
if [ "$NPM_VERSION" -lt 9 ]; then
    echo -e "${YELLOW}⚠️  npm version 9 or higher is recommended${NC}"
    echo "Current version: $(npm -v)"
else
    echo -e "${GREEN}✅ npm version check passed${NC}"
fi

# Check Azure Functions Core Tools
echo ""
echo "🔍 Checking Azure Functions Core Tools..."
if ! command -v func &> /dev/null; then
    echo -e "${YELLOW}⚠️  Azure Functions Core Tools not found${NC}"
    echo "Install it with: npm install -g azure-functions-core-tools@4 --unsafe-perm true"
    echo "Or on macOS: brew install azure-functions-core-tools@4"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✅ Azure Functions Core Tools found${NC}"
fi

# Check for .env file
echo ""
echo "🔐 Checking environment configuration..."
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    read -p "Create .env from .env.example? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp .env.example .env
        echo -e "${GREEN}✅ .env file created${NC}"
        echo -e "${YELLOW}⚠️  Please edit .env with your actual configuration${NC}"
    fi
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

# Clean previous installations
echo ""
read -p "🧹 Clean previous installations? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleaning..."
    rm -rf node_modules api/node_modules .next api/dist
    echo -e "${GREEN}✅ Cleaned${NC}"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env with your database credentials and secrets"
echo "2. Initialize database: cd api/database && node init-db.js"
echo "3. Start development: npm run dev"
echo ""
echo "Available commands:"
echo "  npm run dev       - Start both frontend and API"
echo "  npm run build     - Build for production"
echo "  npm run prod      - Build and start production server"
echo "  npm run clean     - Clean build artifacts"
echo ""
echo "For more info, see README.md"
