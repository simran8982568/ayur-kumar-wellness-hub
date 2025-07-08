import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CustomerReviews from "@/components/CustomerReviews";
import { mensHealthProducts } from "@/data/products";

const ProductDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Find product by slug
  const product =
    mensHealthProducts.find((p) => p.slug === slug) || mensHealthProducts[0];

  // Default to 4 placeholder images if product only has one
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const relatedProducts = mensHealthProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  // Image slider navigation functions
  const goToPreviousImage = () => {
    setSelectedImage(selectedImage === 0 ? productImages.length - 1 : selectedImage - 1);
  };

  const goToNextImage = () => {
    setSelectedImage(selectedImage === productImages.length - 1 ? 0 : selectedImage + 1);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add to cart logic
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    setIsLoading(false);
  };

  const handleBuyNow = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check authentication
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      // Store the intended action for after login
      sessionStorage.setItem(
        "postLoginIntent",
        JSON.stringify({
          type: "buy_now",
          product: product,
          quantity: quantity,
          timestamp: Date.now(),
        })
      );
      navigate("/sign-in");
      setIsLoading(false);
      return;
    }

    // Add to cart first
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    navigate("/cart-page");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <button
            onClick={() => navigate("/")}
            className="hover:text-brand-primary"
          >
            Home
          </button>
          <span className="mx-2">/</span>
          <button
            onClick={() => navigate("/category/mens-sexual-health")}
            className="hover:text-brand-primary"
          >
            Men's Sexual Health
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Panel - Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover cursor-zoom-in transition-all duration-300"
              />

              {/* Navigation Arrows */}
              <button
                onClick={goToPreviousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      selectedImage === index
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {product.badge && (
                <div className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-2 py-1 uppercase tracking-wide z-20">
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-brand-accent text-white text-xs font-medium px-2 py-1 uppercase tracking-wide z-20">
                  -{discount}% OFF
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 ${
                    selectedImage === index
                      ? "border-brand-primary"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium text-gray-900 dark:text-white ml-1">
                    {product.rating}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-2 py-1">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-lg font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleBuyNow}
                disabled={isLoading}
                className="w-full bg-[#1C1C2D] hover:bg-[#2D2D3D] text-white h-12 text-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Buy Now"}
              </Button>

              <Button
                onClick={handleAddToCart}
                disabled={isLoading}
                variant="outline"
                className="w-full border-[#1C1C2D] text-[#1C1C2D] hover:bg-[#1C1C2D] hover:text-white h-12 text-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ✅ Free delivery on orders above ₹699
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ✅ Easy 30-day returns
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ✅ Cash on delivery available
              </p>
            </div>
          </div>
        </div>

        {/* Product Information Sections */}
        <div className="mb-16 space-y-12">
          {/* Product Description */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-[#1C1C2D] dark:text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-[#1C1C2D] mr-4"></div>
              Product Description
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {product.longDescription || product.description}
              </p>

              {product.keyBenefits && (
                <div>
                  <h3 className="text-xl font-semibold text-[#1C1C2D] dark:text-white mb-4">Key Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.keyBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#1C1C2D] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* How to Use Instructions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 shadow-sm border border-blue-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold text-[#1C1C2D] dark:text-white mb-6 flex items-center">
              <div className="w-1 h-8 bg-blue-600 mr-4"></div>
              How to Use
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {product.usage || "Follow the instructions on the product packaging or consult with Dr. Kumar for personalized guidance."}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <CustomerReviews />

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onBuyNow={() => {
                  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
                  if (!isLoggedIn) {
                    // Store the intended action for after login
                    sessionStorage.setItem("postLoginIntent", JSON.stringify({
                      type: "buy_now",
                      product: relatedProduct,
                      quantity: 1,
                      timestamp: Date.now()
                    }));
                    navigate('/sign-in');
                  } else {
                    navigate('/cart-page');
                  }
                }}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
