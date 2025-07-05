
import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  
  // Show up to 4 images per product (using same image as placeholder for now)
  const productImages = [product.image, product.image, product.image, product.image];
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Auto-slide effect on hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
      }, 800); // Change image every 800ms when hovered
    } else {
      setCurrentImageIndex(0); // Reset to first image when not hovered
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, productImages.length]);

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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
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
          <div className="absolute top-2 left-2 z-10 bg-[#111111] text-white text-xs font-medium px-2 py-1 uppercase tracking-wide rounded-lg">
            {product.badge}
          </div>
        )}

        {discount > 0 && (
          <div className="absolute top-2 right-2 z-10 bg-[#E5002B] text-white text-xs font-medium px-2 py-1 uppercase tracking-wide rounded-lg">
            -{discount}%
          </div>
        )}
        
        {/* Image with Auto-slide on Hover */}
        <div className="relative">
          <img 
            src={productImages[currentImageIndex]} 
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            className={`w-full h-32 sm:h-48 object-cover transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            loading="lazy"
          />
          
          {/* Manual Navigation (visible on hover) */}
          {isHovered && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md transition-all opacity-0 hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-3 h-3 text-gray-700" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md transition-all opacity-0 hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-3 h-3 text-gray-700" />
              </button>
            </>
          )}
          
          {/* Image Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {productImages.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium uppercase tracking-wide rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-2 sm:p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-[#1C1C2D] mb-2 hover:text-[#E5002B] transition-colors line-clamp-2 text-xs sm:text-base">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-[#1C1C2D] ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-3 mt-auto">
          <div className="flex items-center space-x-1">
            <span className="text-sm sm:text-lg font-bold text-[#1C1C2D]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-[#111111] hover:bg-[#111111]/90 text-white font-medium rounded-xl text-xs py-2"
            disabled={!product.inStock || isLoading}
            onClick={handleBuyNow}
            aria-label={`Buy ${product.name} now`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              product.inStock ? 'Buy Now' : 'Notify Me'
            )}
          </Button>
          
          <Button 
            variant="outline"
            className="w-full border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white flex items-center justify-center space-x-1 rounded-xl text-xs py-2"
            disabled={!product.inStock || isLoading}
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            aria-label={isInCart ? `Remove ${product.name} from cart` : `Add ${product.name} to cart`}
          >
            {isInCart ? <Minus className="w-3 h-3" /> : <ShoppingCart className="w-3 h-3" />}
            <span>{isInCart ? 'Remove' : 'Add to Cart'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
