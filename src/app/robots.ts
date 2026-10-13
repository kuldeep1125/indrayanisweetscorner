import { MetadataRoute } from 'next';

// [ADDED] Dynamic SEO robots.txt generation
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: 'https://indrayanisweetcorner.com/sitemap.xml',
  };
}
