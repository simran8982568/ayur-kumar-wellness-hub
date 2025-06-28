
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const products = [
  {
    id: 1,
    name: "Herbal Immunity Booster",
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 245,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    badge: "Bestseller",
    inStock: true,
    description: "Advanced Ayurvedic immunity booster with 15+ natural herbs",
    category: "immunity"
  },
  {
    id: 2,
    name: "Digestive Health Capsules",
    price: 449,
    originalPrice: 599,
    rating: 4.6,
    reviews: 156,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    inStock: true,
    description: "Natural digestive support with proven herbs",
    category: "digestion"
  },
  {
    id: 3,
    name: "Energy Booster Tablets",
    price: 699,
    rating: 4.7,
    reviews: 203,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    badge: "New",
    inStock: true,
    description: "Sustained energy throughout the day",
    category: "energy"
  },
  {
    id: 4,
    name: "Women's Wellness Pack",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 312,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    inStock: true,
    description: "Complete wellness solution for women",
    category: "womens-health"
  },
  {
    id: 5,
    name: "Men's Vitality Combo",
    price: 1299,
    originalPrice: 1599,
    rating: 4.5,
    reviews: 189,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    inStock: true,
    description: "Comprehensive health support for men",
    category: "mens-health"
  },
  {
    id: 6,
    name: "Daily Essentials Kit",
    price: 799,
    rating: 4.4,
    reviews: 98,
    image: "/lovable-uploads/7e676976-4f68-46af-9f33-a2bef69fb911.png",
    inStock: true,
    description: "Essential daily supplements bundle",
    category: "essentials"
  }
];

const Shop: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [priceRange, setPriceRange] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'immunity', label: 'Immunity' },
    { value: 'digestion', label: 'Digestion' },
    { value: 'energy', label: 'Energy' },
    { value: 'womens-health', label: "Women's Health" },
    { value: 'mens-health', label: "Men's Health" },
    { value: 'essentials', label: 'Essentials' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: 'Under ₹500' },
    { value: '500-1000', label: '₹500 - ₹1000' },
    { value: '1000+', label: 'Above ₹1000' }
  ];

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p === '' ? Infinity : parseInt(p));
      filtered = filtered.filter(product => {
        if (priceRange === '1000+') return product.price >= 1000;
        return product.price >= min && product.price <= max;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Shop All Products</h1>
          <p className="text-gray-600">Discover our complete range of Ayurvedic wellness products</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onBuyNow={() => window.location.href = '/checkout'}
              onAddToCart={() => console.log('Added to cart:', product.name)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange('all');
              }}
              className="mt-4 bg-brand-primary hover:bg-brand-secondary text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
