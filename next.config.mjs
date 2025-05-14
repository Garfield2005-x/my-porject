/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '30mb', // กำหนดขนาดที่สามารถรับได้สูงสุด 30MB
      },
    },
  };
  
  export default nextConfig;
  