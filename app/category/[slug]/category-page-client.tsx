'use client';

import { useState, useTransition } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/product-card';
import CategoryHeader from '@/components/CategoryHeader';
import MenWomenSkeleton from '@/components/shop/men-women-skeleton';

interface CategoryPageClientProps {
  initialProducts: Product[];
  initialSort: string;
  category: string;
}

export default function CategoryPageClient({
  initialProducts,
  initialSort,
  category,
}: CategoryPageClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [isPending, startTransition] = useTransition();

  if (isPending) {
    return <MenWomenSkeleton />;
  }

  return (
    <div className='bg-white min-h-[calc(100vh-100px)]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <CategoryHeader title={category.replace(/%20/g, ' ')} count={products.length} />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
