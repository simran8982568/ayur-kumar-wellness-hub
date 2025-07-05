
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Package, LogOut, Edit, Eye } from "lucide-react";

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Check URL parameters for tab navigation
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['profile', 'orders'].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    // Load user data
    const name = localStorage.getItem("userName") || "User";
    const email = localStorage.getItem("userEmail") || "";
    setUserData({ name, email, phone: "+91 9876543210" });
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const handleSaveProfile = () => {
    localStorage.setItem("userName", userData.name);
    localStorage.setItem("userEmail", userData.email);
    setIsEditing(false);
  };

  const handleViewOrderDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const sidebarItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
  ];

  const dummyOrders = [
    {
      id: "ORD001",
      date: "2024-01-15",
      products: [
        { name: "Immunity Booster Juice", quantity: 2, price: 500, image: "/lovable-uploads/b68b6220-d7de-409e-9588-7bd57831d577.png" },
        { name: "Digestive Care Capsules", quantity: 1, price: 548, image: "/lovable-uploads/cd3f5eda-8484-4dee-940d-f87e26cac841.png" }
      ],
      total: 1048,
      status: "Delivered",
      shippingAddress: "123 Main St, City, State 12345",
      paymentMethod: "Credit Card"
    },
    {
      id: "ORD002",
      date: "2024-01-20",
      products: [
        { name: "Skin Glow Serum", quantity: 1, price: 899, image: "/lovable-uploads/ed6e92d3-776a-4b30-b919-b7a35406bf8f.png" }
      ],
      total: 899,
      status: "Pending",
      shippingAddress: "456 Oak Ave, Town, State 67890",
      paymentMethod: "UPI"
    },
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
                <div className="w-16 h-16 bg-[#111111] rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-black">
                  {userData.name}
                </h2>
                <p className="text-gray-600 text-sm">{userData.email}</p>
              </div>

              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-[#111111] text-white"
                        : "text-gray-700 hover:bg-gray-100"
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
                className="w-full mt-6 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-black">
                      My Profile
                    </h2>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      className="border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white rounded-lg"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
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
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
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
                        onChange={(e) =>
                          setUserData({ ...userData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        className="rounded-lg"
                      />
                    </div>

                    {isEditing && (
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-[#111111] hover:bg-[#302e2e] text-white rounded-lg"
                      >
                        Save Changes
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold text-black mb-6">
                    My Orders
                  </h2>
                  
                  {selectedOrder ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Order Details - #{selectedOrder.id}</h3>
                        <Button
                          onClick={() => setSelectedOrder(null)}
                          variant="outline"
                          className="border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white rounded-lg"
                        >
                          Back to Orders
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-black mb-2">Order Information</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                              <p><strong>Date:</strong> {selectedOrder.date}</p>
                              <p><strong>Status:</strong> 
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                  selectedOrder.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {selectedOrder.status}
                                </span>
                              </p>
                              <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-black mb-2">Shipping Address</h4>
                            <p className="text-sm text-gray-600">{selectedOrder.shippingAddress}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-black mb-2">Payment Method</h4>
                            <p className="text-sm text-gray-600">{selectedOrder.paymentMethod}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-black mb-2">Products</h4>
                          <div className="space-y-3">
                            {selectedOrder.products.map((product: any, index: number) => (
                              <div key={index} className="flex items-center space-x-3 border border-gray-200 rounded-lg p-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h5 className="font-medium text-black">{product.name}</h5>
                                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                                  <p className="text-sm font-semibold text-black">₹{product.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {dummyOrders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-black">
                                Order #{order.id}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Placed on {order.date}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 mb-3">
                            {order.products.map((product, index) => (
                              <img
                                key={index}
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm text-gray-600">Products:</p>
                            <ul className="text-sm text-black">
                              {order.products.map((product, index) => (
                                <li key={index}>• {product.name} (x{product.quantity})</li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-black">
                              Total: ₹{order.total}
                            </span>
                            <Button
                              onClick={() => handleViewOrderDetails(order)}
                              variant="outline"
                              size="sm"
                              className="border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white rounded-lg"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
