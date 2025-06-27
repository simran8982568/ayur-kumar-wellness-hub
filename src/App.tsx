
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ShopAll from "./pages/ShopAll";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
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
          <Route path="/about-us" element={<About />} />
          <Route path="/product/:slug" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Product Detail - Coming Soon</h1></div>} />
          <Route path="/blog" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Blog - Coming Soon</h1></div>} />
          <Route path="/blog/:slug" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Blog Post - Coming Soon</h1></div>} />
          <Route path="/shop" element={<ShopAll />} />
          <Route path="/mens-health" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Men's Health - Coming Soon</h1></div>} />
          <Route path="/womens-health" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Women's Health - Coming Soon</h1></div>} />
          <Route path="/immunity" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Immunity - Coming Soon</h1></div>} />
          <Route path="/digestion" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Digestion - Coming Soon</h1></div>} />
          <Route path="/stress-sleep" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Stress & Sleep - Coming Soon</h1></div>} />
          <Route path="/joint-care" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Joint Care - Coming Soon</h1></div>} />
          <Route path="/skin-hair" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Skin & Hair - Coming Soon</h1></div>} />
          <Route path="/weight" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Weight Management - Coming Soon</h1></div>} />
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
