#!/bin/bash

# Simple Deployment Script for Generative Resume

echo "🚀 Starting deployment..."

# Clean up system files
echo "🧹 Cleaning up system files..."
find . -name ".DS_Store" -delete 2>/dev/null || true
find . -name "._*" -delete 2>/dev/null || true
find . -name "Thumbs.db" -delete 2>/dev/null || true

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Add .nojekyll file
touch out/.nojekyll

echo "✅ Build completed successfully!"
echo "📁 Built files are in the 'out' directory"
echo ""
echo "📋 To deploy manually:"
echo "1. Copy all files from 'out/' to your website's 'generative-resume/' folder"
echo "2. Commit and push to your GitHub Pages repository"
echo ""
echo "🌐 Your resume will be available at:"
echo "   https://myfirstnamelastname.me/generative-resume"
