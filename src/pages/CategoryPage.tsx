import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, Loader2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { mensHealthProducts, allProducts, Product } from "@/data/products";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productsPerPage = 12; // Increased for better grid layout

  // Category content mapping with descriptions
  const categoryContent: Record<
    string,
    { title: string; description: string; subtitle?: string }
  > = {
    "mens-sexual-health": {
      title: "Men's Sexual Health",
      description:
        "Choose from our specialized treatments designed to address your specific health needs with Ayurvedic solutions.",
      subtitle: "Complete wellness solutions for male health and vitality",
    },
    "performance-endurance": {
      title: "Performance & Endurance Boosters",
      description:
        "Advanced formulations to boost physical performance and endurance naturally.",
      subtitle: "Enhance your physical performance and stamina",
    },
    "strength-wellness-sachets": {
      title: "Strength & Wellness Support",
      description:
        "Convenient sachet format wellness products for daily strength and vitality.",
      subtitle: "Convenient daily wellness in sachet format",
    },
  };

  const subcategories = [
    { value: "all", label: "All Products" },
    {
      value: "performance-endurance",
      label: "Performance & Endurance Boosters",
    },
    {
      value: "strength-wellness-sachets",
      label: "Strength & Wellness Support",
    },
  ];

  useEffect(() => {
    // Get subcategory from URL if present
    const subcategoryFromUrl = searchParams.get("subcategory") || "all";
    setSelectedSubcategory(subcategoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate loading delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 300));

        let products: Product[] = [];

        // Get products based on category
        products = allProducts.filter(
          (product) => product.category === category
        );

        // If we're on a specific subcategory page, filter by that subcategory
        if (
          category === "performance-endurance" ||
          category === "strength-wellness-sachets"
        ) {
          products = mensHealthProducts.filter(
            (product) => product.subcategory === category
          );
        } else if (selectedSubcategory !== "all") {
          products = products.filter(
            (product) => product.subcategory === selectedSubcategory
          );
        }

        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          products = products.filter(
            (product) =>
              product.name.toLowerCase().includes(query) ||
              product.description?.toLowerCase().includes(query) ||
              product.longDescription?.toLowerCase().includes(query)
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
            case "reviews":
              return b.reviews - a.reviews;
            case "name":
            default:
              return a.name.localeCompare(b.name);
          }
        });

        setFilteredProducts(products);
        setCurrentPage(1); // Reset to first page when filters change
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Error loading products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category, sortBy, searchQuery, selectedSubcategory]);

  const currentCategory = categoryContent[category || "mens-sexual-health"];

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "reviews", label: "Most Reviewed" },
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

  // Error state
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-[#1C1C2D] mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The requested category does not exist.
          </p>
          <Button
            onClick={() => window.history.back()}
            className="bg-[#1C1C2D] hover:bg-[#2D2D3D] text-white"
          >
            Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-[#1C1C2D] mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#1C1C2D] hover:bg-[#2D2D3D] text-white"
          >
            Try Again
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1C2D] mb-4">
            {currentCategory.title}
          </h1>
          {currentCategory.subtitle && (
            <p className="text-lg text-gray-600 mb-4">
              {currentCategory.subtitle}
            </p>
          )}
          <p className="text-gray-600 max-w-3xl mx-auto lg:mx-0">
            {currentCategory.description}
          </p>
        </div>

        {/* Subcategory Filter - Show for all health concern categories */}
        {(category === "performance-endurance" ||
          category === "strength-wellness-sachets") && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.value}
                  onClick={() => setSelectedSubcategory(subcategory.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSubcategory === subcategory.value
                      ? "bg-[#111111] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full sm:w-auto border-[#1C1C2D] text-[#1C1C2D] hover:bg-[#1C1C2D] hover:text-white rounded-lg"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {showFilters ? (
                <X className="w-4 h-4 ml-2" />
              ) : (
                <Filter className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>

          {/* Filter Controls */}
          <div
            className={`space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6 ${
              showFilters ? "block" : "hidden lg:grid"
            }`}
          >
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1C2D] focus:border-transparent transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1C2D] focus:border-transparent appearance-none cursor-pointer transition-all duration-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count and Summary */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-gray-600 text-sm sm:text-base">
              {filteredProducts.length === 0 ? (
                "No products found"
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold">
                    {startIndex + 1}-
                    {Math.min(endIndex, filteredProducts.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold">
                    {filteredProducts.length}
                  </span>{" "}
                  product{filteredProducts.length !== 1 ? "s" : ""}
                  {searchQuery && (
                    <span className="text-gray-500"> for "{searchQuery}"</span>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Quick Stats */}
          {filteredProducts.length > 0 && (
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {filteredProducts.filter((p) => p.inStock).length} In Stock
              </span>
              {filteredProducts.some((p) => p.badge) && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {filteredProducts.filter((p) => p.badge).length} Featured
                </span>
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No products match "${searchQuery}". Try adjusting your search terms.`
                  : "No products available in this category at the moment."}
              </p>
              {searchQuery && (
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="border-[#1C1C2D] text-[#1C1C2D] hover:bg-[#1C1C2D] hover:text-white"
                >
                  Clear Search
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Products Grid - Responsive Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {currentProducts.map((product) => (
                <div
                  key={`${product.category}-${product.id}`}
                  className="w-full"
                >
                  <ProductCard product={product} onBuyNow={handleBuyNow} />
                </div>
              ))}
            </div>

            {/* Show more products hint */}
            {filteredProducts.length > currentProducts.length && (
              <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  Showing {currentProducts.length} of {filteredProducts.length}{" "}
                  products
                </p>
              </div>
            )}
          </>
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
