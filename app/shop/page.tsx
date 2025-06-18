import { getClothingProducts, getClothingCategories } from '@/lib/api';
import ShopPageClient from './ShopPageClient';
import type { Metadata } from 'next';

export default async function ShopPage() {
  const products = await getClothingProducts('asc');
  const categories = await getClothingCategories();
  return <ShopPageClient initialProducts={products} initialCategories={categories} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://SEU_DOMINIO';
  const url = `${baseUrl}/shop`;
  return {
    title: 'Shop | UNICLOTH Store',
    description:
      'Explore all products at UNICLOTH Store. Premium fashion, trends, and exclusive offers for you.',
    openGraph: {
      title: 'Shop | UNICLOTH Store',
      description:
        'Explore all products at UNICLOTH Store. Premium fashion, trends, and exclusive offers for you.',
      url,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/placeholder.jpg`,
          width: 800,
          height: 600,
          alt: 'UNiCLOTH Store',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shop | UNICLOTH Store',
      description:
        'Explore all products at UNICLOTH Store. Premium fashion, trends, and exclusive offers for you.',
      images: [`${baseUrl}/images/placeholder.jpg`],
    },
    alternates: {
      canonical: url,
    },
  };
}
