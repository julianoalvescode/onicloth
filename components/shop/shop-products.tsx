'use client';

import type { Product } from '@/lib/types';
import ProductCard from '@/components/product-card';

interface ShopProductsProps {
  filteredProducts: Product[];
  showFilters: boolean;
}

export default function ShopProducts({ filteredProducts, showFilters }: ShopProductsProps) {
  return (
    <div className={`${showFilters ? 'flex-1' : 'w-full'}`}>
      {filteredProducts.length === 0 ? (
        <div className='text-center py-12'>
          <p className='font-lato-normal text-gray-600'>
            No products found matching your criteria.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
