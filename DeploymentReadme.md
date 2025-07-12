# Deployment Summary & Git Guide

## Summary of All Changes Made

### 1. Fixed Files Modified:
- `vercel.json` - Updated routing configuration for proper SPA handling
- `api/index.js` - Simplified serverless function export
- `server/server.js` - Removed static file serving, added better env var support
- `package.json` - Fixed dev script to run both frontend and backend
- `vite.config.js` - Optimized build configuration
- `src/pages/admin/AdminLogin.jsx` - Fixed logo path for production
- `server/data/seed.js` - Added better error handling for MongoDB connection
- `.env.example` - Updated with all required environment variables

### 2. New Files Created:
- `VERCEL_DEPLOYMENT.md` - Complete deployment guide
- `DEPLOYMENT_SUMMARY.md` - This summary file

## Git Commands to Push Changes

### Step 1: Check Status
```bash
git status
```

### Step 2: Add All Changes
```bash
git add .
```

### Step 3: Commit Changes
```bash
git commit -m "Fix Vercel deployment issues and dev server configuration

- Update vercel.json for proper SPA routing
- Fix serverless function configuration
- Remove static file serving conflicts
- Add support for both MONGO_URI and MONGODB_URI
- Fix dev script to run both frontend and backend
- Update asset paths for production
- Add comprehensive deployment documentation"
```

### Step 4: Push to Repository
```bash
git push origin main
```

## Alternative Git Commands

### If you're on a different branch:
```bash
git push origin your-branch-name
```

### If you need to set upstream:
```bash
git push -u origin main
```

### If you encounter conflicts:
```bash
git pull origin main
# Resolve conflicts if any
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

## Setting Up Automatic Vercel Deployment from GitHub

### Option 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project
5. Configure environment variables:
   - `MONGO_URI` or `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `ADMIN_EMAIL`
   - `NODE_ENV=production`
6. Click "Deploy"

### Option 2: Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel --prod

# Link to existing project (if you already have one)
vercel link
```

### Option 3: GitHub Integration Setup
1. In your Vercel dashboard, go to your project settings
2. Go to "Git" tab
3. Connect your GitHub repository
4. Enable "Automatic deployments from Git"
5. Set production branch to `main`

## Environment Variables Setup in Vercel

### Required Variables:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gluto-db
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@glutointernational.com
NODE_ENV=production
```

### How to Add in Vercel Dashboard:
1. Go to your project in Vercel dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in sidebar
4. Add each variable with its value
5. Make sure to select "Production", "Preview", and "Development" for each

## Testing Your Deployment

### 1. Local Development Test:
```bash
npm run dev
```
- Frontend should be at `http://localhost:5173`
- Backend should be at `http://localhost:5000`
- Test admin login at `http://localhost:5173/admin/login`

### 2. Production Test (after Vercel deployment):
- Visit your Vercel URL
- Test API health: `https://your-app.vercel.app/api/health`
- Test admin access: `https://your-app.vercel.app/admin/login`
- Test product catalog: `https://your-app.vercel.app/catalog`

## Troubleshooting Common Issues

### Issue: "Cannot GET /admin/dashboard"
**Solution**: Clear browser cache and try again. The routing fix should resolve this.

### Issue: Database connection fails
**Solutions**:
- Verify MongoDB Atlas allows connections from 0.0.0.0/0
- Check environment variables are set correctly in Vercel
- Test connection string locally first

### Issue: API routes return 404
**Solution**: Ensure all API routes start with `/api/` and check Vercel function logs.

### Issue: Images not loading
**Solution**: All image paths now use absolute paths starting with `/`

## Seeding Your Production Database

### Option 1: Run seed script with production env vars
```bash
# Set your production MongoDB URI temporarily
MONGO_URI="your-production-uri" npm run seed
```

### Option 2: Create temporary API endpoint
Add this to your server temporarily:
```javascript
app.get('/api/seed', async (req, res) => {
  // Run your seed logic here
  // Remove this endpoint after seeding
});
```

## GitHub CLI Commands (if you have GitHub CLI)

