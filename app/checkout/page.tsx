'use client';

import type React from 'react';
import { useState } from 'react';
import {
  CheckoutHeader,
  CheckoutDelivery,
  CheckoutPayment,
  CheckoutReview,
  CheckoutOrderSummary,
  CheckoutThemeProvider,
} from '@/components/checkout';
import { useCartStore } from '@/lib/cart-store';

type CheckoutStep = 'delivery' | 'payment' | 'review';

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('delivery');
  const [deliveryOption, setDeliveryOption] = useState<'ship' | 'pickup'>('ship');
  const [addressType, setAddressType] = useState<'home' | 'apo'>('home');

  // Form state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // Payment state (would be expanded in a real app)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Pricing calculations
  const subtotal = getTotalPrice();
  const discountRate = 0.2; // 20% discount
  const discountAmount = subtotal * discountRate;
  const shipping = 8.0;
  const tax = 0.0;
  const total = subtotal - discountAmount + shipping + tax;

  const handleContinue = () => {
    if (currentStep === 'delivery') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process order
    alert('Order placed successfully!');
  };

  return (
    <CheckoutThemeProvider>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 min-h-[calc(100vh-100px)]'>
        <CheckoutHeader />

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12'>
          {/* Left Side - Checkout Form */}
          <div className='lg:col-span-2 space-y-6 lg:space-y-8'>
            <CheckoutDelivery
              currentStep={currentStep}
              deliveryOption={deliveryOption}
              addressType={addressType}
              email={email}
              firstName={firstName}
              lastName={lastName}
              address={address}
              phone={phone}
              onDeliveryOptionChange={setDeliveryOption}
              onAddressTypeChange={setAddressType}
              onEmailChange={setEmail}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onAddressChange={setAddress}
              onPhoneChange={setPhone}
              onContinue={handleContinue}
            />

            <CheckoutPayment
              currentStep={currentStep}
              paymentMethod={paymentMethod}
              cardNumber={cardNumber}
              expiryDate={expiryDate}
              cvv={cvv}
              cardName={cardName}
              onPaymentMethodChange={setPaymentMethod}
              onCardNumberChange={setCardNumber}
              onExpiryDateChange={setExpiryDate}
              onCvvChange={setCvv}
              onCardNameChange={setCardName}
              onContinue={handleContinue}
            />

            <CheckoutReview
              currentStep={currentStep}
              firstName={firstName}
              lastName={lastName}
              address={address}
              phone={phone}
              email={email}
              paymentMethod={paymentMethod}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Right Side - Order Summary */}
          <CheckoutOrderSummary
            items={items}
            subtotal={subtotal}
            discountAmount={discountAmount}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </CheckoutThemeProvider>
  );
}
