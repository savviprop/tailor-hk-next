/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "files.manuscdn.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // Legal URL aliases
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      // FAQ alias
      { source: "/faq", destination: "/faqs", permanent: true },
      // Common nav aliases that may be linked externally
      { source: "/tailoring", destination: "/tailored-menswear", permanent: true },
      { source: "/services", destination: "/atelier-direct", permanent: true },
      { source: "/guides", destination: "/tailor-guides", permanent: true },
      { source: "/bespoke", destination: "/atelier-direct", permanent: true },
      { source: "/made-to-measure", destination: "/tailored-menswear", permanent: true },
      { source: "/corporate-programme", destination: "/corporate-rewards", permanent: true },
      { source: "/corporate", destination: "/corporate-rewards", permanent: true },
      // Compare and production-index — redirect to relevant pages
      { source: "/compare", destination: "/tailor-compare", permanent: true },
      { source: "/production-index", destination: "/atelier-direct", permanent: true },
      // Tailor guide slug rename — preserve old URL with 301
      { source: "/tailor-guides/hk-finest-tailoring", destination: "/tailor-guides/expert-guide-to-best-tailors-in-hong-kong", permanent: true },
    ];
  },
};
export default nextConfig;
