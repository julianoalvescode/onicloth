import withPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';


const pwa = withPWA({
  dest: 'public',
  disable: !isProd,
  register: true,
  skipWaiting: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  // Enable standalone output for Docker optimization
  output: 'standalone',
  experimental: {
    // Enable output file tracing for better Docker optimization
    outputFileTracingRoot: undefined,
  },
  headers: async () => {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      }
    ]
  }
}

export default pwa(nextConfig)
