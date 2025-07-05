
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { mensHealthProducts } from '@/data/products';

const ViewAll: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Use only mens health products
  const allProducts = mensHealthProducts;

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'mens-health', name: "Men's Health" }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  const handleBuyNow = (product: any) => {
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">All Products</h1>
          <p className="text-gray-600">Discover our complete wellness collection</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={selectedCategory === category.id 
                ? "bg-[#111111] text-white" 
                : "border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewAll;
