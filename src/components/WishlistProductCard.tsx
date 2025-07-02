import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  slug?: string;
  category: string;
}

interface WishlistProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onRemoveFromWishlist?: (productId: number) => void;
}

const WishlistProductCard: React.FC<WishlistProductCardProps> = ({
  product,
  onAddToCart,
  onRemoveFromWishlist
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Check if product is in cart
  useEffect(() => {
    const checkCartStatus = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const inCart = cart.some((item: any) => item.id === product.id);
      setIsInCart(inCart);
    };

    checkCartStatus();
    
    // Listen for cart updates
    const handleCartUpdate = () => checkCartStatus();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [product.id]);

  const handleRemoveFromWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(product.id);
    }
    
    // Also update localStorage directly
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = wishlist.filter((id: number) => id !== product.id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
  };

  const handleCardClick = () => {
    const slug = product.slug || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));

    // Add to cart in localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setIsInCart(true);

    // Dispatch custom event to update cart count
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    setIsLoading(false);
  };

  const handleRemoveFromCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);

    // Remove from cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter((item: any) => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setIsInCart(false);

    // Dispatch custom event to update cart count
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    setIsLoading(false);
  };

  return (
    <div
      className="w-full rounded-xl shadow p-2 bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name} details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      <div className="relative overflow-hidden">
        {product.badge && (
          <div className="absolute top-1 left-1 z-10 bg-[#111111] text-white text-xs font-medium px-1.5 py-0.5 uppercase tracking-wide rounded-md">
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleRemoveFromWishlist}
          className="absolute top-1 right-1 z-10 bg-white border border-gray-200 p-1 hover:bg-gray-50 transition-colors rounded-lg"
          aria-label="Remove from wishlist"
        >
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
        </button>

        {discount > 0 && (
          <div className="absolute top-1 right-8 z-10 bg-[#E5002B] text-white text-xs font-medium px-1.5 py-0.5 uppercase tracking-wide rounded-md">
            -{discount}%
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-24 object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          loading="lazy"
        />

        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-1.5 py-0.5 text-xs font-medium uppercase tracking-wide rounded-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-1.5 flex-1 flex flex-col">
        <h3 className="font-semibold text-[#1C1C2D] mb-1 hover:text-[#E5002B] transition-colors line-clamp-2 text-xs">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-xs text-gray-600 mb-1 line-clamp-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center mb-1">
          <div className="flex items-center">
            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-[#1C1C2D] ml-0.5">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mb-2 mt-auto">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-[#1C1C2D]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Button
            className="w-full bg-[#111111] hover:bg-[#111111]/90 text-white font-medium rounded-xl text-xs py-1.5"
            disabled={!product.inStock || isLoading}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            aria-label={`Buy ${product.name} now`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              product.inStock ? 'Buy Now' : 'Notify Me'
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white flex items-center justify-center space-x-1 rounded-xl text-xs py-1.5"
            disabled={!product.inStock || isLoading}
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            aria-label={isInCart ? `Remove ${product.name} from cart` : `Add ${product.name} to cart`}
          >
            {isInCart ? <Minus className="w-2.5 h-2.5" /> : <ShoppingCart className="w-2.5 h-2.5" />}
            <span>{isInCart ? 'Remove' : 'Add to Cart'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistProductCard;
