import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb'
    }
  },
  devIndicators: {
    appIsrStatus: false
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      {
        protocol: 'http',
        hostname: 'i.ibb.co'
      },
      { protocol: 'https', hostname: 'beeimg.com' }
    ]
  }
}

export default nextConfig
