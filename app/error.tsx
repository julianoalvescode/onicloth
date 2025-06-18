'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error 500:', error);
  }, [error]);

  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center bg-white px-4'>
      <div className='text-center max-w-lg'>
        {/* Error Icon */}
        <div className='mb-6'>
          <div className='w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-12 h-12 text-red-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
        </div>

        {/* Error Code */}
        <h1 className='text-6xl font-extrabold text-red-600 mb-4'>500</h1>

        {/* Error Title */}
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Internal Server Error</h2>

        {/* Error Description */}
        <p className='text-gray-500 mb-8 text-center'>
          Oops! Something went wrong on our end. We're working to fix this issue.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <details className='mb-6 text-left bg-gray-50 p-4 rounded-lg'>
            <summary className='cursor-pointer font-medium text-gray-700 mb-2'>
              Error Details
            </summary>
            <pre className='text-sm text-gray-600 whitespace-pre-wrap'>{error.message}</pre>
            {error.digest && <p className='text-xs text-gray-500 mt-2'>Error ID: {error.digest}</p>}
          </details>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={reset}
            className='inline-block px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors'
          >
            Try Again
          </button>
          <Link
            href='/'
            className='inline-block px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors'
          >
            Go to Home
          </Link>
        </div>

        {/* Additional Help */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <p className='text-sm text-gray-500 mb-2'>Still having issues?</p>
          <Link href='/contact' className='text-sm text-red-600 hover:text-red-700 font-medium'>
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
