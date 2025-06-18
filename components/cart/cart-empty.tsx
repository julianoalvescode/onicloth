'use client';

import Link from 'next/link';

export default function CartEmpty() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[calc(100vh-100px)] flex items-center justify-center'>
      <div className='text-center'>
        <h2 className='text-2xl font-lato-normal text-black mb-4'>Your bag is empty</h2>
        <p className='text-gray-500 mb-8'>Items added to your bag will appear here.</p>
        <Link
          href='/'
          className='inline-block px-8 py-3 bg-black text-white text-sm font-lato-normal hover:bg-gray-800 transition-colors rounded-full'
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
