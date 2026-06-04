/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // 308 redirect — SEO-friendly
      },
    ];
  },
};

export default nextConfig;
