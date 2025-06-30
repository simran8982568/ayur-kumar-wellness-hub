import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import {
  mensHealthProducts,
  womensHealthProducts,
  comboProducts,
  essentialProducts,
} from "@/data/products";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
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
      description: "Natural solutions for male vitality and performance",
      content:
        "Discover our comprehensive range of Ayurvedic products designed specifically for men's sexual wellness. Our formulations include powerful herbs like Ashwagandha, Shilajit, and Safed Musli that have been used for centuries to enhance male vitality, boost energy levels, and improve overall sexual health naturally.",
    },
    "womens-sexual-health": {
      title: "Women's Sexual Health",
      description: "Hormonal balance and feminine wellness solutions",
      content:
        "Our women's health collection focuses on hormone support, menstrual balance, and overall reproductive wellness. Featuring time-tested ingredients like Shatavari and natural formulations that support feminine health, boost immunity, and promote hormonal harmony throughout different life stages.",
    },
    "erectile-dysfunction": {
      title: "Erectile Dysfunction Solutions",
      description: "Natural treatments for ED and performance enhancement",
      content:
        "Address erectile dysfunction naturally with our specialized Ayurvedic formulations. Unlike synthetic medications, our natural treatments work to strengthen the root causes while promoting overall sexual wellness, nerve toning, and improved blood circulation without harmful side effects.",
    },
    "nightfall-pe": {
      title: "Nightfall & Premature Ejaculation",
      description: "Control and confidence enhancement treatments",
      content:
        "Our specialized treatments for nightfall and premature ejaculation focus on nerve toning, reducing involuntary discharge, and building sexual confidence. These natural formulations help men gain better control while supporting overall reproductive health.",
    },
    "libido-boosters": {
      title: "Libido Enhancement",
      description: "Natural aphrodisiacs and desire enhancers",
      content:
        "Reignite passion and desire with our collection of natural aphrodisiacs and libido boosters. These carefully crafted formulations use traditional herbs known for their ability to enhance sexual desire, improve mood, and boost overall sexual wellness for both men and women.",
    },
    "infertility-support": {
      title: "Infertility Support",
      description: "Reproductive health solutions for couples",
      content:
        "Support your journey to parenthood with our reproductive health tonics designed for both partners. Our infertility support products combine ancient wisdom with modern understanding to promote reproductive wellness, improve fertility, and support conception naturally.",
    },
    "combos-kits": {
      title: "Sexual Wellness Combos",
      description: "Complete wellness packages for comprehensive care",
      content:
        "Our combo packages offer comprehensive solutions that address multiple aspects of sexual wellness. These carefully curated bundles provide better value while ensuring you have everything needed for complete sexual health support and enhancement.",
    },
    "unani-homeopathy": {
      title: "Unani & Homeopathic Care",
      description: "Traditional alternative medicine approaches",
      content:
        "Explore the healing power of Unani and Homeopathic medicine with our specialized collection. These gentle yet effective treatments from alternative medical traditions offer safe, natural solutions with minimal side effects for various sexual health concerns.",
    },
    "hormonal-imbalance": {
      title: "Hormonal Imbalance Solutions",
      description: "Natural hormone regulation and balance",
      content:
        "Address hormonal imbalances naturally with our specialized Ayurvedic formulations. Our products help regulate hormone production, support endocrine function, and promote overall hormonal harmony for both men and women.",
    },
  };

  // Combine all products and filter based on category
  const allProducts = [
    ...mensHealthProducts.map((p) => ({ ...p, category: "mens-health" })),
    ...womensHealthProducts.map((p) => ({ ...p, category: "womens-health" })),
    ...comboProducts.map((p) => ({ ...p, category: "combos" })),
    ...essentialProducts.map((p) => ({ ...p, category: "essentials" })),
  ];

  useEffect(() => {
    let products = [...allProducts];

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
  }, [category, sortBy, searchQuery]);

  const currentCategory = categoryContent[category || ""];

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

  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const handleBuyNow = (product: any) => {
    handleAddToCart(product);
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
                onAddToCart={handleAddToCart}
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
