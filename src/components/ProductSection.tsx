import React from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

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

export interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  showViewAll?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
  showViewAll = false,
}) => {
  const handleBuyNow = (product: Product) => {
    // ProductCard will handle adding to cart internally
    window.location.href = "/cart-page";
  };

  return (
    <section className="py-12 px-4 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2 tracking-tight">
              {title}
            </h2>
            {subtitle && <p className="text-gray-600 text-base">{subtitle}</p>}
          </div>

          {showViewAll && viewAllLink && (
            <Link to={viewAllLink}>
              <Button
                variant="outline"
                className="border-[#111111] text-[#111111] hover:bg-[#302e2e] hover:text-white rounded-xl"
              >
                View All
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
