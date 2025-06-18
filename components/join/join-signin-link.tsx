'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function JoinSignInLink() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant='body2' color='text.secondary'>
        Already have an account?{' '}
        <Link href='/signin' className='text-black font-bold underline hover:no-underline'>
          Sign In
        </Link>
      </Typography>
    </Box>
  );
}
