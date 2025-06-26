
import React from 'react';
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
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card group cursor-pointer h-full">
      <div className="relative overflow-hidden rounded-xl mb-4">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-[#723421] dark:bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.badge}
          </div>
        )}
        
        <button className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-colors duration-200">
          <Heart className="w-4 h-4 text-[#723421]" />
        </button>

        {discount > 0 && (
          <div className="absolute top-3 right-12 z-10 bg-[#d32f2f] text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image w-full h-48 object-cover"
        />
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-[#d32f2f] text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-[#723421] dark:text-white mb-2 line-clamp-2 group-hover:text-[#723421]/80 dark:group-hover:text-gray-300 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-[#723421] dark:text-white ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            ({product.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#723421] dark:text-blue-400">
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
          onClick={onAddToCart}
          className="w-full btn-primary flex items-center justify-center space-x-2"
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Notify Me'}</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
