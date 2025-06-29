
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { PageLoadingSkeleton } from '@/components/LoadingSkeleton';

const PenisEnlargementPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Dummy penis enlargement products
  const penisEnlargementProducts = [
    {
      id: 1,
      name: "Shilajit Gold Plus",
      price: 899,
      originalPrice: 1299,
      image: "/api/placeholder/300/300",
      rating: 4.5,
      reviews: 128,
      description: "Premium Shilajit with Gold for enhanced male vitality and size enhancement"
    },
    {
      id: 2,
      name: "Safed Musli Power",
      price: 699,
      originalPrice: 999,
      image: "/api/placeholder/300/300",
      rating: 4.3,
      reviews: 89,
      description: "Natural testosterone booster and size enhancement supplement"
    },
    {
      id: 3,
      name: "Ashwagandha Max",
      price: 599,
      originalPrice: 799,
      image: "/api/placeholder/300/300",
      rating: 4.4,
      reviews: 156,
      description: "Stress relief and natural enhancement formula"
    },
    {
      id: 4,
      name: "Virility Combo Pack",
      price: 1499,
      originalPrice: 2199,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 203,
      description: "Complete enhancement solution with multiple herbs"
    },
    {
      id: 5,
      name: "Gokshura Extract",
      price: 549,
      originalPrice: 749,
      image: "/api/placeholder/300/300",
      rating: 4.2,
      reviews: 67,
      description: "Natural libido and size enhancement supplement"
    },
    {
      id: 6,
      name: "Kaunch Beej Capsules",
      price: 799,
      originalPrice: 1099,
      image: "/api/placeholder/300/300",
      rating: 4.4,
      reviews: 94,
      description: "Traditional Ayurvedic formula for male enhancement"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      let products = [...penisEnlargementProducts];

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        products = products.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
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
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [sortBy, searchQuery]);

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

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

  if (loading) {
    return <PageLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Penis Enlargement</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Natural enhancement solutions for confidence and performance</p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Discover our comprehensive range of Ayurvedic products designed specifically for male enhancement and confidence. 
              Our formulations include powerful herbs like Shilajit, Safed Musli, and Ashwagandha that have been used for centuries 
              to enhance male vitality, boost confidence levels, and improve overall sexual wellness naturally and safely.
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="md:hidden mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-[#c74a1b] dark:border-blue-600 text-[#c74a1b] dark:text-blue-600 hover:bg-[#c74a1b] dark:hover:bg-blue-600 hover:text-white rounded-lg"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {showFilters && <X className="w-4 h-4 ml-2" />}
            </Button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600"
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
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">No products found</p>
              <p className="text-sm">Try adjusting your search</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default PenisEnlargementPage;
