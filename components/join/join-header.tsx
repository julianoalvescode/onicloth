'use client';

import { Box, Typography } from '@mui/material';
import Logo from '@/components/logo';

export default function JoinHeader() {
  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Logo width={140} height={32} className='h-8 w-auto text-black mx-auto' />
      </Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Join ONICLOTH
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Create your account to start shopping
      </Typography>
    </Box>
  );
}
