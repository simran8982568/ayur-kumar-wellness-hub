
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ShopAll from "./pages/ShopAll";
import CartPage from "./pages/CartPage";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Policies from "./pages/Policies";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import CategoryPage from "./pages/CategoryPage";
import Consultations from "./pages/Consultations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop-all" element={<ShopAll />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/shop" element={<ShopAll />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
