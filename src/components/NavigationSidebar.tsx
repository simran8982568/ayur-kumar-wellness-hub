
import React, { useState } from 'react';
import { X, Users, Heart, Package, Leaf, User, LogOut, Search, Store, Info, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface NavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(false);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const categoryItems = [
    { label: "Men's Sexual Health", href: "/category/mens-sexual-health" },
    { label: "Women's Sexual Health", href: "/category/womens-sexual-health" },
    { label: "Erectile Dysfunction", href: "/category/erectile-dysfunction" },
    { label: "Infertility Support", href: "/category/infertility-support" },
    { label: "Libido Boosters", href: "/category/libido-boosters" },
    { label: "Nightfall / PE", href: "/category/nightfall-pe" },
    { label: "Penis Enlargement", href: "/category/penis-enlargement" },
    { label: "Combos & Kits", href: "/category/combos-kits" },
    { label: "Unani / Homeopathy", href: "/category/unani-homeopathy" },
  ];

  const publicNavigationItems = [
    { icon: Store, label: "Shop All", href: "/shop-all" },
    { icon: Info, label: "About Us", href: "/about-us" },
    { icon: Calendar, label: "Consultations", href: "/consultations" },
  ];

  const authNavigationItems = [
    { icon: User, label: "My Account", href: "/account" },
    { icon: Heart, label: "Wishlist", href: "/wishlist" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop-all?search=${encodeURIComponent(searchQuery)}`;
      onClose();
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    onClose();
    window.location.href = '/';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 z-50 transform transition-all duration-300 animate-slide-in-right">
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-black dark:text-white tracking-tight">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600 focus:border-transparent transition-colors duration-200"
                aria-label="Search products"
              />
            </div>
          </form>

          {/* Navigation */}
          <nav className="space-y-4">
            {/* Home */}
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center space-x-3 p-3 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group rounded-xl"
            >
              <Store className="h-5 w-5 text-[#c74a1b] dark:text-blue-400 group-hover:text-[#b8441a] dark:group-hover:text-blue-300 transition-colors" />
              <span className="font-medium text-black dark:text-white group-hover:text-[#b8441a] dark:group-hover:text-blue-300 transition-colors uppercase tracking-wide text-sm">
                Home
              </span>
            </Link>

            {/* Shop by Category - Expandable */}
            <div className="space-y-2">
              <button
                onClick={() => setExpandedCategory(!expandedCategory)}
                className="w-full flex items-center justify-between p-3 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-[#c74a1b] dark:text-blue-400 group-hover:text-[#b8441a] dark:group-hover:text-blue-300 transition-colors" />
                  <span className="font-medium text-black dark:text-white group-hover:text-[#b8441a] dark:group-hover:text-blue-300 transition-colors uppercase tracking-wide text-sm">
                    Shop by Category
                  </span>
                </div>
                <span className={`text-gray-400 transition-transform duration-200 ${expandedCategory ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {expandedCategory && (
                <div className="ml-8 space-y-2">
                  {categoryItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onClose}
                      className="block p-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Public Navigation Items */}
            {publicNavigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="flex items-center space-x-3 p-3 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group rounded-xl"
              >
                <item.icon className="h-5 w-5 text-[#c74a1b] dark:text-blue-400 group-hover:text-[#b8441a] dark:group-hover:text-blue-300 transition-colors" />
                <span className="font-medium text-black dark:text-white group-hover:text-[#b8441a] dark:group-hover:text-blue-300 transition-colors uppercase tracking-wide text-sm">
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Conditional Auth Items */}
            {isLoggedIn && (
              <>
                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                
                {authNavigationItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-3 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group rounded-xl"
                  >
                    <item.icon className="h-5 w-5 text-[#c74a1b] dark:text-blue-400 group-hover:text-[#b8441a] dark:group-hover:text-blue-300 transition-colors" />
                    <span className="font-medium text-black dark:text-white group-hover:text-[#b8441a] dark:group-hover:text-blue-300 transition-colors uppercase tracking-wide text-sm">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </>
            )}

            {/* Cart Link */}
            <Link
              to="/cart-page"
              onClick={onClose}
              className="flex items-center space-x-3 p-3 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group rounded-xl"
            >
              <Package className="h-5 w-5 text-[#c74a1b] dark:text-blue-400 group-hover:text-[#b8441a] dark:group-hover:text-blue-300 transition-colors" />
              <span className="font-medium text-black dark:text-white group-hover:text-[#b8441a] dark:group-hover:text-blue-300 transition-colors uppercase tracking-wide text-sm">
                Cart
              </span>
            </Link>
          </nav>

          {/* Sign Out Button - Only show if logged in */}
          {isLoggedIn && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium uppercase tracking-wide rounded-xl"
                aria-label="Sign Out"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationSidebar;
