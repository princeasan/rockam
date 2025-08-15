#!/bin/bash

# Build script for Vercel/Netlify deployment
echo "Building for deployment..."

# Build the frontend
npm run build

echo "Build completed successfully!"
echo "Output directory: dist/public"
echo ""
echo "To deploy:"
echo "- For Vercel: Connect your GitHub repo to Vercel"
echo "- For Netlify: Connect your GitHub repo to Netlify"
echo "- Both platforms will automatically detect the configuration files"