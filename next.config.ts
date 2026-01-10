import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // GitHub Pages用の静的エクスポート設定
  output: 'export',
  // GitHub Pagesのリポジトリ名（必要に応じて変更）
  basePath: isProd ? '/ticket-manager' : '',
  assetPrefix: isProd ? '/ticket-manager' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
