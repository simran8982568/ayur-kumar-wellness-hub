
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // This would typically dispatch to a cart context or state management
  };

  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 text-base">
                {subtitle}
              </p>
            )}
          </div>
          
          {showViewAll && (
            <Button 
              variant="outline" 
              className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium hidden md:flex items-center space-x-2 uppercase tracking-wide"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        
        {showViewAll && (
          <div className="text-center mt-8 md:hidden">
            <Button 
              variant="outline" 
              className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium flex items-center space-x-2 mx-auto uppercase tracking-wide"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
