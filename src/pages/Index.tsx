import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import HealthConcerns from '@/components/HealthConcerns';
import ProductSection from '@/components/ProductSection';
import TrustReviews from '@/components/TrustReviews';
import TestimonialSection from '@/components/TestimonialSection';
import TrustBadges from '@/components/TrustBadges';
import Footer from '@/components/Footer';

const Index = () => {
  // Sample product data for featured sections
  const mensHealthProducts = [
    {
      id: 1,
      name: "Men's Vitality Booster",
      price: 599,
      originalPrice: 799,
      rating: 4.8,
      reviews: 245,
      image: "/api/placeholder/300/300",
      badge: "Bestseller",
      inStock: true,
      description: "Natural energy and stamina enhancer"
    },
    {
      id: 2,
      name: "Testosterone Support Capsules",
      price: 899,
      originalPrice: 1199,
      rating: 4.7,
      reviews: 189,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Hormonal balance and strength"
    },
    {
      id: 3,
      name: "Male Fertility Enhancer",
      price: 749,
      rating: 4.6,
      reviews: 156,
      image: "/api/placeholder/300/300",
      badge: "New",
      inStock: true,
      description: "Comprehensive reproductive health"
    },
    {
      id: 4,
      name: "Stress Relief for Men",
      price: 449,
      originalPrice: 599,
      rating: 4.5,
      reviews: 203,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Natural stress management"
    }
  ];

  const womensHealthProducts = [
    {
      id: 5,
      name: "Women's Wellness Complex",
      price: 649,
      originalPrice: 849,
      rating: 4.9,
      reviews: 312,
      image: "/api/placeholder/300/300",
      badge: "Popular",
      inStock: true,
      description: "Complete feminine health support"
    },
    {
      id: 6,
      name: "Hormonal Balance Tablets",
      price: 549,
      rating: 4.7,
      reviews: 267,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Natural hormone regulation"
    },
    {
      id: 7,
      name: "Iron & Calcium Supplement",
      price: 399,
      originalPrice: 499,
      rating: 4.8,
      reviews: 198,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Essential nutrients for women"
    },
    {
      id: 8,
      name: "Pregnancy Care Capsules",
      price: 799,
      rating: 4.9,
      reviews: 145,
      image: "/api/placeholder/300/300",
      badge: "Trusted",
      inStock: true,
      description: "Safe prenatal nutrition"
    }
  ];

  const comboProducts = [
    {
      id: 9,
      name: "Complete Health Combo",
      price: 1299,
      originalPrice: 1899,
      rating: 4.8,
      reviews: 89,
      image: "/api/placeholder/300/300",
      badge: "Best Value",
      inStock: true,
      description: "3-month complete wellness pack"
    },
    {
      id: 10,
      name: "Immunity Power Pack",
      price: 899,
      originalPrice: 1299,
      rating: 4.7,
      reviews: 134,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Boost your natural immunity"
    },
    {
      id: 11,
      name: "Digestive Health Duo",
      price: 749,
      originalPrice: 999,
      rating: 4.6,
      reviews: 76,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Complete digestive care"
    },
    {
      id: 12,
      name: "Energy & Focus Bundle",
      price: 999,
      originalPrice: 1399,
      rating: 4.5,
      reviews: 98,
      image: "/api/placeholder/300/300",
      badge: "New",
      inStock: true,
      description: "Mental and physical energy"
    }
  ];

  const essentialProducts = [
    {
      id: 13,
      name: "Daily Multivitamin",
      price: 299,
      originalPrice: 399,
      rating: 4.7,
      reviews: 456,
      image: "/api/placeholder/300/300",
      badge: "Essential",
      inStock: true,
      description: "Complete daily nutrition"
    },
    {
      id: 14,
      name: "Herbal Immunity Tea",
      price: 199,
      rating: 4.6,
      reviews: 289,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Natural immunity booster"
    },
    {
      id: 15,
      name: "Digestive Enzymes",
      price: 449,
      originalPrice: 599,
      rating: 4.8,
      reviews: 167,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Better digestion naturally"
    },
    {
      id: 16,
      name: "Sleep Support Tablets",
      price: 349,
      rating: 4.5,
      reviews: 234,
      image: "/api/placeholder/300/300",
      badge: "Popular",
      inStock: true,
      description: "Natural sleep enhancement"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative">
        {/* Hero Banner - PRESERVED as per client instruction */}
        <HeroBanner />
        
        {/* Health Concerns Blocks */}
        <HealthConcerns />
        
        {/* Featured Product Sections */}
        <ProductSection 
          title="Our Best Sellers"
          subtitle="Most trusted products by our customers"
          products={mensHealthProducts}
          showViewAll={true}
        />
        
        <ProductSection 
          title="New Launches"
          subtitle="Latest additions to our wellness collection"
          products={womensHealthProducts}
          showViewAll={true}
        />
        
        <ProductSection 
          title="Health Combos"
          subtitle="Complete wellness packages at great value"
          products={comboProducts}
          showViewAll={true}
        />
        
        <ProductSection 
          title="Daily Essentials"
          subtitle="Must-have products for everyday health"
          products={essentialProducts}
          showViewAll={true}
        />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Trust and Reviews Section */}
        <TrustReviews />
        
        {/* Testimonials */}
        <TestimonialSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
