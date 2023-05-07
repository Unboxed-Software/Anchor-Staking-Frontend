/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    // domains: ["arweave.net", "nftstorage.link"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nftstorage.link",
      },
    ],
  },
}

module.exports = nextConfig
