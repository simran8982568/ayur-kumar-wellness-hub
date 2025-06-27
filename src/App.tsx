
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ShopAll from "./pages/ShopAll";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Checkout />} />
          <Route path="/product/:slug" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Product Detail - Coming Soon</h1></div>} />
          <Route path="/blog" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Blog - Coming Soon</h1></div>} />
          <Route path="/blog/:slug" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Blog Post - Coming Soon</h1></div>} />
          <Route path="/about-us" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">About Us - Coming Soon</h1></div>} />
          <Route path="/shop" element={<ShopAll />} />
          <Route path="/men" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Men's Health - Coming Soon</h1></div>} />
          <Route path="/women" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Women's Wellness - Coming Soon</h1></div>} />
          <Route path="/combos" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Combos - Coming Soon</h1></div>} />
          <Route path="/essentials" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Essentials - Coming Soon</h1></div>} />
          <Route path="/consult" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Consultation - Coming Soon</h1></div>} />
          <Route path="/account" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">My Account - Coming Soon</h1></div>} />
          <Route path="/wishlist" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Wishlist - Coming Soon</h1></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
