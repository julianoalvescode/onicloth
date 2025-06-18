import { Skeleton } from '../ui/skeleton';

export default function CartLoading() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-300px)]'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
        <div>
          <Skeleton className='h-8 w-32 mb-8' />
          {[...Array(2)].map((_, i) => (
            <div key={i} className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full mb-8'>
              <Skeleton className='w-40 h-40 sm:w-48 sm:h-48 rounded-lg' />
              <div className='flex-1 space-y-4 min-w-0'>
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
                <Skeleton className='h-4 w-1/3' />
                <Skeleton className='h-8 w-1/2 mt-4' />
              </div>
            </div>
          ))}
        </div>
        <div>
          <Skeleton className='h-8 w-32 mb-8' />
          <Skeleton className='h-6 w-full mb-4' />
          <Skeleton className='h-6 w-1/2 mb-4' />
          <Skeleton className='h-6 w-1/3 mb-4' />
          <Skeleton className='h-10 w-full mb-4' />
          <Skeleton className='h-12 w-full' />
        </div>
      </div>
    </div>
  );
}
