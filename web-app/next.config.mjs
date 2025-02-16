/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.dummyjson.com", "cdn.sanity.io"],
  },
  async rewrites() {
    return [
      {
        source: "/studio/:path*",
        destination: "/studio/[[...index]]/page",
      },
    ];
  },
};

export default nextConfig;
