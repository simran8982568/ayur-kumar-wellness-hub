
import React from 'react';
import { X, Users, Heart, Package, Leaf, BookOpen, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface NavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ isOpen, onClose }) => {
  const navigationItems = [
    { icon: Users, label: "Men's Health", href: "/mens-health" },
    { icon: Heart, label: "Women's Health", href: "/womens-health" },
    { icon: Package, label: "Combos", href: "/combos" },
    { icon: Leaf, label: "Essentials", href: "/essentials" },
    { icon: BookOpen, label: "Blog", href: "/blog" },
    { icon: User, label: "Account", href: "/account" },
  ];

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
      <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-background border-l border-border z-50 transform transition-transform duration-300 animate-slide-in-right">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-brand-primary">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors group"
              >
                <item.icon className="h-5 w-5 text-brand-primary group-hover:text-brand-secondary transition-colors" />
                <span className="font-medium text-foreground group-hover:text-brand-secondary transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Sign Out Button */}
          <div className="mt-8 pt-8 border-t border-border">
            <Button
              variant="destructive"
              className="w-full bg-brand-alert hover:bg-brand-alert/90 text-white font-medium"
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
