import type { NextConfig } from "next";

// Every remote <Image> is rendered with `unoptimized` (the avatar and logo are
// SVGs the optimizer won't touch without `dangerouslyAllowSVG`, and the PokéAPI
// sprite is pixel art that must not be resampled), so the optimizer never runs
// and no `images.remotePatterns` allow-list is needed.
const nextConfig: NextConfig = {};

export default nextConfig;
