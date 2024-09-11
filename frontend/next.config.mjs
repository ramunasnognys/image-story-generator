/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BACKEND_URL: process.env.BACKEND_URL,
    },
    output: 'standalone',
  };
  
  export default nextConfig;