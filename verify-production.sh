#!/bin/bash

# =============================================================================
# Production Readiness Verification Script
# =============================================================================
# This script checks if your application is ready for production deployment
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  TechVision Production Readiness Check${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Function to check passed
check_passed() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
}

# Function to check failed
check_failed() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
}

# Function to show warning
check_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

# =============================================================================
# 1. CHECK NODE & NPM VERSIONS
# =============================================================================
echo -e "\n${BLUE}[1/10] Checking Node.js and npm versions...${NC}"

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    check_passed "Node.js version $(node -v) meets requirements (>=18)"
else
    check_failed "Node.js version $(node -v) is too old. Need >=18"
fi

NPM_VERSION=$(npm -v | cut -d'.' -f1)
if [ "$NPM_VERSION" -ge 9 ]; then
    check_passed "npm version $(npm -v) meets requirements (>=9)"
else
    check_warning "npm version $(npm -v). Recommended >=9"
fi

# =============================================================================
# 2. CHECK ENVIRONMENT VARIABLES
# =============================================================================
echo -e "\n${BLUE}[2/10] Checking environment variables...${NC}"

if [ -f .env ]; then
    check_passed ".env file exists"
    
    # Check critical variables
    CRITICAL_VARS=("POSTGRES_HOST" "POSTGRES_PASSWORD" "JWT_SECRET" "ALLOWED_ORIGINS")
    
    for var in "${CRITICAL_VARS[@]}"; do
        if grep -q "^${var}=" .env; then
            VALUE=$(grep "^${var}=" .env | cut -d'=' -f2-)
            if [[ "$VALUE" == *"CHANGE"* ]] || [[ "$VALUE" == *"your-"* ]] || [[ "$VALUE" == *"YOUR_"* ]]; then
                check_failed "${var} contains placeholder value - MUST UPDATE for production!"
            elif [ -z "$VALUE" ]; then
                check_failed "${var} is empty - MUST SET for production!"
            else
                check_passed "${var} is set"
            fi
        else
            check_failed "${var} is missing from .env file!"
        fi
    done
    
    # Check JWT_SECRET length
    if grep -q "^JWT_SECRET=" .env; then
        JWT_LENGTH=$(grep "^JWT_SECRET=" .env | cut -d'=' -f2- | wc -c)
        if [ "$JWT_LENGTH" -ge 64 ]; then
            check_passed "JWT_SECRET length is secure (${JWT_LENGTH} characters)"
        else
            check_failed "JWT_SECRET is too short (${JWT_LENGTH} characters). Need minimum 64!"
        fi
    fi
    
    # Check for localhost in ALLOWED_ORIGINS
    if grep "^ALLOWED_ORIGINS=" .env | grep -q "localhost"; then
        check_warning "ALLOWED_ORIGINS contains 'localhost' - remove for production!"
    else
        check_passed "No localhost in ALLOWED_ORIGINS"
    fi
    
else
    check_failed ".env file does not exist! Copy from .env.example"
fi

# =============================================================================
# 3. CHECK DEPENDENCIES
# =============================================================================
echo -e "\n${BLUE}[3/10] Checking dependencies...${NC}"

if [ -d "node_modules" ]; then
    check_passed "node_modules exists"
else
    check_failed "node_modules not found. Run 'npm install'"
fi

if [ -d "api/node_modules" ]; then
    check_passed "API dependencies installed"
else
    check_failed "API dependencies not installed"
fi

# =============================================================================
# 4. CHECK BUILD
# =============================================================================
echo -e "\n${BLUE}[4/10] Checking build artifacts...${NC}"

if [ -d "api/dist" ]; then
    check_passed "API compiled successfully"
else
    check_failed "API not compiled. Run 'npm run build:api'"
fi

# =============================================================================
# 5. CHECK DATABASE SCHEMA
# =============================================================================
echo -e "\n${BLUE}[5/10] Checking database schema...${NC}"

if [ -f "api/database/schema.sql" ]; then
    check_passed "Database schema file exists"
    
    # Check for required tables
    TABLES=("admin_users" "contacts" "leads" "quotes")
    for table in "${TABLES[@]}"; do
        if grep -q "CREATE TABLE.*${table}" api/database/schema.sql; then
            check_passed "Schema includes ${table} table"
        else
            check_warning "Schema might be missing ${table} table"
        fi
    done
