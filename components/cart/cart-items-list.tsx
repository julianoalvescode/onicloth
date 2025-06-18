'use client';

import CartItem from './cart-item';
import CartDiscountBadge from './cart-discount-badge';
import CartShippingInfo from './cart-shipping-info';

interface CartItemsListProps {
  items: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
    image?: string;
    category: string;
  }>;
  appliedDiscount: number;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export default function CartItemsList({
  items,
  appliedDiscount,
  onRemove,
  onUpdateQuantity,
}: CartItemsListProps) {
  return (
    <div className='space-y-8'>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          appliedDiscount={appliedDiscount}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}

      {/* Discount Badge */}
      {appliedDiscount > 0 && <CartDiscountBadge appliedDiscount={appliedDiscount} />}

      {/* Shipping Info */}
      <CartShippingInfo />
    </div>
  );
}
