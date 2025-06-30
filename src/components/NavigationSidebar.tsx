
import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, Home, ShoppingCart, Heart, User, Info, Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/');
    onClose();
    window.dispatchEvent(new CustomEvent('authStateChanged'));
  };

  const categories = [
    { name: "Men's Sexual Health", slug: 'mens-sexual-health' },
    { name: "Women's Sexual Health", slug: 'womens-sexual-health' },
    { name: 'Erectile Dysfunction', slug: 'erectile-dysfunction' },
    { name: 'Nightfall & PE', slug: 'nightfall-pe' },
    { name: 'Infertility Support', slug: 'infertility-support' },
    { name: 'Hormonal Imbalance', slug: 'hormonal-imbalance' },
    { name: 'Loss of Libido', slug: 'libido-boosters' },
    { name: 'Penis Enlargement', slug: 'penis-enlargement' },
    { name: 'Sexual Wellness Combos', slug: 'combos-kits' },
    { name: 'Unani & Homeopathic', slug: 'unani-homeopathy' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-black dark:text-white">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {/* Home */}
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>

          {/* Shop by Category */}
          <div>
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-5 w-5" />
                <span>Shop by Category</span>
              </div>
              {expandedSection === 'categories' ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {expandedSection === 'categories' && (
              <div className="ml-8 mt-2 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    onClick={onClose}
                    className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#c74a1b] dark:hover:text-blue-400 rounded-lg transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Consultations - Fixed link */}
          <Link
            to="/consultation-booking"
            onClick={onClose}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors"
          >
            <Stethoscope className="h-5 w-5" />
            <span>Consultations</span>
          </Link>

          {/* Conditional Auth-based Links */}
          {!isLoggedIn ? (
            <Link
              to="/sign-in"
              onClick={onClose}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors"
            >
              <User className="h-5 w-5" />
              <span>Login</span>
            </Link>
          ) : (
            <>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>

              <Link
                to="/account"
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors"
              >
                <User className="h-5 w-5" />
                <span>My Account</span>
              </Link>

              {/* Feedback link only for authenticated users */}
              <Link
                to="/feedback"
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors"
              >
                <Info className="h-5 w-5" />
                <span>Feedback</span>
              </Link>
            </>
          )}

          {/* About Us */}
          <Link
            to="/about-us"
            onClick={onClose}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors"
          >
            <Info className="h-5 w-5" />
            <span>About Us</span>
          </Link>

          {/* Cart */}
          <Link
            to={isLoggedIn ? "/cart-page" : "/missing-cart"}
            onClick={onClose}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
          </Link>
        </nav>

        {/* Sign Out Button (only if logged in) */}
        {isLoggedIn && (
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg"
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default NavigationSidebar;
