/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // TODO verify this is not on in production
  experimental: {
    typedRoutes: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {

        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig;
