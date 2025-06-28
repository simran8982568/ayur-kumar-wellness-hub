
import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
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
  const navigate = useNavigate();
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    const slug = product.slug || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add to cart in localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    if (onAddToCart) {
      onAddToCart(product);
    }
    
    setIsLoading(false);
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    
    // Add to cart and redirect to checkout
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    if (onBuyNow) {
      onBuyNow(product);
    }
    
    navigate('/checkout');
    setIsLoading(false);
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs font-medium px-2 py-1 uppercase tracking-wide rounded-lg">
            {product.badge}
          </div>
        )}
        
        <WishlistButton productId={product.id} />

        {discount > 0 && (
          <div className="absolute top-3 right-12 z-10 bg-[#c74a1b] text-white text-xs font-medium px-2 py-1 uppercase tracking-wide rounded-lg">
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
        <h3 className="font-semibold text-gray-900 mb-2 hover:text-[#c74a1b] transition-colors line-clamp-2 text-sm sm:text-base">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900 ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-gray-500 ml-2">
            ({product.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            className="w-full bg-[#c74a1b] hover:bg-[#b8441a] text-white font-medium rounded-lg"
            disabled={!product.inStock || isLoading}
            onClick={handleBuyNow}
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
            className="w-full border-[#c74a1b] text-[#c74a1b] hover:bg-[#c74a1b] hover:text-white flex items-center justify-center space-x-2 rounded-lg"
            disabled={!product.inStock || isLoading}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
