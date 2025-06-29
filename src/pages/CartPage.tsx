
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  useEffect(() => {
    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);

    // Load customer info if logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      setCustomerInfo(prev => ({
        ...prev,
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
      }));
    }
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    
    // Validate customer info
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart
    localStorage.removeItem('cart');
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Redirect to success page or show success message
    alert('Order placed successfully! You will receive a confirmation email shortly.');
    navigate('/');
    setLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Add some products to get started</p>
          <Button
            onClick={() => navigate('/shop-all')}
            className="bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white rounded-xl"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Order Summary</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg mx-auto sm:mx-0"
                  />
                  
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="font-medium text-black dark:text-white truncate">{item.name}</h3>
                    <p className="text-lg font-bold text-black dark:text-white">₹{item.price}</p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <span className="w-8 text-center font-medium text-black dark:text-white">{item.quantity}</span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 p-0 rounded-full ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center text-xl font-bold text-black dark:text-white">
                <span>Total: ₹{calculateTotal()}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Shipping Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Full Name *
                  </label>
                  <Input
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-black dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-black dark:text-white"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                  className="rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-black dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                  Address *
                </label>
                <Input
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your address"
                  className="rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-black dark:text-white"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    City *
                  </label>
                  <Input
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Enter your city"
                    className="rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-black dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    PIN Code *
                  </label>
                  <Input
                    value={customerInfo.pincode}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, pincode: e.target.value }))}
                    placeholder="Enter PIN code"
                    className="rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-black dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>
            
            <Button
              onClick={handlePlaceOrder}
              disabled={loading || cartItems.length === 0}
              className="w-full mt-6 bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium rounded-xl"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Order...</span>
                </div>
              ) : (
                `Place Order - ₹${calculateTotal()}`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
