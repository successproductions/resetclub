import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RecruitmentsHero from '@/components/sections/RecruitmentsHero';
import CVUploadForm from '@/components/forms/CVUploadForm';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'SEO.recrutons' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.resetclub.ma/${params.locale}/recrutons`,
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
      canonical: `https://www.resetclub.ma/${params.locale}/recrutons`,
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
        <div className="container mx-auto  md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left Side - Text & Form */}
            <div className="order-2 lg:order-1">

              {/* Subtitle */}
              <div className="md:mb-12 px-6 lg:px-0 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 font-normal leading-tight">
                  {t('hero.subtitle')}
                </h2>
              </div>

              {/* Intro Text */}
              <div className="mb-8 px-6 lg:px-0 ">
                <p
                  className="text-lg md:text-xl text-gray-900 text-center  font-graphik leading-relaxed"
                  dangerouslySetInnerHTML={{__html: t('qualities.intro')}}
                />
              </div>

              {/* CV Upload Form */}
              <CVUploadForm />
            </div>

            {/* Right Side - Image */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/5] lg:aspect-[3/4]">
                <Image
                  src="/images/nahed_with_team.png"
                  alt="Nahed with Reset Club Team"
                  fill
                  className="object-cover  shadow-lg"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}