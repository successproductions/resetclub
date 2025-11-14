import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'SEO.about' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.resetclub.ma/${params.locale}/about`,
      siteName: 'ResetClub™️',
      images: [
        {
          url: '/LOGO.png',
          width: 1200,
          height: 630,
          alt: 'ResetClub™️',
        },
      ],
      locale: params.locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/LOGO.png'],
    },
    alternates: {
      canonical: `https://www.resetclub.ma/${params.locale}/about`,
      languages: {
        'en': 'https://www.resetclub.ma/en/about',
        'fr': 'https://www.resetclub.ma/fr/about',
      },
    },
  };
}

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}