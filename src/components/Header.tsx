
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCartClick = () => {
    navigate('/checkout');
  };

  const addToCart = (product: any) => {
    setCartItems(prev => prev + 1);
    setIsCartOpen(true);
    
    // Auto-close cart popup after 3 seconds
    setTimeout(() => {
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src={isDarkMode ? "/lovable-uploads/5d254827-a0b5-4204-b492-02c4f52346f1.png" : "/lovable-uploads/70a2227a-b00e-42b6-b69e-aae3adc489c8.png"}
                alt="Dr. Kumar Laboratories"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-black dark:text-white tracking-tight">Dr. Kumar Laboratories</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Healthcare & Wellness</p>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
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
              className="relative text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
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
              onClick={toggleSidebar}
              aria-label="Open menu"
              className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
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
