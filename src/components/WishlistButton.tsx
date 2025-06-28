
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ product, className = "" }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some((item: Product) => item.id === product.id));
  }, [product.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isInWishlist) {
      const newWishlist = wishlist.filter((item: Product) => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setIsInWishlist(false);
    } else {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleWishlist}
      className={`p-2 ${className}`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        className={`w-5 h-5 transition-colors ${
          isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
        }`} 
      />
    </Button>
  );
};

export default WishlistButton;
