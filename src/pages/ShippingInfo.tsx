
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, Clock, MapPin, Shield, Package, CreditCard } from 'lucide-react';

const ShippingInfo: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1C1C2D] mb-4">Shipping Information</h1>
          <p className="text-lg text-gray-600">Fast, reliable delivery of your Ayurvedic wellness products across India</p>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Free Shipping</h3>
            <p className="text-blue-700">On orders above ₹499</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">Fast Delivery</h3>
            <p className="text-green-700">4-7 working days</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
            <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Secure Packaging</h3>
            <p className="text-purple-700">Safe & hygienic delivery</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12">
          {/* Shipping Methods */}
          <section>
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-6 flex items-center">
              <Package className="w-6 h-6 mr-3" />
              Shipping Methods & Timeframes
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Standard Delivery</h4>
                    <p className="text-gray-600">4-7 working days</p>
                    <p className="text-sm text-gray-500">Available across India</p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Express Delivery</h4>
                    <p className="text-gray-600">2-4 working days</p>
                    <p className="text-sm text-gray-500">Major cities only</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Processing Time</h4>
                    <p className="text-gray-600">1-3 business days</p>
                    <p className="text-sm text-gray-500">Order verification & packaging</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Same Day Delivery</h4>
                    <p className="text-gray-600">Within 24 hours</p>
                    <p className="text-sm text-gray-500">Delhi NCR, Mumbai, Bangalore</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Costs */}
          <section>
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-6 flex items-center">
              <CreditCard className="w-6 h-6 mr-3" />
              Shipping Costs
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="pb-3 font-semibold text-gray-900">Order Value</th>
                      <th className="pb-3 font-semibold text-gray-900">Standard Delivery</th>
                      <th className="pb-3 font-semibold text-gray-900">Express Delivery</th>
                      <th className="pb-3 font-semibold text-gray-900">Same Day</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-200">
                      <td className="py-3">Below ₹499</td>
                      <td className="py-3">₹49</td>
                      <td className="py-3">₹99</td>
                      <td className="py-3">₹149</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3">₹499 - ₹999</td>
                      <td className="py-3 text-green-600 font-semibold">FREE</td>
                      <td className="py-3">₹79</td>
                      <td className="py-3">₹129</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3">₹1000 - ₹1999</td>
                      <td className="py-3 text-green-600 font-semibold">FREE</td>
                      <td className="py-3">₹59</td>
                      <td className="py-3">₹99</td>
                    </tr>
                    <tr>
                      <td className="py-3">Above ₹2000</td>
                      <td className="py-3 text-green-600 font-semibold">FREE</td>
                      <td className="py-3 text-green-600 font-semibold">FREE</td>
                      <td className="py-3">₹79</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Coverage Areas */}
          {/* <section>
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-3" />
              Delivery Coverage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-semibold text-green-900 mb-3">Serviceable Areas</h4>
                <ul className="space-y-2 text-green-800">
                  <li>• All major cities and towns across India</li>
                  <li>• 25,000+ pin codes covered</li>
                  <li>• Rural areas with postal connectivity</li>
                  <li>• Union territories and remote locations</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h4 className="font-semibold text-orange-900 mb-3">Express Delivery Cities</h4>
                <ul className="space-y-2 text-orange-800">
                  <li>• Delhi NCR, Mumbai, Bangalore</li>
                  <li>• Chennai, Hyderabad, Pune</li>
                  <li>• Kolkata, Ahmedabad, Jaipur</li>
                  <li>• Kochi, Chandigarh, Lucknow</li>
                </ul>
              </div>
            </div>
          </section> */}

          {/* Shipping Policies */}
          <section>
            <h2 className="text-2xl font-bold text-[#1C1C2D] mb-6">Shipping Policies & Guidelines</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3">Order Processing</h4>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Orders are processed within 1-3 business days</li>
                  <li>• Orders placed before 2 PM are processed the same day</li>
                  <li>• Weekend orders are processed on the next business day</li>
                  <li>• You'll receive order confirmation via email and SMS</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="font-semibold text-yellow-900 mb-3">Packaging Standards</h4>
                <ul className="space-y-2 text-yellow-800 text-sm">
                  <li>• Tamper-proof and hygienic packaging</li>
                  <li>• Temperature-controlled for sensitive products</li>
                  <li>• Eco-friendly packaging materials</li>
                  <li>• Bubble wrap protection for fragile items</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="font-semibold text-red-900 mb-3">Delivery Restrictions</h4>
                <ul className="space-y-2 text-red-800 text-sm">
                  <li>• No delivery on Sundays and national holidays</li>
                  <li>• Remote areas may have extended delivery times</li>
                  <li>• Address verification required for high-value orders</li>
                  <li>• ID proof may be required at delivery</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Tracking & Updates</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Real-time tracking via SMS and email</li>
                  <li>• Track orders on our website or mobile app</li>
                  <li>• Delivery partner contact details provided</li>
                  <li>• Estimated delivery time updates for delays</li>
                </ul>
              </div>
            </div>
          </section>

         
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShippingInfo;
