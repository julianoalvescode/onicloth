import { getProductsByCategory, getClothingCategories } from '@/lib/api';
import CategoryPageClient from './category-page-client';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://SEU_DOMINIO';
  const url = `${baseUrl}/category/${params.slug}`;
  return {
    title: `${params.slug.replace(/-/g, ' ')} | UNICLOTH Store`,
    description: `Explore ${params.slug.replace(/-/g, ' ')} at UNICLOTH Store.`,
    openGraph: {
      title: `${params.slug.replace(/-/g, ' ')} | UNICLOTH Store`,
      description: `Explore ${params.slug.replace(/-/g, ' ')} at UNICLOTH Store.`,
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
      title: `${params.slug.replace(/-/g, ' ')} | UNICLOTH Store`,
      description: `Explore ${params.slug.replace(/-/g, ' ')} at UNICLOTH Store.`,
      images: [`${baseUrl}/images/placeholder.jpg`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const categories = await getClothingCategories();
  return categories.map((category: string) => ({ slug: category }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { sort?: string };
}) {
  const sort = searchParams.sort || 'asc';
  const products = await getProductsByCategory(params.slug, sort);
  return (
    <CategoryPageClient initialProducts={products} initialSort={sort} category={params.slug} />
  );
}
