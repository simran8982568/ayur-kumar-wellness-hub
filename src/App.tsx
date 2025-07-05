
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import ShopAll from './pages/ShopAll';
import BestSellersPage from './pages/BestSellersPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import ConsultationBooking from './pages/ConsultationBooking';
import PenisEnlargementPage from './pages/PenisEnlargementPage';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Policies from './pages/Policies';
import ShippingInfo from './pages/ShippingInfo';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifyOTP from './pages/VerifyOTP';
import AuthSignIn from './pages/auth/SignIn';
import AuthSignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyNumber from './pages/auth/VerifyNumber';
import TwoStepVerification from './pages/auth/TwoStepVerification';
import NotFound from './pages/NotFound';
import Feedback from './pages/Feedback';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop-all" element={<ShopAll />} />
            <Route path="/best-sellers" element={<BestSellersPage />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart-page" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/consultation-booking" element={<ConsultationBooking />} />
            <Route path="/penis-enlargement" element={<PenisEnlargementPage />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/return-policy" element={<Policies />} />
            <Route path="/shipping-info" element={<ShippingInfo />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/auth/signin" element={<AuthSignIn />} />
            <Route path="/auth/signup" element={<AuthSignUp />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/verify-number" element={<VerifyNumber />} />
            <Route path="/auth/two-step-verification" element={<TwoStepVerification />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
