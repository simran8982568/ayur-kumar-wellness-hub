
import React, { useState } from 'react';
import { X, Users, Heart, Package, Leaf, User, LogOut, Search, Store, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface NavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { icon: Store, label: "Shop", href: "/shop-all" },
    { icon: Info, label: "About Us", href: "/about-us" },
    { icon: Users, label: "Men's Health", href: "/mens-health" },
    { icon: Heart, label: "Women's Health", href: "/womens-health" },
    { icon: Package, label: "Combos", href: "/combos" },
    { icon: Leaf, label: "Essentials", href: "/essentials" },
    { icon: Heart, label: "Wishlist", href: "/wishlist" },
    { icon: User, label: "Account", href: "/account" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop with search query
      window.location.href = `/shop-all?search=${encodeURIComponent(searchQuery)}`;
      onClose();
    }
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
      <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-white border-l border-gray-200 z-50 transform transition-transform duration-300 animate-slide-in-right">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-xl"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
          </form>

          {/* Navigation Items */}
          <nav className="space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="flex items-center space-x-3 p-3 border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors group rounded-xl"
              >
                <item.icon className="h-5 w-5 text-brand-primary group-hover:text-brand-secondary transition-colors" />
                <span className="font-medium text-gray-900 group-hover:text-brand-secondary transition-colors uppercase tracking-wide text-sm">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Sign Out Button */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Button
              variant="destructive"
              className="w-full bg-brand-alert hover:bg-brand-alert/90 text-white font-medium uppercase tracking-wide rounded-xl"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationSidebar;
