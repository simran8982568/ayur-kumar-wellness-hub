
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CheckoutSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmPurchase = () => {
    // Clear cart
    localStorage.removeItem('cart');
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Show success toast
    toast({
      title: "Order placed successfully!",
      description: "Your order has been confirmed and will be processed soon.",
    });
    
    // Close sidebar and redirect
    onClose();
    navigate('/account?tab=orders');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-screen w-[400px] max-w-full z-50 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1C1C2D]">Checkout</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-md font-semibold text-[#1C1C2D] mb-3">Billing Information</h3>
            
            <div className="space-y-3">
              <Input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="rounded-xl"
              />
              
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-xl"
              />
              
              <Input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="rounded-xl"
              />
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold text-[#1C1C2D] mb-3">Delivery Address</h3>
            
            <div className="space-y-3">
              <Input
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                className="rounded-xl"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <Input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="rounded-xl"
                />
                
                <Input
                  name="pincode"
                  placeholder="PIN Code"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold text-[#1C1C2D] mb-3">Payment Method</h3>
            <div className="p-3 border border-gray-200 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-600">Cash on Delivery (COD)</p>
            </div>
          </div>

          <Button
            onClick={handleConfirmPurchase}
            className="w-full bg-[#E5002B] hover:bg-[#E5002B]/90 text-white rounded-xl mt-6"
          >
            Confirm Purchase
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutSidebar;
