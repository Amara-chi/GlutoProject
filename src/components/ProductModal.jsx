import React, { useEffect } from 'react';
import { ShoppingCart, X, Package, Weight, Clock, MapPin, Barcode, Box, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getOptimizedImageUrl } from '../utils/cloudinary';

const ProductModal = ({ product, onClose, buttonColor = 'blue' }) => {
  const { addToCart } = useCart();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const getAvailabilityColor = (availability) => {
    if (availability >= 70) return 'bg-green-500';
    if (availability >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!product) return null;

  const buttonColorClass = buttonColor === 'yellow' 
    ? 'bg-yellow-500 hover:bg-yellow-600' 
    : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-5xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-2xl rounded-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* Product Image Section */}
            <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 md:p-8 flex items-center justify-center">
              <img
                src={getOptimizedImageUrl(product.image, 600, 600)}
                alt={product.name}
                className="max-w-full h-auto rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-300 object-cover"
              />
            </div>

            {/* Product Info Section */}
            <div className="lg:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[80vh]">
              {/* Category Badges */}
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                  {product.category?.name || 'N/A'}
                </span>
                {product.subcategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {product.subcategory}
                  </span>
                )}
                {product.availability !== undefined && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${getAvailabilityColor(product.availability)}`}>
                    {product.availability}% Available
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </span>
                {product.availability && (
                  <div className="mt-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      In Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Product Details Section - EXACTLY as specified */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-primary-600" />
                  Product Details
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
                  {/* Category */}
                  <div className="flex items-start">
                    <Package className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 block">Category</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {product.category?.name || 'N/A'}
                        {product.subcategory && (
                          <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">→ {product.subcategory}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="flex items-start">
                    <Weight className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 block">Weight</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {product.weight || '—'}
                      </span>
                    </div>
                  </div>

                  {/* Lead Time */}
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 block">Lead Time</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {product.leadTime || '—'}
                      </span>
                    </div>
                  </div>

                  {/* Shelf Life */}
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 block">Shelf Life</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {product.shelfLife || '—'}
                      </span>
                    </div>
                  </div>

                  {/* Packaging */}
                  <div className="flex items-start">
                    <Box className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 block">Packaging</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {product.packaging && typeof product.packaging === 'object' && 
                         (product.packaging.pieces || product.packaging.cartons || product.packaging.pallets) ? (
                          <div className="flex flex-wrap gap-1">
                            {product.packaging.pieces && <span>{product.packaging.pieces} pcs</span>}
                            {product.packaging.pieces && product.packaging.cartons && <span>•</span>}
                            {product.packaging.cartons && <span>{product.packaging.cartons} ctn</span>}
                            {product.packaging.cartons && product.packaging.pallets && <span>•</span>}
                            {product.packaging.pallets && <span>{product.packaging.pallets} plt</span>}
                          </div>
                        ) : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Origin */}
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 block">Origin</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {product.origin || '—'}
                      </span>
                    </div>
                  </div>

                  {/* Product EAN */}
                  <div className="flex items-start">
                    <Barcode className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 block">Product EAN</span>
                      <span className="text-gray-900 dark:text-white font-mono text-sm">
                        {product.ean || '—'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 ${buttonColorClass} text-white py-3 rounded-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-sm hover:shadow-md`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
