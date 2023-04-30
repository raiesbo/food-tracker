/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "**"
            }
        ]
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en"
    }
};

module.exports = nextConfig;
