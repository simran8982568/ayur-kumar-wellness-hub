import React from "react";
import { Mail, Facebook, Instagram, MessageCircle } from "lucide-react";

const SocialIcons: React.FC = () => {
  const handleFacebookClick = () => {
    window.open("https://facebook.com/drkumarlabs", "_blank");
  };

  const handleGmailClick = () => {
    window.open("mailto:info@drkumar.com", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/918128268794", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://instagram.com/drkumarlabs", "_blank");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
      {/* Social Icons */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleFacebookClick}
          className="bg-[#111111] hover:bg-[#302e2e]/90 text-white p-2 rounded-xl transition-colors"
          aria-label="Visit Dr. Kumar's Facebook page"
        >
          <Facebook className="w-4 h-4" />
        </button>
        <button
          onClick={handleInstagramClick}
          className="bg-[#111111] hover:bg-[#302e2e]/90 text-white p-2 rounded-xl transition-colors"
          aria-label="Visit Dr. Kumar's Instagram page"
        >
          <Instagram className="w-4 h-4" />
        </button>
        <button
          onClick={handleGmailClick}
          className="bg-[#111111] hover:bg-[#302e2e]/90 text-white p-2 rounded-xl transition-colors"
          aria-label="Send email to Dr. Kumar"
        >
          <Mail className="w-4 h-4" />
        </button>
        <button
          onClick={handleWhatsAppClick}
          className="bg-[#111111] hover:bg-[#302e2e]/90 text-white p-2 rounded-xl transition-colors"
          aria-label="Chat with Dr. Kumar on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SocialIcons;
