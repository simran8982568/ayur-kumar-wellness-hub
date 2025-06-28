
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const combosEssentialsProducts = [
  {
    id: 6,
    name: "Daily Essentials Kit",
    price: 799,
    rating: 4.4,
    reviews: 98,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    badge: "Value Pack",
    inStock: true,
    description: "Essential daily supplements bundle"
  },
  {
    id: 13,
    name: "Immunity Super Combo",
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 267,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    badge: "Save 25%",
    inStock: true,
    description: "Complete immunity protection bundle"
  },
  {
    id: 14,
    name: "Family Wellness Pack",
    price: 2199,
    originalPrice: 2799,
    rating: 4.6,
    reviews: 145,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    inStock: true,
    description: "Wellness solutions for the entire family"
  },
  {
    id: 15,
    name: "Starter Essentials",
    price: 399,
    originalPrice: 499,
    rating: 4.3,
    reviews: 89,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    badge: "Beginner",
    inStock: true,
    description: "Perfect starter pack for Ayurvedic wellness"
  }
];

const CombosEssentials: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Combos & Essentials</h1>
          <p className="text-gray-600">Value-packed combinations and essential products for your wellness journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {combosEssentialsProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onBuyNow={() => window.location.href = '/checkout'}
              onAddToCart={() => console.log('Added to cart:', product.name)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CombosEssentials;
