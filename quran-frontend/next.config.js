/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow HMR from LAN IPs during local development
  allowedDevOrigins: ["192.168.0.106"],
};

module.exports = nextConfig;
