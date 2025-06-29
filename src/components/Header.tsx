
import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavigationSidebar from './NavigationSidebar';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Update cart count on component mount and when cart changes
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((total: number, item: any) => total + (item.quantity || 1), 0);
      setCartItems(totalItems);
    };

    updateCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Check theme on mount
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart-page');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop-all?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
              <img 
                src={isDark ? "/lovable-uploads/5d254827-a0b5-4204-b492-02c4f52346f1.png" : "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png"}
                alt="Dr. Kumar Laboratories"
                className={`w-full h-full object-contain ${isDark ? '' : ''}`}
                loading="eager"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-black dark:text-white">Dr. Kumar Laboratories</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Healthcare & Wellness</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600 focus:border-transparent transition-colors duration-200"
                aria-label="Search products"
              />
            </div>
          </form>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Authentication Buttons or User Menu */}
            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/signin')}
                  className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-sm px-3 py-2 rounded-xl"
                  aria-label="Sign In"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/signup')}
                  className="bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-xl"
                  aria-label="Sign Up"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/account')}
                className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2"
                aria-label="My Account"
              >
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Cart Icon with Badge */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCartClick}
              className="relative text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2"
              aria-label={`Shopping cart with ${cartItems} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c74a1b] dark:bg-blue-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full font-medium">
                  {cartItems}
                </span>
              )}
            </Button>

            {/* Hamburger Menu */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Open menu"
              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600 focus:border-transparent transition-colors duration-200"
                aria-label="Search products"
              />
            </div>
          </form>
        </div>
      </header>

      <NavigationSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};

export default Header;
