import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的エクスポート用の設定
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // パフォーマンス最適化
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // ESLint設定
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript設定
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
