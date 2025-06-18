import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-100 bg-white'>
        <Skeleton className='h-8 w-1/2 mb-8 mx-auto' />
        <Skeleton className='h-10 w-full mb-4' />
        <Skeleton className='h-10 w-full mb-6' />
        <Skeleton className='h-12 w-full' />
      </div>
    </div>
  );
}
