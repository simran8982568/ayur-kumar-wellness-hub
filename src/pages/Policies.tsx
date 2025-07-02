
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Policies = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('return-request');
  
  // Return Request Form State
  const [returnForm, setReturnForm] = useState({
    orderId: '',
    fullName: '',
    email: '',
    productName: '',
    quantity: '',
    amountPaid: '',
    reason: '',
    dateOfRequest: new Date().toISOString().split('T')[0]
  });

  // Track Return State
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const handleReturnFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReturnForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReturnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage (mock backend)
    const returns = JSON.parse(localStorage.getItem('productReturns') || '[]');
    const newReturn = {
      ...returnForm,
      id: Date.now(),
      status: 'Pending',
      timestamp: new Date().toISOString()
    };
    
    returns.push(newReturn);
    localStorage.setItem('productReturns', JSON.stringify(returns));

    toast({
      title: "✅ Return request submitted successfully!",
      description: "We'll process your return request and contact you soon.",
    });

    // Reset form
    setReturnForm({
      orderId: '',
      fullName: '',
      email: '',
      productName: '',
      quantity: '',
      amountPaid: '',
      reason: '',
      dateOfRequest: new Date().toISOString().split('T')[0]
    });
  };

  const handleTrackReturn = () => {
    const returns = JSON.parse(localStorage.getItem('productReturns') || '[]');
    const foundReturn = returns.find((ret: any) => ret.orderId === trackOrderId);
    
    if (foundReturn) {
      setTrackingResult(foundReturn);
    } else {
      setTrackingResult(null);
      toast({
        title: "❌ No return found for this Order ID.",
        description: "Please check your Order ID and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-8 text-center">
            Product Return Policy – Dr. Kumar Laboratories
          </h1>
          
          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('return-request')}
              className={`pb-2 px-4 font-medium transition-colors duration-200 ${
                activeTab === 'return-request'
                  ? 'text-[#111111] dark:text-blue-400 border-b-2 border-[#111111] dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#111111] dark:hover:text-blue-400'
              }`}
            >
              Return Request
            </button>
            <button
              onClick={() => setActiveTab('track-return')}
              className={`pb-2 px-4 font-medium transition-colors duration-200 ${
                activeTab === 'track-return'
                  ? 'text-[#111111] dark:text-blue-400 border-b-2 border-[#111111] dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#111111] dark:hover:text-blue-400'
              }`}
            >
              Track Return Status
            </button>
          </div>

          {/* Return Request Form */}
          {activeTab === 'return-request' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-6">
                Submit Return Request
              </h2>
              
              <form onSubmit={handleReturnSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Order ID *
                    </label>
                    <Input
                      name="orderId"
                      type="text"
                      required
                      value={returnForm.orderId}
                      onChange={handleReturnFormChange}
                      placeholder="e.g., ORD-2024-005"
                      className="rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <Input
                      name="fullName"
                      type="text"
                      required
                      value={returnForm.fullName}
                      onChange={handleReturnFormChange}
                      className="rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      required
                      value={returnForm.email}
                      onChange={handleReturnFormChange}
                      className="rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Product Name *
                    </label>
                    <Input
                      name="productName"
                      type="text"
                      required
                      value={returnForm.productName}
                      onChange={handleReturnFormChange}
                      className="rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quantity *
                    </label>
                    <Input
                      name="quantity"
                      type="number"
                      required
                      value={returnForm.quantity}
                      onChange={handleReturnFormChange}
                      className="rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount Paid (₹) *
                    </label>
                    <Input
                      name="amountPaid"
                      type="number"
                      required
                      value={returnForm.amountPaid}
                      onChange={handleReturnFormChange}
                      className="rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date of Request
                    </label>
                    <Input
                      name="dateOfRequest"
                      type="date"
                      value={returnForm.dateOfRequest}
                      onChange={handleReturnFormChange}
                      className="rounded-md"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reason for Return *
                  </label>
                  <select
                    name="reason"
                    required
                    value={returnForm.reason}
                    onChange={handleReturnFormChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-blue-600"
                  >
                    <option value="">Select reason</option>
                    <option value="Defective product">Defective product</option>
                    <option value="Wrong item received">Wrong item received</option>
                    <option value="Damaged packaging">Damaged packaging</option>
                    <option value="Not satisfied with quality">Not satisfied with quality</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#111111] dark:bg-blue-600 hover:bg-[#302e2e] dark:hover:bg-blue-700 text-white rounded-full hover:opacity-90 transition-all duration-300"
                >
                  Submit Request
                </Button>
              </form>
            </div>
          )}

          {/* Track Return Status */}
          {activeTab === 'track-return' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-6">
                🔎 Track Your Return Status
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Enter Your Order ID
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={trackOrderId}
                      onChange={(e) => setTrackOrderId(e.target.value)}
                      placeholder="e.g., ORD-2024-005"
                      className="rounded-md"
                    />
                    <Button
                      onClick={handleTrackReturn}
                      className="bg-[#111111] dark:bg-blue-600 hover:bg-[#302e2e] dark:hover:bg-blue-700 text-white rounded-md px-6"
                    >
                      Check Status
                    </Button>
                  </div>
                </div>

                {/* Tracking Result */}
                {trackingResult && (
                  <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-black dark:text-white mb-3">Return Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Order ID:</span>
                        <span className="ml-2 text-black dark:text-white">{trackingResult.orderId}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Product Name:</span>
                        <span className="ml-2 text-black dark:text-white">{trackingResult.productName}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Reason for Return:</span>
                        <span className="ml-2 text-black dark:text-white">{trackingResult.reason}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          trackingResult.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                          trackingResult.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          trackingResult.status === 'Refunded' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {trackingResult.status}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Date of Request:</span>
                        <span className="ml-2 text-black dark:text-white">{trackingResult.dateOfRequest}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Policies;
