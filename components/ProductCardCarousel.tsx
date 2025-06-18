'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from '@/components/product-card';
import type { Product } from '@/lib/types';

interface ProductCardCarouselProps {
  products: Product[];
}

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 600 }, items: 2 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

export default function ProductCardCarousel({ products }: ProductCardCarouselProps) {
  return (
    <Carousel
      responsive={responsive}
      infinite
      arrows
      showDots={false}
      containerClass='pb-8'
      itemClass='px-2'
      ssr
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Carousel>
  );
}
