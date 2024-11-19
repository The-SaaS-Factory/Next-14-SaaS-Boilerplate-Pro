const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const nextConfig = withMDX({
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "tailwindui.com" },
      { protocol: "https", hostname: "images.clerk.dev" },
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "www.gravatar.com" },
    ],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});

module.exports = nextConfig;
