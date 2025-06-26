
import React from 'react';
import { X, User, Heart, ShoppingCart, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface NavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "🧔 Men's Health", href: '/mens-health', icon: User },
    { name: "👩 Women's Health", href: '/womens-health', icon: Heart },
    { name: '💊 Combos', href: '/combos', icon: ShoppingCart },
    { name: '🌿 Essentials', href: '/essentials', icon: Heart },
    { name: '📰 Blog', href: '/blog', icon: Calendar },
    { name: '👤 Account', href: '/account', icon: User },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-background border-l border-border z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-[#723421] dark:text-white">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#723421]/10 dark:hover:bg-white/10 transition-colors duration-200"
              >
                <span className="text-lg">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Sign Out Button */}
          <div className="mt-8 pt-6 border-t border-border">
            <Button 
              className="w-full bg-[#d32f2f] hover:bg-[#d32f2f]/90 text-white rounded-xl"
              onClick={() => {
                // Handle sign out logic here
                console.log('Sign out clicked');
                onClose();
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              🚪 Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationSidebar;
