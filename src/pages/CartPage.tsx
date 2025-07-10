import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  CreditCard,
  Smartphone,
  Wallet,
  Building,
  Banknote,
  CheckCircle,
  X,
  Clock,
  Package,
} from "lucide-react";
import { CartLoadingSkeleton } from "@/components/LoadingSkeleton";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
}

interface Address {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  type: "primary" | "secondary";
  isPrimary: boolean;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    estimatedDelivery: string;
    total: number;
  } | null>(null);
  const navigate = useNavigate();

  // Form states
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    fullName: "",
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    address: "",
    pincode: "",
    city: "",
    state: "",
    billingIsSame: true,
    getUpdates: false,
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Address management states
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isCreatingAddress, setIsCreatingAddress] = useState(false);

  const paymentOptions = [
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "Pay using UPI ID",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay",
    },
    {
      id: "wallet",
      name: "Wallets",
      icon: Wallet,
      description: "Paytm, PhonePe, Google Pay",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building,
      description: "All major banks",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: Banknote,
      description: "Pay when you receive",
    },
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);

      // Load saved addresses
      const addresses = JSON.parse(localStorage.getItem("addresses") || "[]");
      setSavedAddresses(addresses);

      // Load user profile data
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const user = JSON.parse(currentUser);
        setContactInfo({
          phone: user.phone || "",
          email: user.email || "",
          fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        });
      }

      // Auto-select primary address if available
      const primaryAddress = addresses.find((addr: Address) => addr.isPrimary);
      if (primaryAddress) {
        setSelectedAddressId(primaryAddress.id);
        setDeliveryAddress({
          address: primaryAddress.address,
          pincode: primaryAddress.zip,
          city: primaryAddress.city,
          state: primaryAddress.state,
          billingIsSame: true,
          getUpdates: false,
        });
      } else if (addresses.length === 0) {
        // No addresses exist, show address creation form
        setShowAddressForm(true);
      }

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateMRP = () => {
    return cartItems.reduce(
      (total, item) =>
        total + (item.originalPrice || item.price) * item.quantity,
      0
    );
  };

  const getDiscount = () => {
    return calculateMRP() - calculateSubtotal();
  };

  const getCouponDiscount = () => {
    if (appliedCoupon === "SAVE5")
      return Math.floor(calculateSubtotal() * 0.05);
    if (appliedCoupon === "PAYDAY15")
      return Math.floor(calculateSubtotal() * 0.15);
    return 0;
  };

  const getOnlineDiscount = () => {
    return paymentMethod !== "cod" ? Math.floor(calculateSubtotal() * 0.05) : 0;
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
    if (couponCode === "SAVE5" || couponCode === "PAYDAY15") {
      setAppliedCoupon(couponCode);
      setCouponCode("");
    }
  };

  const handleAddressSelection = (addressId: number) => {
    const selectedAddress = savedAddresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      setSelectedAddressId(addressId);
      setDeliveryAddress({
        address: selectedAddress.address,
        pincode: selectedAddress.zip,
        city: selectedAddress.city,
        state: selectedAddress.state,
        billingIsSame: true,
        getUpdates: false,
      });
    }
  };

  const handleCreateAddress = async (newAddressData: any) => {
    setIsCreatingAddress(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const addresses = JSON.parse(localStorage.getItem("addresses") || "[]");
    const hasPrimary = addresses.some((addr: Address) => addr.isPrimary);

    const newAddress: Address = {
      id: Date.now(),
      name: newAddressData.name,
      address: newAddressData.address,
      city: newAddressData.city,
      state: newAddressData.state,
      zip: newAddressData.pincode,
      country: newAddressData.country || "India",
      type: hasPrimary ? "secondary" : "primary",
      isPrimary: !hasPrimary,
    };

    const updatedAddresses = [...addresses, newAddress];
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setSavedAddresses(updatedAddresses);

    // Auto-select the newly created address
    setSelectedAddressId(newAddress.id);
    setDeliveryAddress({
      address: newAddress.address,
      pincode: newAddress.zip,
      city: newAddress.city,
      state: newAddress.state,
      billingIsSame: true,
      getUpdates: false,
    });

    setShowAddressForm(false);
    setIsCreatingAddress(false);
  };

  const validateForm = () => {
    const hasContactInfo = contactInfo.phone && contactInfo.email && contactInfo.fullName;
    const hasAddressSelected = selectedAddressId !== null;
    const hasManualAddress = deliveryAddress.address && deliveryAddress.pincode && deliveryAddress.city && deliveryAddress.state;

    return hasContactInfo && (hasAddressSelected || hasManualAddress);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      if (!contactInfo.phone || !contactInfo.email || !contactInfo.fullName) {
        alert("Please fill in all contact information to proceed");
      } else if (!selectedAddressId && (!deliveryAddress.address || !deliveryAddress.pincode || !deliveryAddress.city || !deliveryAddress.state)) {
        alert("Please select a delivery address or create a new one to proceed");
      }
      return;
    }

    if (cartItems.length === 0) return;

    setSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order details
    const orderId = `ORD${Date.now()}`;
    const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    setOrderDetails({
      orderId,
      estimatedDelivery,
      total: calculateTotal()
    });

    // Save order to localStorage
    const selectedAddress = savedAddresses.find(addr => addr.id === selectedAddressId);
    const shippingAddress = selectedAddress
      ? `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip}`
      : `${deliveryAddress.address}, ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.pincode}`;

    const newOrder = {
      id: parseInt(orderId.replace('ORD', '')),
      date: new Date().toISOString().split('T')[0],
      items: cartItems.reduce((total, item) => total + item.quantity, 0),
      total: calculateTotal(),
      status: "Processing",
      productName: cartItems.length === 1 ? cartItems[0].name : `${cartItems.length} items`,
      productImage: cartItems[0]?.image || "/api/placeholder/100/100",
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod === "upi" ? "UPI Payment" :
                    paymentMethod === "card" ? "Credit/Debit Card" :
                    paymentMethod === "wallet" ? "Digital Wallet" :
                    paymentMethod === "netbanking" ? "Net Banking" : "Cash on Delivery",
      trackingNumber: `TRK${Date.now()}`,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear cart
    localStorage.removeItem("cart");
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    setSubmitting(false);
    setShowOrderConfirmation(true);
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
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Add some products to get started
          </p>
          <Button
            onClick={() => navigate("/shop-all")}
            className="bg-[#111111] hover:bg-[#302e2e] text-white rounded-xl"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  // Order Confirmation Modal
  const OrderConfirmationModal = () => {
    if (!showOrderConfirmation || !orderDetails) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-green-100">Thank you for your purchase</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="text-center">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="text-lg font-bold text-[#1C1C2D]">{orderDetails.orderId}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Order Total</p>
                  <p className="text-sm text-gray-600">₹{orderDetails.total.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900">Estimated Delivery</p>
                  <p className="text-sm text-gray-600">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You'll receive a confirmation email shortly</li>
                <li>• Track your order in the "My Orders" section</li>
                <li>• We'll notify you when your order ships</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate('/account')}
              variant="outline"
              className="flex-1 border-[#1C1C2D] text-[#1C1C2D] hover:bg-[#1C1C2D] hover:text-white"
            >
              View Orders
            </Button>
            <Button
              onClick={() => {
                setShowOrderConfirmation(false);
                navigate('/');
              }}
              className="flex-1 bg-[#1C1C2D] hover:bg-[#2D2D3D] text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <OrderConfirmationModal />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Mobile Order Summary - Visible only on mobile */}
          <div className="lg:hidden bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black dark:text-white">Order summary</h3>
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-black dark:text-white">
                  {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                </span>
                <span className="text-md font-bold text-black dark:text-white">₹{calculateTotal()}</span>
              </div>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-black dark:text-white truncate">{item.name}</h4>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity} • ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-black dark:text-white">Total Amount</span>
                <span className="text-md font-bold text-black dark:text-white">₹{calculateTotal()}</span>
              </div>
              {getTotalSavings() > 0 && (
                <p className="text-green-600 text-xs mt-1">
                  You'll save ₹{getTotalSavings()} on this order
                </p>
              )}
            </div>
          </div>

          {/* Left Column - Forms */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
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
                    onChange={(e) =>
                      setContactInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
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
                    onChange={(e) =>
                      setContactInfo((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    placeholder="Enter full name"
                    className="rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Delivery Address
                </h2>
                {savedAddresses.length > 0 && !showAddressForm && (
                  <Button
                    onClick={() => setShowAddressForm(true)}
                    variant="outline"
                    size="sm"
                    className="text-[#111111] border-[#111111]"
                  >
                    Add New Address
                  </Button>
                )}
              </div>

              {/* Address Selection */}
              {savedAddresses.length > 0 && !showAddressForm && (
                <div className="space-y-3 mb-4">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Select Delivery Address
                  </label>
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedAddressId === address.id
                          ? "border-[#111111] bg-gray-50 dark:bg-gray-700"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                      }`}
                      onClick={() => handleAddressSelection(address.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={selectedAddressId === address.id}
                            onChange={() => handleAddressSelection(address.id)}
                            className="text-[#111111]"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-black dark:text-white">
                                {address.name}
                              </span>
                              {address.isPrimary && (
                                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  Primary
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {address.address}, {address.city}, {address.state} {address.zip}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Address Creation Form */}
              {showAddressForm && (
                <div className="space-y-4 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-black dark:text-white">
                      {savedAddresses.length === 0 ? "Create Primary Address" : "Add New Address"}
                    </h3>
                    {savedAddresses.length > 0 && (
                      <Button
                        onClick={() => setShowAddressForm(false)}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                  <AddressCreationForm
                    onSave={handleCreateAddress}
                    isLoading={isCreatingAddress}
                    isPrimary={savedAddresses.length === 0}
                  />
                </div>
              )}

              {/* Manual Address Entry (fallback) */}
              {!showAddressForm && savedAddresses.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    No saved addresses found. Please create an address to continue.
                  </p>
                  <Button
                    onClick={() => setShowAddressForm(true)}
                    className="bg-[#111111] hover:bg-[#111111]/90 text-white"
                  >
                    Create Address
                  </Button>
                </div>
              )}

              {/* Address Options */}
              {selectedAddressId && !showAddressForm && (
                <div className="space-y-2 pt-4 border-t">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={deliveryAddress.billingIsSame}
                      onChange={(e) =>
                        setDeliveryAddress((prev) => ({
                          ...prev,
                          billingIsSame: e.target.checked,
                        }))
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-black dark:text-white">
                      My billing address is the same as delivery address
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={deliveryAddress.getUpdates}
                      onChange={(e) =>
                        setDeliveryAddress((prev) => ({
                          ...prev,
                          getUpdates: e.target.checked,
                        }))
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-black dark:text-white">
                      Get shipping updates via WhatsApp/SMS
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                {paymentOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <label
                      key={option.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === option.id
                          ? "border-[#c74a1b] dark:border-blue-600 bg-[#c74a1b]/5 dark:bg-blue-600/5"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
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
                        <div className="font-medium text-black dark:text-white">
                          {option.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {option.description}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {paymentMethod === "upi" && (
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

              {paymentMethod !== "cod" && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    🎉 Get extra 5% discount on online payment
                  </p>
                </div>
              )}
            </div>

            {/* Coupon Code */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                Coupon Code
              </h2>
              <div className="flex space-x-2 mb-4">
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="rounded-lg flex-1"
                />
                <Button
                  onClick={applyCoupon}
                  className="bg-[#111111] dark:bg-blue-600 hover:bg-[#302e2e] dark:hover:bg-blue-700 text-white rounded-lg px-6"
                >
                  Apply
                </Button>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setCouponCode("PAYDAY15");
                    applyCoupon();
                  }}
                  className="block w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="font-medium text-black dark:text-white">
                    15% Off
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Code: PAYDAY15 — Tap to Apply
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-4">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-xl font-semibold text-black dark:text-white">Order summary</h2>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-black dark:text-white">₹{calculateTotal()}</span>
                </div>
              </div>

              {/* Product List */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-black dark:text-white mb-2 line-clamp-2 leading-tight">
                          {item.name}
                        </h4>

                        <div className="space-y-1 mb-3">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Size:</span> ONE SIZE
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Quantity:</span> {item.quantity}
                          </div>
                        </div>

                        {/* Price and Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-black dark:text-white">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                ₹{(item.originalPrice * item.quantity).toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0 rounded-full border-gray-300 dark:border-gray-600"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium text-black dark:text-white">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0 rounded-full border-gray-300 dark:border-gray-600"
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total MRP</span>
                    <span className="text-black dark:text-white font-medium">₹{calculateMRP().toLocaleString()}</span>
                  </div>
                  {getDiscount() > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Discount on MRP</span>
                      <span className="text-green-600 font-medium">-₹{getDiscount().toLocaleString()}</span>
                    </div>
                  )}
                  {appliedCoupon && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Coupon Discount ({appliedCoupon})</span>
                      <span className="text-green-600 font-medium">-₹{getCouponDiscount().toLocaleString()}</span>
                    </div>
                  )}
                  {getOnlineDiscount() > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Online Payment Discount</span>
                      <span className="text-green-600 font-medium">-₹{getOnlineDiscount().toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping Fee</span>
                    <span className={getShippingFee() === 0 ? "text-green-600 font-medium" : "text-black dark:text-white font-medium"}>
                      {getShippingFee() === 0 ? 'FREE' : `₹${getShippingFee()}`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-black dark:text-white">Total Amount</span>
                    <span className="text-xl font-bold text-black dark:text-white">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  {getTotalSavings() > 0 && (
                    <p className="text-green-600 text-sm font-medium mt-2">
                      You'll save ₹{getTotalSavings().toLocaleString()} on this order
                    </p>
                  )}
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={submitting || !validateForm()}
                className="w-full mt-6 bg-[#111111] hover:bg-[#302e2e] text-white font-semibold rounded-xl py-4 text-base"
              >
                {submitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  `Place Order • ₹${calculateTotal().toLocaleString()}`
                )}
              </Button>

              {!validateForm() && (
                <p className="text-red-500 text-sm mt-3 text-center">
                  Please fill your delivery details to proceed
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
              <div className="text-xl font-bold text-black dark:text-white">₹{calculateTotal()}</div>
              {getTotalSavings() > 0 && (
                <div className="text-xs text-green-600">You save ₹{getTotalSavings()}</div>
              )}
            </div>
            <Button
              onClick={handlePlaceOrder}
              disabled={submitting || !validateForm()}
              className="bg-[#111111] hover:bg-[#302e2e] text-white font-medium rounded-xl px-8 py-3"
            >
              {submitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Place Order'
              )}
            </Button>
          </div>
          {!validateForm() && (
            <p className="text-red-500 text-xs text-center">
              Please fill your delivery details to proceed
            </p>
          )}
        </div>

        {/* Add bottom padding for mobile sticky bar */}
        <div className="lg:hidden h-24"></div>
      </div>

      <Footer />
    </div>
    </>
  );
};

// Address Creation Form Component
const AddressCreationForm: React.FC<{
  onSave: (addressData: any) => void;
  isLoading: boolean;
  isPrimary: boolean;
}> = ({ onSave, isLoading, isPrimary }) => {
  const [formData, setFormData] = useState({
    name: isPrimary ? "Home" : "Work",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-2">
          Address Name *
        </label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Home, Office"
          className="rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-2">
          Complete Address *
        </label>
        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="House No., Building, Street, Area"
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
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
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
            name="city"
            value={formData.city}
            onChange={handleChange}
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
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="rounded-lg"
            required
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-[#111111] hover:bg-[#111111]/90 text-white"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating...</span>
            </div>
          ) : (
            `Create ${isPrimary ? "Primary" : "Secondary"} Address`
          )}
        </Button>
      </div>
    </form>
  );
};

export default CartPage;