### Install GitHub CLI:
```bash
# macOS
brew install gh

# Windows
winget install GitHub.cli

# Linux
sudo apt install gh
```

### GitHub CLI Commands:
```bash
# Authenticate
gh auth login

# Create repository (if needed)
gh repo create gluto-catalog --public

# Clone repository
gh repo clone your-username/gluto-catalog

# Push changes
git add .
git commit -m "Fix Vercel deployment issues"
git push origin main

# Create pull request (if working on branch)
gh pr create --title "Fix deployment" --body "Fixes Vercel deployment issues"

# View repository in browser
gh repo view --web
```

## Next Steps After Pushing

1. **Push your changes** using the git commands above
2. **Set up Vercel deployment** using one of the methods above
3. **Configure environment variables** in Vercel dashboard
4. **Test your deployment** using the testing steps above
5. **Seed your database** if needed
6. **Monitor Vercel function logs** for any issues

Your application should now work properly on Vercel with all routes functioning correctly!




# Vercel Deployment Guide for GLUTO International

## Issues Fixed

1. **API Routes**: Fixed serverless function configuration
2. **Static File Serving**: Removed Express static serving (Vercel handles this)
3. **Environment Variables**: Added support for both MONGO_URI and MONGODB_URI
4. **Build Configuration**: Optimized Vite build for Vercel
5. **Asset Paths**: Fixed image paths for production

## Step-by-Step Deployment

### 1. Prepare Your Environment Variables

In your Vercel dashboard, add these environment variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gluto-db
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@glutointernational.com
NODE_ENV=production
```

### 2. MongoDB Setup

Make sure your MongoDB Atlas cluster:
- Allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges
- Has a database user with read/write permissions
- Connection string includes the database name

### 3. Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

#### Option B: GitHub Integration
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will auto-deploy on every push

### 4. Seed Your Database (One-time)

After deployment, you can seed your database by running:

```bash
# Locally with production environment variables
NODE_ENV=production MONGO_URI=your-production-uri npm run seed
```

Or create a temporary API endpoint to seed data.

### 5. Test Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **API Health**: Visit `https://your-app.vercel.app/api/health`
3. **Admin Access**: Go to `https://your-app.vercel.app/admin/login`

## Common Issues & Solutions

### Issue: "Cannot GET /admin/dashboard"
**Solution**: This is fixed by the updated `vercel.json` routing configuration.

### Issue: Database connection fails
**Solutions**:
- Verify MONGO_URI is set correctly in Vercel environment variables
- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Ensure database user has proper permissions

### Issue: Images not loading
**Solution**: Use absolute paths starting with `/` for all assets.

### Issue: API routes return 404
**Solution**: Ensure your API routes start with `/api/` and the serverless function is properly configured.

## Environment Variables Checklist

- [ ] MONGO_URI (MongoDB connection string)
- [ ] JWT_SECRET (minimum 32 characters)
- [ ] EMAIL_USER (Gmail address)
- [ ] EMAIL_PASS (Gmail app password, not regular password)
- [ ] ADMIN_EMAIL (where to send notifications)
- [ ] NODE_ENV=production

## File Structure for Vercel

```
project/
├── api/
│   └── index.js          # Serverless function entry point
├── server/
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Express app
├── src/                  # React frontend
├── dist/                 # Built frontend (auto-generated)
├── vercel.json          # Vercel configuration
└── package.json
```

## Testing Locally

To test the serverless setup locally:

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally
vercel dev
```

This will simulate the Vercel environment on your local machine.

## Troubleshooting

### Check Vercel Function Logs
1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Functions" tab
4. Click on any function to see logs

### Check Environment Variables
1. In Vercel dashboard
2. Go to Settings > Environment Variables
3. Ensure all required variables are set

### Database Connection Test
Visit `/api/health` to check if the database connection is working.

## Performance Optimization

The current setup includes:
- Optimized Vite build configuration
- Serverless function timeout set to 30 seconds
- Proper asset chunking for faster loading

Your app should now work properly on Vercel! 🚀