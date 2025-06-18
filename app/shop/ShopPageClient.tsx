'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { ShopHeader, ShopFilters, ShopProducts, ShopSkeleton, ShopError } from '@/components/shop';

interface ShopPageClientProps {
  initialProducts: Product[];
  initialCategories: string[];
}

export default function ShopPageClient({
  initialProducts,
  initialCategories,
}: ShopPageClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('asc');
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 1000 });
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    filterProducts(products, activeCategory, priceRange.min, priceRange.max);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, priceRange]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const filterProducts = (
    productList: Product[],
    category: string,
    minPrice = 0,
    maxPrice = 1000,
  ) => {
    let filtered = productList;
    if (category !== 'all') {
      filtered = filtered.filter((product) => product.category === category);
    }
    filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice);
    setFilteredProducts(filtered);
  };

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    filterProducts(products, category, priceRange.min, priceRange.max);
  };

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    // Sorting logic can be added here if needed
  };

  const handlePriceFilter = () => {
    setPriceRange(tempPriceRange);
    filterProducts(products, activeCategory, tempPriceRange.min, tempPriceRange.max);
  };

  const resetPriceFilter = () => {
    const resetRange = { min: 0, max: 1000 };
    setPriceRange(resetRange);
    setTempPriceRange(resetRange);
    filterProducts(products, activeCategory, 0, 1000);
  };

  const formatCategoryName = (category: string) => {
    return category
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return <ShopSkeleton />;
  }

  if (error) {
    return <ShopError error={error} onRetry={() => {}} />;
  }

  return (
    <div className='bg-white min-h-[calc(100vh-100px)]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <ShopHeader
          activeCategory={activeCategory}
          filteredProductsCount={filteredProducts.length}
          categories={categories}
          sortBy={sortBy}
          showFilters={showFilters}
          onCategoryChange={handleCategoryFilter}
          onSortChange={handleSort}
          onToggleFilters={() => setShowFilters(!showFilters)}
          formatCategoryName={formatCategoryName}
        />
        <div className='flex gap-8'>
          {showFilters && (
            <ShopFilters
              activeCategory={activeCategory}
              categories={categories}
              showPriceFilter={showPriceFilter}
              priceRange={priceRange}
              tempPriceRange={tempPriceRange}
              onCategoryChange={handleCategoryFilter}
              onTogglePriceFilter={() => setShowPriceFilter(!showPriceFilter)}
              onTempPriceRangeChange={setTempPriceRange}
              onApplyPriceFilter={handlePriceFilter}
              onResetPriceFilter={resetPriceFilter}
              formatCategoryName={formatCategoryName}
            />
          )}
          <ShopProducts filteredProducts={filteredProducts} showFilters={showFilters} />
        </div>
      </div>
    </div>
  );
}
