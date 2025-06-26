
import React from 'react';
import { X, Bell, User, ShoppingCart, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const userName = "Ayush Sharma";
  
  const notifications = [
    { id: 1, type: 'order', message: 'Your order #AY2024001 has been shipped!', time: '2h ago' },
    { id: 2, type: 'promo', message: 'Flash Sale: Get 20% off on Immunity Boosters', time: '4h ago' },
    { id: 3, type: 'consultation', message: 'Dr. Kumar is available for consultation', time: '1d ago' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-card border-l border-ayurvedic-green-200 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-ayurvedic-green-700">Notifications</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Greeting */}
          <div className="bg-ayurvedic-green-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-ayurvedic-green-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-ayurvedic-green-700">Hello, {userName}!</h3>
                <p className="text-sm text-ayurvedic-green-600">Welcome back to wellness</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="bg-ayurvedic-beige-100 hover:bg-ayurvedic-beige-200 p-3 rounded-xl transition-colors duration-200">
              <ShoppingCart className="w-5 h-5 text-ayurvedic-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-ayurvedic-green-700">Cart</span>
            </button>
            <button className="bg-ayurvedic-beige-100 hover:bg-ayurvedic-beige-200 p-3 rounded-xl transition-colors duration-200">
              <Heart className="w-5 h-5 text-ayurvedic-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-ayurvedic-green-700">Wishlist</span>
            </button>
            <button className="bg-ayurvedic-beige-100 hover:bg-ayurvedic-beige-200 p-3 rounded-xl transition-colors duration-200">
              <Calendar className="w-5 h-5 text-ayurvedic-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-ayurvedic-green-700">Consult</span>
            </button>
            <button className="bg-ayurvedic-beige-100 hover:bg-ayurvedic-beige-200 p-3 rounded-xl transition-colors duration-200">
              <User className="w-5 h-5 text-ayurvedic-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-ayurvedic-green-700">Profile</span>
            </button>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Recent Updates
            </h3>
            {notifications.map((notification) => (
              <div key={notification.id} className="bg-background rounded-xl p-4 border border-ayurvedic-green-200">
                <p className="text-sm text-foreground mb-1">{notification.message}</p>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
            ))}
          </div>

          {/* Promotional Banner */}
          <div className="mt-6 bg-gradient-to-r from-ayurvedic-gold-100 to-ayurvedic-green-100 rounded-2xl p-4 border border-ayurvedic-gold-200">
            <h4 className="font-semibold text-ayurvedic-green-700 mb-2">Special Offer!</h4>
            <p className="text-sm text-ayurvedic-green-600 mb-3">Get ₹688 off on your first consultation + immunity combo</p>
            <Button className="ayurvedic-button w-full text-sm">
              Claim Offer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
