'use client';

import { ChevronDown } from 'lucide-react';

interface ShopFiltersProps {
  activeCategory: string;
  categories: string[];
  showPriceFilter: boolean;
  priceRange: { min: number; max: number };
  tempPriceRange: { min: number; max: number };
  onCategoryChange: (category: string) => void;
  onTogglePriceFilter: () => void;
  onTempPriceRangeChange: (range: { min: number; max: number }) => void;
  onApplyPriceFilter: () => void;
  onResetPriceFilter: () => void;
  formatCategoryName: (category: string) => string;
}

export default function ShopFilters({
  activeCategory,
  categories,
  showPriceFilter,
  priceRange,
  tempPriceRange,
  onCategoryChange,
  onTogglePriceFilter,
  onTempPriceRangeChange,
  onApplyPriceFilter,
  onResetPriceFilter,
  formatCategoryName,
}: ShopFiltersProps) {
  return (
    <div className='w-64 space-y-6 hidden md:block'>
      {/* Category Filters */}
      <div className='space-y-2'>
        <button
          onClick={() => onCategoryChange('all')}
          className={`block w-full text-left font-lato-normal text-sm py-1 ${
            activeCategory === 'all'
              ? 'text-black font-lato-bold'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`block w-full text-left font-lato-normal text-sm py-1 ${
              activeCategory === category
                ? 'text-black font-lato-bold'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className='border-t border-gray-200 pt-4'>
        <button
          onClick={onTogglePriceFilter}
          className='flex justify-between items-center w-full font-lato-bold text-black text-sm mb-4'
        >
          Price Range
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showPriceFilter ? 'rotate-180' : ''}`}
          />
        </button>
        {showPriceFilter && (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='font-lato-normal text-sm text-gray-600'>
                Min Price: ${tempPriceRange.min}
              </label>
              <input
                type='range'
                min='0'
                max='1000'
                value={tempPriceRange.min}
                onChange={(e) =>
                  onTempPriceRangeChange({ ...tempPriceRange, min: Number(e.target.value) })
                }
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
              />
            </div>
            <div className='space-y-2'>
              <label className='font-lato-normal text-sm text-gray-600'>
                Max Price: ${tempPriceRange.max}
              </label>
              <input
                type='range'
                min='0'
                max='1000'
                value={tempPriceRange.max}
                onChange={(e) =>
                  onTempPriceRangeChange({ ...tempPriceRange, max: Number(e.target.value) })
                }
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
              />
            </div>
            <div className='flex gap-2'>
              <button
                onClick={onApplyPriceFilter}
                className='flex-1 py-2 bg-black text-white font-lato-normal text-sm hover:bg-gray-800 transition-colors'
              >
                Apply
              </button>
              <button
                onClick={onResetPriceFilter}
                className='flex-1 py-2 border border-gray-300 text-black font-lato-normal text-sm hover:bg-gray-100 transition-colors'
              >
                Reset
              </button>
            </div>
            <div className='text-xs text-gray-500 text-center'>
              ${priceRange.min} - ${priceRange.max}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
