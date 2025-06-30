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
  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch custom event to update cart count
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    window.location.href = "/checkout";
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
                className="border-[#c74a1b] text-[#c74a1b] hover:bg-[#c74a1b] hover:text-white rounded-xl"
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
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
