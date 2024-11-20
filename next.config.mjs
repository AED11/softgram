/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
    locales: ['en', 'tj'], // List of supported locales
    defaultLocale: 'en',    // Default locale
    localeDetection: true,  // Automatically detect user language
  },
};

export default nextConfig;
