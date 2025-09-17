/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... any other config you have

  experimental: {
    // This allows access from any device on your local network
    allowedDevOrigins: ["192.168.1.*"],
  },
};

export default nextConfig;
