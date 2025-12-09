import { MetadataRoute } from 'next';

const baseUrl = 'https://www.resetclub.ma';

const locales = ['en', 'fr'];

// All routes in the application
const routes = [
  '',
  '/about',
  '/contact',
  '/cookies',
  '/legal',
  '/privacy',
  '/linktree',
  '/notre-histoire',
  '/recrutons',
  '/bilan-gratuit',
  '/bilan-gratuit/thank-you',
  '/payment',
  '/confirmation',
  '/master-class',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Generate sitemap entries for each locale and route
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/membership' ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            fr: `${baseUrl}/fr${route}`,
          },
        },
      });
    });
  });

  return sitemap;
}
