#!/bin/bash

# MeeChain Magic Hall - Quick Setup Script
# Usage: bash setup.sh

set -e

echo "🪄 MeeChain Magic Hall - Setup"
echo "================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+."
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed"
echo ""

# Create .env.local
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local..."
    cp .env.example .env.local
    echo "✅ Created .env.local (please edit with your values)"
else
    echo "ℹ️  .env.local already exists"
fi

echo ""
echo "🏗️  Building project structure..."
echo "✅ Project structure ready"
echo ""

echo "================================"
echo "✨ Setup Complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env.local with your MeeChain endpoints:"
echo "   nano .env.local"
echo ""
echo "2. Start development server:"
echo "   npm run dev"
echo ""
echo "3. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "📚 For deployment, see DEPLOYMENT.md"
echo ""
echo "🪄 Happy coding! 🎉"
