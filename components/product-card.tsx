'use client';

import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { useCartStore } from '@/lib/cart-store';
import { useFavoritesStore } from '@/lib/favorites-store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <div className='group cursor-pointer border border-transparent hover:border-gray-200 transition-all duration-200 rounded-lg p-1 lg:p-2'>
      <Link href={`/product/${product.id}`} className='block group'>
        <div className='relative aspect-square overflow-hidden mb-2 lg:mb-3 bg-gray-50 rounded-md'>
          {/* Just In Label */}
          <div className='absolute top-2 lg:top-4 left-2 lg:left-4 z-10'>
            <span className='font-lato-normal text-xs text-red-600 bg-white px-1.5 lg:px-2 py-0.5 lg:py-1 border border-gray-200 rounded'>
              Just In
            </span>
          </div>

          {/* Product Image */}
          <div className='w-full h-full p-2 lg:p-4'>
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.title}
              fill
              className='object-contain group-hover:scale-105 transition-transform duration-300'
              sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
            />
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            aria-label={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
            className={`absolute top-2 right-2 z-10 p-2 rounded-full ${
              isFavorite(product.id) ? 'bg-red-100' : 'bg-white'
            }`}
          >
            <svg
              className={`h-5 w-5 ${
                isFavorite(product.id) ? 'text-red-500 fill-current' : 'text-gray-700'
              }`}
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
            </svg>
          </button>
        </div>
        <div className='space-y-1 px-0.5 lg:px-1'>
          <h3 className='font-lato-bold text-black text-xs lg:text-sm leading-tight group-hover:underline line-clamp-2'>
            {product.title}
          </h3>
          <p className='font-lato-normal text-gray-500 text-xs lg:text-sm'>
            {product.category === "men's clothing" ? "Men's Clothing" : "Women's Clothing"}
          </p>
          <p className='font-lato-normal text-gray-500 text-xs lg:text-sm'>1 Color</p>
          <p className='font-lato-bold text-black text-xs lg:text-sm pt-1'>${product.price}</p>
        </div>
      </Link>
      {/* Hidden Add to Cart - appears on hover */}
      <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 px-0.5 lg:px-1'>
        <button
          onClick={handleAddToCart}
          className='w-full py-1.5 lg:py-2 bg-black text-white font-lato-bold text-xs lg:text-sm hover:bg-gray-800 transition-colors border border-black rounded-md'
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}
