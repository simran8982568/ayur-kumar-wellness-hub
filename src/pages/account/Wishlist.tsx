
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/signin');
      return;
    }

    // Load wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(wishlist);
  }, [navigate]);

  const clearWishlist = () => {
    localStorage.setItem('wishlist', JSON.stringify([]));
    setWishlistItems([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">My Wishlist</h1>
          <p className="text-gray-600">Products you've saved for later</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Start adding products to your wishlist to see them here</p>
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-brand-primary hover:bg-brand-secondary text-white"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{wishlistItems.length} item(s) in your wishlist</p>
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Clear Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((product: any) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onBuyNow={() => navigate('/checkout')}
                  onAddToCart={() => console.log('Added to cart:', product.name)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
