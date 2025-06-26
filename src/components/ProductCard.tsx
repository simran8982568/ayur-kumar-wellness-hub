
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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="ayurvedic-card group cursor-pointer h-full">
      <div className="relative overflow-hidden rounded-xl mb-4">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-ayurvedic-gold-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.badge}
          </div>
        )}
        
        <button className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-colors duration-200">
          <Heart className="w-4 h-4 text-ayurvedic-green-600" />
        </button>

        {discount > 0 && (
          <div className="absolute top-3 right-12 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-ayurvedic-green-800 mb-2 line-clamp-2 group-hover:text-ayurvedic-green-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-ayurvedic-gold-400 text-ayurvedic-gold-400" />
            <span className="text-sm font-medium text-ayurvedic-green-700 ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            ({product.reviews} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-ayurvedic-green-800">
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
          className="w-full ayurvedic-button flex items-center justify-center space-x-2"
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
