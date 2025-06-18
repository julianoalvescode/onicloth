'use client';

import { Alert } from '@mui/material';

interface JoinErrorAlertProps {
  error: string;
}

export default function JoinErrorAlert({ error }: JoinErrorAlertProps) {
  if (!error) return null;

  return (
    <Alert severity='error' sx={{ mb: 3, borderColor: '#f44336' }}>
      {error}
    </Alert>
  );
}
