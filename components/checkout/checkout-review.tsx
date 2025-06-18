'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from '@mui/material';

interface CheckoutReviewProps {
  currentStep: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  paymentMethod: 'card' | 'paypal';
  onSubmit: (e: React.FormEvent) => void;
}

export default function CheckoutReview({
  currentStep,
  firstName,
  lastName,
  address,
  phone,
  email,
  paymentMethod,
  onSubmit,
}: CheckoutReviewProps) {
  return (
    <section className={`space-y-6 ${currentStep !== 'review' ? 'opacity-50' : ''}`}>
      <div className='flex items-center'>
        <h2 className='text-xl font-lato-normal'>Order Review</h2>
        {currentStep !== 'review' && <ChevronRight className='ml-2 h-5 w-5 text-gray-400' />}
      </div>

      {currentStep === 'review' && (
        <div className='space-y-6'>
          <div className='border border-gray-200 rounded-md p-6'>
            <h3 className='font-lato-bold mb-4'>Shipping Address</h3>
            <p className='font-lato-normal'>
              {firstName} {lastName}
              <br />
              {address}
              <br />
              Phone: {phone}
              <br />
              Email: {email}
            </p>
          </div>

          <div className='border border-gray-200 rounded-md p-6'>
            <h3 className='font-lato-bold mb-4'>Payment Method</h3>
            <p className='font-lato-normal'>
              {paymentMethod === 'card' ? 'Credit Card' : 'PayPal'}
            </p>
          </div>

          <div className='flex justify-center mt-6'>
            <Button variant='contained' color='primary' onClick={onSubmit} className='rounded-full'>
              Place Order
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
