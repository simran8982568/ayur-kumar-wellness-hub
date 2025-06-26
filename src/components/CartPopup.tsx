
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartPopupProps {
  onClose: () => void;
  items: number;
}

const CartPopup: React.FC<CartPopupProps> = ({ onClose, items }) => {
  const [quantity, setQuantity] = useState(1);
  const productPrice = 299;
  const tax = 50;
  const total = (productPrice * quantity) + tax;

  const updateQuantity = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="cart-popup">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center">
          <ShoppingCart className="h-4 w-4 mr-2 text-brand-primary" />
          Cart ({items})
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="rounded-full"
          aria-label="Close cart"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {/* Sample Product */}
        <div className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-xs text-brand-primary font-medium">IMG</span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground">Immunity Booster Capsules</h4>
            <p className="text-xs text-muted-foreground">₹{productPrice}</p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
          <span className="text-sm font-medium text-foreground">Quantity:</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(-1)}
              className="h-8 w-8 p-0 rounded-full"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium text-foreground min-w-8 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(1)}
              className="h-8 w-8 p-0 rounded-full"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="text-foreground">₹{productPrice * quantity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax:</span>
            <span className="text-foreground">₹{tax}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold border-t border-border pt-2">
            <span className="text-foreground">Total:</span>
            <span className="text-brand-primary">₹{total}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button className="w-full brand-button mt-4">
          Go to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPopup;
