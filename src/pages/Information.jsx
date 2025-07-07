import React from 'react';
import { Package, Shield, Globe, Users, Award, Clock } from 'lucide-react';

const Information = () => {
  const services = [
    {
      icon: <Package className="h-8 w-8 text-blue-600" />,
      title: 'Product Sourcing',
      description: 'We source high-quality products from trusted suppliers across the globe.'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes ensure all products meet international standards.'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: 'Global Distribution',
      description: 'Extensive distribution network covering major markets worldwide.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Customer Support',
      description: 'Dedicated support team to assist with all your product and service needs.'
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: 'Certification',
      description: 'All products come with necessary certifications and compliance documentation.'
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: 'Timely Delivery',
      description: 'Efficient logistics ensure on-time delivery to destinations worldwide.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About GLUTO International
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Learn more about our company, services, and commitment to quality.
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Company
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            GLUTO International Limited is a leading global distributor of food products and agricultural commodities. 
            With years of experience in international trade, we connect quality producers with markets worldwide, 
            ensuring efficient supply chain solutions for our partners.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our extensive product portfolio includes fresh agricultural products, processed foods, beverages, 
            and specialty items sourced from trusted suppliers across different continents. We pride ourselves 
            on maintaining the highest standards of quality, safety, and reliability in all our operations.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Whether you're looking for bulk commodity products or specialized food items, GLUTO International 
            has the expertise and network to meet your requirements efficiently and cost-effectively.
          </p>
        </div>

        {/* Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Product Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Agri Fresh Products
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Premium quality rice varieties</li>
                <li>• Fresh and dried beans</li>
                <li>• Seasonal fruits and vegetables</li>
                <li>• Seeds and nuts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Food & Beverage (FMCG)
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Snacks and confectionery</li>
                <li>• Beverages and drinks</li>
                <li>• Personal care items</li>
                <li>• Household products</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Meat & Poultry Products
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Fresh and processed eggs</li>
                <li>• Fish and seafood</li>
                <li>• Beef and poultry products</li>
                <li>• Frozen meat products</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Processed African Foods
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Stock fish and dried fish</li>
                <li>• Egusi and traditional spices</li>
                <li>• Poundo yam and cassava products</li>
                <li>• Traditional African staples</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quality Standards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quality Standards & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                International Standards
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• ISO 9001:2015 Quality Management</li>
                <li>• HACCP Food Safety Standards</li>
                <li>• BRC Global Standard for Food Safety</li>
                <li>• Organic certification where applicable</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Our Commitment
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Traceability from source to destination</li>
                <li>• Regular quality audits and inspections</li>
                <li>• Compliance with importing country regulations</li>
                <li>• Continuous improvement in processes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;