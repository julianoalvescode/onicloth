'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  ProfileHeader,
  ProfileLoading,
  ProfilePersonalInfo,
  ProfileAddressInfo,
  ProfileAccountStats,
} from '@/components/profile';

export default function ProfilePage() {
  const { user, isLoading, refreshUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signin');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleSave = async () => {
    if (!editedUser) return;

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('unicloth_user', JSON.stringify(editedUser));
      setIsEditing(false);
      await refreshUser();
    } catch (error) {
      console.error('Failed to save user data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  if (isLoading || !user) {
    return <ProfileLoading />;
  }

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
        <ProfileHeader
          isEditing={isEditing}
          isSaving={isSaving}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        <div className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <ProfilePersonalInfo
              user={user}
              editedUser={editedUser}
              isEditing={isEditing}
              onUpdateUser={setEditedUser}
            />

            <ProfileAddressInfo
              user={user}
              editedUser={editedUser}
              isEditing={isEditing}
              onUpdateUser={setEditedUser}
            />
          </div>

          <ProfileAccountStats user={user} />
        </div>
      </div>
    </div>
  );
}
