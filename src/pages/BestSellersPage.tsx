
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { PageLoadingSkeleton } from '@/components/LoadingSkeleton';

const BestSellersPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  // Dummy best seller products
  const bestSellerProducts = [
    {
      id: 1,
      name: "Ultimate Vitality Combo",
      price: 2499,
      originalPrice: 3999,
      image: "/api/placeholder/300/300",
      rating: 4.9,
      reviews: 567,
      description: "Complete wellness package with Shilajit, Ashwagandha & Safed Musli"
    },
    {
      id: 2,
      name: "Men's Power Pack",
      price: 1899,
      originalPrice: 2899,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 423,
      description: "Comprehensive male enhancement and vitality solution"
    },
    {
      id: 3,
      name: "Women's Wellness Bundle",
      price: 1699,
      originalPrice: 2599,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 389,
      description: "Complete women's health support with hormone balance"
    },
    {
      id: 4,
      name: "Immunity Shield Max",
      price: 1299,
      originalPrice: 1899,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 612,
      description: "Advanced immunity booster with 15 powerful herbs"
    },
    {
      id: 5,
      name: "Stress Relief Combo",
      price: 1499,
      originalPrice: 2199,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 298,
      description: "Natural stress management and mental wellness support"
    },
    {
      id: 6,
      name: "Joint & Bone Health Kit",
      price: 1799,
      originalPrice: 2699,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 234,
      description: "Complete joint care and bone strength solution"
    },
    {
      id: 7,
      name: "Digestive Wellness Set",
      price: 1199,
      originalPrice: 1799,
      image: "/api/placeholder/300/300",
      rating: 4.5,
      reviews: 345,
      description: "Comprehensive digestive health and gut support"
    },
    {
      id: 8,
      name: "Energy & Stamina Booster",
      price: 999,
      originalPrice: 1499,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 456,
      description: "Natural energy enhancement and stamina building formula"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(bestSellerProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const handleBuyNow = (product: any) => {
    handleAddToCart(product);
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
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Best Sellers</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Our most popular and trusted wellness solutions</p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These are our top-rated and most trusted products, chosen by thousands of satisfied customers. 
              Each best-seller has been proven effective through customer reviews and consistent results, 
              making them the perfect choice for your wellness journey.
            </p>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {products.length} best-selling products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BestSellersPage;
