import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CustomerReviews from '@/components/CustomerReviews';

// Dummy product data - in production this would come from API
const dummyProduct = {
  id: 1,
  name: "Herbal Immunity Booster",
  price: 599,
  originalPrice: 799,
  rating: 4.8,
  reviews: 245,
  images: [
    "/api/placeholder/500/500",
    "/api/placeholder/500/500",
    "/api/placeholder/500/500"
  ],
  badge: "Bestseller",
  inStock: true,
  description: "Advanced Ayurvedic immunity booster with 15+ natural herbs including Ashwagandha, Giloy, and Amla. Clinically tested formula for enhanced immune response.",
  sizes: ["60 Capsules", "120 Capsules", "180 Capsules"],
  ingredients: ["Ashwagandha", "Giloy", "Amla", "Tulsi", "Neem", "Turmeric"],
  howToUse: "Take 1-2 capsules daily with water, preferably after meals. For best results, continue for 2-3 months.",
  faqs: [
    {
      question: "Is this safe for daily use?",
      answer: "Yes, this product is made with natural Ayurvedic ingredients and is safe for daily consumption as directed."
    },
    {
      question: "When will I see results?",
      answer: "Most users notice improved energy and immunity within 2-4 weeks of regular use."
    }
  ]
};

const relatedProducts = [
  {
    id: 2,
    name: "Digestive Health Capsules",
    price: 449,
    originalPrice: 599,
    rating: 4.6,
    reviews: 156,
    image: "/api/placeholder/300/300",
    inStock: true,
    description: "Natural digestive support with proven herbs"
  },
  {
    id: 3,
    name: "Energy Booster Tablets",
    price: 699,
    rating: 4.7,
    reviews: 203,
    image: "/api/placeholder/300/300",
    badge: "New",
    inStock: true,
    description: "Sustained energy throughout the day"
  }
];

const ProductDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const discount = Math.round(((dummyProduct.originalPrice - dummyProduct.price) / dummyProduct.originalPrice) * 100);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add to cart logic
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === dummyProduct.id);

    if (existingItem) {
      existingItem.quantity += (quantity * 2); // Use selected quantity * 2
    } else {
      cart.push({ ...dummyProduct, quantity: quantity * 2 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    setIsLoading(false);
  };

  const handleBuyNow = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Add to cart first
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === dummyProduct.id);

    if (existingItem) {
      existingItem.quantity += (quantity * 2);
    } else {
      cart.push({ ...dummyProduct, quantity: quantity * 2 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    navigate('/checkout');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-brand-primary">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/shop-all')} className="hover:text-brand-primary">Shop</button>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{dummyProduct.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Panel - Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img 
                src={dummyProduct.images[selectedImage]} 
                alt={dummyProduct.name}
                className="w-full h-96 object-cover cursor-zoom-in"
              />
              {dummyProduct.badge && (
                <div className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-2 py-1 uppercase tracking-wide">
                  {dummyProduct.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-brand-accent text-white text-xs font-medium px-2 py-1 uppercase tracking-wide">
                  -{discount}% OFF
                </div>
              )}
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex space-x-2">
              {dummyProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 ${
                    selectedImage === index 
                      ? 'border-brand-primary' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <img src={image} alt={`${dummyProduct.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{dummyProduct.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium text-gray-900 dark:text-white ml-1">
                    {dummyProduct.rating}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    ({dummyProduct.reviews} reviews)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹{dummyProduct.price}
                </span>
                <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                  ₹{dummyProduct.originalPrice}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-2 py-1">
                  Save ₹{dummyProduct.originalPrice - dummyProduct.price}
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {dummyProduct.description}
            </p>

            {/* Size Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {dummyProduct.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(index)}
                    className={`p-3 border text-sm font-medium smooth-transition ${
                      selectedSize === index
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
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
                className="w-full production-button-primary h-12 text-lg"
              >
                {isLoading ? 'Processing...' : 'Buy Now'}
              </Button>
              
              <Button 
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full production-button-secondary h-12 text-lg flex items-center justify-center space-x-2"
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

        {/* Product Details Accordion */}
        <div className="mb-16">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-lg font-semibold">Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {dummyProduct.description}
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="how-to-use">
              <AccordionTrigger className="text-lg font-semibold">How to Use</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {dummyProduct.howToUse}
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-lg font-semibold">Ingredients</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {dummyProduct.ingredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faqs">
              <AccordionTrigger className="text-lg font-semibold">FAQs</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {dummyProduct.faqs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{faq.question}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Customer Reviews Section */}
        <CustomerReviews />

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onBuyNow={() => navigate('/checkout')}
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
