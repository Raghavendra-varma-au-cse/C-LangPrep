import type { NextConfig } from "next";

const isExport = process.env.EXPORT === 'true';

const nextConfig: NextConfig = {
  output: isExport ? 'export' : undefined,
  basePath: isExport ? '/C-LangPrep' : '',
  assetPrefix: isExport ? '/C-LangPrep/' : undefined,
  images: {
    unoptimized: true,
  },
  cacheComponents: isExport ? false : true,
  partialPrefetching: isExport ? false : true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
