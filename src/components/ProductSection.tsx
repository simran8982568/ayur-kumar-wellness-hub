
import React from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
  onAddToCart: (product: Product) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ 
  title, 
  subtitle, 
  products, 
  showViewAll = true,
  onAddToCart
}) => {
  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#723421] dark:text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[#723421]/70 dark:text-gray-300 text-lg">
                {subtitle}
              </p>
            )}
          </div>
          
          {showViewAll && (
            <Link to="/shop">
              <Button 
                variant="outline" 
                className="border-2 border-[#723421] text-[#723421] hover:bg-[#723421] hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black rounded-full font-medium hidden md:flex"
              >
                View All
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
        
        {showViewAll && (
          <div className="text-center mt-12 md:hidden">
            <Link to="/shop">
              <Button 
                variant="outline" 
                className="border-2 border-[#723421] text-[#723421] hover:bg-[#723421] hover:text-white rounded-full font-medium"
              >
                View All Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
