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