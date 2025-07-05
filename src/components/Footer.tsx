
import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeedbackModal from './FeedbackModal';

const Footer: React.FC = () => {
  const location = useLocation();
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Don't render footer on checkout page
  if (location.pathname === '/checkout' || location.pathname === '/cart-page') {
    return null;
  }

  const handleFeedbackClick = () => {
    if (isLoggedIn) {
      // Open feedback page in new tab for authenticated users
      window.open('/feedback', '_blank');
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918128268794', '_blank');
  };

  return (
    <>
      <footer className="bg-white text-black py-12 px-4 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Dr. Kumar Profile */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/08923cd5-1858-4f27-b273-d544781b51f0.png"
                    alt="Dr. Kumar"
                    className="w-full h-full object-cover rounded-full border-2 border-[#E5002B]"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1C1C2D] mb-1">Dr. Kumar</h3>
                  <p className="text-sm text-gray-600 mb-1">MBBS, Sexologist ✅</p>
                  <p className="text-sm text-[#FFC107] mb-1">⭐ 4.4 (180+ Reviews)</p>
                  <p className="text-sm text-gray-600">5+ Years of Clinical Experience</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p>Abhiyank Estate, Near Taste Of Punjab,</p>
                <p>Silver Estate Ke Pas, Govindpuri-474011</p>
                <p>📞 08128268794</p>
                <p>📧 info@drkumar.com</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#1C1C2D]">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about-us" className="text-gray-600 hover:text-[#E5002B] transition-all duration-200 font-medium underline-offset-4">About Us</a></li>
                <li><a href="/shop-all" className="text-gray-600 hover:text-[#E5002B] transition-all duration-200 font-medium underline-offset-4">Shop All</a></li>
                <li><a href="/category/mens-sexual-health" className="text-gray-600 hover:text-[#E5002B] transition-all duration-200 font-medium underline-offset-4">Men's Health</a></li>
                <li><a href="/consultation-booking" className="text-gray-600 hover:text-[#E5002B] transition-all duration-200 font-medium underline-offset-4">Consultation Page</a></li>
              </ul>
            </div>

            {/* Support & Contact Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#1C1C2D]">Support & Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li><a href="/privacy-policy" className="hover:text-[#E5002B] transition-all duration-200 font-medium underline-offset-4">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-[#E5002B] transition-all duration-200 font-medium underline-offset-4">Terms of Service</a></li>
                <li><a href="/return-policy" className="hover:text-[#E5002B] transition-all duration-200 font-medium underline-offset-4">Return Policy</a></li>
                <li><a href="/shipping-info" className="hover:text-[#E5002B] transition-all duration-200 font-medium underline-offset-4">Shipping Info</a></li>
              </ul>
              
              {/* WhatsApp Contact */}
              <div className="mb-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center space-x-2 bg-[#111111] hover:bg-[#111111]/90 text-white font-medium rounded-xl text-sm px-4 py-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Dr. Kumar</span>
                </button>
              </div>

              {/* Feedback Button - Only for authenticated users */}
              {isLoggedIn && (
                <div>
                  <Button
                    onClick={handleFeedbackClick}
                    className="bg-[#111111] hover:bg-[#111111]/90 text-white font-medium rounded-xl text-sm px-4 py-2"
                  >
                    Send Feedback
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-sm">
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
