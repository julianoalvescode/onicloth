import Link from 'next/link';
import Image from 'next/image';
import { getClothingCategories, getClothingProducts } from '@/lib/api';
import HomeCarousel from '@/components/home-carousel';
import Mens from './../assets/home/mens.webp';
import Womens from './../assets/home/womens.webp';
import 'react-multi-carousel/lib/styles.css';
import ProductCardCarousel from '@/components/ProductCardCarousel';
import type { Metadata } from 'next';

export default async function HomePage() {
  const categories = await getClothingCategories();
  const products = await getClothingProducts('asc');

  const categoryData = [
    {
      name: "Men's Clothing",
      href: "/category/men's clothing",
      image: Mens.src,
      description: "Stylish men's fashion",
      available: categories.includes("men's clothing"),
    },
    {
      name: "Women's Clothing",
      href: "/category/women's clothing",
      image: Womens.src,
      description: "Trendy women's apparel",
      available: categories.includes("women's clothing"),
    },
  ];

  const availableCategories = categoryData.filter((cat) => cat.available);

  return (
    <div className='bg-white min-h-[calc(100vh-100px)]'>
      <HomeCarousel />

      {/* Categories Section */}
      <div className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='font-lato-black text-3xl text-black text-center mb-12'>
            Shop by Category
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {availableCategories.map((category) => (
              <Link key={category.name} href={category.href} className='group'>
                <div className='relative aspect-square overflow-hidden mb-4'>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                  />
                </div>
                <h3 className='font-lato-bold text-xl text-black mb-2 group-hover:underline'>
                  {category.name}
                </h3>
                <p className='font-lato-normal text-gray-600'>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product Card Carousel */}
      <div className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='font-lato-black text-3xl text-black mb-8'>News</h2>
          <ProductCardCarousel products={products} />
        </div>
      </div>

      {/* Featured Section */}
      <div className='bg-gray-50 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='font-lato-black text-3xl text-black mb-6'>Explore Everything</h2>
          <p className='font-lato-normal text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
            Browse our complete collection with advanced filtering options
          </p>
          <Link
            href='/shop'
            className='inline-block px-8 py-4 border-2 border-black text-black font-lato-bold text-lg hover:bg-black hover:text-white transition-colors'
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://SEU_DOMINIO';
  const url = `${baseUrl}/`;
  return {
    title: 'ONICLOTH Store | Premium Clothing Online',
    description:
      'Discover the latest trends in fashion and apparel at ONICLOTH. Shop premium clothing for men and women.',
    openGraph: {
      title: 'ONICLOTH Store | Premium Clothing Online',
      description:
        'Discover the latest trends in fashion and apparel at ONICLOTH. Shop premium clothing for men and women.',
      url,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/favicon.ico`,
          width: 800,
          height: 600,
          alt: 'ONICLOTH Store',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ONICLOTH Store | Premium Clothing Online',
      description:
        'Discover the latest trends in fashion and apparel at ONICLOTH. Shop premium clothing for men and women.',
      images: [`${baseUrl}/favicon.ico`],
    },
    alternates: {
      canonical: url,
    },
  };
}
