import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NotreHistoireHero from '@/components/sections/NotreHistoireHero';
import NahedRachad from '@/components/sections/NahedRachad';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.notreHistoire' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.resetclub.ma/${locale}/notre-histoire`,
      siteName: 'ResetClub™️',
      images: [
        {
          url: '/LOGO.png',
          width: 1200,
          height: 630,
          alt: 'ResetClub™️',
        },
      ],
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/LOGO.png'],
    },
    alternates: {
      canonical: `https://www.resetclub.ma/${locale}/notre-histoire`,
      languages: {
        'en': 'https://www.resetclub.ma/en/notre-histoire',
        'fr': 'https://www.resetclub.ma/fr/notre-histoire',
      },
    },
  };
}

export default function NotreHistoirePage() {
  return (
    <>
      <Header />
      <NotreHistoireHero />
      <NahedRachad translationKey="NotreHistoirePage.nahed" />
      <Footer />
    </>
  );
}
