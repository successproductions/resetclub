import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.cgv' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://www.resetclub.ma/${locale}/cgv`,
      languages: {
        'x-default': 'https://www.resetclub.ma/fr/cgv',
        'en': 'https://www.resetclub.ma/en/cgv',
        'fr': 'https://www.resetclub.ma/fr/cgv',
      },
    },
  };
}

export default function CgvLayout({ children }: { children: React.ReactNode }) {
  return children;
}
