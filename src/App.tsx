
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import Index from './pages/Index';
import About from './pages/About';
import ShopAll from './pages/ShopAll';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Consultations from './pages/Consultations';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Policies from './pages/Policies';
import NotFound from './pages/NotFound';
const queryClient = new QueryClient();

import PenisEnlargementPage from './pages/PenisEnlargementPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import BestSellersPage from './pages/BestSellersPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/shop-all" element={<ShopAll />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/category/penis-enlargement" element={<PenisEnlargementPage />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
            <Route path="/best-sellers" element={<BestSellersPage />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart-page" element={<CartPage />} />
            <Route path="/consultations" element={<Consultations />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/account" element={<Account />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
