
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import HealthConcernsGrid from '@/components/HealthConcernsGrid';
import ProductSection from '@/components/ProductSection';
import SocialIcons from '@/components/SocialIcons';
import TrustReviews from '@/components/TrustReviews';
import TrustBadges from '@/components/TrustBadges';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { mensHealthProducts } from '@/data/products';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <Header />
      
      <main className="relative">
        <HeroBanner />
        <HealthConcernsGrid />
        
        <ProductSection
          title="Men's Sexual Health"
          subtitle="Complete wellness solutions for male health and vitality"
          products={mensHealthProducts}
          viewAllLink="/category/mens-sexual-health"
          showViewAll={true}
        />

        



        <TrustBadges />
        <TrustReviews />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
