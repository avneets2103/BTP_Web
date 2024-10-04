/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "api.microlink.io",
          "medical-btp-app.s3.ap-south-1.amazonaws.com"
        ],
      },
};

export default nextConfig;
