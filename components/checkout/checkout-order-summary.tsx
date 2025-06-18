'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Info, Clock } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function CheckoutOrderSummary({
  items,
  subtotal,
  discountAmount,
  shipping,
  tax,
  total,
}: CheckoutOrderSummaryProps) {
  return (
    <div className='lg:col-span-1'>
      <div className='border border-gray-200 rounded-md p-6 sticky top-24'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-lato-normal'>In Your Bag</h2>
          <Link href='/cart' className='text-black underline hover:no-underline font-lato-normal'>
            Edit
          </Link>
        </div>

        <div className='space-y-4 mb-6'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <span className='font-lato-normal'>Subtotal</span>
              <Info className='h-4 w-4 text-gray-400' />
            </div>
            <span className='font-lato-normal'>${subtotal.toFixed(2)}</span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='font-lato-normal'>Discount</span>
            <span className='font-lato-normal'>-${discountAmount.toFixed(2)}</span>
          </div>

          <div className='pl-4 text-green-600 font-lato-normal text-sm'>20% off</div>

          <div className='flex justify-between items-center'>
            <span className='font-lato-normal'>Estimated Shipping</span>
            <span className='font-lato-normal'>${shipping.toFixed(2)}</span>
          </div>

          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <span className='font-lato-normal'>Estimated Tax</span>
              <Info className='h-4 w-4 text-gray-400' />
            </div>
            <span className='font-lato-normal'>${tax.toFixed(2)}</span>
          </div>

          <div className='border-t border-gray-200 pt-4'>
            <div className='flex justify-between items-center'>
              <span className='font-lato-bold'>Total</span>
              <span className='font-lato-bold'>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-200 pt-4'>
          <p className='font-lato-normal text-sm mb-4'>Arrives by Fri, Jun 20</p>

          {items.map((item) => (
            <div key={item.id} className='flex gap-4 mb-4'>
              <div className='relative w-16 h-16 bg-gray-100 rounded-md flex-shrink-0'>
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  className='object-contain p-2'
                  sizes='64px'
                />
              </div>

              <div className='flex-1'>
                <h3 className='font-lato-normal text-sm'>{item.title}</h3>
                <p className='text-gray-500 font-lato-normal text-xs'>Style #: DZ2795-604</p>
                <p className='text-gray-500 font-lato-normal text-xs'>Size: W 5.5 / M 4</p>
                <p className='text-gray-500 font-lato-normal text-xs truncate'>
                  Color: Adobe/Alabaster/Safety Orange
                </p>
                <p className='text-green-600 font-lato-normal text-xs'>20% off</p>
                <p className='font-lato-normal text-xs'>
                  Qty: {item.quantity} @ ${item.price.toFixed(2)}
                </p>
                <p className='font-lato-bold text-sm'>
                  ${(item.price * item.quantity * 0.8).toFixed(2)}
                </p>
                <div className='flex items-center gap-1 text-orange-600 mt-1'>
                  <Clock className='h-3 w-3' />
                  <span className='font-lato-normal text-xs'>Just a few left.</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
