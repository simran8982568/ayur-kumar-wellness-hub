
import React, { useState } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isDarkMode, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={isDarkMode ? "/lovable-uploads/fa2e346d-b0f3-43a0-975b-23e6a7ba89e6.png" : "/lovable-uploads/9ef4d809-49d1-463e-b489-7c147b802afe.png"}
              alt="Dr. Kumar Laboratories"
              className="h-12 w-12 object-contain"
            />
            <div className="ml-3 hidden sm:block">
              <h1 className="text-xl font-bold text-[#723421] dark:text-white">Dr. Kumar Laboratories</h1>
              <p className="text-xs text-[#723421]/70 dark:text-gray-300">Holistic Health Starts with Ayurveda</p>
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

            {/* Hamburger Menu */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="rounded-full"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
