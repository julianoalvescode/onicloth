'use client';

import { ChevronRight } from 'lucide-react';
import { TextField, Button } from '@mui/material';

interface CheckoutPaymentProps {
  currentStep: string;
  paymentMethod: 'card' | 'paypal';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  onPaymentMethodChange: (method: 'card' | 'paypal') => void;
  onCardNumberChange: (number: string) => void;
  onExpiryDateChange: (date: string) => void;
  onCvvChange: (cvv: string) => void;
  onCardNameChange: (name: string) => void;
  onContinue: () => void;
}

export default function CheckoutPayment({
  currentStep,
  paymentMethod,
  cardNumber,
  expiryDate,
  cvv,
  cardName,
  onPaymentMethodChange,
  onCardNumberChange,
  onExpiryDateChange,
  onCvvChange,
  onCardNameChange,
  onContinue,
}: CheckoutPaymentProps) {
  return (
    <section className={`space-y-6 ${currentStep === 'delivery' ? 'opacity-50' : ''}`}>
      <div className='flex items-center'>
        <h2 className='text-xl font-lato-normal'>Payment</h2>
        {currentStep === 'delivery' && <ChevronRight className='ml-2 h-5 w-5 text-gray-400' />}
      </div>

      {currentStep === 'payment' && (
        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <button
              type='button'
              onClick={() => onPaymentMethodChange('card')}
              className={`flex items-center justify-center gap-2 py-4 px-6 border rounded-md transition-colors ${
                paymentMethod === 'card'
                  ? 'border-black bg-white'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            >
              <span className='font-lato-normal'>Credit Card</span>
            </button>

            <button
              type='button'
              onClick={() => onPaymentMethodChange('paypal')}
              className={`flex items-center justify-center gap-2 py-4 px-6 border rounded-md transition-colors ${
                paymentMethod === 'paypal'
                  ? 'border-black bg-white'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            >
              <span className='font-lato-normal'>PayPal</span>
            </button>
          </div>

          {paymentMethod === 'card' && (
            <form className='space-y-4'>
              <TextField
                label='Card Number'
                variant='outlined'
                fullWidth
                value={cardNumber}
                onChange={(e) => onCardNumberChange(e.target.value)}
                placeholder='1234 5678 9012 3456'
              />

              <div className='grid grid-cols-2 gap-4'>
                <TextField
                  label='Expiration Date'
                  variant='outlined'
                  fullWidth
                  value={expiryDate}
                  onChange={(e) => onExpiryDateChange(e.target.value)}
                  placeholder='MM/YY'
                />

                <TextField
                  label='Security Code'
                  variant='outlined'
                  fullWidth
                  value={cvv}
                  onChange={(e) => onCvvChange(e.target.value)}
                  placeholder='123'
                />
              </div>

              <TextField
                label='Name on Card'
                variant='outlined'
                fullWidth
                value={cardName}
                onChange={(e) => onCardNameChange(e.target.value)}
                placeholder='John Doe'
              />
            </form>
          )}

          {paymentMethod === 'paypal' && (
            <div className='border border-gray-200 rounded-md p-6 bg-gray-50 text-center'>
              <p className='font-lato-normal'>
                You will be redirected to PayPal to complete your payment.
              </p>
            </div>
          )}

          <div className='flex justify-center mt-6'>
            <Button variant='outlined' onClick={onContinue} className='rounded-full'>
              Save & Continue
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
