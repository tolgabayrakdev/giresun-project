import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.giresunhakkinda.com',
          },
        ],
        permanent: true,
        destination: 'https://giresunhakkinda.com/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
    ]
  },
  images: {
    domains: ['giresunhakkinda.com'],
    minimumCacheTTL: 60,
  },
  trailingSlash: false,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://giresunhakkinda.com',
  }
};

export default nextConfig;
