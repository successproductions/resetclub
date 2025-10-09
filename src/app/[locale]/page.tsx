// import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import LogoBanner from '@/components/sections/LogoBanner';
import PressBanner from '@/components/sections/PressBanner';
import IntroSection from '@/components/sections/IntroSection';
import WhyResetClub from '@/components/sections/WhyResetClub';
import KeyFigures from '@/components/sections/KeyFigures';
import NotreHistoireSection from '@/components/sections/NotreHistoireSection';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Trustpilot from '@/components/sections/Trustpilot';
import PracticeComparison from '@/components/sections/PracticeComparison';

export default function HomePage() {
  // const t = useTranslations('HomePage');

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoBanner />
        <PressBanner />
        <WhyResetClub />
        <KeyFigures />
         <IntroSection />
        <NotreHistoireSection />
        <BeforeAfter />
        <Trustpilot />
        <PracticeComparison />
      </main>
      <Footer />
    </>
  );
}