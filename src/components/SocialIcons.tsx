
import React from 'react';
import { Facebook, Mail, MessageCircle, Phone } from 'lucide-react';

const SocialIcons: React.FC = () => {
  const handleFacebookClick = () => {
    window.open('https://facebook.com/drkumarlabs', '_blank');
  };

  const handleGmailClick = () => {
    window.open('mailto:info@drkumar.com', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918128268794', '_blank');
  };

  return (
    <div className="bg-white py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-[#1C1C2D] mb-2">Connect with Dr. Kumar</h3>
          <p className="text-gray-600">Get in touch for consultations and support</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
          {/* Mobile Number */}
          <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-xl">
            <Phone className="w-5 h-5 text-[#1C1C2D]" />
            <span className="font-medium text-[#1C1C2D]">08128268794</span>
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleFacebookClick}
              className="bg-[#111111] hover:bg-[#111111]/90 text-white p-3 rounded-xl transition-colors"
              aria-label="Visit Dr. Kumar's Facebook page"
            >
              <Facebook className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleGmailClick}
              className="bg-[#111111] hover:bg-[#111111]/90 text-white p-3 rounded-xl transition-colors"
              aria-label="Send email to Dr. Kumar"
            >
              <Mail className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleWhatsAppClick}
              className="bg-[#111111] hover:bg-[#111111]/90 text-white p-3 rounded-xl transition-colors"
              aria-label="Chat with Dr. Kumar on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialIcons;
