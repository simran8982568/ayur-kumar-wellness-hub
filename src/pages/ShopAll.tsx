
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { 
  mensHealthProducts, 
  womensHealthProducts, 
  comboProducts, 
  essentialProducts, 
  newArrivals 
} from '@/data/products';

const ShopAll: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Combine all products
  const allProducts = [
    ...newArrivals.map(p => ({ ...p, category: 'new-arrivals' })),
    ...mensHealthProducts.map(p => ({ ...p, category: 'mens-health' })),
    ...womensHealthProducts.map(p => ({ ...p, category: 'womens-health' })),
    ...comboProducts.map(p => ({ ...p, category: 'combos' })),
    ...essentialProducts.map(p => ({ ...p, category: 'essentials' }))
  ];

  useEffect(() => {
    // Get search query from URL params
    const searchFromUrl = searchParams.get('search') || '';
    const categoryFromUrl = searchParams.get('category') || 'all';
    
    setSearchQuery(searchFromUrl);
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    let products = [...allProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Sort products
    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(products);
  }, [selectedCategory, sortBy, searchQuery]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'new-arrivals', label: 'New Arrivals' },
    { value: 'mens-health', label: "Men's Health" },
    { value: 'womens-health', label: "Women's Health" },
    { value: 'combos', label: 'Health Combos' },
    { value: 'essentials', label: 'Daily Essentials' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const handleBuyNow = (product: any) => {
    // ProductCard will handle adding to cart internally
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Shop All Products</h1>
          <p className="text-gray-600">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Discover our complete wellness collection'}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-[#c74a1b] text-[#c74a1b] hover:bg-[#c74a1b] hover:text-white rounded-lg"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters && <X className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          {/* Filters */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c74a1b] focus:border-transparent"
                aria-label="Search products"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c74a1b] focus:border-transparent"
              aria-label="Filter by category"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c74a1b] focus:border-transparent"
              aria-label="Sort products"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">No products found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-[#c74a1b] hover:bg-[#b8441a] text-white rounded-lg"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={`${product.category}-${product.id}`}
                product={product}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopAll;
