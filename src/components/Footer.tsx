
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'My Account', href: '/account' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Feedback', href: '/feedback' }
  ];

  const categories = [
    { name: "Men's Health", href: '/men' },
    { name: "Women's Wellness", href: '/women' },
    { name: 'Immunity Boosters', href: '/immunity' },
    { name: 'Digestive Care', href: '/digestion' },
    { name: 'Combos & Packs', href: '/combos' },
    { name: 'Daily Essentials', href: '/essentials' }
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Return Policy', href: '/returns' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Consultation Terms', href: '/consultation-terms' }
  ];

  return (
    <footer className="bg-ayurvedic-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-ayurvedic-green-700 font-bold text-lg">DK</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Dr. Kumar Clinic</h3>
                  <p className="text-ayurvedic-green-300 text-sm">MBBS Sexologist</p>
                </div>
              </div>
              <p className="text-ayurvedic-green-200 text-sm leading-relaxed">
                Your trusted partner in Ayurvedic wellness, offering authentic herbal solutions 
                backed by modern science and traditional wisdom.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-ayurvedic-green-300 mt-0.5 flex-shrink-0" />
                <p className="text-ayurvedic-green-200 text-sm">
                  Abhiyank Estate, Near Taste Of Punjab,<br />
                  Silver Estate Ke Pas, Govindpuri-474011
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-ayurvedic-green-300" />
                <a href="tel:08128268794" className="text-ayurvedic-green-200 hover:text-white transition-colors">
                  08128268794
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-ayurvedic-green-300" />
                <a href="mailto:info@drkumar.com" className="text-ayurvedic-green-200 hover:text-white transition-colors">
                  info@drkumar.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-ayurvedic-green-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop by Category</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.href} 
                    className="text-ayurvedic-green-200 hover:text-white transition-colors text-sm"
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
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {policies.map((policy) => (
                  <li key={policy.name}>
                    <Link 
                      to={policy.href} 
                      className="text-ayurvedic-green-200 hover:text-white transition-colors text-sm"
                    >
                      {policy.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-ayurvedic-green-700 hover:bg-ayurvedic-green-600 p-2 rounded-full transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-ayurvedic-green-700 hover:bg-ayurvedic-green-600 p-2 rounded-full transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-ayurvedic-green-700 hover:bg-ayurvedic-green-600 p-2 rounded-full transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* App Download & Payment Methods */}
        <div className="border-t border-ayurvedic-green-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* App Download */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Also Available On</h4>
              <div className="flex space-x-4">
                <img 
                  src="/api/placeholder/150/45" 
                  alt="Download on App Store"
                  className="h-12 rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                />
                <img 
                  src="/api/placeholder/150/45" 
                  alt="Get it on Google Play"
                  className="h-12 rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Secure Payment Methods</h4>
              <div className="flex flex-wrap gap-3">
                {['Visa', 'Mastercard', 'RuPay', 'UPI', 'Paytm', 'GPay'].map((method) => (
                  <div 
                    key={method}
                    className="bg-white rounded-lg px-3 py-2 text-ayurvedic-green-800 text-sm font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-ayurvedic-green-700 pt-6 text-center">
          <p className="text-ayurvedic-green-300 text-sm mb-2">
            © 2024 Dr. Kumar Clinic. All rights reserved.
          </p>
          <p className="text-ayurvedic-green-400 text-xs">
            Ayurvedic products have not been evaluated by the FDA. These statements have not been evaluated by the Food and Drug Administration. 
            These products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
