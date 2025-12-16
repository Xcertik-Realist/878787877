import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
    };
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cryptologos.cc' },
    ],
  },
};

export default nextConfig;