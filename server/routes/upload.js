import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { storage as cloudStorage } from '../lib/cloudinary';

const router = express.Router();

const isVercel = process.env.VERCEL === '1';

if (isVercel) {
  // Production - use Cloudinary
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
  // Local development
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