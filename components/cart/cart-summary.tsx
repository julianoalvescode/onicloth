'use client';

import Link from 'next/link';
import { Info } from 'lucide-react';
import CartPromoCode from './cart-promo-code';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  appliedDiscount: number;
  discountAmount: number;
  total: number;
  promoCodeExpanded: boolean;
  promoCode: string;
  onTogglePromoCode: () => void;
  onPromoCodeChange: (code: string) => void;
  onApplyPromoCode: () => void;
}

export default function CartSummary({
  subtotal,
  shipping,
  appliedDiscount,
  discountAmount,
  total,
  promoCodeExpanded,
  promoCode,
  onTogglePromoCode,
  onPromoCodeChange,
  onApplyPromoCode,
}: CartSummaryProps) {
  return (
    <div>
      <h2 className='text-2xl font-lato-normal text-black mb-8'>Summary</h2>

      <div className='space-y-6'>
        {/* Promo Code */}
        <CartPromoCode
          promoCodeExpanded={promoCodeExpanded}
          promoCode={promoCode}
          onToggleExpanded={onTogglePromoCode}
          onPromoCodeChange={onPromoCodeChange}
          onApplyPromoCode={onApplyPromoCode}
        />

        {/* Price Breakdown */}
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <span className='font-lato-normal text-black'>Subtotal</span>
              <Info className='h-4 w-4 text-gray-400' />
            </div>
            <span className='font-lato-normal text-black'>${subtotal.toFixed(2)}</span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='font-lato-normal text-black'>Estimated Shipping & Handling</span>
            <span className='font-lato-normal text-black'>
              {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <span className='font-lato-normal text-black'>Estimated Tax</span>
              <Info className='h-4 w-4 text-gray-400' />
            </div>
            <span className='font-lato-normal text-black'>—</span>
          </div>

          {appliedDiscount > 0 && (
            <>
              <div className='flex justify-between items-center'>
                <span className='font-lato-normal text-black'>Discount Total</span>
                <span className='font-lato-normal text-black'>-${discountAmount.toFixed(2)}</span>
              </div>
              <div className='text-green-600 font-lato-normal text-sm'>
                {appliedDiscount * 100}% off
              </div>
            </>
          )}

          <div className='border-t border-gray-200 pt-4'>
            <div className='flex justify-between items-center'>
              <span className='font-lato-bold text-black text-lg'>Total</span>
              <span className='font-lato-bold text-black text-lg'>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Free Shipping Message */}
        <div className='bg-gray-50 p-4 rounded-lg'>
          <p className='font-lato-normal text-sm text-black'>
            You qualify for <span className='font-lato-bold'>Free Shipping</span> as a Member!{' '}
            <Link href='/join' className='underline hover:no-underline'>
              Join us
            </Link>{' '}
            or{' '}
            <Link href='/signin' className='underline hover:no-underline'>
              Sign-in
            </Link>
          </p>

          {/* Progress Bar */}
          <div className='mt-3'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-xs font-lato-normal text-gray-600'>Free shipping progress</span>
              <span className='text-xs font-lato-bold text-black'>$50</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-green-600 h-2 rounded-full transition-all duration-300'
                style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <Link
          href='/checkout'
          className='block w-full py-4 bg-black text-white text-center font-lato-bold text-lg rounded-full hover:bg-gray-800 transition-colors'
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
