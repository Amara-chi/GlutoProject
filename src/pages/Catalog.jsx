import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown, ChevronRight, Package, TrendingUp, Clock, MapPin, Barcode, Weight, Box } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import BackToTop from '../components/BackToTop';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (id) => {
    setOpenCategory(prev => (prev === id ? null : id));
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSelectedCategory('');
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 500);
  
    return () => clearTimeout(delay);
  }, [selectedCategory, selectedSubcategory, searchTerm, currentPage]);  

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12'
      });
      
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedSubcategory) params.append('subcategory', selectedSubcategory);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
    setCurrentPage(1);
  };  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Product Catalog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover our wide range of quality products across multiple categories.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-72 space-y-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between"
              >
                <span className="font-semibold text-gray-900 dark:text-white">Filters & Categories</span>
                <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
              {/* Search Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Search className="h-5 w-5 mr-2 text-primary-600" />
                  Search Products
                </h3>
                <form onSubmit={handleSearch} className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Categories Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-primary-600" />
                  Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleCategoryChange('');
                      setSelectedSubcategory('');
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                      selectedCategory === '' && selectedSubcategory === ''
                        ? 'bg-primary-600 text-white shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <div key={category._id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <button
                        onClick={() => toggleCategory(category._id)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg 
                                  text-left transition-colors text-gray-700 dark:text-gray-300 
                                  hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                      >
                        <span>{category.name}</span>
                        {openCategory === category._id ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {openCategory === category._id && category.subcategories?.length > 0 && (
                        <div className="ml-6 mt-1 space-y-1 pb-2">
                          {category.subcategories.map((sub, index) => (
                            <button
                              key={index}
                              onClick={() => handleSubcategoryChange(sub)}
                              className={`w-full text-left px-4 py-2 text-sm rounded-md 
                                        transition-all duration-200 ${
                                          selectedSubcategory === sub
                                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing {products.length} product{products.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {products.map((product) => (
                    <ProductCard 
                      key={product._id} 
                      product={product} 
                      onClick={() => handleProductClick(product)}
                      buttonColor="yellow"
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2 mt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex space-x-2">
                      {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = index + 1;
                        } else if (currentPage <= 3) {
                          pageNum = index + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + index;
                        } else {
                          pageNum = currentPage - 2 + index;
                        }
                        
                        if (pageNum > 0 && pageNum <= totalPages) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                currentPage === pageNum
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Empty State */}
                {products.length === 0 && (
                  <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                      No products found
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 mt-2">
                      Try adjusting your search or category filter
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal with Complete Details */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Catalog;
