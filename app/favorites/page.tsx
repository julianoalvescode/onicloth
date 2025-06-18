'use client';

import { useFavoritesStore } from '@/lib/favorites-store';
import ProductCard from '@/components/product-card';

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);

  return (
    <div className='max-w-7xl mx-auto px-4 py-8 min-h-[calc(80vh-100px)]'>
      <h1 className='font-lato-black text-3xl mb-8'>My Favorites</h1>
      {favorites.length === 0 ? (
        <p className='text-gray-600'>You have no favorite products yet.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
