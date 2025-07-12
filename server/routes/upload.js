import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Configure Cloudinary (different from frontend config)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  // Cloudinary storage for production
  const cloudStorage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'vercel-products',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
    }
  });

  const upload = multer({ storage: cloudStorage });
  
  router.post('/', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      res.status(200).json({ 
        url: req.file.path,
        publicId: req.file.filename 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
} else {
  // Local filesystem storage for development
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    }
  });

  const upload = multer({ storage });

  router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ url: imageUrl });
  });
}

export default router;