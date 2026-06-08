/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
      {
        source: '/home',
        destination: '/',
      },
    ];
  },

};

export default nextConfig;
