
import React, { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    onAddToCart?.(product);
    
    // Add to recently viewed (localStorage)
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const updatedViewed = [product, ...recentlyViewed.filter((p: Product) => p.id !== product.id)].slice(0, 10);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedViewed));
  };

  return (
    <div 
      className="minimalist-card group cursor-pointer h-full transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden mb-4">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs font-medium px-2 py-1 uppercase tracking-wide">
            {product.badge}
          </div>
        )}
        
        <button 
          className="absolute top-3 right-3 z-10 bg-white border border-gray-200 p-2 transition-colors duration-200 hover:bg-gray-50"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>

        {discount > 0 && (
          <div className="absolute top-3 right-12 z-10 bg-brand-accent text-white text-xs font-medium px-2 py-1 uppercase tracking-wide">
            -{discount}%
          </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-48 object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-brand-alert text-white px-3 py-1 text-sm font-medium uppercase tracking-wide">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors tracking-tight">
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
        
        <Button 
          className="w-full minimalist-button-primary flex items-center justify-center space-x-2"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Notify Me'}</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
