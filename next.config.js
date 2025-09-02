/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
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
  // Pro Vercel deployment
  output: 'standalone',
}

module.exports = nextConfig