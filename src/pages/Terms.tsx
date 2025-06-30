
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4 text-[#1C1C2D]">Terms of Service</h1>
        <div className="space-y-4 text-sm leading-6 text-gray-700">
          <p>Use our platform for wellness-related purposes only.</p>
          <p>Consultations are for guidance and are not medical prescriptions.</p>
          <p>Orders are processed within 1–3 business days.</p>
          <p>Abuse, spamming, or data scraping is strictly prohibited.</p>
          <p>By using our services, you agree to these terms and conditions.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
