'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { CartHeader, CartEmpty, CartItemsList, CartSummary } from '@/components/cart';
import CartLoading from '@/components/cart/cart-loading';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const [promoCodeExpanded, setPromoCodeExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0.2); // 20% discount applied
  const [loading, setLoading] = useState(true);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 8.0;
  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal + shipping - discountAmount;

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timeout);
  }, []);

  const applyPromoCode = () => {
    // Simulate promo code application
    if (promoCode.toLowerCase() === 'save20') {
      setAppliedDiscount(0.2);
    }
  };

  if (loading) {
    return <CartLoading />;
  }

  if (!loading && items?.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-300px)]'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
        {/* Left Side - Bag */}
        <div>
          <CartHeader />
          <CartItemsList
            items={items}
            appliedDiscount={appliedDiscount}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        </div>

        {/* Right Side - Summary */}
        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          appliedDiscount={appliedDiscount}
          discountAmount={discountAmount}
          total={total}
          promoCodeExpanded={promoCodeExpanded}
          promoCode={promoCode}
          onTogglePromoCode={() => setPromoCodeExpanded(!promoCodeExpanded)}
          onPromoCodeChange={setPromoCode}
          onApplyPromoCode={applyPromoCode}
        />
      </div>
    </div>
  );
}
