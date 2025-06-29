
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Smartphone, Wallet, Building, Banknote } from 'lucide-react';
import { CartLoadingSkeleton } from '@/components/LoadingSkeleton';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    fullName: '',
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    address: '',
    pincode: '',
    city: '',
    state: '',
    billingIsSame: true,
    getUpdates: false,
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cart);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateMRP = () => {
    return cartItems.reduce((total, item) => total + ((item.originalPrice || item.price) * item.quantity), 0);
  };

  const getDiscount = () => {
    return calculateMRP() - calculateSubtotal();
  };

  const getCouponDiscount = () => {
    if (appliedCoupon === 'SAVE5') return Math.floor(calculateSubtotal() * 0.05);
    if (appliedCoupon === 'PAYDAY15') return Math.floor(calculateSubtotal() * 0.15);
    return 0;
  };

  const getOnlineDiscount = () => {
    return paymentMethod !== 'cod' ? Math.floor(calculateSubtotal() * 0.05) : 0;
  };

  const getShippingFee = () => {
    return calculateSubtotal() >= 699 ? 0 : 40;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const couponDiscount = getCouponDiscount();
    const onlineDiscount = getOnlineDiscount();
    const shipping = getShippingFee();
    return subtotal - couponDiscount - onlineDiscount + shipping;
  };

  const getTotalSavings = () => {
    return getDiscount() + getCouponDiscount() + getOnlineDiscount();
  };

  const applyCoupon = () => {
    if (couponCode === 'SAVE5' || couponCode === 'PAYDAY15') {
      setAppliedCoupon(couponCode);
      setCouponCode('');
    }
  };

  const validateForm = () => {
    return contactInfo.phone && contactInfo.email && contactInfo.fullName &&
           deliveryAddress.address && deliveryAddress.pincode && deliveryAddress.city && deliveryAddress.state;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      alert('Please fill in all required delivery details to proceed');
      return;
    }

    if (cartItems.length === 0) return;
    
    setSubmitting(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart
    localStorage.removeItem('cart');
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    alert('Order placed successfully! You will receive a confirmation email shortly.');
    navigate('/');
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <CartLoadingSkeleton />
        </div>
      </div>
    );
  }

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

  const paymentOptions = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using UPI ID' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'wallet', name: 'Wallets', icon: Wallet, description: 'Paytm, PhonePe, Google Pay' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'All major banks' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                    className="rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email"
                    className="rounded-lg"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Full Name *
                  </label>
                  <Input
                    value={contactInfo.fullName}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter full name"
                    className="rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Address (House No., Building, Street, Area) *
                  </label>
                  <Input
                    value={deliveryAddress.address}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter complete address"
                    className="rounded-lg"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      Pincode *
                    </label>
                    <Input
                      value={deliveryAddress.pincode}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, pincode: e.target.value }))}
                      placeholder="PIN code"
                      className="rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      City *
                    </label>
                    <Input
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="City"
                      className="rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      State *
                    </label>
                    <Input
                      value={deliveryAddress.state}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="State"
                      className="rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={deliveryAddress.billingIsSame}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, billingIsSame: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm text-black dark:text-white">My billing address is the same as delivery address</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={deliveryAddress.getUpdates}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, getUpdates: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm text-black dark:text-white">Get shipping updates via WhatsApp/SMS</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <label
                      key={option.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === option.id
                          ? 'border-[#c74a1b] dark:border-blue-600 bg-[#c74a1b]/5 dark:bg-blue-600/5'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={option.id}
                        checked={paymentMethod === option.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <IconComponent className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-300" />
                      <div>
                        <div className="font-medium text-black dark:text-white">{option.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{option.description}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
              
              {paymentMethod === 'upi' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    UPI ID
                  </label>
                  <Input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID (e.g., user@paytm)"
                    className="rounded-lg"
                  />
                </div>
              )}

              {paymentMethod !== 'cod' && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    🎉 Get extra 5% discount on online payment
                  </p>
                </div>
              )}
            </div>

            {/* Coupon Code */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Coupon Code</h2>
              <div className="flex space-x-2 mb-4">
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="rounded-lg flex-1"
                />
                <Button
                  onClick={applyCoupon}
                  className="bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white rounded-lg px-6"
                >
                  Apply
                </Button>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => { setCouponCode('PAYDAY15'); applyCoupon(); }}
                  className="block w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="font-medium text-black dark:text-white">15% Off</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Code: PAYDAY15 — Tap to Apply</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-4">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-black dark:text-white truncate">{item.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-black dark:text-white">₹{item.price}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0 rounded-full"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium text-black dark:text-white">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0 rounded-full"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 p-0 rounded-full ml-2"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total MRP</span>
                  <span className="text-black dark:text-white">₹{calculateMRP()}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Discount on MRP</span>
                    <span className="text-green-600">-₹{getDiscount()}</span>
                  </div>
                )}
                {appliedCoupon && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Coupon Discount ({appliedCoupon})</span>
                    <span className="text-green-600">-₹{getCouponDiscount()}</span>
                  </div>
                )}
                {getOnlineDiscount() > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Online Payment Discount</span>
                    <span className="text-green-600">-₹{getOnlineDiscount()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Shipping Fee</span>
                  <span className={getShippingFee() === 0 ? "text-green-600" : "text-black dark:text-white"}>
                    {getShippingFee() === 0 ? 'FREE' : `₹${getShippingFee()}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t">
                  <span className="text-black dark:text-white">Grand Total</span>
                  <span className="text-black dark:text-white">₹{calculateTotal()}</span>
                </div>
                {getTotalSavings() > 0 && (
                  <p className="text-green-600 text-sm font-medium">
                    You'll save ₹{getTotalSavings()} on this order
                  </p>
                )}
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={submitting || !validateForm()}
                className="w-full mt-6 bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium rounded-xl py-3"
              >
                {submitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  `Place Order - ₹${calculateTotal()}`
                )}
              </Button>

              {!validateForm() && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  Please fill your delivery details to proceed
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;
