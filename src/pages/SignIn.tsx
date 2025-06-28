
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignIn = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email/Phone, 2: OTP
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contact.trim()) {
      setErrors({ contact: 'Email or phone is required' });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to check if user exists
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, any email/phone works
    setStep(2);
    setIsLoading(false);
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (otp === '1234') { // Demo OTP
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', contact);
      navigate('/account');
    } else {
      setErrors({ otp: 'Invalid OTP. Try 1234' });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-gray-200 p-6 sm:p-8 shadow-lg rounded-xl">
            {step === 1 ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-black mb-2">Welcome Back</h1>
                  <p className="text-gray-600">Sign in to your Dr. Kumar Laboratories account</p>
                </div>

                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                      Email or Phone Number
                    </label>
                    <Input
                      id="contact"
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full rounded-lg"
                      placeholder="Enter your email or phone"
                    />
                    {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#c74a1b] hover:bg-[#b8441a] text-white rounded-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending OTP...
                      </div>
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-black mb-2">Enter OTP</h1>
                  <p className="text-gray-600">OTP sent to {contact}</p>
                </div>

                <form onSubmit={handleOTPSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full text-center text-2xl tracking-wider rounded-lg"
                      placeholder="1234"
                      maxLength={4}
                    />
                    {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                    <p className="text-xs text-gray-500 mt-2">Demo: Use 1234 as OTP</p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#c74a1b] hover:bg-[#b8441a] text-white rounded-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Verifying...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-[#c74a1b] hover:underline text-sm"
                  >
                    Back
                  </button>
                </form>
              </>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {step === 1 ? (
                  <>
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-[#c74a1b] hover:underline font-medium">
                      Sign up here
                    </Link>
                  </>
                ) : (
                  <Link to="/forgot-password" className="text-[#c74a1b] hover:underline text-sm">
                    Forgot password?
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
