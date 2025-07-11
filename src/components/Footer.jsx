import React from 'react';
import {  Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-900'} text-white pt-12 pb-6 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-400">GLUTO International</h3>
            <p className="mb-4 text-gray-300">
              Your trusted partner in global food distribution and agricultural products.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-primary-400 transition-colors text-gray-300">Home</a></li>
              <li><a href="/catalog" className="hover:text-primary-400 transition-colors text-gray-300">Catalog</a></li>
              <li><a href="/about" className="hover:text-primary-400 transition-colors text-gray-300">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary-400 transition-colors text-gray-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Product Categories</h4>
            <ul className="space-y-2">
              <li><a href="/catalog?category=agri-fresh" className="hover:text-primary-400 transition-colors text-gray-300">Agri Fresh Products</a></li>
              <li><a href="/catalog?category=food-beverage" className="hover:text-primary-400 transition-colors text-gray-300">Food & Beverage</a></li>
              <li><a href="/catalog?category=meat-poultry" className="hover:text-primary-400 transition-colors text-gray-300">Meat & Poultry</a></li>
              <li><a href="/catalog?category=processed" className="hover:text-primary-400 transition-colors text-gray-300">Processed African Foods</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                <span className="text-gray-300">123 Business Street, International Trade Center, City, Country</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">info@glutointernational.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary-400 mt-0.5" />
                <span className="text-gray-300">Mon-Fri: 9AM-6PM<br />Sat: 10AM-4PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-700'} pt-6 flex flex-col md:flex-row justify-between items-center`}>
          <p className="text-gray-300">© {new Date().getFullYear()} GLUTO International. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:text-primary-400 transition-colors text-gray-300">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-primary-400 transition-colors text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;