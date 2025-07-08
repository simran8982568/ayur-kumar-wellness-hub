
import React from 'react';
import { MapPin, Phone, Mail, Star } from 'lucide-react';

const DoctorProfile: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-20 h-20 overflow-hidden border-2 border-[#111111] flex-shrink-0">
          <img 
            src="/lovable-uploads/cd3f5eda-8484-4dee-940d-f87e26cac841.png"
            alt="Dr. Kumar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-black dark:text-white mb-1">Dr. Kumar</h3>
          <p className="text-sm text-gray-600 mb-2">MBBS, Sexologist </p>
         
          <p className="text-sm text-gray-600">5+ Years of Experience in Sexology</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-start space-x-3">
          <MapPin className="w-4 h-4 text-[#111111] mt-0.5 flex-shrink-0" />
          <p className="text-gray-700 dark:text-gray-300">
            Abhiyank Estate, Near Taste Of Punjab,<br />
            Silver Estate Ke Pas, Govindpuri-474011 Gwalior(M.P.)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="w-4 h-4 text-[#111111]" />
          <a href="tel:08128268794" className="text-gray-700 dark:text-gray-300 hover:text-[#111111] transition-colors">
            8128268794
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="w-4 h-4 text-[#111111]" />
          <a href="mailto:info@drkumar.com" className="text-gray-700 dark:text-gray-300 hover:text-[#111111] transition-colors">
            info@drkumar.com
          </a>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
       
      </div>
    </div>
  );
};

export default DoctorProfile;
