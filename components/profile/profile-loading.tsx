'use client';

import { Loader2 } from 'lucide-react';

export default function ProfileLoading() {
  return (
    <div className='min-h-[calc(100vh-100px)] flex items-center justify-center'>
      <div className='flex items-center space-x-2'>
        <Loader2 className='h-6 w-6 animate-spin' />
        <span className='font-lato-normal'>Loading profile...</span>
      </div>
    </div>
  );
}
