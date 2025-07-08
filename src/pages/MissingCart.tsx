import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Lock } from "lucide-react";

const MissingCart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-1 py-4 sm:px-2 sm:py-8">
        <div className="max-w-xs sm:max-w-md mx-auto text-center">
          <div className="bg-white border border-gray-200 p-2 sm:p-4 md:p-6 shadow-lg rounded-lg sm:rounded-xl">
            {/* Icon and Header */}
            <div className="mb-4 sm:mb-6">
              <div className="relative inline-block">
                <ShoppingCart className="w-10 h-10 sm:w-14 sm:h-14 text-gray-300 mx-auto mb-2 sm:mb-3" />
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#1C1C2D] absolute -top-2 -right-2 bg-white rounded-full p-0.5 border-2 border-gray-200" />
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-[#1C1C2D] mb-1 sm:mb-2">
                Log In to View Your Cart
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-1">
                Please Log in to access your cart and continue shopping
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500">
                Your cart items are saved and waiting for you!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 sm:space-y-3">
              <Button
                onClick={() => navigate("/sign-in")}
                className="w-full bg-[#1C1C2D] hover:bg-[#2D2D3D] text-white rounded-md sm:rounded-lg py-1.5 sm:py-2 text-sm sm:text-base font-semibold min-h-0 h-8 sm:h-10"
              >
                Log In to Continue
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MissingCart;
