
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { newArrivals, essentialProducts } from '@/data/products';

const ViewAll: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  const getProductsAndTitle = () => {
    switch (category) {
      case 'new-arrivals':
        return {
          products: newArrivals,
          title: 'New Arrivals',
          subtitle: 'Discover our latest wellness innovations'
        };
      case 'daily-essentials':
        return {
          products: essentialProducts,
          title: 'Daily Essentials',
          subtitle: 'Must-have products for everyday health'
        };
      default:
        return {
          products: [],
          title: 'Products',
          subtitle: ''
        };
    }
  };

  const { products, title, subtitle } = getProductsAndTitle();

  const handleBuyNow = (product: any) => {
    // ProductCard will handle adding to cart internally
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewAll;
