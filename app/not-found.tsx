'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center bg-white px-4'>
      <h1 className='text-6xl font-extrabold text-black mb-4'>404</h1>
      <h2 className='text-2xl font-bold text-gray-800 mb-2'>Page Not Found</h2>
      <p className='text-gray-500 mb-8 text-center max-w-md'>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href='/'
        className='inline-block px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors'
      >
        Go to Home
      </Link>
    </div>
  );
}
