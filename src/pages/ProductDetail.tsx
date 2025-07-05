
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CustomerReviews from '@/components/CustomerReviews';
import { mensHealthProducts } from '@/data/products';

const ProductDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Find product by slug
  const product = mensHealthProducts.find(p => p.slug === slug) || mensHealthProducts[0];
  
  // Default to 4 placeholder images if product only has one
  const productImages = [product.image, product.image, product.image, product.image];
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = mensHealthProducts.filter(p => p.id !== product.id).slice(0, 3);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add to cart logic
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
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
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
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
          <button onClick={() => navigate('/category/mens-sexual-health')} className="hover:text-brand-primary">Men's Sexual Health</button>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Panel - Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover cursor-zoom-in"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-2 py-1 uppercase tracking-wide">
                  {product.badge}
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
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 ${
                    selectedImage === index 
                      ? 'border-brand-primary' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
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
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {product.longDescription || product.description}
                </p>
                {product.keyBenefits && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Benefits:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {product.keyBenefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="how-to-use">
              <AccordionTrigger className="text-lg font-semibold">How to Use</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.usage || "Follow the instructions on the product packaging or consult with Dr. Kumar for personalized guidance."}
                </p>
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
            {relatedProducts.map((relatedProduct) => (
              <ProductCard 
                key={relatedProduct.id} 
                product={relatedProduct}
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
