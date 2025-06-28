
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  inStock: boolean;
  description?: string;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  // Sample products data (in a real app, this would come from your API)
  const allProducts: Product[] = [
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
    // Add more products as needed
  ];

  useEffect(() => {
    // Get wishlist product IDs from localStorage
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Filter products that are in the wishlist
    const wishlistProducts = allProducts.filter(product => 
      wishlistIds.includes(product.id)
    );
    
    setWishlistItems(wishlistProducts);
  }, []);

  // Listen for storage changes to update wishlist in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const wishlistProducts = allProducts.filter(product => 
        wishlistIds.includes(product.id)
      );
      setWishlistItems(wishlistProducts);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from the wishlist button
    const handleWishlistUpdate = () => {
      const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const wishlistProducts = allProducts.filter(product => 
        wishlistIds.includes(product.id)
      );
      setWishlistItems(wishlistProducts);
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save products you love to your wishlist</p>
            <a
              href="/shop-all"
              className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-medium rounded-xl hover:bg-brand-secondary transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(product) => {
                  console.log('Added to cart:', product.name);
                  // Handle add to cart logic
                }}
                onBuyNow={(product) => {
                  console.log('Buy now:', product.name);
                  // Handle buy now logic
                }}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
