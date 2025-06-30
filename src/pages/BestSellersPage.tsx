
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { PageLoadingSkeleton } from '@/components/LoadingSkeleton';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BestSellersPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Dummy best seller products
  const bestSellerProducts = [
    {
      id: 1,
      name: "Complete Sexual Health Combo",
      price: 2199,
      originalPrice: 3299,
      image: "/api/placeholder/300/300",
      rating: 4.9,
      reviews: 456,
      description: "Ultimate package for male sexual wellness and vitality",
      inStock: true
    },
    {
      id: 2,
      name: "Women's Wellness Kit",
      price: 1899,
      originalPrice: 2799,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 234,
      description: "Complete hormonal balance and feminine wellness solution",
      inStock: true
    },
    {
      id: 3,
      name: "Vitality Booster Pack",
      price: 1599,
      originalPrice: 2299,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 389,
      description: "Natural energy and stamina enhancement bundle",
      inStock: true
    },
    {
      id: 4,
      name: "Immunity Shield Combo",
      price: 1299,
      originalPrice: 1899,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 567,
      description: "Complete immune system support package",
      inStock: true
    },
    {
      id: 5,
      name: "Stress Relief Bundle",
      price: 999,
      originalPrice: 1499,
      image: "/api/placeholder/300/300",
      rating: 4.5,
      reviews: 298,
      description: "Natural stress management and mental wellness kit",
      inStock: true
    },
    {
      id: 6,
      name: "Detox Master Pack",
      price: 1199,
      originalPrice: 1799,
      image: "/api/placeholder/300/300",
      rating: 4.4,
      reviews: 178,
      description: "Complete body detoxification and cleansing solution",
      inStock: true
    },
    // Add more products to test pagination
    ...Array.from({ length: 12 }, (_, i) => ({
      id: 7 + i,
      name: `Best Seller Product ${7 + i}`,
      price: 899 + (i * 100),
      originalPrice: 1299 + (i * 150),
      image: "/api/placeholder/300/300",
      rating: 4.0 + (Math.random() * 1),
      reviews: 100 + Math.floor(Math.random() * 400),
      description: `Premium wellness solution for health concern ${7 + i}`,
      inStock: true
    }))
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(bestSellerProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const handleBuyNow = (product: any) => {
    handleAddToCart(product);
    window.location.href = '/cart-page';
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <PageLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1C1C2D] mb-4">Best Sellers</h1>
          <p className="text-lg text-gray-600 mb-6">Our most popular wellness combinations</p>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed">
              Discover our top-selling product combinations that have helped thousands of customers achieve their wellness goals. 
              These carefully curated bundles offer comprehensive solutions at great value, combining the power of multiple 
              Ayurvedic formulations for maximum effectiveness.
            </p>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} best-selling products
          </p>
        </div>

        {/* Products Grid - Mobile: 2 per row, Desktop: 3 per row */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 mb-8">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                )}
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className={currentPage === page ? "bg-olive/20 rounded-full px-3 py-1" : ""}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BestSellersPage;
