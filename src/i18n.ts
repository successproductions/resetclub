import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'fr'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as 'en' | 'fr')) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  };
});