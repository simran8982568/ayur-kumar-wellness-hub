
import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import HealthConcerns from '@/components/HealthConcerns';
import ProductSection from '@/components/ProductSection';
import TrustReviews from '@/components/TrustReviews';
import TestimonialSection from '@/components/TestimonialSection';
import TrustBadges from '@/components/TrustBadges';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { mensHealthProducts, womensHealthProducts, comboProducts, essentialProducts, newArrivals } from '@/data/products';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="relative">
        <HeroBanner />
        <HealthConcerns />
        
        <ProductSection 
          title="New Arrivals"
          subtitle="Latest additions to our wellness collection"
          products={newArrivals}
          viewAllLink="/view-all/new-arrivals"
          showViewAll={true}
        />
        
        <ProductSection 
          title="Our Best Sellers"
          subtitle="Most trusted products by our customers"
          products={mensHealthProducts.slice(0, 4)}
          viewAllLink="/shop-all?category=mens-health"
          showViewAll={true}
        />
        
        <ProductSection 
          title="Women's Wellness"
          subtitle="Specially curated for women's health"
          products={womensHealthProducts.slice(0, 4)}
          viewAllLink="/shop-all?category=womens-health"
          showViewAll={true}
        />
        
        <ProductSection 
          title="Health Combos"
          subtitle="Complete wellness packages at great value"
          products={comboProducts.slice(0, 4)}
          viewAllLink="/shop-all?category=combos"
          showViewAll={true}
        />
        
        <ProductSection 
          title="Daily Essentials"
          subtitle="Must-have products for everyday health"
          products={essentialProducts.slice(0, 4)}
          viewAllLink="/view-all/daily-essentials"
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
