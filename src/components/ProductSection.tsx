
import React from 'react';
import ProductCard from './ProductCard';
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

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  showViewAll?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({ 
  title, 
  subtitle, 
  products, 
  showViewAll = true 
}) => {
  return (
    <div className="py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ayurvedic-green-800 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-ayurvedic-green-600 text-lg">
                {subtitle}
              </p>
            )}
          </div>
          
          {showViewAll && (
            <Button 
              variant="outline" 
              className="border-2 border-ayurvedic-green-500 text-ayurvedic-green-700 hover:bg-ayurvedic-green-50 rounded-full font-medium hidden md:flex"
            >
              View All
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {showViewAll && (
          <div className="text-center mt-8 md:hidden">
            <Button 
              variant="outline" 
              className="border-2 border-ayurvedic-green-500 text-ayurvedic-green-700 hover:bg-ayurvedic-green-50 rounded-full font-medium"
            >
              View All Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
