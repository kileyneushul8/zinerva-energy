/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add jose to the externals
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "jose": require.resolve("jose")
      }
    }
    return config
  },
}

module.exports = nextConfig 