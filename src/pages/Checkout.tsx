
import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
}

const Checkout: React.FC = () => {
  const [customerInfo, setCustomerInfo] = useState({
    phone: '',
    email: '',
    fullName: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    billingSame: true,
    getUpdates: true
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // Default cart item for demo
      setCartItems([
        {
          id: 1,
          name: "Immunity Booster Juice",
          price: 599,
          originalPrice: 799,
          quantity: 2,
          image: "/api/placeholder/150/150"
        }
      ]);
    }
  }, []);

  const updateQuantity = (id: number, change: number) => {
    const updatedItems = cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save5') {
      setCouponApplied(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0);
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.05) : 0;
  const shipping = subtotal > 500 ? 0 : 50;
  const gst = Math.round((subtotal - couponDiscount + shipping) * 0.18);
  const total = subtotal - couponDiscount + shipping + gst;

  const isFormValid = customerInfo.phone && customerInfo.email && customerInfo.fullName && 
                     customerInfo.address && customerInfo.pincode && customerInfo.city && 
                     customerInfo.state && paymentMethod;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl">
              <h2 className="text-xl font-semibold text-black mb-4">Customer Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 bg-white text-black focus:outline-none focus:border-[#c74a1b] rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 bg-white text-black focus:outline-none focus:border-[#c74a1b] rounded-lg"
                />
              </div>
              
              <input
                type="text"
                placeholder="Full Name *"
                value={customerInfo.fullName}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full mt-4 border border-gray-300 px-3 py-2 bg-white text-black focus:outline-none focus:border-[#c74a1b] rounded-lg"
              />
              
              <textarea
                placeholder="Full Address *"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="w-full mt-4 border border-gray-300 px-3 py-2 bg-white text-black focus:outline-none focus:border-[#c74a1b] rounded-lg"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Pincode *"
                  value={customerInfo.pincode}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, pincode: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 bg-white text-black focus:outline-none focus:border-[#c74a1b] rounded-lg"
                />
                <input
                  type="text"
                  placeholder="City *"
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 bg-white text-black focus:outline-none focus:border-[#c74a1b] rounded-lg"
                />
                <input
                  type="text"
                  placeholder="State *"
                  value={customerInfo.state}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, state: e.target.value }))}
                  className="border border-gray-300 px-3 py-2 bg-white text-black focus:outline-none focus:border-[#c74a1b] rounded-lg"
                />
              </div>
              
              <div className="space-y-3 mt-4">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={customerInfo.billingSame}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, billingSame: e.target.checked }))}
                    className="form-checkbox" 
                  />
                  <span className="text-sm text-gray-700">Billing same as delivery address</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={customerInfo.getUpdates}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, getUpdates: e.target.checked }))}
                    className="form-checkbox" 
                  />
                  <span className="text-sm text-gray-700">Get updates via WhatsApp/SMS</span>
                </label>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl">
              <h2 className="text-xl font-semibold text-black mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                {[
                  { value: 'upi', label: 'UPI' },
                  { value: 'cards', label: 'Credit/Debit Cards' },
                  { value: 'wallets', label: 'Wallets' },
                  { value: 'netbanking', label: 'Net Banking' }
                ].map((method) => (
                  <div key={method.value}>
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 hover:bg-gray-50 cursor-pointer rounded-lg">
                      <input 
                        type="radio" 
                        value={method.value} 
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="form-radio" 
                      />
                      <span className="text-black">{method.label}</span>
                    </label>
                    {paymentMethod === 'upi' && method.value === 'upi' && (
                      <input
                        type="text"
                        placeholder="Enter UPI ID"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full ml-6 mt-2 border border-gray-300 px-3 py-2 bg-white text-black focus:outline-none focus:border-[#c74a1b] rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="border border-gray-200 p-4 sm:p-6 bg-white rounded-xl">
              <h2 className="text-xl font-semibold text-black mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-black truncate">{item.name}</h4>
                      <p className="text-xs text-gray-600">₹{item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-6 w-6 p-0 rounded-md"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium text-black min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-6 w-6 p-0 rounded-md"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700 rounded-md"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex space-x-2 mb-6">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border border-gray-300 px-3 py-2 bg-white text-black focus:outline-none focus:border-[#c74a1b] rounded-lg"
                />
                <Button 
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-[#c74a1b] text-white hover:bg-[#b8441a] rounded-lg"
                >
                  Apply
                </Button>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-black">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-green-600">-₹{discount}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Coupon:</span>
                    <span className="text-green-600">-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-black">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%):</span>
                  <span className="text-black">₹{gst}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span className="text-black">Total:</span>
                  <span className="text-[#c74a1b]">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Pay Now Button */}
            <Button 
              className={`w-full py-4 text-white font-semibold text-lg rounded-lg ${
                isFormValid 
                  ? 'bg-[#c74a1b] hover:bg-[#b8441a]' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
            >
              Pay Now - ₹{total}
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
