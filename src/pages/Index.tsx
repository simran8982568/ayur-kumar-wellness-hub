
import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import HealthConcernsGrid from '@/components/HealthConcernsGrid';
import ProductSection from '@/components/ProductSection';
import TrustReviews from '@/components/TrustReviews';
import TestimonialSection from '@/components/TestimonialSection';
import TrustBadges from '@/components/TrustBadges';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { mensHealthProducts, womensHealthProducts, comboProducts, newArrivals } from '@/data/products';

const Index = () => {
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
          viewAllLink="/category/new-arrivals"
          showViewAll={true}
        />
        
        <ProductSection 
          title="Best Sellers"
          subtitle="Complete wellness packages at great value"
          products={comboProducts.slice(0, 4)}
          viewAllLink="/category/best-sellers"
          showViewAll={true}
        />

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
