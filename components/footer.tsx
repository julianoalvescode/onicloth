'use client';

import Link from 'next/link';
import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import Logo from './logo';

export default function Footer() {
  const footerLinks = [
    {
      title: 'Featured',
      links: [
        { label: 'New Arrivals', href: '#' },
        { label: 'Best Sellers', href: '#' },
        { label: 'Sale Items', href: '#' },
        { label: 'Collections', href: '#' },
      ],
    },
    {
      title: 'Clothing',
      links: [
        { label: 'All Clothing', href: '#' },
        { label: 'Tops & T-Shirts', href: '#' },
        { label: 'Bottoms', href: '#' },
        { label: 'Outerwear', href: '#' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'Contact Us', href: '#' },
        { label: 'Order Status', href: '#' },
        { label: 'Shipping', href: '#' },
        { label: 'Returns', href: '#' },
        { label: 'Size Charts', href: '#' },
      ],
    },
    {
      title: 'About Us',
      links: [
        { label: 'News', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Investors', href: '#' },
        { label: 'Sustainability', href: '#' },
      ],
    },
  ];

  return (
    <footer className='bg-black text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Logo Section */}
        <div className='mb-8'>
          <Link href='/' className='inline-block text-white'>
            <Logo isWhite width={160} height={36} className='h-9 w-auto' />
          </Link>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className='font-lato-bold text-sm mb-4'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='font-lato-normal text-gray-400 hover:text-white text-xs transition-colors'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-12 flex flex-col md:flex-row justify-between items-center'>
          <div className='flex space-x-6 mb-6 md:mb-0'>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>
              <Twitter className='h-5 w-5' />
              <span className='sr-only'>Twitter</span>
            </a>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>
              <Facebook className='h-5 w-5' />
              <span className='sr-only'>Facebook</span>
            </a>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>
              <Instagram className='h-5 w-5' />
              <span className='sr-only'>Instagram</span>
            </a>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>
              <Youtube className='h-5 w-5' />
              <span className='sr-only'>YouTube</span>
            </a>
          </div>

          <div className='font-lato-normal text-xs text-gray-400'>
            <p>&copy; {new Date().getFullYear()} ONICLOTH, Inc. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
