import { MetadataRoute } from 'next';

const locales = ['fr', 'en'];

/** Funnel end-points and the private academy — no search value, and they dilute the site's indexed set. */
const privatePaths = [
  '/academy/',
  '/payment',
  '/confirmation',
  '/bilan-gratuit/thank-you',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          ...locales.flatMap((locale) => privatePaths.map((path) => `/${locale}${path}`)),
        ],
      },
    ],
    sitemap: 'https://www.resetclub.ma/sitemap.xml',
    host: 'https://www.resetclub.ma',
  };
}
