'use client';

import { Mail, Phone } from 'lucide-react';
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

interface ProfilePersonalInfoProps {
  user: User;
  editedUser: User | null;
  isEditing: boolean;
  onUpdateUser: (updater: (prev: User | null) => User | null) => void;
}

export default function ProfilePersonalInfo({
  user,
  editedUser,
  isEditing,
  onUpdateUser,
}: ProfilePersonalInfoProps) {
  return (
    <div className='space-y-6'>
      <h2 className='text-lg font-lato-bold text-gray-900 border-b border-gray-200 pb-2'>
        Personal Information
      </h2>

      <div className='space-y-4'>
        <ProfileField
          label='First Name'
          value={editedUser?.name.firstname || user.name.firstname}
          isEditing={isEditing}
          onChange={(value) =>
            onUpdateUser((prev) =>
              prev ? { ...prev, name: { ...prev.name, firstname: value } } : null,
            )
          }
        />

        <ProfileField
          label='Last Name'
          value={editedUser?.name.lastname || user.name.lastname}
          isEditing={isEditing}
          onChange={(value) =>
            onUpdateUser((prev) =>
              prev ? { ...prev, name: { ...prev.name, lastname: value } } : null,
            )
          }
        />

        <ProfileField
          label='Username'
          value={user.username}
          isEditing={isEditing}
          readOnly
          helperText='Username cannot be changed'
        />

        <ProfileField
          label='Email'
          value={editedUser?.email || user.email}
          isEditing={isEditing}
          type='email'
          icon={Mail}
          onChange={(value) => onUpdateUser((prev) => (prev ? { ...prev, email: value } : null))}
        />

        <ProfileField
          label='Phone'
          value={editedUser?.phone || user.phone}
          isEditing={isEditing}
          type='tel'
          icon={Phone}
          onChange={(value) => onUpdateUser((prev) => (prev ? { ...prev, phone: value } : null))}
        />
      </div>
    </div>
  );
}
