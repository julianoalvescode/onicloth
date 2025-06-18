'use client';

import { Edit, Save, X, Loader2, User } from 'lucide-react';

interface ProfileHeaderProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileHeader({
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onCancel,
}: ProfileHeaderProps) {
  return (
    <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-3'>
          <div className='bg-black text-white rounded-full p-3'>
            <User className='h-6 w-6' />
          </div>
          <div>
            <h1 className='text-2xl font-lato-black text-gray-900'>My Profile</h1>
            <p className='text-sm font-lato-normal text-gray-600'>
              Manage your account information
            </p>
          </div>
        </div>
        <div className='flex space-x-2'>
          {isEditing ? (
            <>
              <button
                onClick={onCancel}
                disabled={isSaving}
                className='px-4 py-2 border border-gray-300 text-gray-700 font-lato-normal text-sm rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50'
              >
                <X className='h-4 w-4 mr-1 inline' />
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={isSaving}
                className='px-4 py-2 bg-black text-white font-lato-bold text-sm rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center'
              >
                {isSaving ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-1 animate-spin' />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className='h-4 w-4 mr-1' />
                    Save
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={onEdit}
              className='px-4 py-2 bg-black text-white font-lato-bold text-sm rounded-md hover:bg-gray-800 transition-colors flex items-center'
            >
              <Edit className='h-4 w-4 mr-1' />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
