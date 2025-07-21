import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Shield, Globe, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import BackToTop from '../components/BackToTop';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Premium Agricultural Products",
      subtitle: "Sourcing the finest quality produce from trusted farmers worldwide",
       image: "/assets/freshly-ripe-vegetables-wooden-crate.jpg",
    },
    {
      title: "Global Distribution Network",
      subtitle: "Efficient logistics for seamless international deliveries",
       image: "/assets/biologist-forest.jpg",
    },
    {
      title: "Sustainable Farming Partners",
      subtitle: "Committed to ethical and environmentally friendly practices",
     image: "/assets/warehouse-employees.jpg"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };
  const features = [
    {
      icon: <Package className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
      title: 'Wide Product Range',
      description: 'From agri-fresh products to processed foods, we offer comprehensive catalog of quality items.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
      title: 'Quality Assurance',
      description: 'All products undergo strict quality control to ensure they meet international standards.'
    },
    {
      icon: <Globe className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
      title: 'Global Distribution',
      description: 'Reliable worldwide shipping and distribution network for seamless delivery.'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-600 dark:text-primary-400" />,
      title: 'Timely Delivery',
      description: 'Efficient logistics and supply chain management for on-time delivery.'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Procurement Manager, UK",
      content: "GLUTO has been our trusted supplier for 5 years. Their consistent quality and reliable delivery set them apart.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Restaurant Owner, Canada",
      content: "The freshness of their produce is unmatched. Our customers always compliment the quality of ingredients.",
      rating: 4
    },
    {
      name: "Amina Diallo",
      role: "Food Distributor, Senegal",
      content: "Their African food products help us serve our community with authentic tastes from home. Excellent service.",
      rating: 5
    }
  ];

    return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative h-screen bg-gray-900 text-white overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 ease-in-out"
              style={{ 
                backgroundImage: `url('${slide.image}')`,
                transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)'
              }}
            ></div>
          </div>
        ))}
        
        {/* Slide Content */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            key={currentSlide} // This ensures animation re-triggers on slide change
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link 
                to="/catalog"
                className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                View Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors z-30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors z-30"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'} hover:bg-white/80`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About Gluto International Limited
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2019, Gluto International Limited has grown from a small regional supplier to a global leader in agricultural product distribution. Our mission is to bridge the gap between quality producers and international markets.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                With warehouses in 3 continents and partnerships with over 200 farms worldwide, we ensure that our customers receive the freshest products with the shortest possible supply chain.
              </p>
              <Link 
                to="/information"
                className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
              >
                Learn more about us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-primary-100 dark:bg-gray-700 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-2">6+</h3>
                <p className="text-gray-600 dark:text-gray-300">Years in Business</p>
              </motion.div>
              <motion.div 
                className="bg-primary-100 dark:bg-gray-700 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-2">50+</h3>
                <p className="text-gray-600 dark:text-gray-300">Countries Served</p>
              </motion.div>
              <motion.div 
                className="bg-primary-100 dark:bg-gray-700 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-2">200+</h3>
                <p className="text-gray-600 dark:text-gray-300">Farm Partnerships</p>
              </motion.div>
              <motion.div 
                className="bg-primary-100 dark:bg-gray-700 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-2">24/7</h3>
                <p className="text-gray-600 dark:text-gray-300">Customer Support</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Gluto International Limited?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We are committed to providing exceptional service and quality products to our global partners.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary-700 dark:bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our valued customers have to say about our services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white/10 dark:bg-gray-700/50 p-8 rounded-lg backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="italic mb-6">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-primary-200 dark:text-primary-300">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-primary-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Product Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our diverse range of products across multiple categories.
            </p>
          </motion.div>

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
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/catalog"
              className="bg-primary-600 dark:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-800 transition-colors duration-200 inline-flex items-center"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Simple Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Getting quality products has never been easier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-700 dark:text-primary-400 font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Browse Catalog
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore our wide range of quality products
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-700 dark:text-primary-400 font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Place Order
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select products and complete your order
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-700 dark:text-primary-400 font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Quality Check
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We verify and prepare your order
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 dark:bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-700 dark:text-primary-400 font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your order shipped to your location
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 dark:bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Order?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Browse our catalog and place your order today. Our team is ready to assist you with all your product needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/catalog"
              className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center"
            >
              Browse Catalog
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Home;
