
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import HealthConcernsGrid from '@/components/HealthConcernsGrid';
import ProductSection from '@/components/ProductSection';
import TrustReviews from '@/components/TrustReviews';
import TestimonialSection from '@/components/TestimonialSection';
import TrustBadges from '@/components/TrustBadges';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { mensHealthProducts, womensHealthProducts, comboProducts, newArrivals } from '@/data/products';

const Index = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/shop-all');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      
      <main className="relative">
        <HeroBanner />
        <HealthConcernsGrid />
        
        <ProductSection 
          title="Men's Health"
          subtitle="Boost vitality and performance naturally"
          products={mensHealthProducts.slice(0, 4)}
          viewAllLink="/category/mens-sexual-health"
          showViewAll={true}
        />
        
        <ProductSection 
          title="Women's Health"
          subtitle="Hormonal balance and feminine wellness"
          products={womensHealthProducts.slice(0, 4)}
          viewAllLink="/category/womens-sexual-health"
          showViewAll={true}
        />
        
        <ProductSection 
          title="New Arrivals"
          subtitle="Latest additions to our wellness collection"
          products={newArrivals.slice(0, 4)}
          viewAllLink="/new-arrivals"
          showViewAll={true}
        />
        
        <ProductSection 
          title="Best Sellers"
          subtitle="Complete wellness packages at great value"
          products={comboProducts.slice(0, 4)}
          viewAllLink="/best-sellers"
          showViewAll={true}
        />

        {/* Real People Real Stories Section */}
        <section className="py-16 px-4 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
              Real People, Real Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Discover how our natural solutions have transformed lives
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 max-w-4xl mx-auto">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#c74a1b] dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">Video Player</p>
                </div>
              </div>
              
              <Button
                onClick={handleStartJourney}
                className="bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl text-lg"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </section>

        <TrustBadges />
        <TrustReviews />
        <TestimonialSection />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
