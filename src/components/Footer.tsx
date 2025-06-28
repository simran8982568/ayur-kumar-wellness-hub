
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

const Footer: React.FC = () => {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const quickLinks = [
    { name: 'Shop All', href: '/shop-all' },
    { name: 'About Us', href: '/about-us' },
    { name: 'My Account', href: '/account' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Wishlist', href: '/wishlist' }
  ];

  const categories = [
    { name: "Men's Health", href: '/mens-health' },
    { name: "Women's Wellness", href: '/womens-health' },
    { name: 'Combos', href: '/combos' },
    { name: 'Essentials', href: '/essentials' }
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/policies' },
    { name: 'Terms & Conditions', href: '/policies' },
    { name: 'Return Policy', href: '/policies' },
    { name: 'Shipping Policy', href: '/policies' }
  ];

  return (
    <>
      <footer className="bg-gray-50 text-gray-700 smooth-transition">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Company Info with Dr. Kumar's Profile */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png"
                    alt="Dr. Kumar Laboratories"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Dr. Kumar Laboratories</h3>
                  <p className="text-xs text-gray-500">Healthcare & Wellness</p>
                </div>
              </div>

              {/* Dr. Kumar's Profile - Colored Image */}
              <div className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-xl">
                <img 
                  src="/lovable-uploads/ed6e92d3-776a-4b30-b919-b7a35406bf8f.png"
                  alt="Dr. Kumar"
                  className="w-16 h-16 object-cover border-2 border-gray-300 transition-all duration-300 rounded-xl"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Dr. Kumar</p>
                  <p className="text-xs text-gray-600">Founder & Wellness Expert</p>
                  <p className="text-xs text-gray-500">MBBS, Sexologist ✅</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-brand-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">
                    Abhiyank Estate, Near Taste Of Punjab,<br />
                    Silver Estate Ke Pas, Govindpuri-474011
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-brand-primary" />
                  <a href="tel:08128268794" className="text-sm hover:text-brand-primary transition-colors">
                    08128268794
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-brand-primary" />
                  <a href="mailto:info@drkumar.com" className="text-sm hover:text-brand-primary transition-colors">
                    info@drkumar.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sm hover:text-brand-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Shop by Category</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link 
                      to={category.href} 
                      className="text-sm hover:text-brand-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies & Social */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Legal</h4>
                <ul className="space-y-2">
                  {policies.map((policy) => (
                    <li key={policy.name}>
                      <Link 
                        to={policy.href} 
                        className="text-sm hover:text-brand-primary transition-colors"
                      >
                        {policy.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-200 hover:bg-brand-primary p-2 transition-colors duration-300 rounded-xl">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-gray-200 hover:bg-brand-primary p-2 transition-colors duration-300 rounded-xl">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="bg-gray-200 hover:bg-brand-primary p-2 transition-colors duration-300 rounded-xl">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Feedback Button */}
              <div>
                <button
                  onClick={() => setIsFeedbackModalOpen(true)}
                  className="bg-brand-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-secondary transition-colors duration-300 w-full"
                >
                  Feedback
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              © 2024 Dr. Kumar Laboratories. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              Ayurvedic products have not been evaluated by the FDA. These statements have not been evaluated by the Food and Drug Administration. 
              These products are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </footer>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </>
  );
};

export default Footer;
