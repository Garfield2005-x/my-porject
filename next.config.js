/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
    appDir: true,
  },
  output: 'standalone', // ✅ ใช้ standalone สำหรับ dynamic route เช่น NextAuth
};

module.exports = nextConfig;
