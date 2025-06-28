
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const mensHealthProducts = [
  {
    id: 5,
    name: "Men's Vitality Combo",
    price: 1299,
    originalPrice: 1599,
    rating: 4.5,
    reviews: 189,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    inStock: true,
    description: "Comprehensive health support for men"
  },
  {
    id: 7,
    name: "Testosterone Booster Natural",
    price: 799,
    originalPrice: 999,
    rating: 4.6,
    reviews: 156,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    badge: "Popular",
    inStock: true,
    description: "Natural testosterone support with Ashwagandha"
  },
  {
    id: 8,
    name: "Male Fertility Support",
    price: 699,
    rating: 4.4,
    reviews: 98,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    inStock: true,
    description: "Ayurvedic support for male reproductive health"
  },
  {
    id: 9,
    name: "Stamina & Energy Pack",
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviews: 234,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    inStock: true,
    description: "Enhanced stamina and energy for active men"
  }
];

const MensHealth: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Men's Health</h1>
          <p className="text-gray-600">Specially formulated Ayurvedic solutions for men's wellness and vitality</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mensHealthProducts.map(product => (
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

export default MensHealth;
