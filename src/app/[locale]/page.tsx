import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
// LogoBanner removed - not used
import IntroSection from '@/components/sections/IntroSection';
import WhyResetClub from '@/components/sections/WhyResetClub';
import KeyFigures from '@/components/sections/KeyFigures';
// import ExperienceClient from '@/components/sections/ExperienceClient'; // section désactivée — voir le JSX plus bas
// import NotreHistoireSection from '@/components/sections/NotreHistoireSection';
// import VideoCarousel from '@/components/sections/VideoCarousel';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Trustpilot from '@/components/sections/Trustpilot';
import PracticeComparison from '@/components/sections/PracticeComparison';
import BiologicalResistanceBlock from '@/components/sections/BiologicalResistanceBlock';
import TeamHero from '@/components/sections/TeamHero';
import Director from '@/components/sections/Director';
import TeamSlider from '@/components/sections/TeamSlider';
import ResetPillarsSection from '@/components/sections/ResetPillarsSection';
import ResetClaritySection from '@/components/sections/ResetClaritySection';
import ResetFaqSection from '@/components/sections/ResetFaqSection';
// import FemaleSchemaSection from '@/components/sections/FemaleSchemaSection'; // section désactivée — voir le JSX plus bas

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.home' });

  return {
    // Absolute: the homepage title already carries the brand, so it must not get
    // the "| ResetClub™️" template suffix appended on top of it.
    title: { absolute: t('title') },
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://www.resetclub.ma/${locale}`,
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
      canonical: `https://www.resetclub.ma/${locale}`,
      languages: {
        'x-default': 'https://www.resetclub.ma/fr',
        'en': 'https://www.resetclub.ma/en',
        'fr': 'https://www.resetclub.ma/fr',
      },
    },
  };
}

export default function HomePage() {
  // const t = useTranslations('HomePage');

  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <LogoBanner /> */}
        {/* <PressBanner /> */}
        <PracticeComparison />
        <BiologicalResistanceBlock />
        <WhyResetClub />
        <ResetPillarsSection />
        {/* <FemaleSchemaSection /> */}
        <BeforeAfter />
        {/* <VideoCarousel /> */}
        <KeyFigures />
        {/* <ExperienceClient /> */}
        <IntroSection />
        {/* <NotreHistoireSection /> */}
        <ResetClaritySection />
        <ResetFaqSection />
        <TeamHero />
        <Director />
        <TeamSlider />

        <Trustpilot />
      </main>
      <Footer />
    </>
  );
}