else
    check_failed "Database schema file not found!"
fi

# =============================================================================
# 6. CHECK SECURITY FILES
# =============================================================================
echo -e "\n${BLUE}[6/10] Checking security configuration...${NC}"

if [ -f ".gitignore" ]; then
    if grep -q "^\.env$" .gitignore; then
        check_passed ".env is in .gitignore"
    else
        check_failed ".env is NOT in .gitignore - SECURITY RISK!"
    fi
fi

# Check for sensitive data in code
if grep -r "password.*=.*['\"]" --include="*.ts" --include="*.tsx" --include="*.js" app/ components/ api/src/ 2>/dev/null | grep -v "password_hash" | grep -q .; then
    check_warning "Found hardcoded passwords in code - review carefully!"
else
    check_passed "No hardcoded passwords found in code"
fi

# =============================================================================
# 7. CHECK TYPESCRIPT
# =============================================================================
echo -e "\n${BLUE}[7/10] Checking TypeScript configuration...${NC}"

if [ -f "tsconfig.json" ]; then
    check_passed "Root tsconfig.json exists"
else
    check_warning "Root tsconfig.json not found"
fi

if [ -f "api/tsconfig.json" ]; then
    check_passed "API tsconfig.json exists"
else
    check_warning "API tsconfig.json not found"
fi

# =============================================================================
# 8. CHECK NEXT.JS CONFIGURATION
# =============================================================================
echo -e "\n${BLUE}[8/10] Checking Next.js configuration...${NC}"

if [ -f "next.config.mjs" ]; then
    check_passed "next.config.mjs exists"
    
    if grep -q "output.*standalone" next.config.mjs; then
        check_passed "Standalone output configured for production"
    else
        check_warning "Consider adding 'output: standalone' for production"
    fi
else
    check_failed "next.config.mjs not found!"
fi

# =============================================================================
# 9. CHECK DOCUMENTATION
# =============================================================================
echo -e "\n${BLUE}[9/10] Checking documentation...${NC}"

DOCS=("README.md" "SETUP.md" "DEPLOYMENT.md" "PRODUCTION_CHECKLIST.md")
for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        check_passed "${doc} exists"
    else
        check_warning "${doc} not found"
    fi
done

# =============================================================================
# 10. CHECK NPM AUDIT
# =============================================================================
echo -e "\n${BLUE}[10/10] Checking for security vulnerabilities...${NC}"

npm audit --production > /dev/null 2>&1
AUDIT_EXIT=$?

if [ $AUDIT_EXIT -eq 0 ]; then
    check_passed "No security vulnerabilities found"
elif [ $AUDIT_EXIT -eq 1 ]; then
    check_warning "Some vulnerabilities found - review with 'npm audit'"
else
    check_failed "Security audit failed - run 'npm audit' manually"
fi

# =============================================================================
# SUMMARY
# =============================================================================
echo -e "\n${BLUE}================================================${NC}"
echo -e "${BLUE}  Summary${NC}"
echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}✓ Passed:${NC} ${PASSED}"
echo -e "${YELLOW}⚠ Warnings:${NC} ${WARNINGS}"
echo -e "${RED}✗ Failed:${NC} ${FAILED}"
echo ""

if [ $FAILED -eq 0 ]; then
    if [ $WARNINGS -eq 0 ]; then
        echo -e "${GREEN}🎉 All checks passed! Your app is ready for production!${NC}"
        exit 0
    else
        echo -e "${YELLOW}⚠️  Some warnings found. Review them before deployment.${NC}"
        exit 0
    fi
else
    echo -e "${RED}❌ Some critical checks failed. Fix them before deployment!${NC}"
    echo -e "\n${YELLOW}Next steps:${NC}"
    echo "1. Review failed checks above"
    echo "2. Update .env with production values"
    echo "3. Run 'npm install' if dependencies missing"
    echo "4. Run 'npm run build' to test compilation"
    echo "5. Run this script again"
    echo ""
    echo "For help, see: PRODUCTION_CHECKLIST.md"
    exit 1
fi
