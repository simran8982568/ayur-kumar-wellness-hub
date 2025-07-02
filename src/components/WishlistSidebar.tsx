import React, { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WishlistProductCard from './WishlistProductCard';
import { allProducts, Product } from '@/data/products';
import { useNavigate } from 'react-router-dom';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistSidebar: React.FC<WishlistSidebarProps> = ({ isOpen, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Function to update wishlist items
  const updateWishlistItems = () => {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const wishlistProducts = allProducts.filter(product =>
      wishlistIds.includes(product.id)
    );
    setWishlistItems(wishlistProducts);
  };

  useEffect(() => {
    if (isOpen) {
      updateWishlistItems();
    }
  }, [isOpen]);

  // Listen for wishlist updates - real-time synchronization
  useEffect(() => {
    const handleWishlistUpdate = () => {
      updateWishlistItems();
    };

    // Listen for wishlist updates from any component
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    // Also listen for storage changes (in case of multiple tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'wishlist') {
        updateWishlistItems();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);



  const handleRemoveFromWishlist = (productId: number) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = wishlist.filter((id: number) => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    updateWishlistItems();
  };

  const handleViewAllWishlist = () => {
    onClose();
    navigate('/account?tab=wishlist');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-screen w-[400px] max-w-full z-50 bg-background shadow-lg overflow-y-auto border-l border-border">
        <div className="p-4 border-b border-border sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              <h2 className="text-lg font-semibold text-foreground">Wishlist</h2>
              <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                {wishlistItems.length}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 flex-1">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-4 text-sm">Save products you love to your wishlist</p>
              <Button
                onClick={() => {
                  onClose();
                  navigate('/shop-all');
                }}
                className="bg-[#111111] hover:bg-[#302e2e] text-white rounded-lg"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
                {wishlistItems.slice(0, 6).map((product) => (
                  <WishlistProductCard
                    key={product.id}
                    product={product}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                  />
                ))}
              </div>
              
              {wishlistItems.length > 6 && (
                <div className="text-center py-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">
                    +{wishlistItems.length - 6} more items in your wishlist
                  </p>
                  <Button
                    onClick={handleViewAllWishlist}
                    variant="outline"
                    className="w-full border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white rounded-lg"
                  >
                    View All Wishlist Items
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {wishlistItems.length > 0 && wishlistItems.length <= 6 && (
          <div className="p-4 border-t border-border sticky bottom-0 bg-background">
            <Button
              onClick={handleViewAllWishlist}
              variant="outline"
              className="w-full border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white rounded-lg"
            >
              View All in Account
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistSidebar;
