
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { PageLoadingSkeleton } from '@/components/LoadingSkeleton';

const NewArrivalsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  // Dummy new arrivals products
  const newArrivalsProducts = [
    {
      id: 1,
      name: "Himalayan Shilajit Premium",
      price: 1299,
      originalPrice: 1899,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 245,
      description: "Pure Himalayan Shilajit for enhanced vitality and energy",
      inStock: true
    },
    {
      id: 2,
      name: "Ashwagandha KSM-66",
      price: 899,
      originalPrice: 1299,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 189,
      description: "Clinically proven Ashwagandha for stress relief and strength",
      inStock: true
    },
    {
      id: 3,
      name: "Women's Hormone Balance",
      price: 1099,
      originalPrice: 1599,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 156,
      description: "Natural hormone support for women's wellness",
      inStock: true
    },
    {
      id: 4,
      name: "Immunity Booster Plus",
      price: 699,
      originalPrice: 999,
      image: "/api/placeholder/300/300",
      rating: 4.5,
      reviews: 298,
      description: "Complete immunity support with 12 natural herbs",
      inStock: true
    },
    {
      id: 5,
      name: "Liver Detox Formula",
      price: 799,
      originalPrice: 1199,
      image: "/api/placeholder/300/300",
      rating: 4.4,
      reviews: 123,
      description: "Natural liver cleansing and detoxification support",
      inStock: true
    },
    {
      id: 6,
      name: "Joint Care Advanced",
      price: 1199,
      originalPrice: 1699,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 167,
      description: "Complete joint health and mobility support",
      inStock: true
    },
    {
      id: 7,
      name: "Digestive Health Pro",
      price: 649,
      originalPrice: 899,
      image: "/api/placeholder/300/300",
      rating: 4.3,
      reviews: 89,
      description: "Comprehensive digestive system support",
      inStock: true
    },
    {
      id: 8,
      name: "Sleep Support Natural",
      price: 599,
      originalPrice: 799,
      image: "/api/placeholder/300/300",
      rating: 4.5,
      reviews: 134,
      description: "Natural sleep enhancement and relaxation formula",
      inStock: true
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(newArrivalsProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBuyNow = (product: any) => {
    // ProductCard will handle adding to cart internally
    window.location.href = '/cart-page';
  };

  if (loading) {
    return <PageLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">New Arrivals</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Discover our latest wellness products</p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Explore our newest collection of premium Ayurvedic and natural health products. Each product is carefully 
              selected and formulated using traditional wisdom combined with modern science to bring you the best in 
              natural wellness solutions.
            </p>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {products.length} new products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
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

export default NewArrivalsPage;
