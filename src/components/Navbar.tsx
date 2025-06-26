
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isDarkMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: "Men's Health", href: '/men' },
    { name: "Women's Wellness", href: '/women' },
    { name: 'Combos', href: '/combos' },
    { name: 'Essentials', href: '/essentials' },
    { name: 'Consult Doctor', href: '/consult' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-ayurvedic-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-ayurvedic-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">DK</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-ayurvedic-green-700">Dr. Kumar Clinic</h1>
              <p className="text-xs text-ayurvedic-green-600">Ayurvedic Wellness</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground hover:text-ayurvedic-green-600 transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 bg-ayurvedic-beige-50 border border-ayurvedic-green-200 rounded-full focus:outline-none focus:ring-2 focus:ring-ayurvedic-green-300 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center space-x-4">
              <Link to="/wishlist" className="text-foreground hover:text-ayurvedic-green-600 transition-colors">
                <Heart className="w-6 h-6" />
              </Link>
              <Link to="/cart" className="text-foreground hover:text-ayurvedic-green-600 transition-colors relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-ayurvedic-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link to="/account" className="text-foreground hover:text-ayurvedic-green-600 transition-colors">
                <User className="w-6 h-6" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            {/* Sidebar Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="hidden lg:flex"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-ayurvedic-green-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-foreground hover:text-ayurvedic-green-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-ayurvedic-green-200">
                <Link to="/wishlist" className="text-foreground hover:text-ayurvedic-green-600 transition-colors">
                  <Heart className="w-6 h-6" />
                </Link>
                <Link to="/cart" className="text-foreground hover:text-ayurvedic-green-600 transition-colors relative">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-ayurvedic-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Link>
                <Link to="/account" className="text-foreground hover:text-ayurvedic-green-600 transition-colors">
                  <User className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
