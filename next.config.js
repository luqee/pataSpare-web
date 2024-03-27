/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'standalone',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'api.pataspare.co.ke',
          port: '443',
          pathname: '/images/**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8000',
          pathname: '/images/**',
        },
      ],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
