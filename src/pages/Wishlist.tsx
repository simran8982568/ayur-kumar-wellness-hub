import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { allProducts, Product } from "@/data/products";
import { useNavigate } from "react-router-dom";

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Function to update wishlist items
  const updateWishlistItems = () => {
    const wishlistIds = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const wishlistProducts = allProducts.filter((product) =>
      wishlistIds.includes(product.id)
    );
    setWishlistItems(wishlistProducts);
  };

  useEffect(() => {
    // Initial load of wishlist items
    updateWishlistItems();
  }, []);

  // Listen for wishlist updates - real-time synchronization
  useEffect(() => {
    const handleWishlistUpdate = () => {
      updateWishlistItems();
    };

    // Listen for wishlist updates from any component
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    // Also listen for storage changes (in case of multiple tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'wishlist') {
        updateWishlistItems();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
      window.removeEventListener('storage', handleStorageChange);
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
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Save products you love to your wishlist
            </p>
            <button
              onClick={() => navigate('/shop-all')}
              className="inline-flex items-center px-6 py-3 bg-[#111111] text-white font-medium rounded-xl hover:bg-[#302e2e] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {wishlistItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyNow={(product) => {
                  // ProductCard will handle adding to cart internally
                  window.location.href = "/cart-page";
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
