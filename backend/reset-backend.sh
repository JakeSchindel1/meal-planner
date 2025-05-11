#!/bin/bash
echo "🧹 Cleaning backend project..."
rm -rf node_modules
rm -rf dist
rm -rf package-lock.json

echo "🔧 Switching to Node 18..."
nvm use 18

echo "📦 Installing dependencies (clean)..."
npm ci

echo "🚀 Starting backend dev server..."
npm run dev

echo "🌟 All done! Backend reset and running."