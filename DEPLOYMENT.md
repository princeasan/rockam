# Deployment Guide

Your Rockam Data Services website is now configured for deployment on both Vercel and Netlify. Here's how to deploy:

## Option 1: Vercel Deployment

### Prerequisites
1. Push your code to a GitHub repository
2. Sign up for a free Vercel account at [vercel.com](https://vercel.com)

### Steps
1. **Connect Repository**: Import your GitHub repository in Vercel
2. **Framework Preset**: Select "Other" (Vercel will detect the configuration automatically)
3. **Build Settings**: 
   - Build Command: `vite build` (auto-detected from vercel.json)
   - Output Directory: `dist/public` (auto-detected)
   - Install Command: `npm install` (auto-detected)
4. **Deploy**: Click "Deploy" and your site will be live in minutes

### Features on Vercel
- ✅ Automatic builds on every git push
- ✅ Contact form API working via `/api/contact`
- ✅ Global CDN for fast loading
- ✅ Free SSL certificate
- ✅ Preview deployments for pull requests

## Option 2: Netlify Deployment

### Prerequisites
1. Push your code to a GitHub repository
2. Sign up for a free Netlify account at [netlify.com](https://netlify.com)

### Steps
1. **Connect Repository**: Import your GitHub repository in Netlify
2. **Build Settings**:
   - Build Command: `vite build` (auto-detected from netlify.toml)
   - Publish Directory: `dist/public` (auto-detected)
3. **Deploy**: Click "Deploy site" and your site will be live

### Features on Netlify
- ✅ Automatic builds on every git push
- ✅ Contact form API working via `/.netlify/functions/api/contact`
- ✅ Global CDN for fast loading
- ✅ Free SSL certificate
- ✅ Branch preview deployments

## Configuration Files Created

### Vercel (`vercel.json`)
- Configures serverless functions in `/api` directory
- Sets up proper routing for SPA
- Defines build settings

### Netlify (`netlify.toml`)
- Configures Netlify Functions
- Sets up redirects for API and SPA routing
- Defines build settings

## API Endpoints

Both platforms will provide your contact form API at:
- **Vercel**: `https://your-site.vercel.app/api/contact`
- **Netlify**: `https://your-site.netlify.app/.netlify/functions/api/contact`

## Important Notes

1. **Database**: The current setup uses in-memory storage for the contact form. For production, consider:
   - Vercel: Use Vercel KV, PostgreSQL, or external database
   - Netlify: Use Netlify Functions with external database

2. **Environment Variables**: If you need to add environment variables:
   - Vercel: Add them in the Vercel dashboard under Settings > Environment Variables
   - Netlify: Add them in the Netlify dashboard under Site settings > Environment variables

3. **Custom Domain**: Both platforms support custom domains in their dashboard settings

## Testing Locally

Before deploying, you can test the build locally:

```bash
# Build the project
npm run build

# The built files will be in dist/public/
# You can serve them with any static file server
```

## Troubleshooting

- **Build Fails**: Check that all dependencies are in package.json and committed
- **API Not Working**: Ensure the API functions are properly formatted for each platform
- **Routes Not Working**: The configuration files include SPA fallback routing to index.html