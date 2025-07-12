import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, onClose, buttonColor = 'blue' }) => {
   const { addToCart } = useCart();
  
    const handleAddToCart = (e) => {
      e.stopPropagation();
      addToCart(product);
    };
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
                    <li className='flex gap-1'>• Weight: {product.weight && (
                                <div className=" text-md text-gray-600 dark:text-gray-400">
                                  {product.weight}
                                </div>
                              )}</li>
                    <li className='flex gap-1'>• Leadtime: {product.leadTime && (
                                <div className=" text-md text-gray-600 dark:text-gray-400">
                                  {product.leadTime}
                                </div>
                              )}</li>
                    <li className='flex gap-1'>• Shelflife: {product.shelfLife && (
                                <div className=" text-md text-gray-600 dark:text-gray-400">
                                  {product.shelfLife}
                                </div>
                              )}</li>
                    <li className="flex gap-1 ">
                      • Packaging:
                      {product.packaging &&
                        typeof product.packaging === 'object' &&
                        (product.packaging.pieces || product.packaging.cartons || product.packaging.pallets) ? (
                          <div className="text-md text-gray-600 dark:text-gray-400">
                            {product.packaging.pieces || 0} pcs / {product.packaging.cartons || 0} cartons / {product.packaging.pallets || 0} pallets
                          </div>
                      ) : (
                          <div className="text-md text-gray-400 italic">N/A</div>
                      )}
                    </li>
                    <li className='flex gap-1'>• Origin: {product.origin && (
                                <div className=" text-md text-gray-600 dark:text-gray-400">
                                  {product.origin}
                                </div>
                              )}</li>
                    <li className='flex gap-1'>• Product Ean: {product.ean && (
                                <div className=" text-md text-gray-600 dark:text-gray-400">
                                  {product.ean}
                                </div>
                              )}</li>
                  </ul>
                </div>
                
                <button
                            onClick={handleAddToCart}
                            className={`${
                              buttonColor === 'yellow' 
                                ? 'bg-yellow-500 hover:bg-yellow-600' 
                                : 'bg-blue-600 hover:bg-blue-700'
                            } text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200`}
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Add to Cart</span>
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