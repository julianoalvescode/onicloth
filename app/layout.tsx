import type React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { getClothingCategories } from '@/lib/api';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'ONICLOTH Store | Premium Clothing Online',
  description: 'Shop the latest trends in fashion and apparel at ONICLOTH.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getClothingCategories();

  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
          rel='stylesheet'
        />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#000000' />
        <link rel='icon' href='/icon-192x192.png' />
        <link rel='apple-touch-icon' href='/icon-192x192.png' />
      </head>
      <body className='font-lato antialiased'>
        <NextTopLoader color='#000' showSpinner={false} height={3} />
        <AuthProvider>
          <div className='min-h-screen bg-white'>
            <Navigation categories={categories} />
            <main className='pt-0'>{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
