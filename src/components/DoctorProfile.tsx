
import React from 'react';
import { MapPin, Phone, Mail, Star } from 'lucide-react';

const DoctorProfile: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-20 h-20 overflow-hidden border-2 border-brand-primary flex-shrink-0">
          <img 
            src="/lovable-uploads/cd3f5eda-8484-4dee-940d-f87e26cac841.png"
            alt="Dr. Kumar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-black dark:text-white mb-1">Dr. Kumar</h3>
          <p className="text-sm text-brand-primary font-medium mb-2">MBBS, Sexologist ✅</p>
          <div className="flex items-center space-x-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-black dark:text-white">4.4</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">(180+ Reviews)</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">5+ Years of Clinical Experience</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-start space-x-3">
          <MapPin className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
          <p className="text-gray-700 dark:text-gray-300">
            Abhiyank Estate, Near Taste Of Punjab,<br />
            Silver Estate Ke Pas, Govindpuri-474011
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="w-4 h-4 text-brand-primary" />
          <a href="tel:08128268794" className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors">
            08128268794
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="w-4 h-4 text-brand-primary" />
          <a href="mailto:info@drkumar.com" className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors">
            info@drkumar.com
          </a>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Trusted Ayurvedic Clinic in Govindpuri, Gwalior
        </p>
      </div>
    </div>
  );
};

export default DoctorProfile;
