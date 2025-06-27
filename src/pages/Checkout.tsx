
import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

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

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Immunity Booster Juice",
      price: 599,
      originalPrice: 799,
      quantity: 2,
      image: "/api/placeholder/150/150"
    }
  ]);

  const crossSellProducts = [
    {
      id: 2,
      name: "Digestive Care Capsules",
      price: 449,
      originalPrice: 599,
      image: "/api/placeholder/100/100",
      badge: "25% OFF"
    },
    {
      id: 3,
      name: "Skin Glow Serum",
      price: 899,
      originalPrice: 1199,
      image: "/api/placeholder/100/100",
      badge: "Best Seller"
    }
  ];

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
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
  const totalSavings = discount + couponDiscount;

  const isFormValid = customerInfo.phone && customerInfo.email && customerInfo.fullName && 
                     customerInfo.address && customerInfo.pincode && customerInfo.city && 
                     customerInfo.state && paymentMethod;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-8 tracking-tight">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Customer Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4 tracking-tight">Customer Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-brand-primary"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-brand-primary"
                />
              </div>
              
              <input
                type="text"
                placeholder="Full Name *"
                value={customerInfo.fullName}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full mt-4 border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-brand-primary"
              />
              
              <textarea
                placeholder="Full Address *"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="w-full mt-4 border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-brand-primary"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Pincode *"
                  value={customerInfo.pincode}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, pincode: e.target.value }))}
                  className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-brand-primary"
                />
                <input
                  type="text"
                  placeholder="City *"
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                  className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-brand-primary"
                />
                <input
                  type="text"
                  placeholder="State *"
                  value={customerInfo.state}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, state: e.target.value }))}
                  className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-brand-primary"
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
                  <span className="text-sm text-gray-700 dark:text-gray-300">Billing same as delivery address</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={customerInfo.getUpdates}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, getUpdates: e.target.checked }))}
                    className="form-checkbox" 
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Get updates via WhatsApp/SMS</span>
                </label>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4 tracking-tight">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                  <input 
                    type="radio" 
                    value="upi" 
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio" 
                  />
                  <span className="text-black dark:text-white">UPI</span>
                </label>
                {paymentMethod === 'upi' && (
                  <input
                    type="text"
                    placeholder="Enter UPI ID"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full ml-6 border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-brand-primary"
                  />
                )}
                
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                  <input 
                    type="radio" 
                    value="cards" 
                    checked={paymentMethod === 'cards'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio" 
                  />
                  <span className="text-black dark:text-white">Credit/Debit Cards</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                  <input 
                    type="radio" 
                    value="wallets" 
                    checked={paymentMethod === 'wallets'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio" 
                  />
                  <span className="text-black dark:text-white">Wallets</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                  <input 
                    type="radio" 
                    value="netbanking" 
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio" 
                  />
                  <span className="text-black dark:text-white">Net Banking</span>
                </label>
              </div>
              
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  💡 Cash on Delivery is available for orders below ₹2500
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">Trusted by:</span>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>UPI</span> • <span>Visa</span> • <span>Paytm</span> • <span>RuPay</span> • <span>Google Pay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4 tracking-tight">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-black dark:text-white">{item.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">₹{item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium text-black dark:text-white min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
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
                  className="flex-1 border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-brand-primary"
                />
                <Button 
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-brand-primary text-white hover:bg-brand-secondary"
                >
                  Apply
                </Button>
              </div>
              
              {couponApplied && (
                <div className="mb-4 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-200">✅ 5% OFF coupon applied!</p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">MRP:</span>
                  <span className="text-black dark:text-white">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Discount:</span>
                    <span className="text-green-600">-₹{discount}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Coupon:</span>
                    <span className="text-green-600">-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                  <span className="text-black dark:text-white">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">GST (18%):</span>
                  <span className="text-black dark:text-white">₹{gst}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
                  <span className="text-black dark:text-white">Total:</span>
                  <span className="text-brand-primary">₹{total}</span>
                </div>
                {totalSavings > 0 && (
                  <p className="text-sm text-green-600 text-center">
                    🎉 You'll save ₹{totalSavings} on this order
                  </p>
                )}
              </div>
            </div>

            {/* Cross-sell Products */}
            <div className="border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4 tracking-tight">You might also like</h3>
              <div className="space-y-3">
                {crossSellProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-black dark:text-white">{product.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-black dark:text-white">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                        <span className="text-xs bg-brand-primary text-white px-2 py-1">{product.badge}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-brand-primary text-white hover:bg-brand-secondary"
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pay Now Button */}
            <Button 
              className={`w-full py-4 text-white font-semibold text-lg ${
                isFormValid 
                  ? 'bg-brand-primary hover:bg-brand-secondary' 
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
