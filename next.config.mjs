/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Enable Next.js image optimization
    formats: ['image/avif', 'image/webp'], // Use modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 75, 85, 90, 100], // Allow various quality levels
  },
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  productionBrowserSourceMaps: false, // Disable source maps in production for faster load
  swcMinify: true, // Use SWC minification for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/*'], // Tree-shake unused components
  },
}

export default nextConfig

