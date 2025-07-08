import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, ShoppingCart, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const mainSections = [
    { path: '/admin/dashboard', icon: <Package size={20} />, label: 'Dashboard' },
    { path: '/admin/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/admin/categories', icon: <Users size={20} />, label: 'Categories' },
    { path: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
  ];

  return (
    <div className="">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 h-10 w-7 flex items-center justify-center
          bg-blue-700 dark:bg-blue-300 text-white dark:text-gray-200
          hover:text-gray-700 dark:hover:text-gray-300
          rounded-r-full shadow-md border-y border-r border-gray-200 dark:border-gray-700
          transition-all duration-300
          ${isOpen ? 'left-64' : 'left-0'}`}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed h-full z-40 bg-white dark:bg-gray-800 shadow-lg
          transition-all duration-300 overflow-y-auto
          ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
      >
        <div className="p-4 space-y-6">
          {/* GLUTO Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">GLUTO</h1>
          </div>

          {/* Main Navigation */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Dashboard
            </h2>
            <ul className="space-y-1">
              {mainSections.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-md
                      ${location.pathname === item.path
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Visit Site Link */}
          <div>
            <Link
              to="/"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md"
            >
              <Home size={20} />
              <span className="ml-3">Visit Site</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminHeader;