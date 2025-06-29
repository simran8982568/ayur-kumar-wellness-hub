
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FeedbackModal from './FeedbackModal';

const Footer: React.FC = () => {
  const location = useLocation();
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);

  // Don't render footer on checkout page
  if (location.pathname === '/checkout' || location.pathname === '/cart-page') {
    return null;
  }

  return (
    <>
      <footer className="bg-white dark:bg-gray-900 text-black dark:text-white py-12 px-4 lg:px-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Dr. Kumar Profile */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src="/lovable-uploads/70a2227a-b00e-42b6-b69e-aae3adc489c8.png"
                    alt="Dr. Kumar"
                    className="w-full h-full object-cover rounded-full border-2 border-[#c74a1b] dark:border-blue-600"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-1">Dr. Kumar</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">MBBS, Sexologist ✅</p>
                  <p className="text-sm text-yellow-500 mb-1">⭐ 4.4 (180+ Reviews)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">5+ Years of Clinical Experience</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>Abhiyank Estate, Near Taste Of Punjab,</p>
                <p>Silver Estate Ke Pas, Govindpuri-474011</p>
                <p>📞 08128268794</p>
                <p>📧 info@drkumar.com</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-black dark:text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about-us" className="text-gray-600 dark:text-gray-300 hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="/shop-all" className="text-gray-600 dark:text-gray-300 hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors">Shop All</a></li>
                <li><a href="/category/mens-sexual-health" className="text-gray-600 dark:text-gray-300 hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors">Men's Health</a></li>
                <li><a href="/category/womens-sexual-health" className="text-gray-600 dark:text-gray-300 hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors">Women's Health</a></li>
                <li><a href="/consultations" className="text-gray-600 dark:text-gray-300 hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors">Consultations</a></li>
              </ul>
            </div>

            {/* Contact & Feedback */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-black dark:text-white">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <li><a href="/policies" className="hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/policies" className="hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="/policies" className="hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors">Return Policy</a></li>
                <li><a href="/policies" className="hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors">Shipping Info</a></li>
              </ul>
              
              <Button
                onClick={() => setIsFeedbackOpen(true)}
                className="bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium rounded-xl w-full"
                aria-label="Send Feedback"
              >
                Send Feedback
              </Button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
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
