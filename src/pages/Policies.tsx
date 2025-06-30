import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Policies = () => {
  const [activeSection, setActiveSection] = useState('privacy');
  const [returnForm, setReturnForm] = useState({
    orderId: '',
    fullName: '',
    email: '',
    productName: '',
    quantity: 1,
    amountPaid: '',
    reason: '',
    dateOfRequest: new Date().toISOString().split('T')[0]
  });
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const { toast } = useToast();

  const sections = [
    { id: 'privacy', title: 'Privacy Policy' },
    { id: 'terms', title: 'Terms & Conditions' },
    { id: 'return', title: 'Return Policy' },
    { id: 'shipping', title: 'Shipping Policy' }
  ];

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage (simulating backend)
    const existingReturns = JSON.parse(localStorage.getItem('returns') || '[]');
    const newReturn = {
      ...returnForm,
      status: 'Pending',
      id: Date.now()
    };
    existingReturns.push(newReturn);
    localStorage.setItem('returns', JSON.stringify(existingReturns));
    
    toast({
      title: "Return Request Submitted Successfully!",
      description: "We'll process your request and get back to you soon.",
    });
    
    // Reset form
    setReturnForm({
      orderId: '',
      fullName: '',
      email: '',
      productName: '',
      quantity: 1,
      amountPaid: '',
      reason: '',
      dateOfRequest: new Date().toISOString().split('T')[0]
    });
  };

  const handleTrackReturn = (e: React.FormEvent) => {
    e.preventDefault();
    
    const returns = JSON.parse(localStorage.getItem('returns') || '[]');
    const foundReturn = returns.find((ret: any) => ret.orderId === trackingOrderId);
    
    if (foundReturn) {
      setTrackingResult(foundReturn);
    } else {
      setTrackingResult(null);
      toast({
        title: "No Return Found",
        description: "No return found for this Order ID.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Policies & Legal</h1>
            <nav className="text-sm text-gray-600 dark:text-gray-300">
              <Link to="/" className="hover:text-[#c74a1b] dark:hover:text-blue-400">Home</Link>
              <span className="mx-2">/</span>
              <span>Policies</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 sticky top-24 rounded-lg">
                <h3 className="font-semibold mb-4 text-black dark:text-white">Quick Navigation</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-3 transition-colors rounded-lg ${
                        activeSection === section.id
                          ? 'bg-[#c74a1b] dark:bg-blue-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg">
                
                {/* Return Policy with Forms */}
                {activeSection === 'return' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Return Policy</h2>
                    
                    {/* Return Request Form */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">Submit Return Request</h3>
                      <form onSubmit={handleReturnSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-black dark:text-white mb-2">
                              Order ID *
                            </label>
                            <input
                              type="text"
                              required
                              value={returnForm.orderId}
                              onChange={(e) => setReturnForm({...returnForm, orderId: e.target.value})}
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                              placeholder="ORD-2024-005"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-black dark:text-white mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={returnForm.fullName}
                              onChange={(e) => setReturnForm({...returnForm, fullName: e.target.value})}
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-black dark:text-white mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={returnForm.email}
                            onChange={(e) => setReturnForm({...returnForm, email: e.target.value})}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-black dark:text-white mb-2">
                              Product Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={returnForm.productName}
                              onChange={(e) => setReturnForm({...returnForm, productName: e.target.value})}
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-black dark:text-white mb-2">
                              Quantity *
                            </label>
                            <input
                              type="number"
                              min="1"
                              required
                              value={returnForm.quantity}
                              onChange={(e) => setReturnForm({...returnForm, quantity: parseInt(e.target.value)})}
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-black dark:text-white mb-2">
                            Amount Paid (₹) *
                          </label>
                          <input
                            type="number"
                            required
                            value={returnForm.amountPaid}
                            onChange={(e) => setReturnForm({...returnForm, amountPaid: e.target.value})}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-black dark:text-white mb-2">
                            Reason for Return *
                          </label>
                          <select
                            required
                            value={returnForm.reason}
                            onChange={(e) => setReturnForm({...returnForm, reason: e.target.value})}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                          >
                            <option value="">Select a reason</option>
                            <option value="Defective product">Defective product</option>
                            <option value="Wrong item received">Wrong item received</option>
                            <option value="Damaged packaging">Damaged packaging</option>
                            <option value="Not satisfied with quality">Not satisfied with quality</option>
                          </select>
                        </div>

                        <Button
                          type="submit"
                          className="bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full transition-colors duration-200"
                        >
                          Submit Request
                        </Button>
                      </form>
                    </div>

                    {/* Track Return Status */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-8">
                      <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">🔎 Track Your Return Status</h3>
                      <form onSubmit={handleTrackReturn} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-black dark:text-white mb-2">
                            Enter Your Order ID
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={trackingOrderId}
                              onChange={(e) => setTrackingOrderId(e.target.value)}
                              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
                              placeholder="ORD-2024-005"
                            />
                            <Button
                              type="submit"
                              className="bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
                            >
                              Check Status
                            </Button>
                          </div>
                        </div>
                      </form>

                      {/* Tracking Result */}
                      {trackingResult && (
                        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <h4 className="font-semibold text-black dark:text-white mb-2">Return Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-black dark:text-white">Order ID:</span>
                              <span className="ml-2 text-gray-600 dark:text-gray-300">{trackingResult.orderId}</span>
                            </div>
                            <div>
                              <span className="font-medium text-black dark:text-white">Product:</span>
                              <span className="ml-2 text-gray-600 dark:text-gray-300">{trackingResult.productName}</span>
                            </div>
                            <div>
                              <span className="font-medium text-black dark:text-white">Reason:</span>
                              <span className="ml-2 text-gray-600 dark:text-gray-300">{trackingResult.reason}</span>
                            </div>
                            <div>
                              <span className="font-medium text-black dark:text-white">Status:</span>
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                trackingResult.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                                trackingResult.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {trackingResult.status}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-black dark:text-white">Date:</span>
                              <span className="ml-2 text-gray-600 dark:text-gray-300">{trackingResult.dateOfRequest}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Return Policy Text */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-8 mt-8">
                      <div className="prose max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                        <p><strong>Last updated:</strong> December 2024</p>
                        
                        <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Return Window</h3>
                        <p>You have 30 days from the date of delivery to return unopened products in their original packaging.</p>
                        
                        <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Eligible Items</h3>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Unopened products in original packaging</li>
                          <li>Products with manufacturing defects</li>
                          <li>Incorrect items shipped</li>
                        </ul>
                        
                        <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Non-Returnable Items</h3>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Opened or used products</li>
                          <li>Products without original packaging</li>
                          <li>Perishable items</li>
                        </ul>
                        
                        <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Refunds</h3>
                        <p>Refunds will be processed within 5-7 business days after we receive and inspect the returned item.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other sections remain the same */}
                {activeSection === 'privacy' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Privacy Policy</h2>
                    <div className="prose max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                      <p><strong>Last updated:</strong> December 2024</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Information We Collect</h3>
                      <p>Dr. Kumar Laboratories collects information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">How We Use Your Information</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>To process your orders and provide customer service</li>
                        <li>To send you order confirmations and shipping updates</li>
                        <li>To improve our products and services</li>
                        <li>To comply with legal obligations</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Contact Us</h3>
                      <p>If you have questions about this Privacy Policy, please contact us at info@drkumar.com or call 08128268794.</p>
                    </div>
                  </div>
                )}

                {/* ... keep existing code for other sections (terms, shipping) */}
                {activeSection === 'terms' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Terms & Conditions</h2>
                    <div className="prose max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                      <p><strong>Last updated:</strong> December 2024</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Acceptance of Terms</h3>
                      <p>By accessing and using Dr. Kumar Laboratories website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Product Information</h3>
                      <p>We strive to display accurate product information. However, we cannot guarantee that all product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Pricing and Availability</h3>
                      <p>All prices are subject to change without notice. Products are subject to availability and we reserve the right to limit quantities.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">User Accounts</h3>
                      <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Limitation of Liability</h3>
                      <p>Dr. Kumar Laboratories shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
                    </div>
                  </div>
                )}

                {activeSection === 'shipping' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Shipping Policy</h2>
                    <div className="prose max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                      <p><strong>Last updated:</strong> December 2024</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Shipping Methods</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                        <li><strong>Express Shipping:</strong> 2-3 business days</li>
                        <li><strong>Same Day Delivery:</strong> Available in select cities</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Shipping Costs</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Free shipping on orders above ₹699</li>
                        <li>Standard shipping: ₹50</li>
                        <li>Express shipping: ₹150</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Processing Time</h3>
                      <p>Orders are typically processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Delivery Areas</h3>
                      <p>We currently deliver pan-India. Some remote areas may have additional delivery charges.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3 text-black dark:text-white">Tracking</h3>
                      <p>You will receive a tracking number via email once your order ships. You can track your package on our website or the courier partner's website.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Policies;
