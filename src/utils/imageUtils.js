export const getImageUrl = (imagePath) => {
    // If empty or already a full URL (Cloudinary)
    if (!imagePath || imagePath.startsWith('http')) return imagePath;
    
    // If it's a local path (shouldn't happen in production)
    return `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/vercel-products/${imagePath}`;
  };