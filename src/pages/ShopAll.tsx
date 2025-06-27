import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/LoadingSkeletons';
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
  category: string;
  tags: string[];
}

const ShopAll: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    solutions: '',
    productType: '',
    ingredients: '',
    priceRange: [0, 2000]
  });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Sample products data
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: "Immunity Booster Juice",
      price: 599,
      originalPrice: 799,
      rating: 4.8,
      reviews: 245,
      image: "/api/placeholder/300/300",
      badge: "Best Seller",
      inStock: true,
      description: "Natural immunity enhancer with amla and giloy",
      category: "Juices",
      tags: ["Immunity", "Amla", "Giloy"]
    },
    {
      id: 2,
      name: "Digestive Care Capsules",
      price: 449,
      originalPrice: 599,
      rating: 4.5,
      reviews: 198,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Supports healthy digestion and gut health",
      category: "Capsules",
      tags: ["Digestive Health", "Probiotics"]
    },
    {
      id: 3,
      name: "Skin Glow Serum",
      price: 899,
      rating: 4.9,
      reviews: 312,
      image: "/api/placeholder/300/300",
      badge: "Popular",
      inStock: true,
      description: "Enhances skin radiance with aloe vera and turmeric",
      category: "Serums",
      tags: ["Skin Care", "Aloe Vera", "Turmeric"]
    },
    {
      id: 4,
      name: "Energy Boost Powder",
      price: 649,
      originalPrice: 749,
      rating: 4.7,
      reviews: 267,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Provides sustained energy with ashwagandha",
      category: "Powders",
      tags: ["Energy", "Ashwagandha"]
    },
    {
      id: 5,
      name: "Joint Relief Oil",
      price: 549,
      rating: 4.6,
      reviews: 221,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Soothes joint pain with neem and eucalyptus",
      category: "Oils",
      tags: ["Joint Pain", "Neem", "Eucalyptus"]
    },
    {
      id: 6,
      name: "Detox Tea Blend",
      price: 399,
      originalPrice: 499,
      rating: 4.4,
      reviews: 176,
      image: "/api/placeholder/300/300",
      inStock: true,
      description: "Cleanses and detoxifies with herbal blend",
      category: "Teas",
      tags: ["Detox", "Herbal"]
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      setLoading(false);
    }, 1500);
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // Navigate to checkout
    window.location.href = '/checkout';
  };

  const handleBuyNow = (product: Product) => {
    console.log('Buy now:', product);
    // Navigate to checkout
    window.location.href = '/checkout';
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'priceLowHigh', label: 'Price: Low to High' },
    { value: 'priceHighLow', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2 tracking-tight">Shop All Products</h1>
            <p className="text-gray-600 dark:text-gray-400">Discover our complete range of Ayurvedic wellness products</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-brand-primary"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-black">
              <h3 className="font-semibold text-black dark:text-white mb-4 tracking-tight">Solutions</h3>
              <div className="space-y-2">
                {['Immunity', 'Detox', 'Skin Care', 'Digestive Health', 'Energy'].map(solution => (
                  <label key={solution} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{solution}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-black">
              <h3 className="font-semibold text-black dark:text-white mb-4 tracking-tight">Product Type</h3>
              <div className="space-y-2">
                {['Juices', 'Capsules', 'Gels', 'Powders', 'Oils'].map(type => (
                  <label key={type} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-black">
              <h3 className="font-semibold text-black dark:text-white mb-4 tracking-tight">Key Ingredients</h3>
              <div className="space-y-2">
                {['Amla', 'Aloe Vera', 'Ashwagandha', 'Turmeric', 'Neem'].map(ingredient => (
                  <label key={ingredient} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{ingredient}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <ProductGridSkeleton />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            )}
            
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShopAll;
