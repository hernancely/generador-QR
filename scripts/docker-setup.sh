#!/bin/bash

# Docker setup and startup script

echo "================================================"
echo "  Wedding Gallery - Docker Setup"
echo "================================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed"
    echo "   Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: Docker Compose is not installed"
    echo "   Please install Docker Compose"
    exit 1
fi

# Check if .env files exist
if [ ! -f "./backend/.env" ]; then
    echo "❌ Error: backend/.env not found"
    echo "   Please copy backend/.env.example to backend/.env and configure it"
    exit 1
fi

if [ ! -f "./frontend/.env" ]; then
    echo "⚠️  Warning: frontend/.env not found"
    echo "   Creating from .env.example..."
    cp ./frontend/.env.example ./frontend/.env
fi

echo ""
echo "🐳 Docker Configuration:"
docker --version
docker-compose --version
echo ""

# Ask if user wants to rebuild
read -p "Do you want to rebuild images? (y/N): " rebuild
if [[ $rebuild =~ ^[Yy]$ ]]; then
    echo "🔨 Building Docker images..."
    docker-compose build --no-cache
else
    echo "🔨 Building Docker images (using cache)..."
    docker-compose build
fi

echo ""
echo "🚀 Starting containers..."
docker-compose up -d

echo ""
echo "✅ Containers started successfully!"
echo ""
echo "📊 Container status:"
docker-compose ps
echo ""
echo "🌐 Services available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📝 View logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Stop containers:"
echo "   docker-compose down"
echo ""
