import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Shield, Globe, Clock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Package className="h-8 w-8 text-blue-600" />,
      title: 'Wide Product Range',
      description: 'From agri-fresh products to processed foods, we offer comprehensive catalog of quality items.'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Quality Assurance',
      description: 'All products undergo strict quality control to ensure they meet international standards.'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: 'Global Distribution',
      description: 'Reliable worldwide shipping and distribution network for seamless delivery.'
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: 'Timely Delivery',
      description: 'Efficient logistics and supply chain management for on-time delivery.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to GLUTO International
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your trusted partner in global food distribution and agricultural products. 
              Connecting quality producers with international markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/catalog"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                View Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/contact"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose GLUTO International?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We are committed to providing exceptional service and quality products to our global partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Product Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our diverse range of products across multiple categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Agri Fresh Products',
                description: 'Rice, beans, fruits, seeds, and nuts',
                image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg'
              },
              {
                title: 'Food & Beverage',
                description: 'Snacks, drinks, and toiletries',
                image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
              },
              {
                title: 'Meat & Poultry',
                description: 'Eggs, fish, and beef products',
                image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'
              },
              {
                title: 'Processed African Foods',
                description: 'Stock fish, egusi, and poundo yam',
                image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
              },
              {
                title: 'Non-Food Products',
                description: 'Organic soaps, creams, and syrups',
                image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg'
              },
              {
                title: 'Agro-nutrition',
                description: 'Fertilizers and bio-stimulants',
                image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg'
              }
            ].map((category, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/catalog"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Order?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Browse our catalog and place your order today. Our team is ready to assist you with all your product needs.
          </p>
          <Link 
            to="/catalog"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center"
          >
            Browse Catalog
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;