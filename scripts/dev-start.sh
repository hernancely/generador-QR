#!/bin/bash

# Development startup script
# This script helps start both backend and frontend in development mode

echo "================================================"
echo "  Wedding Gallery - Development Mode"
echo "================================================"

# Check if .env files exist
if [ ! -f "./backend/.env" ]; then
    echo "❌ Error: backend/.env not found"
    echo "   Please copy backend/.env.example to backend/.env and configure it"
    exit 1
fi

if [ ! -f "./frontend/.env" ]; then
    echo "❌ Error: frontend/.env not found"
    echo "   Please copy frontend/.env.example to frontend/.env"
    exit 1
fi

# Check if node_modules exist
if [ ! -d "./backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "./frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Start both services
echo ""
echo "🚀 Starting services..."
echo "   Backend:  http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Run backend and frontend concurrently
trap 'kill 0' SIGINT

cd backend && npm start &
cd frontend && npm start &

wait
