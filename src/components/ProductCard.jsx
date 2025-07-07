import React from 'react';
import { ShoppingCart, Package, Clock, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-700 rounded-full px-2 py-1 text-xs font-semibold">
          {product.category?.name}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Availability Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600 dark:text-gray-400">Availability</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {product.availability}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                product.availability > 70 ? 'bg-green-500' : 
                product.availability > 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${product.availability}%` }}
            ></div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-2 mb-4">
          {product.weight && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Package className="h-4 w-4 mr-2" />
              {product.weight}
            </div>
          )}
          {product.leadTime && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-2" />
              {product.leadTime}
            </div>
          )}
          {product.shelfLife && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              {product.shelfLife}
            </div>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;