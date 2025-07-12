import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  // Dummy upload route for production
  router.post('/', (req, res) => {
    res.status(200).json({ url: '/uploads/placeholder.jpg' });
  });
} else {
  // Real upload route for local dev
  const uploadDir = 'uploads/';
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
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
