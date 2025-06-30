
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4 text-[#1C1C2D]">Privacy Policy</h1>
        <div className="space-y-4 text-sm leading-6 text-gray-700">
          <p>We respect your privacy at Dr. Kumar Laboratories.</p>
          <p>Dr. Kumar Labs collects basic data (name, email, phone) for service use only.</p>
          <p>We never share your information with third parties without your consent.</p>
          <p>Data is retained securely for operational reasons and to provide you with the best healthcare services.</p>
          <p>For any privacy concerns, contact us at: <a href="mailto:support@drkumarlabs.com" className="text-[#E5002B] hover:underline">support@drkumarlabs.com</a></p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
