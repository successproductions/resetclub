import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.membership' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.resetclub.ma/${locale}/bilan-gratuit`,
      siteName: 'Reset Club',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 600,
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
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `https://www.resetclub.ma/${locale}/bilan-gratuit`,
      languages: {
        'x-default': 'https://www.resetclub.ma/fr/bilan-gratuit',
        'en': 'https://www.resetclub.ma/en/bilan-gratuit',
        'fr': 'https://www.resetclub.ma/fr/bilan-gratuit',
      },
    },
  };
}

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
