import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WishlistButtonProps {
  productId: number;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  className = "",
}) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.includes(productId));
  }, [productId]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      // Redirect to sign in if not logged in
      navigate('/signin');
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((id: number) => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, productId];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(true);
    }

    // Dispatch custom event for wishlist updates - ensure real-time sync
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));

    // Force immediate update for all wishlist components
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    }, 0);
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`absolute top-3 right-3 z-10 bg-white border border-gray-200 p-2 hover:bg-gray-50 transition-colors rounded-xl ${className}`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`w-4 h-4 transition-colors ${
          isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600"
        }`}
      />
    </button>
  );
};

export default WishlistButton;
