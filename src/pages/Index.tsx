
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import HeroBanner from '@/components/HeroBanner';
import ConcernBlocks from '@/components/ConcernBlocks';
import ProductSection from '@/components/ProductSection';
import TestimonialSection from '@/components/TestimonialSection';
import FeedbackSection from '@/components/FeedbackSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sample product data
  const bestSellers = [
    {
      id: 1,
      name: "Immunity Gold Capsules - Complete Protection",
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 2453,
      image: "/api/placeholder/300/300",
      badge: "Bestseller",
      inStock: true
    },
    {
      id: 2,
      name: "Men's Vitality Booster Combo Pack",
      price: 1499,
      originalPrice: 2187,
      rating: 4.9,
      reviews: 1876,
      image: "/api/placeholder/300/300",
      badge: "Combo",
      inStock: true
    },
    {
      id: 3,
      name: "Digestive Care Ayurvedic Syrup",
      price: 649,
      originalPrice: 849,
      rating: 4.7,
      reviews: 1234,
      image: "/api/placeholder/300/300",
      inStock: true
    },
    {
      id: 4,
      name: "Women's Wellness Herbal Tea",
      price: 399,
      originalPrice: 599,
      rating: 4.6,
      reviews: 987,
      image: "/api/placeholder/300/300",
      badge: "New",
      inStock: false
    }
  ];

  const newArrivals = [
    {
      id: 5,
      name: "Stress Relief Natural Tablets",
      price: 749,
      originalPrice: 999,
      rating: 4.5,
      reviews: 456,
      image: "/api/placeholder/300/300",
      badge: "New",
      inStock: true
    },
    {
      id: 6,
      name: "Joint Care Ayurvedic Oil",
      price: 549,
      rating: 4.8,
      reviews: 789,
      image: "/api/placeholder/300/300",
      inStock: true
    },
    {
      id: 7,
      name: "Skin Glow Herbal Face Pack",
      price: 299,
      originalPrice: 449,
      rating: 4.4,
      reviews: 567,
      image: "/api/placeholder/300/300",
      badge: "Popular",
      inStock: true
    },
    {
      id: 8,
      name: "Sleep Well Natural Drops",
      price: 449,
      rating: 4.7,
      reviews: 345,
      image: "/api/placeholder/300/300",
      inStock: true
    }
  ];

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onToggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="relative">
        {/* Hero Banner */}
        <HeroBanner />
        
        {/* Concern Blocks */}
        <ConcernBlocks />
        
        {/* Best Sellers */}
        <ProductSection 
          title="Best Sellers"
          subtitle="Most loved products by our customers"
          products={bestSellers}
        />
        
        {/* Why Our Products Section */}
        <div className="py-16 bg-gradient-to-br from-ayurvedic-green-50 to-ayurvedic-beige-50">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ayurvedic-green-800 mb-4">
                Why Choose Our Products?
              </h2>
              <p className="text-ayurvedic-green-600 text-lg max-w-2xl mx-auto">
                Experience the perfect blend of ancient Ayurvedic wisdom and modern scientific research
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-ayurvedic-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="text-xl font-semibold text-ayurvedic-green-800 mb-2">100% Natural</h3>
                <p className="text-ayurvedic-green-600">Pure herbal ingredients sourced directly from trusted farms</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-ayurvedic-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔬</span>
                </div>
                <h3 className="text-xl font-semibold text-ayurvedic-green-800 mb-2">Lab Tested</h3>
                <p className="text-ayurvedic-green-600">Every product undergoes rigorous quality testing for safety</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-ayurvedic-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍⚕️</span>
                </div>
                <h3 className="text-xl font-semibold text-ayurvedic-green-800 mb-2">Doctor Formulated</h3>
                <p className="text-ayurvedic-green-600">Developed by experienced Ayurvedic practitioners</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <TestimonialSection />
        
        {/* New Arrivals */}
        <ProductSection 
          title="New Arrivals"
          subtitle="Latest additions to our wellness collection"
          products={newArrivals}
        />
        
        {/* Feedback Section */}
        <FeedbackSection />
        
        {/* Newsletter Signup */}
        <div className="py-16 bg-ayurvedic-green-800 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Wellness Tips
            </h2>
            <p className="text-ayurvedic-green-200 text-lg mb-8 max-w-2xl mx-auto">
              Get expert Ayurvedic advice, exclusive offers, and health tips delivered to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-ayurvedic-green-300"
              />
              <button className="bg-ayurvedic-gold-500 hover:bg-ayurvedic-gold-600 text-white font-medium px-8 py-3 rounded-full transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
