#!/bin/bash

# =============================================================================
# Pre-Deployment Script for TechVision
# =============================================================================
# Run this script before deploying to production
# It will perform all necessary checks and preparations
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "=============================================="
echo "  TechVision Pre-Deployment Script"
echo "=============================================="
echo -e "${NC}"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}ERROR: .env file not found!${NC}"
    echo "Please create .env file with production values"
    echo "Copy from: .env.production.template"
    exit 1
fi

echo -e "${YELLOW}Step 1: Cleaning previous builds...${NC}"
npm run clean
echo -e "${GREEN}✓ Cleaned${NC}\n"

echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}\n"

echo -e "${YELLOW}Step 3: Running production verification...${NC}"
./verify-production.sh
VERIFY_EXIT=$?

if [ $VERIFY_EXIT -ne 0 ]; then
    echo -e "${RED}Production verification failed. Please fix issues before deploying.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Verification passed${NC}\n"

echo -e "${YELLOW}Step 4: Building for production...${NC}"
npm run build
echo -e "${GREEN}✓ Build successful${NC}\n"

echo -e "${YELLOW}Step 5: Running security audit...${NC}"
npm audit --production
echo -e "${GREEN}✓ Security audit complete${NC}\n"

echo -e "${GREEN}"
echo "=============================================="
echo "  ✓ Pre-deployment checks complete!"
echo "=============================================="
echo -e "${NC}"
echo ""
echo "Next steps for deployment:"
echo "1. Review PRODUCTION_CHECKLIST.md"
echo "2. Update environment variables in Azure Portal"
echo "3. Initialize production database"
echo "4. Deploy using: git push origin main"
echo ""
echo "Need help? See: DEPLOYMENT.md"
