import React, { useEffect, useState } from 'react';
import { Package, Shield, Globe, Users, Award, Clock, ArrowUp } from 'lucide-react';
import BackToTop from '../components/BackToTop';


const Information = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const services = [
    {
      icon: <Package className="h-8 w-8 text-primary-600" />,
      title: 'Product Sourcing',
      description: 'Our global network of trusted suppliers ensures we can source the highest quality products at competitive prices. We maintain direct relationships with producers across 35 countries, allowing us to offer authentic products with full traceability.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Quality Assurance',
      description: 'Our 5-stage quality control process includes pre-shipment inspections, laboratory testing, and certification verification. We comply with international standards including ISO, HACCP, and BRC to guarantee product safety and consistency.'
    },
    {
      icon: <Globe className="h-8 w-8 text-primary-600" />,
      title: 'Global Distribution',
      description: 'With distribution centers in 12 countries and partnerships with leading logistics providers, we deliver to over 80 countries worldwide. Our cold chain solutions ensure perishable goods maintain optimal quality throughout transit.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: 'Customer Support',
      description: 'Our multilingual support team operates 24/5 to assist with orders, tracking, and after-sales service. We provide dedicated account managers for enterprise clients to ensure personalized service and quick response times.'
    },
    {
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: 'Certification',
      description: 'All products come with complete certification packages including phytosanitary certificates, certificates of origin, and Halal/Kosher certifications where required. We handle all documentation for smooth customs clearance.'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-600" />,
      title: 'Timely Delivery',
      description: 'Our advanced logistics planning and real-time tracking systems ensure 98% on-time delivery performance. We offer flexible shipping options including air, sea, and land freight with temperature-controlled solutions.'
    }
  ];

  const fadeInAnimation = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }
  `;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <style>{fadeInAnimation}</style>
      
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-12 ${animated ? 'animate-fadeIn' : ''}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About GLUTO International
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your trusted global partner in food distribution and agricultural commodities
          </p>
        </div>

        {/* Company Overview */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12 ${animated ? 'animate-fadeIn' : ''}`}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Company Story
          </h2>
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300">
              Founded in 2010, GLUTO International Limited has grown from a regional food distributor to a global leader in agricultural commodity trading. Headquartered in London with regional offices in Lagos, Dubai, and Singapore, we bridge the gap between producers and markets across continents.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Our mission is to deliver quality food products efficiently while maintaining the highest standards of integrity and sustainability. We've built our reputation on transparency, reliability, and exceptional service, handling over 250,000 metric tons of products annually.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              GLUTO International is more than a distributor - we're a solutions provider. Our team of 150+ professionals includes food scientists, logistics experts, and trade specialists who work together to solve complex supply chain challenges for our clients.
            </p>
          </div>
        </div>

        {/* Our Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className={`bg-primary-600 text-white rounded-lg shadow-md p-8 ${animated ? 'animate-fadeIn' : ''}`} style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-primary-100">
              To be the world's most trusted food distribution network, connecting quality producers with global markets through innovative, sustainable, and efficient supply chain solutions. We aim to nourish communities worldwide while reducing food waste and promoting fair trade practices.
            </p>
          </div>
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 ${animated ? 'animate-fadeIn' : ''}`} style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To provide reliable, high-quality food products to our customers through ethical sourcing, rigorous quality control, and efficient distribution. We commit to building long-term partnerships that create value for producers, customers, and the communities we serve.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className={`mb-12 ${animated ? 'animate-fadeIn' : ''}`} style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Comprehensive Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
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
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12 ${animated ? 'animate-fadeIn' : ''}`} style={{ animationDelay: '0.8s' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Extensive Product Portfolio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
                Agri Fresh Products
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Premium quality rice varieties including Basmati, Jasmine, and Parboiled (25kg, 50kg, and retail packs)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Fresh and dried beans (Black-eyed peas, Brown beans, Honey beans) in various packaging options</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Seasonal fruits and vegetables (Oranges, Bananas, Plantains, Tomatoes) with cold chain management</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Seeds and nuts (Cashew nuts, Groundnuts, Almonds) with quality grading and sorting</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
                Food & Beverage (FMCG)
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Snacks and confectionery (Biscuits, Chocolates, Chips) from leading international brands</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Beverages and drinks (Juices, Soft drinks, Energy drinks) in various packaging sizes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Personal care items (Toiletries, Cosmetics) meeting international safety standards</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Household products (Detergents, Cleaning supplies) in bulk and retail packaging</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
                Meat & Poultry Products
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Fresh and processed eggs (Table eggs, Processed egg products) with HACCP certification</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Fish and seafood (Frozen fish, Smoked fish, Prawns) with proper cold chain handling</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Beef and poultry products (Chicken, Turkey, Beef cuts) meeting halal and other religious requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Frozen meat products with extended shelf-life packaging solutions</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
                Processed African Foods
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Stock fish and dried fish (Croaker, Cod, Catfish) in various sizes and packaging</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Egusi and traditional spices (Uziza, Ehuru, Cameroon pepper) with authentic sourcing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Poundo yam and cassava products (Garri, Fufu, Amala) from premium sources</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Traditional African staples (Ogbono, Okra, Bitterleaf) processed to international standards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Global Reach */}
        <div className={`bg-primary-600 text-white rounded-lg shadow-md p-8 mb-12 ${animated ? 'animate-fadeIn' : ''}`} style={{ animationDelay: '1s' }}>
          <h2 className="text-3xl font-bold mb-6">Our Global Reach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">Americas</h3>
              <ul className="space-y-2 text-primary-100">
                <li>• United States</li>
                <li>• Canada</li>
                <li>• Brazil</li>
                <li>• Mexico</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">Europe</h3>
              <ul className="space-y-2 text-primary-100">
                <li>• United Kingdom</li>
                <li>• Germany</li>
                <li>• France</li>
                <li>• Netherlands</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">Africa & Middle East</h3>
              <ul className="space-y-2 text-primary-100">
                <li>• Nigeria</li>
                <li>• Ghana</li>
                <li>• South Africa</li>
                <li>• UAE</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quality Standards */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12 ${animated ? 'animate-fadeIn' : ''}`} style={{ animationDelay: '1.2s' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Quality Standards & Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
                International Standards Compliance
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>ISO 9001:2015</strong> - Certified Quality Management System ensuring consistent product quality</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>HACCP</strong> - Hazard Analysis and Critical Control Points certification for food safety</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>BRC Global Standard</strong> - AA grade certification for food safety</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Organic Certification</strong> - For applicable products meeting EU/USDA organic standards</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Halal/Kosher</strong> - Certification available for relevant products</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
                Our Quality Commitment
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Farm-to-Table Traceability</strong> - Full supply chain transparency with digital tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Quality Audits</strong> - Monthly inspections by internal and third-party auditors</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Regulatory Compliance</strong> - Strict adherence to FDA, EFSA, and other national regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Continuous Improvement</strong> - Regular staff training and process optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Sustainability Practices</strong> - Ethical sourcing and eco-friendly packaging initiatives</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className={`bg-primary-600 text-white rounded-lg shadow-md p-8 ${animated ? 'animate-fadeIn' : ''}`} style={{ animationDelay: '1.4s' }}>
          <h2 className="text-3xl font-bold mb-6">What Our Partners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-700 p-6 rounded-lg">
              <p className="italic mb-4">"GLUTO International has been our trusted supplier for 5 years. Their quality consistency and reliable delivery are unmatched in the industry."</p>
              <p className="font-semibold">- James Wilson, Procurement Director, UK Retail Chain</p>
            </div>
            <div className="bg-primary-700 p-6 rounded-lg">
              <p className="italic mb-4">"Their documentation and certification support makes customs clearance effortless. We've expanded our product range thanks to GLUTO's diverse portfolio."</p>
              <p className="font-semibold">- Amina Mohammed, CEO, African Food Imports</p>
            </div>
            <div className="bg-primary-700 p-6 rounded-lg">
              <p className="italic mb-4">"The personalized service from our account manager has helped us navigate complex international food regulations with confidence."</p>
              <p className="font-semibold">- Carlos Rodriguez, Operations Manager, Latin America</p>
            </div>
          </div>
        </div>
      </div>
        {/* Back to Top Button */}
            <BackToTop />
    </div>
  );
};

export default Information;