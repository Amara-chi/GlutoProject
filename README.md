# GLUTO International Catalog Application

A fullstack product catalog application for GLUTO International Limited, built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **User Interface**: Browse products, add to cart, place orders
- **Admin Panel**: Manage products, categories, and orders
- **Authentication**: Secure admin login/registration
- **Email Notifications**: Order confirmations via Nodemailer
- **Dark/Light Mode**: Theme toggle
- **Responsive Design**: Mobile-friendly interface
- **Search & Filter**: Product search and category filtering

## 📋 Prerequisites

Before running this application locally, ensure you have the following installed:

### Required Software

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/

### Required Accounts/Services

1. **MongoDB Atlas Account** (for database)
   - Sign up at: https://www.mongodb.com/atlas
   - Create a cluster and get connection string

2. **Gmail Account** (for email notifications)
   - Enable 2-factor authentication
   - Generate app password for Nodemailer

## 🛠️ Local Development Setup

### 1. Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd gluto-catalog

# Or download and extract the ZIP file
```

### 2. Install Dependencies

```bash
# Install all dependencies (both frontend and backend)
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/gluto-db?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@glutointernational.com
```

### 4. MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGO_URI` in `.env`

### 5. Gmail Setup for Email Notifications

1. Enable 2-factor authentication on your Gmail account
2. Generate an app password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this app password in `EMAIL_PASS` in `.env`

### 6. Seed the Database (Optional)

To populate the database with sample data:

```bash
npm run seed
```

### 7. Start the Development Server

```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000 

## 📁 Project Structure

```
gluto-catalog/
├── server/                 # Backend (Node.js/Express)
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── data/              # Seed data
│   └── server.js          # Main server file
├── src/                   # Frontend (React)
│   ├── components/        # Reusable components
│   ├── context/           # React context providers
│   ├── pages/             # Page components
│   │   └── admin/         # Admin panel pages
│   └── main.jsx           # React entry point
├── public/                # Static assets
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run client       # Start frontend only (Vite)
npm run server       # Start backend only (Node.js)

# Database
npm run seed         # Populate database with sample data

# Production
npm run build        # Build frontend for production
npm start            # Start production server
npm run preview      # Preview production build
```

## 📦 Dependencies

### Frontend Dependencies
- **react**: UI library
- **react-dom**: React DOM renderer
- **react-router-dom**: Client-side routing
- **lucide-react**: Icon library
- **tailwindcss**: CSS framework

### Backend Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **nodemailer**: Email sending
- **cors**: Cross-origin resource sharing
- **helmet**: Security middleware
- **morgan**: HTTP request logger
- **express-rate-limit**: Rate limiting
- **dotenv**: Environment variables

### Development Dependencies
- **vite**: Build tool
- **concurrently**: Run multiple commands
- **nodemon**: Auto-restart server
- **eslint**: Code linting
- **autoprefixer**: CSS vendor prefixes
- **postcss**: CSS processing

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Click "Don't have an account? Sign up"
3. Register with your details
4. Login to access the admin dashboard

## 🌐 Deployment

### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Set environment variables in Vercel dashboard

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `MONGO_URI`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`
- `ADMIN_EMAIL`
- `NODE_ENV=production`

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your connection string
   - Ensure IP is whitelisted
   - Verify database user credentials

2. **Email Not Sending**
   - Verify Gmail app password
   - Check 2-factor authentication is enabled
   - Ensure correct email configuration

3. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes: `npx kill-port 5000`

4. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear npm cache: `npm cache clean --force`

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check MongoDB and email service connectivity

## 📄 License

This project is proprietary software for GLUTO International Limited.

## 🤝 Contributing

This is a private project for GLUTO International Limited. Contact the development team for contribution guidelines.