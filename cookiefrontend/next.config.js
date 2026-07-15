/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cooki-backend.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;