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
      {
        source: '/projects',
        destination: '/',
      },
    ];
  },

};

export default nextConfig;
