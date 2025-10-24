/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone output for Vercel deployment
   output: 'standalone', // Only use this for Docker
  
  // Compress images
  images: {
    domains: [],
    unoptimized: false,
  },
  
  // Enable experimental features if needed
  experimental: {
    appDir: true,
    // Add any experimental features here
  },
  
  // Environment variables validation (only custom env vars, not NODE_ENV)
  env: {
    // DATABASE_URL and NEXTAUTH_* are automatically available in Next.js
    // Only add custom environment variables here that need to be exposed to the client
    ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS,
    ENABLE_DEBUG_MODE: process.env.ENABLE_DEBUG_MODE,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
