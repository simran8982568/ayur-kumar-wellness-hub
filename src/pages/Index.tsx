
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import HealthConcernsGrid from '@/components/HealthConcernsGrid';
import ProductSection from '@/components/ProductSection';
import SocialIcons from '@/components/SocialIcons';
import TrustReviews from '@/components/TrustReviews';
import TestimonialSection from '@/components/TestimonialSection';
import TrustBadges from '@/components/TrustBadges';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { mensHealthProducts } from '@/data/products';

const Index = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/shop-all');
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
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

        {/* Start Your Journey Button */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Button
              onClick={handleStartJourney}
              className="mx-auto block text-center text-white bg-[#111111] hover:bg-[#111111]/90 px-6 py-3 rounded-xl font-medium"
            >
              Start Your Journey
            </Button>
          </div>
        </div>

        <SocialIcons />
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
