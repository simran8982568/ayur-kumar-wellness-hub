import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface Order {
  id: number;
  date: string;
  items: number;
  total: number;
  status: string;
}

interface Address {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, date: '2023-01-15', items: 3, total: 145.00, status: 'Delivered' },
    { id: 2, date: '2023-02-01', items: 1, total: 79.99, status: 'Shipped' },
    { id: 3, date: '2023-02-15', items: 2, total: 98.50, status: 'Processing' },
  ]);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: 'Home',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '91234',
      country: 'USA',
    },
    {
      id: 2,
      name: 'Work',
      address: '456 Business Ave',
      city: 'Anytown',
      state: 'CA',
      zip: '91234',
      country: 'USA',
    },
  ]);

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: '123 Main Street, City, State - 123456',
    dateOfBirth: '1990-01-01',
  });

  useEffect(() => {
    // Simulate fetching profile data from localStorage or API
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    }
  }, []);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate profile update
    console.log('Profile updated:', profileData);
    // Show success message or handle update logic
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1C1C2D]">My Profile</h2>
      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email ID
          </label>
          <input
            type="email"
            value={profileData.email}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            title="Email ID cannot be changed"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={profileData.phone}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            title="Phone number cannot be changed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            value={profileData.address}
            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
            placeholder="Enter your complete address"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
          />
        </div>
        
        <Button 
          type="submit"
          className="bg-[#111111] hover:bg-[#111111]/90 text-white px-6 py-2 rounded-lg font-medium"
        >
          Update Profile
        </Button>
      </form>
    </div>
  );

  const renderOrdersSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1C1C2D]">My Orders</h2>
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.items}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{order.total}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}
    </div>
  );

  const renderAddressesSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1C1C2D]">Addresses</h2>
      {addresses.map((address) => (
        <div key={address.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900">{address.name}</h3>
          <p className="text-gray-600">{address.address}</p>
          <p className="text-gray-600">
            {address.city}, {address.state} {address.zip}
          </p>
          <p className="text-gray-600">{address.country}</p>
        </div>
      ))}
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1C1C2D]">Settings</h2>
      <p className="text-gray-600">Account settings and preferences.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1C1C2D] mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <nav className="space-y-2">
                  {[
                    { id: 'profile', label: 'My Profile', icon: '👤' },
                    { id: 'orders', label: 'My Orders', icon: '📦' },
                    { id: 'addresses', label: 'Addresses', icon: '📍' },
                    { id: 'settings', label: 'Settings', icon: '⚙️' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === item.id
                          ? 'bg-[#111111] text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-[#111111]'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {activeTab === 'profile' && renderProfileSection()}
                {activeTab === 'orders' && renderOrdersSection()}
                {activeTab === 'addresses' && renderAddressesSection()}
                {activeTab === 'settings' && renderSettingsSection()}
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
