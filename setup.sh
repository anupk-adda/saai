#!/bin/bash

# ServicesAI Setup Script
echo "🚀 Setting up ServicesAI Demo..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Try to fix npm cache issues
echo "🔧 Attempting to fix npm cache issues..."

# Option 1: Try to clean cache with force
if npm cache clean --force 2>/dev/null; then
    echo "✅ npm cache cleaned successfully"
else
    echo "⚠️  npm cache clean failed, trying alternative approach..."
    
    # Option 2: Use a different cache directory
    export npm_config_cache=/tmp/.npm
    echo "📁 Using temporary cache directory: /tmp/.npm"
fi

# Install dependencies
echo "📦 Installing dependencies..."
if npm install; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    echo ""
    echo "🔧 Manual fix options:"
    echo "1. Run: sudo chown -R \$(whoami) ~/.npm"
    echo "2. Or run: npm cache clean --force"
    echo "3. Or use: npm install --cache /tmp/.npm"
    echo ""
    echo "Then run: npm run dev"
    exit 1
fi

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp env.example .env.local
    echo "✅ .env.local created from template"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the demo:"
echo "   npm run dev"
echo ""
echo "🌐 Then open: http://localhost:3000"
echo ""
echo "📚 Demo users available:"
echo "   - Sarah Johnson (Single mother)"
echo "   - Michael Chen (Married father)"
echo "   - Margaret Williams (Retired senior)"
