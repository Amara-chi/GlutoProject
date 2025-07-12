import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Only for server-side
  secure: true
});

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getOptimizedImageUrl = (url, width = 500, height = 500) => {
  if (!url) return '';
  
  // If already a Cloudinary URL
  if (url.includes('res.cloudinary.com')) {
    const parts = url.split('/upload/');
    return `${parts[0]}/upload/w_${width},h_${height},c_fill/${parts[1]}`;
  }
  
  // If local development URL
  if (url.startsWith('/uploads')) {
    return process.env.NEXT_PUBLIC_API_BASE_URL + url;
  }
  
  // Return as-is if it's already a full URL
  return url;
};