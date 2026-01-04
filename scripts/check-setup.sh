#!/bin/bash

# Setup verification script

echo "================================================"
echo "  Wedding Gallery - Setup Checker"
echo "================================================"

errors=0
warnings=0

# Check Node.js
echo ""
echo "📋 Checking prerequisites..."
if command -v node &> /dev/null; then
    node_version=$(node --version)
    echo "✅ Node.js: $node_version"
else
    echo "❌ Node.js: Not installed"
    ((errors++))
fi

# Check npm
if command -v npm &> /dev/null; then
    npm_version=$(npm --version)
    echo "✅ npm: $npm_version"
else
    echo "❌ npm: Not installed"
    ((errors++))
fi

# Check Docker
if command -v docker &> /dev/null; then
    docker_version=$(docker --version)
    echo "✅ Docker: $docker_version"
else
    echo "⚠️  Docker: Not installed (optional for development)"
    ((warnings++))
fi

# Check Docker Compose
if command -v docker-compose &> /dev/null; then
    compose_version=$(docker-compose --version)
    echo "✅ Docker Compose: $compose_version"
else
    echo "⚠️  Docker Compose: Not installed (optional for development)"
    ((warnings++))
fi

# Check backend .env
echo ""
echo "📋 Checking configuration files..."
if [ -f "./backend/.env" ]; then
    echo "✅ backend/.env: Found"

    # Check required variables
    if grep -q "GOOGLE_CLIENT_ID=" ./backend/.env && \
       grep -q "GOOGLE_CLIENT_SECRET=" ./backend/.env && \
       grep -q "GOOGLE_REFRESH_TOKEN=" ./backend/.env && \
       grep -q "GOOGLE_DRIVE_FOLDER_ID=" ./backend/.env; then
        echo "   ✅ All required variables present"
    else
        echo "   ❌ Missing required variables"
        ((errors++))
    fi
else
    echo "❌ backend/.env: Not found"
    ((errors++))
fi

# Check frontend .env
if [ -f "./frontend/.env" ]; then
    echo "✅ frontend/.env: Found"
else
    echo "⚠️  frontend/.env: Not found (will use defaults)"
    ((warnings++))
fi

# Check backend dependencies
echo ""
echo "📋 Checking dependencies..."
if [ -d "./backend/node_modules" ]; then
    echo "✅ Backend dependencies: Installed"
else
    echo "⚠️  Backend dependencies: Not installed"
    echo "   Run: cd backend && npm install"
    ((warnings++))
fi

# Check frontend dependencies
if [ -d "./frontend/node_modules" ]; then
    echo "✅ Frontend dependencies: Installed"
else
    echo "⚠️  Frontend dependencies: Not installed"
    echo "   Run: cd frontend && npm install"
    ((warnings++))
fi

# Check directories
echo ""
echo "📋 Checking directory structure..."
required_dirs=(
    "backend/src/config"
    "backend/src/controllers"
    "backend/src/middleware"
    "backend/src/routes"
    "backend/src/services"
    "frontend/src/components"
    "frontend/src/hooks"
    "frontend/src/utils"
    "qr-codes"
)

for dir in "${required_dirs[@]}"; do
    if [ -d "./$dir" ]; then
        echo "✅ $dir"
    else
        echo "❌ $dir: Missing"
        ((errors++))
    fi
done

# Summary
echo ""
echo "================================================"
echo "  Summary"
echo "================================================"
if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo "✅ All checks passed! You're ready to go!"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Start with Docker: docker-compose up"
    echo "   2. Or start manually: ./scripts/dev-start.sh"
elif [ $errors -eq 0 ]; then
    echo "⚠️  Setup complete with $warnings warning(s)"
    echo "   You can proceed, but consider fixing warnings"
else
    echo "❌ Setup incomplete: $errors error(s), $warnings warning(s)"
    echo "   Please fix errors before proceeding"
    echo ""
    echo "📚 See SETUP_GUIDE.md for detailed instructions"
fi
echo "================================================"

exit $errors
