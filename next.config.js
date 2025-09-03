/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cravatar.eu',
      },
      {
        protocol: 'https',
        hostname: 'minotar.net',
      },
      {
        protocol: 'https',
        hostname: 'czech-craft.eu',
      },
      {
        protocol: 'https',
        hostname: 'craftlist.org',
      },
      {
        protocol: 'https',
        hostname: 'minecraftservery.eu',
      },
      {
        protocol: 'https',
        hostname: 'www.minecraft-list.cz',
      }
    ],
  },
  // Rewrites pro dynmap
  async rewrites() {
    return [
      {
        source: '/map/:path*',
        destination: '/api/dynmap/:path*',
      },
    ];
  },
}

export default nextConfig