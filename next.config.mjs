/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF holds fine UI text far better than WebP at the same byte size —
    // this is what actually makes the screenshots look sharp.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
