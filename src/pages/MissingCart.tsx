
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const MissingCart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 shadow-lg rounded-xl">
            <div className="mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
                🛒 Missing Cart Items?
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Login to see the items you added previously.
              </p>
            </div>

            <Button
              onClick={() => navigate('/sign-in')}
              className="w-full bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white rounded-lg"
            >
              Login
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MissingCart;
