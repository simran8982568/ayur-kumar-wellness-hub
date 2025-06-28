
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const womensHealthProducts = [
  {
    id: 4,
    name: "Women's Wellness Pack",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 312,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    badge: "Bestseller",
    inStock: true,
    description: "Complete wellness solution for women"
  },
  {
    id: 10,
    name: "Hormonal Balance Support",
    price: 649,
    originalPrice: 799,
    rating: 4.7,
    reviews: 189,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    inStock: true,
    description: "Natural hormonal balance with Shatavari"
  },
  {
    id: 11,
    name: "Women's Iron & Energy",
    price: 499,
    rating: 4.5,
    reviews: 145,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    inStock: true,
    description: "Iron supplement with natural energy boosters"
  },
  {
    id: 12,
    name: "Prenatal Care Combo",
    price: 1199,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 98,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    badge: "Recommended",
    inStock: true,
    description: "Complete prenatal nutrition support"
  }
];

const WomensHealth: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Women's Health</h1>
          <p className="text-gray-600">Specially crafted Ayurvedic products for women's health and wellness</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {womensHealthProducts.map(product => (
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

export default WomensHealth;
