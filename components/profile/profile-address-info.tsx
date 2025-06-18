'use client';

import { MapPin } from 'lucide-react';
import ProfileField from './profile-field';

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

interface ProfileAddressInfoProps {
  user: User;
  editedUser: User | null;
  isEditing: boolean;
  onUpdateUser: (updater: (prev: User | null) => User | null) => void;
}

export default function ProfileAddressInfo({
  user,
  editedUser,
  isEditing,
  onUpdateUser,
}: ProfileAddressInfoProps) {
  return (
    <div className='space-y-6'>
      <h2 className='text-lg font-lato-bold text-gray-900 border-b border-gray-200 pb-2'>
        Address Information
      </h2>

      <div className='space-y-4'>
        <ProfileField
          label='Street Address'
          value={`${editedUser?.address.number || user.address.number} ${
            editedUser?.address.street || user.address.street
          }`.trim()}
          isEditing={isEditing}
          icon={MapPin}
          onChange={(value) => {
            const parts = value.split(' ');
            const number = Number.parseInt(parts[0]) || 0;
            const street = parts.slice(1).join(' ');
            onUpdateUser((prev) =>
              prev ? { ...prev, address: { ...prev.address, number, street } } : null,
            );
          }}
        />

        <ProfileField
          label='City'
          value={editedUser?.address.city || user.address.city}
          isEditing={isEditing}
          onChange={(value) =>
            onUpdateUser((prev) =>
              prev ? { ...prev, address: { ...prev.address, city: value } } : null,
            )
          }
        />

        <ProfileField
          label='ZIP Code'
          value={editedUser?.address.zipcode || user.address.zipcode}
          isEditing={isEditing}
          onChange={(value) =>
            onUpdateUser((prev) =>
              prev ? { ...prev, address: { ...prev.address, zipcode: value } } : null,
            )
          }
        />

        <div>
          <label className='block text-sm font-lato-bold text-gray-700 mb-1'>Coordinates</label>
          <div className='bg-gray-50 p-3 rounded-md'>
            <p className='text-xs font-lato-normal text-gray-600'>
              Latitude: {user.address.geolocation.lat}
            </p>
            <p className='text-xs font-lato-normal text-gray-600'>
              Longitude: {user.address.geolocation.long}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
