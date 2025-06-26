
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#723421]/5 to-[#723421]/20 dark:from-blue-900/20 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#723421] dark:text-white leading-tight">
            Holistic Health Starts with 
            <span className="block text-[#723421] dark:text-blue-400">Ayurveda</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#723421]/70 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the power of traditional Ayurvedic medicine with our scientifically formulated products
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="bg-[#723421] hover:bg-[#723421]/90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Shop Now
              </Button>
            </Link>
            
            <Link to="/consult">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-[#723421] text-[#723421] dark:border-white dark:text-white hover:bg-[#723421] hover:text-white dark:hover:bg-white dark:hover:text-black px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
              >
                Consult Doctor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
