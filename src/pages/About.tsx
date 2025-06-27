
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DoctorProfile from '@/components/DoctorProfile';
import TrustBadges from '@/components/TrustBadges';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const highlights = [
    {
      name: 'Immuno+ Juice',
      benefit: 'Natural Immunity Booster',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'Shilajit Capsules',
      benefit: 'Energy & Vitality',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'Digestive Balance Tonic',
      benefit: 'Gut Health Support',
      image: '/api/placeholder/200/200'
    },
    {
      name: 'Skin Glow Mix',
      benefit: 'Radiant Skin Care',
      image: '/api/placeholder/200/200'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 mx-auto mb-6">
              <img 
                src="/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png"
                alt="Dr. Kumar Laboratories"
                className="w-full h-full object-contain dark:invert"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
              Dr. Kumar Laboratories
            </h1>
            <h2 className="text-xl md:text-2xl text-brand-primary font-medium mb-6">
              Modern Ayurvedic Wellness
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
              Rooted in ancient science, formulated for modern lives
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Doctor Profile */}
            <div className="lg:col-span-1">
              <DoctorProfile />
            </div>

            {/* Philosophy Section */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-900 p-8 h-full">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                  Our Philosophy
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-black dark:text-white mb-3">
                      Simple, Honest, Ayurveda
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      We believe in the power of traditional Ayurvedic wisdom combined with modern scientific research. 
                      Our formulations are carefully crafted to deliver authentic wellness solutions that fit seamlessly 
                      into contemporary lifestyles.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="text-center p-4">
                      <h5 className="font-semibold text-black dark:text-white mb-2">Ancient Wisdom, Modern Form</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Time-tested Ayurvedic principles in contemporary, convenient formats
                      </p>
                    </div>
                    <div className="text-center p-4">
                      <h5 className="font-semibold text-black dark:text-white mb-2">Honest Ingredients, Real Impact</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pure, natural ingredients with transparent formulations and proven results
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button asChild className="bg-brand-primary hover:bg-brand-secondary text-white">
                      <Link to="/shop-all">View All Products</Link>
                    </Button>
                    <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
                      View Ingredients
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Highlights */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8 text-center">
              Product Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((product, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 text-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover mb-4"
                  />
                  <h4 className="font-semibold text-black dark:text-white mb-2">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {product.benefit}
                  </p>
                  <Button size="sm" variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
                    View Product
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Founder's Note */}
          <div className="bg-gray-50 dark:bg-gray-900 p-8 text-center">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
              A Word from Our Founder
            </h3>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                "My journey in Ayurvedic medicine has taught me that true wellness comes from understanding 
                the unique needs of each individual. At Dr. Kumar Laboratories, we combine this personalized 
                approach with the timeless wisdom of Ayurveda to create solutions that truly make a difference 
                in people's lives."
              </p>
              <p className="text-lg font-medium text-brand-primary">
                – Dr. Kumar
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <TrustBadges />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
