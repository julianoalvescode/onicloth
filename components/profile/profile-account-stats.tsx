'use client';

interface User {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  username: string;
  email: string;
  phone: string;
  address: {
    number: number;
    street: string;
    city: string;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
}

interface ProfileAccountStatsProps {
  user: User;
}

export default function ProfileAccountStats({ user }: ProfileAccountStatsProps) {
  return (
    <div className='mt-8 pt-6 border-t border-gray-200'>
      <h2 className='text-lg font-lato-bold text-gray-900 mb-4'>Account Information</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <p className='text-sm font-lato-bold text-gray-700'>User ID</p>
          <p className='text-lg font-lato-black text-gray-900'>#{user.id}</p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <p className='text-sm font-lato-bold text-gray-700'>Account Status</p>
          <p className='text-lg font-lato-black text-green-600'>Active</p>
        </div>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <p className='text-sm font-lato-bold text-gray-700'>Member Since</p>
          <p className='text-lg font-lato-black text-gray-900'>2023</p>
        </div>
      </div>
    </div>
  );
}
