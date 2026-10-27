/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tarot gratis adalah situs statis di public/tarot.
  async rewrites() {
    return [{ source: "/tarot", destination: "/tarot/index.html" }];
  },
};

export default nextConfig;
