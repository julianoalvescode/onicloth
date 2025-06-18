import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/api';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://SEU_DOMINIO';
    const url = `${baseUrl}/product/${product.id}`;
    return {
      title: `${product.title} | UNICLOTH Store`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        url,
        type: 'website',
        images: [
          {
            url: product.image,
            width: 800,
            height: 800,
            alt: product.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description,
        images: [product.image],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {
      title: 'Product Not Found | UNICLOTH Store',
    };
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);
    return <ProductDetailClient product={product} />;
  } catch {
    notFound();
  }
}
