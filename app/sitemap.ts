import { getProducts } from '@/lib/api';

export async function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://SEU_DOMINIO';
  const products = await getProducts();

  let urls = ['', '/men', '/women', '/shop'];

  if (products && Array.isArray(products)) {
    urls = urls.concat(products.map((p) => `/product/${p.id}`));
  }

  return urls.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));
}

export default generateSitemap;
