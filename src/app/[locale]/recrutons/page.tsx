import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RecruitmentsHero from '@/components/sections/RecruitmentsHero';
import CVUploadForm from '@/components/forms/CVUploadForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.recrutons' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.resetclub.ma/${locale}/recrutons`,
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
      canonical: `https://www.resetclub.ma/${locale}/recrutons`,
      languages: {
        'en': 'https://www.resetclub.ma/en/recrutons',
        'fr': 'https://www.resetclub.ma/fr/recrutons',
      },
    },
  };
}

export default function RecrutonsPage() {
  const t = useTranslations('RecrutonsPage');

  return (
    <>
      <Header />
      <RecruitmentsHero />


      <div className="bg-white pb-8 md:py-20 overflow-x-hidden">
        <div className="container mx-auto md:px-6 max-w-7xl">
          
          {/* Top Section: Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-0 lg:mb-0">
            
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1 px-6 lg:px-0">
              {/* Subtitle */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 font-normal leading-tight mb-8">
                {t('hero.subtitle')}
              </h2>

              {/* Intro Text */}
              <p
                className="text-lg md:text-xl text-gray-900 font-graphik leading-relaxed mb-8"
                dangerouslySetInnerHTML={{__html: t('qualities.intro')}}
              />

              {/* Upload Section Titles */}
              <div className="mt-12">
                <h3 className="text-3xl md:text-3xl text-gray-900 mb-3 font-graphik font-normal">
                  {t('upload.title')}
                </h3>
                <p className="text-gray-900 text-lg md:text-xl font-graphik leading-relaxed">
                  {t('upload.subtitle')}
                </p>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px]">
                <Image
                  src="/images/nahed_with_team.png"
                  alt="Nahed with Reset Club Team"
                  fill
                  className="object-cover shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Bottom Section: Form Full Width */}
          <div className="w-full">
            <CVUploadForm />
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}