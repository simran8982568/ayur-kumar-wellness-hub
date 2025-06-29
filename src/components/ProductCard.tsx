
import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import WishlistButton from './WishlistButton';

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
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
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

  const handleCardClick = () => {
    const slug = product.slug || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
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
    
    if (onAddToCart) {
      onAddToCart(product);
    }
    
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

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    
    // Add to cart and redirect to cart page
    if (!isInCart) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
    
    if (onBuyNow) {
      onBuyNow(product);
    }
    
    navigate('/cart-page');
    setIsLoading(false);
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col"
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
          <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs font-medium px-2 py-1 uppercase tracking-wide rounded-lg">
            {product.badge}
          </div>
        )}
        
        <WishlistButton productId={product.id} />

        {discount > 0 && (
          <div className="absolute top-3 right-12 z-10 bg-[#c74a1b] dark:bg-blue-600 text-white text-xs font-medium px-2 py-1 uppercase tracking-wide rounded-lg">
            -{discount}%
          </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-48 sm:h-56 object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          loading="lazy"
        />
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 text-sm font-medium uppercase tracking-wide rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-black dark:text-white mb-2 hover:text-[#c74a1b] dark:hover:text-blue-400 transition-colors line-clamp-2 text-sm sm:text-base">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-black dark:text-white ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-2">
            ({product.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold text-black dark:text-white">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium rounded-xl"
            disabled={!product.inStock || isLoading}
            onClick={handleBuyNow}
            aria-label={`Buy ${product.name} now`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              product.inStock ? 'Buy Now' : 'Notify Me'
            )}
          </Button>
          
          <Button 
            variant="outline"
            className="w-full border-[#c74a1b] dark:border-blue-600 text-[#c74a1b] dark:text-blue-600 hover:bg-[#c74a1b] dark:hover:bg-blue-600 hover:text-white flex items-center justify-center space-x-2 rounded-xl"
            disabled={!product.inStock || isLoading}
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            aria-label={isInCart ? `Remove ${product.name} from cart` : `Add ${product.name} to cart`}
          >
            {isInCart ? <Minus className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            <span>{isInCart ? 'Remove' : 'Add to Cart'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
