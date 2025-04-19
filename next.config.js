/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  // Properly configure for production/SWC
  
  experimental: {
    serverActions: {
      allowedOrigins: ["app.localhost:3000"],
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      { hostname: "public.blob.vercel-storage.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "abs.twimg.com" },
      { hostname: "pbs.twimg.com" },
      { hostname: "avatar.vercel.sh" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "www.google.com" },
      { hostname: "flag.vercel.app" },
      { hostname: "illustrations.popsy.co" },
      {
        protocol: 'https',
        hostname: 'ymwnnh4qtelzkdw3.public.blob.vercel-storage.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
    ],
  },
};
