
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import NavigationSidebar from '@/components/NavigationSidebar';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import CartPopup from '@/components/CartPopup';
import Footer from '@/components/Footer';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Sample product data organized by categories
  const featuredProducts = {
    mens: [
      {
        id: 1,
        name: "Men's Vitality Booster",
        price: 1299,
        originalPrice: 1799,
        rating: 4.8,
        reviews: 2453,
        image: "/api/placeholder/300/300",
        badge: "Bestseller",
        inStock: true
      },
      {
        id: 2,
        name: "Stamina Enhancement Capsules",
        price: 899,
        originalPrice: 1199,
        rating: 4.7,
        reviews: 1876,
        image: "/api/placeholder/300/300",
        inStock: true
      },
      {
        id: 3,
        name: "Testosterone Support Formula",
        price: 1499,
        rating: 4.9,
        reviews: 1234,
        image: "/api/placeholder/300/300",
        badge: "New",
        inStock: true
      },
      {
        id: 4,
        name: "Men's Stress Relief Combo",
        price: 799,
        originalPrice: 999,
        rating: 4.6,
        reviews: 987,
        image: "/api/placeholder/300/300",
        inStock: true
      }
    ],
    womens: [
      {
        id: 5,
        name: "Women's Hormonal Balance",
        price: 1199,
        originalPrice: 1599,
        rating: 4.8,
        reviews: 3210,
        image: "/api/placeholder/300/300",
        badge: "Popular",
        inStock: true
      },
      {
        id: 6,
        name: "Iron & Calcium Supplement",
        price: 699,
        rating: 4.7,
        reviews: 2100,
        image: "/api/placeholder/300/300",
        inStock: true
      },
      {
        id: 7,
        name: "Pregnancy Care Kit",
        price: 1899,
        originalPrice: 2399,
        rating: 4.9,
        reviews: 1567,
        image: "/api/placeholder/300/300",
        badge: "Premium",
        inStock: true
      },
      {
        id: 8,
        name: "Skin & Hair Wellness",
        price: 899,
        rating: 4.6,
        reviews: 1890,
        image: "/api/placeholder/300/300",
        inStock: true
      }
    ],
    combos: [
      {
        id: 9,
        name: "Complete Family Health Pack",
        price: 2999,
        originalPrice: 4499,
        rating: 4.9,
        reviews: 1500,
        image: "/api/placeholder/300/300",
        badge: "Best Value",
        inStock: true
      },
      {
        id: 10,
        name: "Immunity + Digestion Combo",
        price: 1799,
        originalPrice: 2399,
        rating: 4.8,
        reviews: 2200,
        image: "/api/placeholder/300/300",
        inStock: true
      }
    ],
    essentials: [
      {
        id: 11,
        name: "Daily Immunity Booster",
        price: 599,
        rating: 4.7,
        reviews: 5600,
        image: "/api/placeholder/300/300",
        badge: "Essential",
        inStock: true
      },
      {
        id: 12,
        name: "Digestive Health Support",
        price: 449,
        rating: 4.6,
        reviews: 4200,
        image: "/api/placeholder/300/300",
        inStock: true
      }
    ]
  };

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }]);
    }
    
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    // Here you would navigate to checkout page
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onToggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
      
      <NavigationSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <CartPopup
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Product Highlights */}
        <ProductSection 
          title="🧔 Men's Health"
          subtitle="Specialized products for men's wellness and vitality"
          products={featuredProducts.mens}
          onAddToCart={handleAddToCart}
        />
        
        <ProductSection 
          title="👩 Women's Health"
          subtitle="Comprehensive wellness solutions for women"
          products={featuredProducts.womens}
          onAddToCart={handleAddToCart}
        />
        
        <ProductSection 
          title="💊 Combo Packs"
          subtitle="Best value combinations for complete health"
          products={featuredProducts.combos}
          onAddToCart={handleAddToCart}
        />
        
        <ProductSection 
          title="🌿 Daily Essentials"
          subtitle="Must-have products for everyday wellness"
          products={featuredProducts.essentials}
          onAddToCart={handleAddToCart}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
