
import React, { useState, useEffect } from 'react';
import { Menu, Sun, Moon, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavigationSidebar from './NavigationSidebar';
import CartPopup from './CartPopup';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const navigate = useNavigate();

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleShopClick = () => {
    navigate('/shop-all');
  };

  const handleCartClick = () => {
    navigate('/checkout');
  };

  const addToCart = (product: any) => {
    setCartItems(prev => prev + 1);
    setIsCartOpen(true);
    
    setTimeout(() => {
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 smooth-transition">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo - Clickable to home */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            onClick={handleLogoClick}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src={isDarkMode ? "/lovable-uploads/b68b6220-d7de-409e-9588-7bd57831d577.png" : "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png"}
                alt="Dr. Kumar Laboratories"
                className="w-full h-full object-contain transition-all duration-300"
                loading="eager"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-black dark:text-white tracking-tight">Dr. Kumar Laboratories</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Healthcare & Wellness</p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={handleShopClick}
              className="text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition-colors duration-300"
            >
              Shop
            </button>
            <button 
              onClick={() => navigate('/about-us')}
              className="text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition-colors duration-300"
            >
              About Us
            </button>
            <button 
              onClick={() => navigate('/blog')}
              className="text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition-colors duration-300"
            >
              Blog
            </button>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCartClick}
              className="relative text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-secondary text-white text-xs h-5 w-5 flex items-center justify-center font-medium">
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
              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Sidebar */}
      <NavigationSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Cart Popup */}
      {isCartOpen && (
        <CartPopup 
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
        />
      )}
    </>
  );
};

export default Header;
