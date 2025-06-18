'use client';

import { Button } from '@mui/material';

interface JoinSubmitButtonProps {
  isLoading: boolean;
}

export default function JoinSubmitButton({ isLoading }: JoinSubmitButtonProps) {
  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      size='large'
      disabled={isLoading}
      sx={{ mb: 3, py: 1.5 }}
    >
      {isLoading ? 'Creating Account...' : 'Create Account'}
    </Button>
  );
}
