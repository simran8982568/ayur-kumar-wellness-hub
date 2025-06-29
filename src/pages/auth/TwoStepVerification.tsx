
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const TwoStepVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const phoneNumber = location.state?.phoneNumber || '';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate OTP verification (accept any 6-digit code)
    if (otp.length === 6) {
      toast({
        title: "Verification Successful",
        description: "Your account has been verified successfully.",
      });
      
      setTimeout(() => {
        navigate('/account');
      }, 1500);
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
    }
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
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
                Two-Step Verification
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We've sent a 6-digit verification code to
              </p>
              <p className="text-[#c74a1b] dark:text-blue-400 font-medium">
                {phoneNumber}
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2 text-center">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c74a1b] dark:focus:ring-blue-600 text-center text-2xl tracking-widest font-mono"
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
                disabled={otp.length !== 6}
                className="w-full bg-[#c74a1b] dark:bg-blue-600 hover:bg-[#b8441a] dark:hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify Code
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => navigate('/auth/verify-number')}
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

export default TwoStepVerification;
