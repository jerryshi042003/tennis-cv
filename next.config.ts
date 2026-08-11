import type { NextConfig } from "next";

// GitHub Pages serves this repository below /tennis-cv. Keep that path as the
// safe default so a plain `npm run build` cannot publish unstyled root assets.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/tennis-cv";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
