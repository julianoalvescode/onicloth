interface ShopErrorProps {
  error: string;
  onRetry: () => void;
}

export default function ShopError({ error, onRetry }: ShopErrorProps) {
  return (
    <div className='bg-white min-h-[calc(100vh-100px)]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center'>
          <p className='font-lato-normal text-red-600'>Error: {error}</p>
          <button
            onClick={onRetry}
            className='mt-4 px-6 py-2 bg-black text-white font-lato-bold hover:bg-gray-800 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
