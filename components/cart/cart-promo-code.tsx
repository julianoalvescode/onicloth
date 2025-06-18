'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';

interface CartPromoCodeProps {
  promoCodeExpanded: boolean;
  promoCode: string;
  onToggleExpanded: () => void;
  onPromoCodeChange: (code: string) => void;
  onApplyPromoCode: () => void;
}

export default function CartPromoCode({
  promoCodeExpanded,
  promoCode,
  onToggleExpanded,
  onPromoCodeChange,
  onApplyPromoCode,
}: CartPromoCodeProps) {
  return (
    <div className='border border-gray-200 rounded-lg'>
      <button
        onClick={onToggleExpanded}
        className='w-full flex items-center justify-between p-4 text-left'
      >
        <span className='font-lato-normal text-black'>Do you have a Promo Code?</span>
        {promoCodeExpanded ? (
          <ChevronUp className='h-5 w-5 text-gray-500' />
        ) : (
          <ChevronDown className='h-5 w-5 text-gray-500' />
        )}
      </button>

      {promoCodeExpanded && (
        <div className='px-4 pb-4 border-t border-gray-200'>
          <div className='flex gap-2 mt-4'>
            <label htmlFor='promo-code-input' className='sr-only'>
              Código promocional
            </label>
            <input
              id='promo-code-input'
              type='text'
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
              placeholder='Enter promo code'
              className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-lato-normal'
            />
            <button
              onClick={onApplyPromoCode}
              className='px-6 py-2 border border-gray-300 rounded-md hover:border-black transition-colors font-lato-normal'
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
