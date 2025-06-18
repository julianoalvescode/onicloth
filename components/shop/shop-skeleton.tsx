export default function ShopSkeleton() {
  return (
    <div className='bg-white min-h-[calc(100vh-100px)]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Mobile Category Select Skeleton */}
        <div className='block md:hidden mb-4'>
          <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
        </div>

        {/* Page Header Skeleton */}
        <div className='flex justify-between items-center mb-8'>
          <div className='h-8 w-48 bg-gray-200 rounded animate-pulse' />
          <div className='hidden md:block h-8 w-32 bg-gray-200 rounded animate-pulse' />
        </div>

        <div className='flex gap-8'>
          {/* Sidebar Filters Skeleton - Desktop Only */}
          <div className='w-64 space-y-6 hidden md:block'>
            <div className='space-y-2'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='h-4 bg-gray-200 rounded w-3/4 animate-pulse' />
              ))}
            </div>
            <div className='border-t border-gray-200 pt-4 space-y-2'>
              <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-2/3 animate-pulse' />
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className='flex-1'>
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...Array(6)].map((_, i) => (
                <div key={i} className='p-4 border border-gray-100 rounded-lg'>
                  <div className='aspect-square bg-gray-200 rounded mb-3 animate-pulse' />
                  <div className='h-4 bg-gray-200 rounded mb-2 w-3/4 animate-pulse' />
                  <div className='h-3 bg-gray-200 rounded w-1/2 mb-1 animate-pulse' />
                  <div className='h-3 bg-gray-200 rounded w-1/3 mb-1 animate-pulse' />
                  <div className='h-4 bg-gray-200 rounded w-1/4 animate-pulse' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
