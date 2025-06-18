'use client';

import { LucideIcon } from 'lucide-react';

interface ProfileFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  type?: 'text' | 'email' | 'tel';
  icon?: LucideIcon;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  helperText?: string;
}

export default function ProfileField({
  label,
  value,
  isEditing,
  type = 'text',
  icon: Icon,
  onChange,
  readOnly = false,
  helperText,
}: ProfileFieldProps) {
  return (
    <div>
      <label className='block text-sm font-lato-bold text-gray-700 mb-1'>{label}</label>
      {isEditing && !readOnly ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black font-lato-normal'
        />
      ) : (
        <div>
          {Icon ? (
            <div className='flex items-center space-x-2'>
              <Icon className='h-4 w-4 text-gray-500' />
              <p className='font-lato-normal text-gray-900 capitalize'>{value}</p>
            </div>
          ) : (
            <p className='font-lato-normal text-gray-900 capitalize'>{value}</p>
          )}
          {helperText && <p className='text-xs text-gray-500 mt-1'>{helperText}</p>}
        </div>
      )}
    </div>
  );
}
