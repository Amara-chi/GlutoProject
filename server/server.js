import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import orderRoutes from './routes/orders.js';
import uploadRoutes from './routes/upload.js';
import contactRoutes from './routes/contact.js';

// Load environment variables
dotenv.config();

// Configure __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ======================
// Middleware
// ======================
app.use(helmet());
app.use(cors());
app.use(morgan('dev')); // Use 'dev' format for better readability in logs

// Rate limiting (applied only to API routes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ======================
// Database Connection
// ======================
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gluto-catalog';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // Continue running without DB connection (API will still work, but DB features will fail)
  }
};
connectDB();

// ======================
// API Routes
// ======================
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ======================
// Health Check Endpoint
// ======================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// ======================
// Static File Serving (Production Only)
// ======================
if (process.env.NODE_ENV === 'production') {
  // Adjusted path for Vercel deployment
  const staticPath = path.join(__dirname, '../../dist');
  app.use(express.static(staticPath));
  
  // Handle SPA routing (send all other requests to index.html)
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// ======================
// Error Handling
// ======================
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ======================
// Server Start
// ======================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log('\n=== Server Started ===');
//   console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`🔗 Base URL: http://localhost:${PORT}`);
//   console.log(`🗄️  MongoDB: ${process.env.MONGO_URI ? 'Configured' : 'Not configured'}`);
//   console.log(`🛡️  JWT Secret: ${process.env.JWT_SECRET ? 'Set' : 'Not set'}\n`);
// });

// Export for Vercel serverless function
export default app;