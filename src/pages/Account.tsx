
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Heart, Package, LogOut, Edit } from 'lucide-react';

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/signin');
      return;
    }

    // Load user data
    const name = localStorage.getItem('userName') || 'User';
    const email = localStorage.getItem('userEmail') || '';
    setUserData({ name, email, phone: '+91 9876543210' });
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    setIsEditing(false);
  };

  const sidebarItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'orders', label: 'Orders', icon: Package },
  ];

  const dummyOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      products: ['Immunity Booster Juice', 'Digestive Care Capsules'],
      total: 1048,
      status: 'Delivered'
    },
    {
      id: 'ORD002',
      date: '2024-01-20',
      products: ['Skin Glow Serum'],
      total: 899,
      status: 'Pending'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#c74a1b] rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-black">{userData.name}</h2>
                <p className="text-gray-600 text-sm">{userData.email}</p>
              </div>
              
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#c74a1b] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
              
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="w-full mt-6 bg-red-500 hover:bg-red-600 rounded-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-black">My Profile</h2>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      className="border-[#c74a1b] text-[#c74a1b] hover:bg-[#c74a1b] hover:text-white rounded-lg"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        disabled={!isEditing}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        disabled={!isEditing}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="rounded-lg"
                      />
                    </div>
                    
                    {isEditing && (
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-[#c74a1b] hover:bg-[#b8441a] text-white rounded-lg"
                      >
                        Save Changes
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-black mb-6">My Wishlist</h2>
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                    <Button
                      onClick={() => navigate('/shop-all')}
                      className="bg-[#c74a1b] hover:bg-[#b8441a] text-white rounded-lg"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-black mb-6">My Orders</h2>
                  <div className="space-y-4">
                    {dummyOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-black">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">Placed on {order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">Products:</p>
                          <ul className="text-sm text-black">
                            {order.products.map((product, index) => (
                              <li key={index}>• {product}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-black">Total: ₹{order.total}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#c74a1b] text-[#c74a1b] hover:bg-[#c74a1b] hover:text-white rounded-lg"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account;
