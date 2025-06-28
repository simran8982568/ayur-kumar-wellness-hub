
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeedbackModal from './FeedbackModal';

const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <footer className="bg-gray-50 text-gray-800 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ed6e92d3-776a-4b30-b919-b7a35406bf8f.png"
                alt="Dr. Kumar"
                className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
              />
              <div>
                <h3 className="font-bold text-lg text-black">Dr. Kumar Laboratories</h3>
                <p className="text-sm text-gray-600">Healthcare & Wellness</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dr. Kumar — Founder & Wellness Expert. Providing authentic Ayurvedic solutions for modern health challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-black mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/shop" className="text-gray-700 hover:text-brand-primary transition-colors">
                  Shop All
                </a>
              </li>
              <li>
                <a href="/about-us" className="text-gray-700 hover:text-brand-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/account" className="text-gray-700 hover:text-brand-primary transition-colors">
                  My Account
                </a>
              </li>
              <li>
                <a href="/policies" className="text-gray-700 hover:text-brand-primary transition-colors">
                  Policies
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-black mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="/category/mens-health" className="text-gray-700 hover:text-brand-primary transition-colors">
                  Men's Health
                </a>
              </li>
              <li>
                <a href="/category/womens-health" className="text-gray-700 hover:text-brand-primary transition-colors">
                  Women's Health
                </a>
              </li>
              <li>
                <a href="/category/combos-essentials" className="text-gray-700 hover:text-brand-primary transition-colors">
                  Combos & Essentials
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-black mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  Abhiyank Estate, Near Taste Of Punjab, Silver Estate Ke Pas, Govindpuri-474011
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-primary" />
                <p className="text-sm text-gray-600">08128268794</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-primary" />
                <p className="text-sm text-gray-600">contact@drkumarlabs.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h4 className="font-semibold text-black mb-2">Payment Methods</h4>
              <div className="flex items-center space-x-4">
                <div className="text-2xl">💳</div>
                <div className="text-2xl">🏦</div>
                <div className="text-2xl">📱</div>
                <span className="text-sm text-gray-600">UPI, Cards, Net Banking</span>
              </div>
            </div>
            
            <Button
              onClick={() => setIsFeedbackOpen(true)}
              className="bg-brand-primary hover:bg-brand-secondary text-white rounded-lg px-6 py-2"
            >
              Share Feedback
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-brand-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            
            <p className="text-sm text-gray-600">
              © 2024 Dr. Kumar Laboratories. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </footer>
  );
};

export default Footer;
