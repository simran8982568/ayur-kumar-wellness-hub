
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Policies = () => {
  const [activeSection, setActiveSection] = useState('privacy');

  const sections = [
    { id: 'privacy', title: 'Privacy Policy' },
    { id: 'terms', title: 'Terms & Conditions' },
    { id: 'return', title: 'Return Policy' },
    { id: 'shipping', title: 'Shipping Policy' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Policies & Legal</h1>
            <nav className="text-sm text-gray-600">
              <Link to="/" className="hover:text-brand-primary">Home</Link>
              <span className="mx-2">/</span>
              <span>Policies</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Quick Navigation</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-3 transition-colors ${
                        activeSection === section.id
                          ? 'bg-brand-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
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
              <div className="bg-white border border-gray-200 p-8">
                
                {/* Privacy Policy */}
                {activeSection === 'privacy' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
                    <div className="prose max-w-none text-gray-700 space-y-4">
                      <p><strong>Last updated:</strong> December 2024</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Information We Collect</h3>
                      <p>Dr. Kumar Laboratories collects information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">How We Use Your Information</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>To process your orders and provide customer service</li>
                        <li>To send you order confirmations and shipping updates</li>
                        <li>To improve our products and services</li>
                        <li>To comply with legal obligations</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Information Sharing</h3>
                      <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Data Security</h3>
                      <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Contact Us</h3>
                      <p>If you have questions about this Privacy Policy, please contact us at info@drkumar.com or call 08128268794.</p>
                    </div>
                  </div>
                )}

                {/* Terms & Conditions */}
                {activeSection === 'terms' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Terms & Conditions</h2>
                    <div className="prose max-w-none text-gray-700 space-y-4">
                      <p><strong>Last updated:</strong> December 2024</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Acceptance of Terms</h3>
                      <p>By accessing and using Dr. Kumar Laboratories website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Product Information</h3>
                      <p>We strive to display accurate product information. However, we cannot guarantee that all product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Pricing and Availability</h3>
                      <p>All prices are subject to change without notice. Products are subject to availability and we reserve the right to limit quantities.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">User Accounts</h3>
                      <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Limitation of Liability</h3>
                      <p>Dr. Kumar Laboratories shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
                    </div>
                  </div>
                )}

                {/* Return Policy */}
                {activeSection === 'return' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Return Policy</h2>
                    <div className="prose max-w-none text-gray-700 space-y-4">
                      <p><strong>Last updated:</strong> December 2024</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Return Window</h3>
                      <p>You have 30 days from the date of delivery to return unopened products in their original packaging.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Eligible Items</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Unopened products in original packaging</li>
                        <li>Products with manufacturing defects</li>
                        <li>Incorrect items shipped</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Non-Returnable Items</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Opened or used products</li>
                        <li>Products without original packaging</li>
                        <li>Perishable items</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Return Process</h3>
                      <p>Contact our customer service team at info@drkumar.com to initiate a return. Include your order number and reason for return.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Refunds</h3>
                      <p>Refunds will be processed within 5-7 business days after we receive and inspect the returned item.</p>
                    </div>
                  </div>
                )}

                {/* Shipping Policy */}
                {activeSection === 'shipping' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Shipping Policy</h2>
                    <div className="prose max-w-none text-gray-700 space-y-4">
                      <p><strong>Last updated:</strong> December 2024</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Shipping Methods</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                        <li><strong>Express Shipping:</strong> 2-3 business days</li>
                        <li><strong>Same Day Delivery:</strong> Available in select cities</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Shipping Costs</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Free shipping on orders above ₹699</li>
                        <li>Standard shipping: ₹50</li>
                        <li>Express shipping: ₹150</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Processing Time</h3>
                      <p>Orders are typically processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Delivery Areas</h3>
                      <p>We currently deliver pan-India. Some remote areas may have additional delivery charges.</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Tracking</h3>
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
