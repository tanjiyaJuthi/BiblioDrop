/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ibb.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;