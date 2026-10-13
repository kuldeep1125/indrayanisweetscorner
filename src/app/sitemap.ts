import { MetadataRoute } from 'next';

// [ADDED] Dynamic SEO XML sitemap generation
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://indrayanisweetcorner.com';

  const routes = [
    '',
    '/menu',
    '/custom-box',
    '/story',
    '/festivals',
    '/gallery',
    '/reviews',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/menu' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/menu' || route === '/custom-box' ? 0.9 : 0.8,
  }));
}
