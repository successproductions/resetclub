import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactHero from '@/components/sections/ContactHero';
import ContactForm from '@/components/forms/ContactForm';
import ContactInfo from '@/components/sections/ContactInfo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'SEO.contact' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.resetclub.ma/${params.locale}/contact`,
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
      canonical: `https://www.resetclub.ma/${params.locale}/contact`,
      languages: {
        'en': 'https://www.resetclub.ma/en/contact',
        'fr': 'https://www.resetclub.ma/fr/contact',
      },
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactHero />
      <div className="bg-gray-50 py-4 md:py-16 overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}