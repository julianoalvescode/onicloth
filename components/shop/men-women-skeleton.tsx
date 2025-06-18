import { Skeleton } from '@/components/ui/skeleton';

export default function MenWomenSkeleton() {
  return (
    <div className='bg-white min-h-[calc(100vh-100px)]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <Skeleton className='h-8 w-48' />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='p-4 border border-gray-100 rounded-lg'>
              <Skeleton className='aspect-square w-full mb-3' />
              <Skeleton className='h-4 w-3/4 mb-2' />
              <Skeleton className='h-3 w-1/2 mb-1' />
              <Skeleton className='h-3 w-1/3 mb-1' />
              <Skeleton className='h-4 w-1/4' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
