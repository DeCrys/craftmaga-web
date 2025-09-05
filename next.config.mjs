/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ['*'] },
  },
  typedRoutes: false,
  typescript: {
    ignoreBuildErrors: true,
  }
};
export default nextConfig;
