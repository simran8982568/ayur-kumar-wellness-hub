
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Package, ShoppingCart, Heart, Settings, LogOut } from 'lucide-react';

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/signin');
      return;
    }

    // Load user info from localStorage
    const email = localStorage.getItem('userEmail') || '';
    const name = localStorage.getItem('userName') || '';
    setUserInfo({
      name,
      email,
      phone: '+91 98765 43210',
      address: 'Govindpuri, Gwalior, MP'
    });
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const orders = [
    {
      id: '#ORD001',
      date: '2024-12-10',
      status: 'Delivered',
      amount: '₹1,299',
      items: 'Immunity Booster Combo'
    },
    {
      id: '#ORD002',
      date: '2024-11-28',
      status: 'Processing',
      amount: '₹899',
      items: 'Digestive Health Pack'
    },
    {
      id: '#ORD003',
      date: '2024-11-15',
      status: 'Delivered',
      amount: '₹649',
      items: 'Ashwagandha Capsules'
    }
  ];

  const cartItems = [
    {
      id: 1,
      name: 'Stress Relief Bundle',
      price: '₹1,199',
      quantity: 1,
      image: '/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png'
    },
    {
      id: 2,
      name: 'Joint Care Supplement',
      price: '₹799',
      quantity: 2,
      image: '/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png'
    }
  ];

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'cart', label: 'Cart Summary', icon: ShoppingCart },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">My Account</h1>
            <p className="text-gray-600">Welcome back, {userInfo.name || 'User'}!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-black">{userInfo.name}</h3>
                  <p className="text-sm text-gray-600">{userInfo.email}</p>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 p-3 text-left transition-colors ${
                          activeTab === item.id
                            ? 'bg-brand-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-3 p-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <Input
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <Input
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <Input
                            value={userInfo.phone}
                            onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                          </label>
                          <Input
                            value={userInfo.address}
                            onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                            placeholder="Enter your address"
                          />
                        </div>
                      </div>
                      <Button className="bg-brand-primary hover:bg-brand-secondary text-white">
                        Update Profile
                      </Button>
                    </form>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{order.id}</h3>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm mb-2">{order.items}</p>
                          <p className="font-semibold">{order.amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cart Tab */}
                {activeTab === 'cart' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Cart Summary</h2>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 border border-gray-200 p-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">{item.price}</p>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-gray-200">
                        <Button 
                          onClick={() => navigate('/checkout')}
                          className="w-full bg-brand-primary hover:bg-brand-secondary text-white"
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                      <Button 
                        onClick={() => navigate('/shop-all')}
                        className="bg-brand-primary hover:bg-brand-secondary text-white"
                      >
                        Start Shopping
                      </Button>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Notifications</h3>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" defaultChecked />
                            <span>Email notifications for orders</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" defaultChecked />
                            <span>SMS notifications for delivery</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <span>Marketing emails</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3">Privacy</h3>
                        <Button variant="outline" className="text-brand-primary border-brand-primary">
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
