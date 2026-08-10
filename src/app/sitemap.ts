import { MetadataRoute } from 'next';

const baseUrl = 'https://www.resetclub.ma';

const locales = ['fr', 'en'];

/**
 * Only pages that are useful as a search entry point belong here. Funnel
 * end-points (thank-you, confirmation, payment) and the private academy are
 * excluded — indexing them dilutes the signals Google uses to pick sitelinks.
 */
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/bilan-gratuit', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/notre-histoire', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/master-class', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/recrutons', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/linktree', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/legal', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cgv', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr${path}`,
          en: `${baseUrl}/en${path}`,
        },
      },
    }))
  );
}
