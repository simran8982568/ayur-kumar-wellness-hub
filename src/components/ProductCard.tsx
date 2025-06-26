
import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
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
      className="healthcare-card group cursor-pointer h-full product-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-t-lg mb-4">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-brand-secondary text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.badge}
          </div>
        )}
        
        <button 
          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-colors duration-200 dark:bg-gray-800/80 dark:hover:bg-gray-800"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4 text-brand-primary" />
        </button>

        {discount > 0 && (
          <div className="absolute top-3 right-12 z-10 bg-brand-alert text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-48 object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-brand-alert text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            ({product.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-brand-primary">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <Button 
          className="w-full brand-button flex items-center justify-center space-x-2"
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
