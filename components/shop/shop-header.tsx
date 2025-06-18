'use client';

import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface ShopHeaderProps {
  activeCategory: string;
  filteredProductsCount: number;
  categories: string[];
  sortBy: string;
  showFilters: boolean;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortType: string) => void;
  onToggleFilters: () => void;
  formatCategoryName: (category: string) => string;
}

export default function ShopHeader({
  activeCategory,
  filteredProductsCount,
  categories,
  sortBy,
  showFilters,
  onCategoryChange,
  onSortChange,
  onToggleFilters,
  formatCategoryName,
}: ShopHeaderProps) {
  const getCategoryDisplayName = () => {
    if (activeCategory === 'all') return 'All Products';
    return formatCategoryName(activeCategory);
  };

  return (
    <>
      {/* Mobile Category Select */}
      <div className='block md:hidden mb-4'>
        <label htmlFor='category-select' className='sr-only'>
          Category
        </label>
        <select
          id='category-select'
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className='w-full border border-gray-300 rounded px-4 py-2 font-lato-normal text-black bg-white'
        >
          <option value='all'>All Products</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {formatCategoryName(category)}
            </option>
          ))}
        </select>
      </div>

      {/* Page Header */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='font-lato-black text-2xl text-black'>
          {getCategoryDisplayName()} ({filteredProductsCount})
        </h1>
        <div className='flex items-center gap-4'>
          {/* Desktop Filter Toggle */}
          <button
            onClick={onToggleFilters}
            className='hidden md:flex items-center font-lato-normal text-sm text-black hover:text-gray-600 transition-colors'
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            <SlidersHorizontal className='ml-2 h-4 w-4' />
          </button>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='flex items-center font-lato-normal text-sm text-black hover:text-gray-600 transition-colors'>
                Sort By
                <ChevronDown className='ml-1 h-4 w-4' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuItem
                onSelect={() => onSortChange('asc')}
                className={sortBy === 'asc' ? 'bg-gray-100' : ''}
              >
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => onSortChange('desc')}
                className={sortBy === 'desc' ? 'bg-gray-100' : ''}
              >
                Price: High to Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
