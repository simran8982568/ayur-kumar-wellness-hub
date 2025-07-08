import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Clock, Package, RefreshCw, AlertCircle, Phone, Mail } from 'lucide-react';

const ReturnPolicy: React.FC = () => {
  const policyHighlights = [
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "30-Day Return Window",
      description: "You can return products within 30 days of delivery for a full refund."
    },
    {
      icon: <Package className="w-6 h-6 text-green-600" />,
      title: "Original Packaging Required",
      description: "Products must be returned in their original packaging with all accessories."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
      title: "Quality Guarantee",
      description: "We accept returns for defective products, wrong items, or quality issues."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-orange-600" />,
      title: "Easy Return Process",
      description: "Simple online return process with free pickup for eligible returns."
    }
  ];

  const eligibleItems = [
    "Unopened and unused products",
    "Products in original packaging",
    "Items with manufacturing defects",
    "Wrong products delivered",
    "Products not matching description",
    "Damaged products during shipping"
  ];

  const nonEligibleItems = [
    "Opened or used health supplements",
    "Products without original packaging",
    "Items returned after 30 days",
    "Prescription medicines",
    "Personalized or customized products",
    "Products damaged by misuse"
  ];

  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return Request",
      description: "Log into your account and go to 'My Orders'. Select the order and click 'Return Product' to fill out the return form."
    },
    {
      step: 2,
      title: "Return Approval",
      description: "Our team will review your return request within 24-48 hours and send you a confirmation email with return instructions."
    },
    {
      step: 3,
      title: "Package & Schedule Pickup",
      description: "Pack the item in its original packaging. We'll schedule a free pickup from your registered address within 3-5 business days."
    },
    {
      step: 4,
      title: "Quality Check & Refund",
      description: "Once we receive and verify the returned item, your refund will be processed within 5-7 business days to your original payment method."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1C1C2D] mb-4">Return Policy</h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We want you to be completely satisfied with your purchase from Dr. Kumar Laboratories. 
              If you're not happy with your order, we're here to help with our hassle-free return policy.
            </p>
          </div>

          {/* Policy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {policyHighlights.map((highlight, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>

          {/* Return Timeframe */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Return Timeframe</h2>
            <div className="space-y-4">
              <p className="text-blue-800">
                <strong>Standard Returns:</strong> You have 30 days from the date of delivery to initiate a return request.
              </p>
              <p className="text-blue-800">
                <strong>Defective Products:</strong> Report defective or damaged products within 7 days of delivery for immediate replacement or refund.
              </p>
              <p className="text-blue-800">
                <strong>Wrong Items:</strong> If you receive the wrong product, contact us within 48 hours of delivery for immediate resolution.
              </p>
            </div>
          </div>

          {/* Eligible vs Non-Eligible Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Eligible Items */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Eligible for Return
              </h3>
              <ul className="space-y-2">
                {eligibleItems.map((item, index) => (
                  <li key={index} className="flex items-center text-green-800">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Eligible Items */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                Not Eligible for Return
              </h3>
              <ul className="space-y-2">
                {nonEligibleItems.map((item, index) => (
                  <li key={index} className="flex items-center text-red-800">
                    <span className="w-4 h-4 text-red-600 mr-2 flex-shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Return Process Steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-8 text-center">How to Return Your Order</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnSteps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 bg-[#111111] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Information */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-6">Refund Processing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Refund Methods</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Original payment method (Credit/Debit Card, UPI, Net Banking)</li>
                  <li>• Bank transfer (for cash on delivery orders)</li>
                  <li>• Store credit (optional, for faster processing)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing Timeline</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Return approval: 24-48 hours</li>
                  <li>• Pickup scheduling: 3-5 business days</li>
                  <li>• Quality verification: 2-3 business days</li>
                  <li>• Refund processing: 5-7 business days</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Important Notes</h3>
            <ul className="space-y-2 text-yellow-800">
              <li>• Shipping charges are non-refundable unless the product is defective or wrong item was delivered</li>
              <li>• For hygiene and safety reasons, certain products cannot be returned once opened</li>
              <li>• Return pickup is free for orders above ₹500. For orders below ₹500, pickup charges may apply</li>
              <li>• Refunds will be processed only after quality verification of returned items</li>
              <li>• In case of promotional offers, the discount amount will be adjusted in the refund</li>
            </ul>
          </div>

          {/* Contact Information */}
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
