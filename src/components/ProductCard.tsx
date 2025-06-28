
import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onAddToCart?.(product);
    
    // Add to recently viewed (localStorage)
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const updatedViewed = [product, ...recentlyViewed.filter((p: Product) => p.id !== product.id)].slice(0, 10);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedViewed));
    
    setIsLoading(false);
  };

  const handleBuyNow = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onBuyNow?.(product);
    
    // Add to recently viewed (localStorage)
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const updatedViewed = [product, ...recentlyViewed.filter((p: Product) => p.id !== product.id)].slice(0, 10);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedViewed));
    
    setIsLoading(false);
  };

  const handleProductClick = () => {
    window.location.href = `/product/${product.id}`;
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden mb-4 rounded-lg" onClick={handleProductClick}>
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs font-medium px-2 py-1 uppercase tracking-wide rounded">
            {product.badge}
          </div>
        )}
        
        <WishlistButton 
          product={product}
          className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full"
        />

        {discount > 0 && (
          <div className="absolute top-3 right-12 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 uppercase tracking-wide rounded">
            -{discount}%
          </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-48 object-cover rounded-lg transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          loading="lazy"
        />
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center rounded-lg">
            <span className="bg-red-500 text-white px-3 py-1 text-sm font-medium uppercase tracking-wide rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 
          className="font-semibold text-gray-900 mb-2 hover:text-brand-primary transition-colors line-clamp-2 cursor-pointer"
          onClick={handleProductClick}
        >
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
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
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
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white rounded-lg"
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
            className="w-full border border-brand-primary text-brand-primary bg-white hover:bg-brand-primary hover:text-white rounded-lg flex items-center justify-center space-x-2"
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
