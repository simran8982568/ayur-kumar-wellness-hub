import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { mensHealthProducts } from "@/data/products";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Category content mapping
  const categoryContent: Record<
    string,
    { title: string; description: string; content: string }
  > = {
    "mens-sexual-health": {
      title: "Men's Sexual Health",
      description: "Complete wellness solutions for male health and vitality",
      content:
        "Discover our comprehensive range of Ayurvedic products designed specifically for men's sexual wellness. Our formulations include powerful herbs like Ashwagandha, Shilajit, and Safed Musli that have been used for centuries to enhance male vitality, boost energy levels, and improve overall sexual health naturally.",
    },
    "performance-endurance": {
      title: "Performance & Endurance Boosters",
      description: "Advanced formulas for peak performance and endurance",
      content:
        "Enhance your athletic performance and daily endurance with our scientifically formulated herbal supplements. These products are designed to boost stamina, improve blood circulation, and support overall physical performance naturally.",
    },
    "strength-wellness-sachets": {
      title: "Strength & Wellness Support (Sachet Format)",
      description: "Convenient sachets for daily strength and wellness",
      content:
        "Experience the convenience of portable wellness with our specially formulated sachets. Perfect for busy lifestyles, these easy-to-carry sachets deliver powerful herbal blends for daily strength and vitality support.",
    },
  };

  const subcategories = [
    { value: "all", label: "All Products" },
    { value: "performance-endurance", label: "Performance & Endurance Boosters" },
    { value: "strength-wellness-sachets", label: "Strength & Wellness Support" },
  ];

  useEffect(() => {
    // Get subcategory from URL if present
    const subcategoryFromUrl = searchParams.get('subcategory') || 'all';
    setSelectedSubcategory(subcategoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    let products = [...mensHealthProducts];

    // If we're on a specific subcategory page, filter by that subcategory
    if (category === 'performance-endurance' || category === 'strength-wellness-sachets') {
      products = products.filter(product => product.subcategory === category);
    } else if (selectedSubcategory !== "all") {
      products = products.filter(product => product.subcategory === selectedSubcategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // Sort products
    products.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(products);
    setCurrentPage(1); // Reset to first page when filters change
  }, [category, sortBy, searchQuery, selectedSubcategory]);

  const currentCategory = categoryContent[category || "mens-sexual-health"];

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBuyNow = (product: any) => {
    // ProductCard will handle adding to cart internally
    window.location.href = "/cart-page";
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The requested category does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
            {currentCategory.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {currentCategory.description}
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentCategory.content}
            </p>
          </div>
        </div>

        {/* Subcategory Filter - Only show if we're on main category page */}
        {category === 'mens-sexual-health' && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.value}
                  onClick={() => setSelectedSubcategory(subcategory.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSubcategory === subcategory.value
                      ? 'bg-[#111111] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subcategory.label}
                </button>
              ))}
            </div>
          </div>
        )}

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

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
              showFilters ? "block" : "hidden md:grid"
            }`}
          >
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
              {sortOptions.map((option) => (
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
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">No products found</p>
              <p className="text-sm">Try adjusting your search</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={`${product.category}-${product.id}`}
                product={product}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        )}

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

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

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

export default CategoryPage;
