import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb'
    }
  },
  devIndicators: {
    appIsrStatus: false
  },
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
