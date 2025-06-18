'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart, Ruler, X } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCartStore } from '@/lib/cart-store';
import { useFavoritesStore } from '@/lib/favorites-store';

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const addToCart = useCartStore((s) => s.addToCart);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  // Mock gallery images (in a real app, these would come from the API)
  const galleryImages = [
    product.image || '/placeholder.svg',
    product.image || '/placeholder.svg',
    product.image || '/placeholder.svg',
    product.image || '/placeholder.svg',
    product.image || '/placeholder.svg',
    product.image || '/placeholder.svg',
    product.image || '/placeholder.svg',
    product.image || '/placeholder.svg',
  ];

  const sizes = [
    { label: 'XS', value: 'XS', available: true },
    { label: 'S', value: 'S', available: true },
    { label: 'M', value: 'M', available: true },
    { label: 'L', value: 'L', available: true },
    { label: 'XL', value: 'XL', available: true },
    { label: 'XXL', value: 'XXL', available: false },
  ];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product);
    }
  };

  return (
    <main role='main' id='main-content' tabIndex={-1}>
      <div className='max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8'>
        {/* Breadcrumb (example, adjust as per your real layout) */}
        <nav aria-label='Breadcrumb' className='mb-4'>
          <ol className='flex items-center text-sm text-gray-500'>
            <li>
              <a href='/shop' className='hover:underline'>
                Shop
              </a>
            </li>
            <li>
              <span className='mx-2'>...</span>
            </li>
            <li aria-current='page' className='text-black font-medium'>
              {product.title}
            </li>
          </ol>
        </nav>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8'>
          {/* Left Side - Image Gallery */}
          <div className='order-1 lg:order-1' aria-label='Product image gallery' role='region'>
            {/* Mobile: Single Image with Dots */}
            <div className='lg:hidden'>
              <div className='relative aspect-square bg-gray-50 mb-4'>
                <div className='w-full h-full p-4 lg:p-8'>
                  <Image
                    src={galleryImages[selectedImageIndex] || '/placeholder.svg'}
                    alt={`Photo of product ${product.title}`}
                    fill
                    className='object-contain cursor-pointer'
                    sizes='100vw'
                    priority
                    onClick={() => setShowImageModal(true)}
                  />
                </div>

                {/* Navigation Arrows - Mobile */}
                <button
                  onClick={prevImage}
                  className='absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors'
                  aria-label='Previous image'
                >
                  <ChevronLeft className='w-4 h-4' />
                </button>
                <button
                  onClick={nextImage}
                  className='absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors'
                  aria-label='Next image'
                >
                  <ChevronRight className='w-4 h-4' />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className='flex justify-center space-x-2 mb-6'>
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedImageIndex === index ? 'bg-black' : 'bg-gray-300'
                    }`}
                    aria-label={`Select image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Gallery with Thumbnails */}
            <div className='hidden lg:flex gap-4'>
              {/* Thumbnail Gallery */}
              <div className='flex flex-col gap-2 w-16'>
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-16 h-16 border-2 transition-colors bg-gray-50 ${
                      selectedImageIndex === index
                        ? 'border-black'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    aria-label={`Select image ${index + 1}`}
                  >
                    <div className='w-full h-full p-1'>
                      <Image
                        src={image || '/placeholder.svg'}
                        alt={`Product view ${index + 1}`}
                        fill
                        className='object-contain'
                        sizes='64px'
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className='flex-1 relative'>
                <div className='relative aspect-square bg-gray-50'>
                  <div className='w-full h-full p-8'>
                    <Image
                      src={galleryImages[selectedImageIndex] || '/placeholder.svg'}
                      alt={`Photo of product ${product.title}`}
                      fill
                      className='object-contain cursor-pointer'
                      sizes='(max-width: 768px) 100vw, 50vw'
                      priority
                      onClick={() => setShowImageModal(true)}
                    />
                  </div>

                  {/* Navigation Arrows - Desktop */}
                  <button
                    onClick={prevImage}
                    className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors'
                    aria-label='Previous image'
                  >
                    <ChevronLeft className='w-5 h-5' />
                  </button>
                  <button
                    onClick={nextImage}
                    className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors'
                    aria-label='Next image'
                  >
                    <ChevronRight className='w-5 h-5' />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Information */}
          <div
            className='order-2 lg:order-2 space-y-4 lg:space-y-6'
            role='region'
            aria-label='Product information'
          >
            {/* Sustainable Materials Label */}
            <div>
              <span className='font-lato-normal text-xs lg:text-sm text-red-600'>
                Sustainable Materials
              </span>
            </div>

            {/* Product Title */}
            <div>
              <h1
                className='font-lato-black text-xl lg:text-2xl text-black mb-2'
                id='product-title'
              >
                {product.title}
              </h1>
              <p className='font-lato-normal text-base lg:text-lg text-gray-600'>
                {product.category === "men's clothing" ? "Men's Clothing" : "Women's Clothing"}
              </p>
            </div>

            {/* Price */}
            <div>
              <span className='font-lato-bold text-lg lg:text-xl text-black' aria-live='polite'>
                ${product.price}
              </span>
            </div>

            {/* Size Selection */}
            <div>
              <div className='flex justify-between items-center mb-3 lg:mb-4'>
                <span className='font-lato-bold text-black text-sm lg:text-base'>Select Size</span>
                <button
                  className='flex items-center text-xs lg:text-sm text-gray-600 hover:text-black transition-colors'
                  aria-label='Open size guide'
                >
                  <Ruler className='w-3 h-3 lg:w-4 lg:h-4 mr-1' />
                  Size Guide
                </button>
              </div>

              <div className='grid grid-cols-3 lg:grid-cols-2 gap-2'>
                {sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => size.available && setSelectedSize(size.value)}
                    disabled={!size.available}
                    className={`py-2 lg:py-3 px-2 lg:px-4 border text-xs lg:text-sm font-lato-normal transition-colors ${
                      selectedSize === size.value
                        ? 'border-black bg-black text-white'
                        : size.available
                        ? 'border-gray-300 hover:border-black'
                        : 'border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    aria-label={
                      size.available
                        ? `Select size ${size.label}`
                        : `Size ${size.label} unavailable`
                    }
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full py-3 lg:py-4 rounded-full font-lato-bold text-sm lg:text-base text-white transition-colors ${
                selectedSize ? 'bg-black hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'
              }`}
              aria-label='Add to cart'
            >
              Add to Bag
            </button>

            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className={`w-full py-3 lg:py-4 rounded-full border font-lato-bold text-sm lg:text-base transition-colors ${
                isFavorite(product.id)
                  ? 'border-red-500 text-red-500 bg-red-50'
                  : 'border-gray-300 text-black hover:border-black'
              }`}
              aria-pressed={isFavorite(product.id)}
              aria-label={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`inline w-4 h-4 lg:w-5 lg:h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`}
              />
              Favorite
            </button>

            {/* Product Description */}
            <div
              className='pt-4 lg:pt-6 border-t border-gray-200'
              role='region'
              aria-label='Product details'
            >
              <h3 className='font-lato-bold text-black mb-2 lg:mb-3 text-sm lg:text-base'>
                Product Details
              </h3>
              <p className='font-lato-normal text-gray-600 text-xs lg:text-sm leading-relaxed'>
                {product.description}
              </p>
            </div>

            {/* Additional Info */}
            <div
              className='space-y-3 lg:space-y-4 pt-4 lg:pt-6 border-t border-gray-200'
              role='region'
              aria-label='Additional information'
            >
              <div>
                <h4 className='font-lato-bold text-black mb-1 lg:mb-2 text-sm lg:text-base'>
                  Free Delivery and Returns
                </h4>
                <p className='font-lato-normal text-xs lg:text-sm text-gray-600'>
                  Free standard delivery on orders over $50 and free 60-day returns for ONICLOTH
                  Members.
                </p>
              </div>

              <div>
                <h4 className='font-lato-bold text-black mb-1 lg:mb-2 text-sm lg:text-base'>
                  Reviews
                </h4>
                <div className='flex items-center' role='region' aria-label='Customer reviews'>
                  <div
                    className='flex items-center'
                    role='img'
                    aria-label={`Rating ${product.rating.rate} out of 5`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm lg:text-lg ${
                          i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className='font-lato-normal text-xs lg:text-sm text-gray-600 ml-2'>
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal for Mobile */}
      {showImageModal && (
        <div
          className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center lg:hidden'
          role='dialog'
          aria-modal='true'
          aria-label='Product image preview'
        >
          <div className='relative w-full h-full flex items-center justify-center p-4'>
            <button
              onClick={() => setShowImageModal(false)}
              className='absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center z-10'
              aria-label='Close image modal'
            >
              <X className='w-6 h-6' />
            </button>

            <div className='relative w-full h-full max-w-md max-h-96'>
              <Image
                src={galleryImages[selectedImageIndex] || '/placeholder.svg'}
                alt={`Photo of product ${product.title}`}
                fill
                className='object-contain'
                sizes='100vw'
              />
            </div>

            <button
              onClick={prevImage}
              className='absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center'
              aria-label='Previous image'
            >
              <ChevronLeft className='w-6 h-6' />
            </button>
            <button
              onClick={nextImage}
              className='absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center'
              aria-label='Next image'
            >
              <ChevronRight className='w-6 h-6' />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetailClient;
