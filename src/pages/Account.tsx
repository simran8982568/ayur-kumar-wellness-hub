import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: number;
  date: string;
  items: number;
  total: number;
  status: string;
  productName: string;
  productImage: string;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
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

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      date: "2023-01-15",
      items: 3,
      total: 145.0,
      status: "Delivered",
      productName: "Ayurvedic Strength Booster",
      productImage: "/api/placeholder/100/100",
      shippingAddress: "123 Main St, Anytown, CA 91234",
      paymentMethod: "Credit Card ending in 1234",
      trackingNumber: "TRK123456789",
    },
    {
      id: 2,
      date: "2023-02-01",
      items: 1,
      total: 79.99,
      status: "Shipped",
      productName: "Herbal Wellness Capsules",
      productImage: "/api/placeholder/100/100",
      shippingAddress: "123 Main St, Anytown, CA 91234",
      paymentMethod: "UPI Payment",
      trackingNumber: "TRK987654321",
    },
    {
      id: 3,
      date: "2023-02-15",
      items: 2,
      total: 98.5,
      status: "Processing",
      productName: "Natural Energy Sachets",
      productImage: "/api/placeholder/100/100",
      shippingAddress: "123 Main St, Anytown, CA 91234",
      paymentMethod: "Debit Card ending in 5678",
    },
  ]);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "Home",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "91234",
      country: "USA",
      type: "primary",
      isPrimary: true,
    },
    {
      id: 2,
      name: "Work",
      address: "456 Business Ave",
      city: "Anytown",
      state: "CA",
      zip: "91234",
      country: "USA",
      type: "secondary",
      isPrimary: false,
    },
  ]);

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
  });

  useEffect(() => {
    // Load profile data from localStorage
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    }

    // Load addresses from localStorage
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    // Save profile data to localStorage
    localStorage.setItem("profile", JSON.stringify(profileData));

    toast({
      title: "Profile Updated!",
      description: "Your profile has been updated successfully.",
    });
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1C1C2D]">My Profile</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={profileData.name}
            readOnly
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            title="Name cannot be changed"
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
            disabled
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
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            title="Phone number cannot be changed"
          />
        </div>
      </form>
      {/* Show primary and secondary addresses in profile section */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[#1C1C2D] mt-6">
          Saved Addresses
        </h3>
        {addresses.length === 0 && (
          <p className="text-gray-500">No addresses saved.</p>
        )}
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`rounded-lg border p-3 mb-2 ${
              address.isPrimary
                ? "border-blue-300 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="font-medium text-gray-900">{address.name}</span>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  address.isPrimary
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {address.isPrimary ? "Primary Address" : "Secondary Address"}
              </span>
            </div>
            <div className="text-gray-600 text-sm">
              {address.address}, {address.city}, {address.state} {address.zip},
              {address.country}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrdersSection = () => {
    if (selectedOrder) {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              onClick={() => setSelectedOrder(null)}
              variant="outline"
              className="text-[#111111] border-[#111111]"
            >
              ← Back to Orders
            </Button>
            <h2 className="text-2xl font-bold text-[#1C1C2D]">Order Details</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div>
                <img
                  src={selectedOrder.productImage}
                  alt={selectedOrder.productName}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Order Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedOrder.productName}
                  </h3>
                  <p className="text-lg font-medium text-[#111111]">
                    ₹{selectedOrder.total}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Order ID</p>
                    <p className="font-medium">#{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Order Date</p>
                    <p className="font-medium">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedOrder.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : selectedOrder.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500">Items</p>
                    <p className="font-medium">{selectedOrder.items}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Shipping Address</p>
                  <p className="font-medium">{selectedOrder.shippingAddress}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Payment Method</p>
                  <p className="font-medium">{selectedOrder.paymentMethod}</p>
                </div>

                {selectedOrder.trackingNumber && (
                  <div>
                    <p className="text-gray-500 text-sm">Tracking Number</p>
                    <p className="font-medium">
                      {selectedOrder.trackingNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Breakdown */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({selectedOrder.items} items)</span>
                  <span>₹{(selectedOrder.total * 0.85).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{(selectedOrder.total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{(selectedOrder.total * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{selectedOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              {selectedOrder.status === "Delivered" && (
                <Button
                  onClick={() =>
                    navigate("/return-product", {
                      state: { order: selectedOrder },
                    })
                  }
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Return Product
                </Button>
              )}
              {selectedOrder.trackingNumber && (
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://track.example.com/${selectedOrder.trackingNumber}`,
                      "_blank"
                    )
                  }
                >
                  Track Order
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#1C1C2D]">My Orders</h2>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {order.productName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Order #{order.id} • {order.date}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-lg font-medium text-[#111111]">
                        ₹{order.total}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedOrder(order)}
                    variant="outline"
                    className="text-[#111111] border-[#111111]"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No orders found.</p>
        )}
      </div>
    );
  };

  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const handleAddressUpdate = (updatedAddress: Address) => {
    // If changing to primary, make sure no other address is primary
    let updatedAddresses = addresses.map((addr) => {
      if (addr.id === updatedAddress.id) {
        return updatedAddress;
      } else if (updatedAddress.isPrimary && addr.isPrimary) {
        return { ...addr, isPrimary: false, type: "secondary" as const };
      }
      return addr;
    });

    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setEditingAddress(null);

    toast({
      title: "Address Updated!",
      description: "Your address has been updated successfully.",
    });
  };

  const handleAddressAdd = (newAddress: Omit<Address, "id">) => {
    // Check if we already have 2 addresses
    if (addresses.length >= 2) {
      toast({
        title: "Address Limit Reached",
        description:
          "You can only have a maximum of 2 addresses (Primary and Secondary).",
        variant: "destructive",
      });
      return;
    }

    // Determine address type based on existing addresses
    const hasPrimary = addresses.some((addr) => addr.isPrimary);
    const addressType: "primary" | "secondary" = hasPrimary
      ? "secondary"
      : "primary";
    const isPrimary = addressType === "primary";

    const addressWithId: Address = {
      ...newAddress,
      id: Date.now(),
      type: addressType,
      isPrimary: isPrimary,
    };

    const updatedAddresses = [...addresses, addressWithId];
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setIsAddingAddress(false);

    toast({
      title: "Address Added!",
      description: `${
        isPrimary ? "Primary" : "Secondary"
      } address has been added successfully.`,
    });
  };

  const handleAddressDelete = (addressId: number) => {
    const addressToDelete = addresses.find((addr) => addr.id === addressId);
    let updatedAddresses = addresses.filter((addr) => addr.id !== addressId);

    // If deleting primary address and there's a secondary, promote secondary to primary
    if (addressToDelete?.isPrimary && updatedAddresses.length > 0) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        type: "primary" as const,
        isPrimary: true,
      }));
    }

    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

    toast({
      title: "Address Deleted!",
      description: "Address has been removed successfully.",
    });
  };

  const renderAddressesSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#1C1C2D]">Addresses</h2>
        {addresses.length < 2 && (
          <Button
            onClick={() => setIsAddingAddress(true)}
            className="bg-[#111111] hover:bg-[#111111]/90 text-white"
          >
            Add {addresses.length === 0 ? "Primary" : "Secondary"} Address
          </Button>
        )}
      </div>

      {isAddingAddress && (
        <AddressForm
          onSave={handleAddressAdd}
          onCancel={() => setIsAddingAddress(false)}
        />
      )}

      {editingAddress && (
        <AddressForm
          address={editingAddress}
          onSave={handleAddressUpdate}
          onCancel={() => setEditingAddress(null)}
        />
      )}

      {addresses.map((address) => (
        <div
          key={address.id}
          className={`bg-white rounded-lg shadow-sm border p-4 ${
            address.isPrimary ? "border-blue-300 bg-blue-50" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {address.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    address.isPrimary
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {address.isPrimary ? "Primary Address" : "Secondary Address"}
                </span>
              </div>
              <p className="text-gray-600">{address.address}</p>
              <p className="text-gray-600">
                {address.city}, {address.state} {address.zip}
              </p>
              <p className="text-gray-600">{address.country}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setEditingAddress(address)}
                variant="outline"
                size="sm"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleAddressDelete(address.id)}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const AddressForm: React.FC<{
    address?: Address;
    onSave: (address: any) => void;
    onCancel: () => void;
  }> = ({ address, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: address?.name || "",
      address: address?.address || "",
      city: address?.city || "",
      state: address?.state || "",
      zip: address?.zip || "",
      country: address?.country || "India",
      isPrimary: address?.isPrimary || false,
    });

    const hasPrimary = addresses.some(
      (addr) => addr.isPrimary && addr.id !== address?.id
    );
    const canBePrimary = !hasPrimary || address?.isPrimary;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const addressData = {
        ...formData,
        type: formData.isPrimary
          ? ("primary" as const)
          : ("secondary" as const),
      };

      if (address) {
        onSave({ ...address, ...addressData });
      } else {
        onSave(addressData);
      }
    };

    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {address ? "Edit Address" : "Add New Address"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="e.g., Home, Office"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
            />
          </div>

          {/* Address Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Type *
            </label>
            <div className="space-y-3">
              <label className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="addressType"
                  checked={formData.isPrimary}
                  onChange={() => setFormData({ ...formData, isPrimary: true })}
                  disabled={!canBePrimary && !formData.isPrimary}
                  className="mt-1 mr-3 text-[#111111] focus:ring-[#111111]"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    Primary Address
                  </div>
                  <div className="text-sm text-gray-600">
                    Default address for orders and shipping
                  </div>
                </div>
                {formData.isPrimary && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Default for orders
                  </span>
                )}
              </label>
              <label className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="addressType"
                  checked={!formData.isPrimary}
                  onChange={() =>
                    setFormData({ ...formData, isPrimary: false })
                  }
                  className="mt-1 mr-3 text-[#111111] focus:ring-[#111111]"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    Secondary Address
                  </div>
                  <div className="text-sm text-gray-600">
                    Alternative address for deliveries
                  </div>
                </div>
              </label>
            </div>
            {!canBePrimary && !formData.isPrimary && (
              <p className="text-sm text-gray-500 mt-1">
                You already have a primary address. This will be set as
                secondary.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Address *
            </label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111111] focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              type="submit"
              className="bg-[#111111] hover:bg-[#111111]/90 text-white"
            >
              {address ? "Update Address" : "Add Address"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  };

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
                    { id: "profile", label: "My Profile", icon: "👤" },
                    { id: "orders", label: "My Orders", icon: "📦" },
                    { id: "addresses", label: "Addresses", icon: "📍" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-[#111111] text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#111111]"
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
                {activeTab === "profile" && renderProfileSection()}
                {activeTab === "orders" && renderOrdersSection()}
                {activeTab === "addresses" && renderAddressesSection()}
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
