
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Shop All', href: '/shop-all' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Blog', href: '/blog' },
    { name: 'My Account', href: '/account' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Feedback', href: '/feedback' }
  ];

  const categories = [
    { name: "Men's Health", href: '/mens-health' },
    { name: "Women's Wellness", href: '/womens-health' },
    { name: 'Immunity Boosters', href: '/immunity' },
    { name: 'Digestive Care', href: '/digestion' },
    { name: 'Stress & Sleep', href: '/stress-sleep' },
    { name: 'Joint Care', href: '/joint-care' }
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Return Policy', href: '/returns' },
    { name: 'Shipping Policy', href: '/shipping' }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 smooth-transition">
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
                <p className="text-xs text-gray-500 dark:text-gray-400">Healthcare & Wellness</p>
              </div>
            </div>

            {/* Dr. Kumar's Profile */}
            <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <img 
                src="/lovable-uploads/cd3f5eda-8484-4dee-940d-f87e26cac841.png"
                alt="Dr. Kumar"
                className="w-16 h-16 object-cover border-2 border-gray-300 dark:border-gray-600 grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Dr. Kumar</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Founder & Wellness Expert</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">MBBS, Sexologist ✅</p>
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
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
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
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Shop by Category</h4>
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
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Legal</h4>
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
              <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-200 dark:bg-gray-700 hover:bg-brand-primary dark:hover:bg-brand-primary p-2 transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-200 dark:bg-gray-700 hover:bg-brand-primary dark:hover:bg-brand-primary p-2 transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-200 dark:bg-gray-700 hover:bg-brand-primary dark:hover:bg-brand-primary p-2 transition-colors duration-300">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Secure Payment Methods</h4>
          <div className="flex flex-wrap gap-3">
            {['UPI', 'Visa', 'Mastercard', 'RuPay', 'Paytm', 'Google Pay', 'PhonePe'].map((method) => (
              <div 
                key={method}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            © 2024 Dr. Kumar Laboratories. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Ayurvedic products have not been evaluated by the FDA. These statements have not been evaluated by the Food and Drug Administration. 
            These products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
