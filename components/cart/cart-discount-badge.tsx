interface CartDiscountBadgeProps {
  appliedDiscount: number;
}

export default function CartDiscountBadge({ appliedDiscount }: CartDiscountBadgeProps) {
  return (
    <div className='flex items-center gap-2 text-green-600'>
      <div className='w-4 h-4 rounded-full bg-green-600 flex items-center justify-center'>
        <span className='text-white text-xs'>%</span>
      </div>
      <span className='font-lato-normal text-sm'>{appliedDiscount * 100}% off Applied</span>
    </div>
  );
}
