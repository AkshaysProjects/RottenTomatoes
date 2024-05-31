/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
      {
        hostname: "static.tvmaze.com",
      },
      {
        hostname: "artworks.thetvdb.com",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
