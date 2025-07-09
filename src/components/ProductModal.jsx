import React from 'react';
import { X } from 'lucide-react';

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-lg text-primary-600 font-semibold mb-4">
                  ${product.price}
                </p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {product.description || 'No description available.'}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Details:</h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Category: {product.category?.name || 'N/A'}</li>
                    <li>• Stock: {product.stock || 'N/A'}</li>
                    <li>• SKU: {product.sku || 'N/A'}</li>
                  </ul>
                </div>
                
                <button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Add to Cart
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