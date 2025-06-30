import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const phoneNumber = location.state?.phoneNumber || '';
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    if (!phoneNumber) {
      navigate('/sign-in');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [phoneNumber, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user exists (simulate checking in localStorage)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user: any) => user.phone === phoneNumber);
    
    if (existingUser) {
      // Existing user - login and go to account
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(existingUser));
      toast({
        title: "Login Successful",
        description: "Welcome back to Dr. Kumar Laboratories",
      });
      navigate('/account');
    } else {
      // New user - go to sign up
      navigate('/sign-up', { state: { phoneNumber } });
    }
    
    setIsLoading(false);
  };

  const handleResendOTP = () => {
    setTimeLeft(300);
    setOtp('');
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your phone.",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-lg rounded-xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-black dark:text-white mb-2">Verify OTP</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Enter the 6-digit code sent to
              </p>
              <p className="text-[#c74a1b] dark:text-blue-400 font-medium">
                {phoneNumber}
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-black dark:text-white mb-2 text-center">
                  Enter 6-Digit OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full text-center text-2xl tracking-widest font-mono rounded-lg"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Code expires in: <span className="font-medium text-[#c74a1b] dark:text-blue-400">{formatTime(timeLeft)}</span>
                </p>
                
                {timeLeft === 0 ? (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-[#c74a1b] dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-gray-400 hover:text-[#c74a1b] dark:hover:text-blue-400 text-sm"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify OTP'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => navigate('/sign-in')}
                className="text-gray-500 dark:text-gray-400 hover:text-[#c74a1b] dark:hover:text-blue-400 text-sm"
              >
                Change phone number
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VerifyOTP;
