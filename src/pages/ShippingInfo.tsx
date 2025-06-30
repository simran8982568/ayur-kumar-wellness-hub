
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ShippingInfo: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4 text-[#1C1C2D]">Shipping Information</h1>
        <div className="space-y-4 text-sm leading-6 text-gray-700">
          <p>Delivery available across India.</p>
          <p><strong>Processing:</strong> 1–3 days</p>
          <p><strong>Delivery ETA:</strong> 4–7 working days</p>
          <p><strong>Free shipping</strong> on orders above ₹499</p>
          <p>Delays are notified via SMS/email to keep you informed.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShippingInfo;
