
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FeedbackModal from './FeedbackModal';

const Footer: React.FC = () => {
  const location = useLocation();
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);

  // Don't render footer on checkout page
  if (location.pathname === '/checkout') {
    return null;
  }

  return (
    <>
      <footer className="bg-gray-900 text-white py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png"
                    alt="Dr. Kumar Laboratories"
                    className="w-full h-full object-contain filter invert"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Dr. Kumar Laboratories</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Healthcare & Wellness</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted partner in Ayurvedic health and wellness. 
                Enhancing immunity and promoting holistic well-being through natural solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/shop-all" className="text-gray-400 hover:text-white transition-colors">Shop All</a></li>
                <li><a href="/mens-health" className="text-gray-400 hover:text-white transition-colors">Men's Health</a></li>
                <li><a href="/womens-health" className="text-gray-400 hover:text-white transition-colors">Women's Health</a></li>
                <li><a href="/combos" className="text-gray-400 hover:text-white transition-colors">Health Combos</a></li>
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/policies" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/policies" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/policies" className="text-gray-400 hover:text-white transition-colors">Return Policy</a></li>
                <li><a href="/policies" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              </ul>
            </div>

            {/* Contact & Feedback */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <p>📧 support@drkumarlabs.com</p>
                <p>📞 +91 9876543210</p>
                <p>🕒 Mon-Sat: 9AM-6PM</p>
              </div>
              
              <Button
                onClick={() => setIsFeedbackOpen(true)}
                className="bg-[#c74a1b] hover:bg-[#b8441a] text-white font-medium rounded-xl w-full"
                aria-label="Send Feedback"
              >
                Send Feedback
              </Button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Dr. Kumar Laboratories. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </>
  );
};

export default Footer;
