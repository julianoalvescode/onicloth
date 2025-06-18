'use client';

import { Box, Typography, LinearProgress } from '@mui/material';

interface JoinPasswordStrengthProps {
  password: string;
  passwordStrength: { strength: number; label: string; color: string };
}

export default function JoinPasswordStrength({
  password,
  passwordStrength,
}: JoinPasswordStrengthProps) {
  if (!password) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant='body2' color='text.secondary'>
          Password strength:
        </Typography>
        <Typography variant='body2' sx={{ color: passwordStrength.color }} fontWeight='500'>
          {passwordStrength.label}
        </Typography>
      </Box>
      <LinearProgress
        variant='determinate'
        value={passwordStrength.strength}
        sx={{
          '& .MuiLinearProgress-bar': {
            backgroundColor: passwordStrength.color,
          },
        }}
      />
    </Box>
  );
}
