export const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath.startsWith('http')) return imagePath;
  
    return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/vercel-products/${imagePath}`;
  };
  